import requests
from bs4 import BeautifulSoup
import json

url = 'https://www.bucataria.lidl.ro/retete-de-post'

response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')

linkuri_retete = []
retete_img = []
retete_titluri = []
retete_instructiuni = []
retete_ingrediente = []
retete_tags = []
class_reteta = 'flex flex-col gap-4 pb-4 no-underline text-inherit h-full'

for reteta in soup.find_all('a', class_=class_reteta):
    linkuri_retete.append(reteta['href'])

for img in soup.find_all('source'):
    retete_img.append(img['srcset'])

base_url = 'https://www.bucataria.lidl.ro/'
for link in linkuri_retete:
    new_url = base_url + link
    recipe_response = requests.get(new_url)
    recipe_soup = BeautifulSoup(recipe_response.text, 'html.parser')

    recipe_title = recipe_soup.find('h1', class_='font-semibold text-3xl xl:text-4xl').text
    retete_titluri.append(recipe_title)

    recipe_instructions_list = recipe_soup.find_all('p')
    recipe_instructions = ''
    for instruction in recipe_instructions_list:
        recipe_instructions += instruction.text + '\\n'
    retete_instructiuni.append(recipe_instructions)

    randuri_tabel_ingrediente = recipe_soup.find_all('span', class_='flex items-center border-b border-b-gray-150 py-3')
    lista_ingrediente_reteta_curenta = {}
    for rand in randuri_tabel_ingrediente:
        ingredient = rand.find('span', attrs={'data-rid': 'ingredient'}).text

        span_cantitate_unitate = rand.find('span', class_='font-semibold basis-24')
        if span_cantitate_unitate.text == '&nbsp;':
            cantitate = unitate = ''
        else:
            text = span_cantitate_unitate.text.split('\xa0')
            if len(text) == 1:
                cantitate = text[0]
                unitate = ''
            else:
                cantitate = text[0]
                unitate = text[1]

        lista_ingrediente_reteta_curenta[ingredient] = cantitate + ' ' + unitate
    retete_ingrediente.append(lista_ingrediente_reteta_curenta)

    tags = recipe_soup.find_all('a', class_='text-gray-700 inline-flex items-center border-none p-0 underline', attrs={'data-name': 'tag'})
    tags_list = []
    for tag in tags:
        tags_list.append(tag.text)
    retete_tags.append(tags_list)

nr_retete = len(retete_titluri)
JSON_retete = ('{\n'
               '"recipes": [\n')
for i in range(nr_retete):
    JSON_retete += '{\n'
    JSON_retete += '"title": "' + retete_titluri[i] + '",\n'
    JSON_retete += '"image": "' + retete_img[i] + '",\n'
    JSON_retete += '"instructions": "' + retete_instructiuni[i] + '",\n'
    JSON_retete += '"ingredients": ' + json.dumps(retete_ingrediente[i]) + ',\n'
    JSON_retete += '"tags": ' + json.dumps(retete_tags[i]) + '\n'
    JSON_retete += '}'
    if i < nr_retete - 1:
        JSON_retete += ',\n'

JSON_retete += ('\n]\n'
                '}\n')
print(JSON_retete)