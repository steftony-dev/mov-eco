
let villedep = sessionStorage.getItem('villedep')
sessionStorage.removeItem('villedep')

if (villedep != null) {
    document.getElementById('depart').setAttribute('value', villedep)

}
let villearr = sessionStorage.getItem('villarr')
sessionStorage.removeItem('villarr')

if (villearr != null) {
    document.getElementById('arrivee').setAttribute('value', villearr)
}
sessionStorage.setItem('used', true)
let horrairedep = ''
let horrairearr = ''
let datedep = ''
let villedepId = ''
let villearrId = ''

form.onsubmit = () => {
    PrintTravels()
    return false;
}

document.getElementById("loader").style.display = "none";

function Invert() {
    let dep = document.querySelector('#depart');
    let arr = document.querySelector('#arrivee');
    let inter = dep.value;
    dep.value = arr.value;
    arr.value = inter;
}

function PrintTravels() {
    let sect = document.querySelector('#boxaccordion');
    sect.innerHTML = "";

    villedep = ''
    villearr = ''
    horrairedep = ''
    horrairearr = ''
    datedep = ''
    villedepId = ''
    villearrId = ''
    console.log('Debut')

    document.getElementById("loader").style.display = "block";

    console.log('fin')
    GetValues().then(() => {
        let url = 'http://nathanael-spriet.fr/schedules?cityFrom=' + villedepId + '&cityTo=' + villearrId + datedep + horrairedep + horrairearr;
        fetch(url).then(response => response.json())
            .then(data => data.forEach((el) => {
                let thedate = new Date(el.date);
                let today = new Date();
                if (today <= thedate) {
                    CreateTickets(el, thedate);
                }
                else if (thedate.getDate() == today.getDate() && thedate.getMonth() == today.getMonth() && thedate.getFullYear() == today.getFullYear() && el.departureTime[0] + el.departureTime[1] >= today.getHours()) {
                    if ((el.departureTime[0] + el.departureTime[1] == today.getHours() && el.departureTime[3] + el.departureTime[4] >= today.getMinutes()) || (el.departureTime[0] + el.departureTime[1] > today.getHours())) {
                        CreateTickets(el, thedate);
                    }
                }
            })).catch((err) => {
                console.log(err)
            }).then(() => {
                document.getElementById("loader").style.display = "none";
                if (sect.childElementCount == 0) {
                    let newH2 = document.createElement('h2');
                    newH2.textContent = 'Itinéraires non disponibles';
                    sect.insertBefore(newH2, sect.firstChild);
                }
                else {
                    let newH2 = document.createElement('h2');
                    newH2.textContent = 'Liste itinéraire :';
                    sect.insertBefore(newH2, sect.firstChild);
                }

            }
            )
    })
}



