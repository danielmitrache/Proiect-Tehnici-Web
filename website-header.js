headerElement = document.getElementsByTagName("header")[0];
headerElement.innerHTML = `
    <a href="../index.html"><img src="../Imagini/LOGOPNG.png" alt="Logo"></a>
    <nav class="headernav">
      <div class="headerlinks">
        <a id="calendarpost">Calendar Post</a>
        <div class="dropdown-content">
          <a href="../Calendar%20Page/calendarpost.html#nov2024">Noiembrie 2024</a>
          <a href="../Calendar%20Page/calendarpost.html#dec2024">Decembrie 2024</a>
          <a href="../Calendar%20Page/calendarpost.html#ian2025">Ianuarie 2025</a>
        </div>
      </div>
      <div class="headerlinks">
        <a href="../Retete/retete.html">Rețete</a>
      </div>
      <div class="headerlinks">
        <a id="maimultelinks">Mai Multe</a>
        <div class="dropdown-content">
          <a href="../Contact%20Page/contact.html">Contact</a>
          <a href="../Own%20Recipes%20Page/reteteproprii.html">Propriile retete</a>
        </div>
      </div>
    </nav>`;

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