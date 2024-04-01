document.addEventListener("DOMContentLoaded", function() {
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    var firstname = sessionStorage.getItem("firstname");
    var surname = sessionStorage.getItem("surname");
    var mail = sessionStorage.getItem("mail");
    var number = sessionStorage.getItem("number");
    
    var address = sessionStorage.getItem("street");
    var postcode = sessionStorage.getItem("postcode");
    var city = sessionStorage.getItem("city");

    console.log(mail);

    if (isLoggedIn === "true") {
        document.querySelector('#nom').value = firstname;
        document.querySelector('#prénom').value = surname;
        document.querySelector('#email').value = mail;
        document.querySelector('#num_adresse').value = number;
        document.querySelector('#adresse').value = address;
        document.querySelector('#code_postal').value = postcode;
        document.querySelector('#ville').value = city;
    } else {
        window.location.href = "./index.html";
    }

});