function AddHoursMinutes(h, m) {
    let [heure, minutes] = h.split(":").map(Number);

    // Ajout de la durée
    minutes += m;

    heure += Math.floor(minutes / 60); // Ajout des heures résultant de la division entière
    minutes %= 60; // Utilisation du reste après la division entière pour les minutes

    // Formattage de l'horaire final au format "hh:mm"
    let horaireFinal = `${heure.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return horaireFinal
}


function GetValues() {
    villedep = document.querySelector('#depart').value.trim().toLowerCase();
    if (villedep == '') {
        alert('Ville de départ manquante')
    }

    villearr = document.querySelector('#arrivee').value.trim().toLowerCase();

    if (villearr == '') {
        alert("Ville d'arrivé manquante")
    }

    horrairedep = document.querySelector('#heuredepart').value.trim().toLowerCase();

    if (horrairedep != '') {
        horrairedep = '&timeFrom=' + horrairedep
    }
    horrairearr = document.querySelector('#heurearrivee').value.trim().toLowerCase();

    if (horrairearr != '') {
        horrairearr = '&timeTo=' + horrairearr
    }
    datedep = document.querySelector('#datedepart').value.trim().toLowerCase();

    if (datedep != '') {
        datedep = '&date=' + datedep
    }


    return fetch('http://nathanael-spriet.fr/cities')
        .then(response => response.json())
        .then(data2 => {
            data2.forEach((el) => {
                if (el.name.trim().toLowerCase() == villedep) {
                    villedepId = el.id;
                }
                if (el.name.trim().toLowerCase() == villearr) {
                    villearrId = el.id;
                }
            });
        });
}

function CreateTickets(el, thedate) {
    let sect = document.querySelector('#boxaccordion');
    let wrapper = document.createElement('article');
    wrapper.classList.add("wrapper");
    sect.appendChild(wrapper);

    let newSection2 = document.createElement('section');
    newSection2.classList.add('itinéraire-top');
    wrapper.appendChild(newSection2);

    let newSection3 = document.createElement('section');
    newSection2.appendChild(newSection3);

    let newSection4 = document.createElement('section');
    newSection3.appendChild(newSection4);

    let newDiv = document.createElement('div');
    newDiv.classList.add("itinéraire-top-columns")
    newSection4.appendChild(newDiv);

    let newP = document.createElement('p');

    newP.textContent = 'Date : ' + thedate.getDate() + "/" + thedate.getMonth() + "/" + thedate.getFullYear();
    newDiv.appendChild(newP);

    newP = document.createElement('p');
    newP.textContent = 'Départ : ' + el.departureTime;
    newDiv.appendChild(newP);

    newP = document.createElement('p');
    newP.textContent = 'Gare de départ : ' + el.travel.from.name;
    newSection3.appendChild(newP);

    newP = document.createElement('p');
    newP.textContent = 'Arrivée : ' + AddHoursMinutes(el.departureTime, el.travel.duration);
    newDiv.appendChild(newP);

    newP = document.createElement('p');
    newP.textContent = "Gare d'arrivé : " + el.travel.to.name;
    newSection3.appendChild(newP);

    newP = document.createElement('p');
    newP.textContent = 'Durée du trajet : ' + el.travel.duration + 'min';
    newSection3.appendChild(newP);

    const button = document.createElement('button');
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('width', '27');
    svg2.setAttribute('height', '27');
    svg2.setAttribute('viewBox', '0 0 27 27');
    svg2.setAttribute('fill', 'none');
    svg2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M3.375 3.375H5.12144C6.06982 3.375 6.88781 4.04107 7.07996 4.96979L9.79504 18.0927C9.98719 19.0214 10.8052 19.6875 11.7536 19.6875H19.6875');
    path1.setAttribute('stroke', '#444750');
    path1.setAttribute('stroke-width', '3');
    path1.setAttribute('stroke-linecap', 'round');
    path1.setAttribute('stroke-linejoin', 'round');
    svg2.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M7.67725 7.875H22.2993C22.9636 7.875 23.4433 8.5109 23.2608 9.14972L21.9967 13.5742C21.6287 14.8621 20.4515 15.75 19.1121 15.75H9.31201');
    path2.setAttribute('stroke', '#444750');
    path2.setAttribute('stroke-width', '3');
    path2.setAttribute('stroke-linecap', 'round');
    path2.setAttribute('stroke-linejoin', 'round');
    svg2.appendChild(path2);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '18.5625');
    circle1.setAttribute('cy', '23.0625');
    circle1.setAttribute('r', '0.5625');
    circle1.setAttribute('fill', '#444750');
    circle1.setAttribute('stroke', '#444750');
    circle1.setAttribute('stroke-width', '2');
    circle1.setAttribute('stroke-linecap', 'round');
    circle1.setAttribute('stroke-linejoin', 'round');
    svg2.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '0.5625');
    circle2.setAttribute('cy', '0.5625');
    circle2.setAttribute('r', '0.5625');
    circle2.setAttribute('transform', 'matrix(1 0 0 -1 11.25 23.625)');
    circle2.setAttribute('fill', '#444750');
    circle2.setAttribute('stroke', '#444750');
    circle2.setAttribute('stroke-width', '2');
    circle2.setAttribute('stroke-linecap', 'round');
    circle2.setAttribute('stroke-linejoin', 'round');
    svg2.appendChild(circle2);

    const buttonText = document.createTextNode('Ajouter au panier');
    button.appendChild(svg2);
    button.appendChild(buttonText);
    button.onclick = function () {
        addPanier(el.id);
    };
    button.id = el.id;
    newSection2.appendChild(button);

    let newSection5 = document.createElement('section');
    newSection5.classList.add('itinéraire-bottom');
    wrapper.appendChild(newSection5);

    newP = document.createElement('p');
    newP.textContent = 'Prix : ' + el.price + '€';
    newSection5.appendChild(newP);

    newP = document.createElement('p');
    newP.textContent = '' + el.travel.type;
    newSection5.appendChild(newP);

}



function addPanier(id) {
    var panier = sessionStorage.getItem('panier');
    panier = JSON.parse(panier);

    var commandeExistante = panier.find(function(element) {
        return element.id === id;
    });

    if (commandeExistante) {
        commandeExistante.nbCommandes++;
    }
    else {
        panier.push({ id: id, nbCommandes: 1 });
    }
    panier2 = JSON.stringify(panier);
    sessionStorage.setItem('panier', panier2);


    document.getElementById('modal').style.display = 'block'
    setTimeout(() => {
        document.getElementById('modal').style.display = 'none'
    }, 1000)
}
