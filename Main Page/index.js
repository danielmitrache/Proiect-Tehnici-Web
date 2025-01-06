fetch('Data/retete.json')
    .then(response => response.json())
    .then(data => {
        const recipes = data.recipes;

        const today = new Date().getDay();
        const recipeOfTheDay = today % recipes.length;


        document.querySelector('.recipe img').src = recipes[recipeOfTheDay].image;
        document.querySelector('.recipe h3').textContent = recipes[recipeOfTheDay].title;
        document.querySelector('.content a').href = `Retete/pagina-reteta.html?id=${recipeOfTheDay}`;
    });

let loginButton = document.getElementById('login');
let registerButton = document.getElementById('register');
loginButton.addEventListener('click', () => {
        event.preventDefault();
        let usernameField = document.getElementById('username');
        let passwordField = document.getElementById('password');

        let username = usernameField.value;
        let password = passwordField.value;

        fetch('Data/users.json')
            .then(response => response.json())
            .then(data => {
                const users = data['users'];
                let found = false;
                for (let i = 0; i < users.length; i++) {
                    if (users[i].username === username && users[i].password === password) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    localStorage.setItem('username', username);
                    location.reload();
                } else {
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

});
let defaultColor = getComputedStyle(document.getElementById('titlu')).color;
const colors = [
    '#FAE042', '#F36A2D', '#A4E864', '#7DE5FF', '#FFFFFF', '#F5F5DC', defaultColor
];
let username = localStorage.getItem('username') || '';
if (username !== '') {
    let loginForm = document.getElementsByClassName('login-menu')[0];
    loginForm.style.display = 'none';

    let profileWidget = document.getElementsByClassName('profile-widget')[0];
    profileWidget.style.display = 'block';

    let profileContent = document.getElementById('profile-content');
    let welcomeMessage = document.createElement('h2');
    welcomeMessage.classList.add('welcome-message');
    welcomeMessage.textContent = `Bun venit, `;

    let usernameSpan = document.createElement('span');
    usernameSpan.textContent = username;
    usernameSpan.style.color = colors[Math.floor(Math.random() * colors.length)];
    welcomeMessage.appendChild(usernameSpan);
    profileContent.appendChild(welcomeMessage);

    let logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        localStorage.setItem('username', '');
        location.reload();
    });
}
if (username === '') {
    let loginForm = document.getElementsByClassName('login-menu')[0];
    loginForm.style.display = 'block';

    let profileWidget = document.getElementsByClassName('profile-widget')[0];
    profileWidget.style.display = 'none';
}


if ('Notification' in window) {
        Notification.requestPermission()
            .then(permission => {
                if (permission === 'granted') {
                        setTimeout(() => {
                                new Notification('Retete de Post', {
                                        body: 'Nu uita sa te abonezi la Newsletter.',
                                        icon: 'Imagini/LOGOPNG.png'
                                });
                        }, 30000);
                }
            });
}

if(window.matchMedia("(any-pointer: coarse)").matches) {
    document.getElementById("calendarpost").addEventListener("click", function() {
        let dropdown = document.getElementsByClassName("dropdown-content")[0];
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    });

    document.getElementById("maimultelinks").addEventListener("click", function() {
        let dropdown = document.getElementsByClassName("dropdown-content")[1];
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    });
}