headerElement = document.getElementsByTagName("header")[0];
headerElement.innerHTML = `
    <a href="../Main%20Page/index.html"><img src="../Imagini/LOGOPNG.png" alt="Logo"></a>
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
        <a>Mai Multe</a>
        <div class="dropdown-content">
          <a href="../Contact%20Page/contact.html">Contact</a>
          <a href="../Own%20Recipes%20Page/reteteproprii.html">Propriile retete</a>
        </div>
      </div>
    </nav>`;