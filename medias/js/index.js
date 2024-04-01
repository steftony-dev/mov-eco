form.onsubmit = () => {
    let dep = document.querySelector('#villedepart');
    let arr = document.querySelector('#villearrivee');
    location.assign('itineraire.html');
    sessionStorage.setItem('villedep',dep.value);
    sessionStorage.setItem('villarr',arr.value);
    return false;
}
