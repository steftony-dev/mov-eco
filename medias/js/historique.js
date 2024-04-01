let url = 'http://nathanael-spriet.fr/users/history/' + sessionStorage.getItem('userId')

try {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length == 0) {

        let main = document.querySelector('.historique')
        let h2 = document.createElement('h2');
        h2.textContent = "Votre historique est vide"
        h2.classList.add("empty")
        main.appendChild(h2);

      } else {
        let i = 0

        let histo = []

        data.forEach(function (data) {

          var commandeExistante = histo.find(function (element) {
            return element.id === data.schedule.id;
          });

          if (commandeExistante) {
            commandeExistante.nbCommandes++;
            commandeExistante.ticket.push(data.id)
          }
          else {
            histo.push({ id: data.schedule.id, nbCommandes: 1, ticket: [data.id] });
          }
        })

        histo.forEach(function (data) {

          let sect = document.querySelector('#historique')
          let tr = document.createElement('tr');
          tr.id = i;
          tr.classList.add("ticket")

          let td1 = document.createElement('td');
          let p1 = document.createElement('p');
          p1.id = 'num_trajet' + i;
          p1.textContent = 'N°' + data.id;
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
          p4.id = "quantity" + i;
          p4.textContent = data.nbCommandes;
          td4.appendChild(p4);
          tr.appendChild(td4);

          let td5 = document.createElement('td');
          let duv = document.createElement('div');
          duv.className = 'div_trashbin';
          let p5 = document.createElement('p');
          td5.classList.add('total');
          p5.id = "total" + i;
          duv.appendChild(p5);
          td5.appendChild(duv);
          tr.appendChild(td5);

          let td7 = document.createElement('td');

          let newdiv = document.createElement('div');
          newdiv.className = 'div_trashbin';

          let div = document.createElement('div');
          div.className = 'trashbin';
          div.id = 'tr' + i;
          div.onclick = function () {
            delet(data.ticket);
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

          let url = 'http://nathanael-spriet.fr//schedules/info/' + data.id;
          try {
            fetch(url)
              .then(response => response.json())
              .then(data => {
                p2_1.textContent = data.travel.from.name;
                p2_2.textContent = 'Le ' + data.date + ' à ' + data.departureTime;
                p3_1.textContent = data.travel.to.name;
                p3_2.textContent = 'Prévu à ' + AddHoursMinutes(data.departureTime, data.travel.duration);
                p5.textContent = parseFloat(p4.textContent) * data.price + '€';
              })
              .catch(error => {
                console.log("Une erreur s'est produite lors de la récupération des informations du site :", error);
              });
          } catch (error) {
            console.log("Une erreur s'est produite lors de la récupération des informations du site :", error);
          }
        })

      }
    })
    .catch(error => {
      console.log("Une erreur s'est produite lors de la récupération des informations du site :", error);
    });
} catch (error) {
  console.log("Une erreur s'est produite lors de la récupération des informations du site :", error);
}


function AddHoursMinutes(h, m) {
  let [heure, minutes] = h.split(":").map(Number);

  minutes += m;

  heure += Math.floor(minutes / 60);
  minutes %= 60;

  let horaireFinal = `${heure.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return horaireFinal
}

function delet(id) {
  id.forEach(function (id) {
    console.log(id)
    fetch('http://nathanael-spriet.fr/ticket/' + id + '?mail=' + sessionStorage.getItem('mail'), {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        console.log('Removed');
      } else {
        throw response;
      }
    }).catch(error => {
      error.text().then(errorMessage => {
        console.log('Request failed : ' + errorMessage);
      });
    });
  })

  // Le problème c'est que les requetes vont trop vite a mon avis
}