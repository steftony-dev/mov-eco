let panier = sessionStorage.getItem('panier');
panier = JSON.parse(panier);

if (panier.length == 0) {

  let main = document.querySelector('.panier')
  let h2 = document.createElement('h2');
  h2.textContent = "Votre panier est vide"
  h2.classList.add("empty")
  main.appendChild(h2);

} else {

  let i = 0

  let main = document.querySelector('main')
  let section = document.createElement('section');
  section.classList.add("section_prix")
  main.appendChild(section);
  let section1 = document.createElement('section');
  section1.classList.add("section_mont")
  let h3 = document.createElement('h3');
  section1.appendChild(h3);
  section.appendChild(section1);

  let button = document.createElement('button');
  button.classList.add("payer")
  button.id = "payer"
  button.textContent = "Commander"
  section.appendChild(button);

  panier.forEach(function (id) {

    let sect = document.querySelector('#panier')
    let tr = document.createElement('tr');
    tr.id = i;
    tr.classList.add("ticket")

    let td1 = document.createElement('td');
    let p1 = document.createElement('p');
    p1.id = 'num_trajet' + i;
    p1.textContent = 'N°' + id.id;
    td1.appendChild(p1);
    tr.appendChild(td1);

    let td2 = document.createElement('td');
    let p2_1 = document.createElement('p');
    p2_1.id = 'ville_dep' + i;
    let p2_2 = document.createElement('p');
    p2_2.id = 'date_dep' + i;
    td2.appendChild(p2_1);
    td2.appendChild(p2_2);
    tr.appendChild(td2);

    let td3 = document.createElement('td');
    let p3_1 = document.createElement('p');
    p3_1.id = 'ville_arr' + i;
    let p3_2 = document.createElement('p');
    p3_2.id = 'date_arr' + i;
    td3.appendChild(p3_1);
    td3.appendChild(p3_2);
    tr.appendChild(td3);

    let td4 = document.createElement('td');
    let p4 = document.createElement('p');
    p4.id = 'prix' + i;
    td4.appendChild(p4);
    tr.appendChild(td4);

    let td5 = document.createElement('td');

    let divv = document.createElement('div');
    divv.className = 'td_nb_billet';

    let div1 = document.createElement('div');
    div1.onclick = function () {
      majQuantity(1, id.id);
    };
    let svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('width', '24');
    svg1.setAttribute('height', '24');
    svg1.setAttribute('viewBox', '0 0 24 24');
    svg1.setAttribute('fill', 'none');
    let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17');
    path1.setAttribute('stroke', '#393939');
    path1.setAttribute('stroke-width', '2');
    path1.setAttribute('stroke-linecap', 'round');
    path1.setAttribute('stroke-linejoin', 'round');
    svg1.appendChild(path1);
    div1.appendChild(svg1);
    let p5 = document.createElement('p');
    p5.textContent = id.nbCommandes;
    p5.id = "quantity" + i;
    let div2 = document.createElement('div');
    div2.onclick = function () {
      majQuantity(0, id.id);
    };
    let svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('width', '24');
    svg2.setAttribute('height', '24');
    svg2.setAttribute('viewBox', '0 0 24 24');
    svg2.setAttribute('fill', 'none');
    let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M7 12L17 12');
    path2.setAttribute('stroke', '#393939');
    path2.setAttribute('stroke-width', '2');
    path2.setAttribute('stroke-linecap', 'round');
    path2.setAttribute('stroke-linejoin', 'round');
    svg2.appendChild(path2);
    div2.appendChild(svg2);
    divv.appendChild(div2);
    divv.appendChild(p5);
    divv.appendChild(div1);
    td5.appendChild(divv);
    tr.appendChild(td5);

    let td6 = document.createElement('td');
    td6.classList.add('total');
    td6.id = "total" + i;
    tr.appendChild(td6);

    let td7 = document.createElement('td');

    let newdiv = document.createElement('div');
    newdiv.className = 'div_trashbin';

    let div = document.createElement('div');
    div.className = 'trashbin';
    div.id = 'tr' + i;
    div.onclick = function () {
      delet(id.id);
    };

    let svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg3.setAttribute('width', '24');
    svg3.setAttribute('height', '24');
    svg3.setAttribute('viewBox', '0 0 24 24');
    svg3.setAttribute('fill', 'none');
    let path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M10 12V17');
    path3.setAttribute('stroke', '#393939');
    path3.setAttribute('stroke-width', '2');
    path3.setAttribute('stroke-linecap', 'round');
    path3.setAttribute('stroke-linejoin', 'round');
    svg3.appendChild(path3);
    let path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M14 12V17');
    path4.setAttribute('stroke', '#393939');
    path4.setAttribute('stroke-width', '2');
    path4.setAttribute('stroke-linecap', 'round');
    path4.setAttribute('stroke-linejoin', 'round');
    svg3.appendChild(path4);
    let path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M4 7H20');
    path5.setAttribute('stroke', '#393939');
    path5.setAttribute('stroke-width', '2');
    path5.setAttribute('stroke-linecap', 'round');
    path5.setAttribute('stroke-linejoin', 'round');
    svg3.appendChild(path5);
    let path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10');
    path6.setAttribute('stroke', '#393939');
    path6.setAttribute('stroke-width', '2');
    path6.setAttribute('stroke-linecap', 'round');
    path6.setAttribute('stroke-linejoin', 'round');
    svg3.appendChild(path6);
    let path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z');
    path7.setAttribute('stroke', '#393939');
    path7.setAttribute('stroke-width', '2');
    path7.setAttribute('stroke-linecap', 'round');
    path7.setAttribute('stroke-linejoin', 'round');
    svg3.appendChild(path7);
    div.appendChild(svg3);
    newdiv.appendChild(div);
    td7.appendChild(newdiv);
    tr.appendChild(td7);

    sect.appendChild(tr);

    let url = 'http://nathanael-spriet.fr//schedules/info/' + id.id;
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          p2_1.textContent = data.travel.from.name;
          p2_2.textContent = 'Le ' + data.date + ' à ' + data.departureTime;
          p3_1.textContent = data.travel.to.name;
          p3_2.textContent = 'Prévu à ' + AddHoursMinutes(data.departureTime, data.travel.duration);
          p4.textContent = data.price + '€';
          td6.textContent = parseFloat(p4.textContent) * parseFloat(p5.textContent) + '€';
          majTot()
        })
        .catch(error => {
          console.log("Une erreur s'est produite lors de la récupération des informations du site :", error);
        });
    } catch (error) {
      console.log("Une erreur s'est produite lors de la récupération des informations du site :", error);
    }

    i++
  });

  function delet(id) {
    let clickedButton = event.target;
    let divId = clickedButton.getAttribute('id');

    while (divId == null) {
      clickedButton = clickedButton.parentNode
      divId = clickedButton.getAttribute('id');
    }

    let elementASupprimer = document.getElementById(divId.replace("tr", ""));

    if (elementASupprimer) {
      let parentElement = elementASupprimer.parentNode;
      parentElement.removeChild(elementASupprimer);
    }

    panier = panier.filter(function (element) {
      return element.id !== id;
    });

    panier2 = JSON.stringify(panier);
    sessionStorage.setItem('panier', panier2);
    majTot()
  }

  function majQuantity(maj, id) {
    let clickedButton = event.target;
    let divId = clickedButton.getAttribute('id');

    while (divId == null) {
      clickedButton = clickedButton.parentNode
      divId = clickedButton.getAttribute('id');
    }

    let tableaupanier = panier.find(function (element) {
      return element.id === id;
    });

    if (maj == 1) {
      document.getElementById("quantity" + divId).textContent = parseInt(document.getElementById("quantity" + divId).textContent) + 1
      tableaupanier.nbCommandes++
    } else {
      if (document.getElementById("quantity" + divId).textContent > 1) {
        document.getElementById("quantity" + divId).textContent = parseInt(document.getElementById("quantity" + divId).textContent) - 1
        tableaupanier.nbCommandes--
      }
    }

    console.log(panier)

    document.getElementById("total" + divId).textContent = parseFloat(document.getElementById("quantity" + divId).textContent) * parseFloat(document.getElementById("prix" + divId).textContent) + '€'

    panier2 = JSON.stringify(panier);
    sessionStorage.setItem('panier', panier2);
    majTot()
  }

  function majTot() {
    let elements = document.getElementsByClassName('total');
    let somme = 0;

    for (let i = 0; i < elements.length; i++) {
      let valeur = parseFloat(elements[i].textContent);
      somme += valeur;
    }
    h3.textContent = "Montant total : " + somme.toFixed(2) + "€"

    if (somme == 0) {
      let sectionPrix = document.getElementsByClassName('section_prix');
      let main = document.querySelector('main');
      main.removeChild(sectionPrix[0]);

      main = document.querySelector('.panier')
      let h2 = document.createElement('h2');
      h2.textContent = "Votre panier est vide"
      h2.classList.add("empty")
      main.appendChild(h2);
    }
  }

  let button_commander = document.getElementById('payer');

  button_commander.addEventListener('click', function () {

    let commande = []

    panier.forEach(function (id) {
      for (let i = 0; i < id.nbCommandes; i++) {
        commande.push(id.id)
      }
    })

    fetch('http://nathanael-spriet.fr/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        info: {
          address: {
            number: sessionStorage.getItem('number'),
            street: sessionStorage.getItem('street'),
            city: sessionStorage.getItem('city'),
            postcode: sessionStorage.getItem('postcode')

          },
          surname: sessionStorage.getItem('surname'),
          firstname: sessionStorage.getItem('firstname'),
          mail: sessionStorage.getItem('mail'),
          user: parseInt(sessionStorage.getItem('userId'))
        },
        schedules: commande
      })
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    }).then(tickets => {
      console.log(tickets)
    }).catch(error => {
      error.text().then(errorMessage => {
        console.log('Request failed : ' + errorMessage);
      });
    });

    panier = [];
    panier = JSON.stringify(panier);
    sessionStorage.setItem('panier', panier);

    let sectionPrix = document.getElementsByClassName('ticket');
    let main = document.querySelector('#panier');
    if (sectionPrix.length > 0) {
      while (sectionPrix.length > 0) {
        main.removeChild(sectionPrix[0]);
      }
    }
    majTot()
  });

  function AddHoursMinutes(h, m) {
    let [heure, minutes] = h.split(":").map(Number);

    minutes += m;

    heure += Math.floor(minutes / 60);
    minutes %= 60;

    let horaireFinal = `${heure.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return horaireFinal
  }

}

