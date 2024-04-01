document.addEventListener("DOMContentLoaded", function() {
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    var surname = sessionStorage.getItem("surname");
    var firstname = sessionStorage.getItem("firstname");
    var deconnexionButton = document.getElementById("sedeconnecter");

  
    var boutonpanier = document.getElementById('boutonpanier')
    boutonpanier.addEventListener("click",function() {
    if (isLoggedIn === "true") {
      window.location.href = "panier.html";
    } else {
      window.location.href = "connexion.html";
    }  
    })
  

    if (isLoggedIn === "true") {
        document.querySelector('.header_right_second > h1').prepend(firstname+" "+surname);
    } else {
        document.querySelector('.header_right_second > h1').prepend("Connectez-vous !");
    }

    

  


  });