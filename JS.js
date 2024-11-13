// URL del archivo XML en GitHub
const url = 'PLATOS.xml';


// Funció per carregar i parsejar l'XML
// Función per carregar i parsejar l'XML
fetch(url)
  .then(response => response.text()) // Obtenim el contingut com a text
  .then(str => {
    // Parsegem el XML
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(str, "text/xml");

    // Obtenim tots els grups
    let grups = xmlDoc.getElementsByTagName('GRUP');

    // Recórrer cada grup
    Array.from(grups).forEach(grup => {
      let grupNom = grup.getElementsByTagName('NOM')[0].textContent; // Nom del grup
      let plats = grup.getElementsByTagName('PLAT'); // Plats del grup

      // Crear un bloc per cada grup
      let grupDiv = document.createElement('div');
      grupDiv.classList.add('grup');  // Afegim una classe al grup
      grupDiv.innerHTML = `<h2>${grupNom}</h2>`; // Títol del grup

      // Recórrer cada plat
      Array.from(plats).forEach(plat => {
        let platNom = plat.getElementsByTagName('NOM')[0].textContent;
        let platDescripcio = plat.getElementsByTagName('DESCRIPCIO')[0].textContent;
        let platPreu = plat.getElementsByTagName('PREU')[0].textContent;

        // Afegir una imatge de prova per cada plat
        let platImg = "css/images/stock.jpg";

        // Crear un bloc per cada plat
        let platDiv = document.createElement('div');
        platDiv.classList.add('plat');
        platDiv.innerHTML = `
          <h3 class="plat">${platNom}</h3>
          <img src="${platImg}" alt="${platNom}" class="plat-img">
          <p>${platDescripcio}</p>
          <p class="plat"><strong>Preu:</strong> €${platPreu}</p>
        `;

        grupDiv.appendChild(platDiv); // Afegir el plat al grup
      });

      document.querySelector('.menu').appendChild(grupDiv); // Afegir el grup al menú dins de .main
    });
  })
  .catch(error => {
    console.error('Error al carregar el XML:', error);
  });

