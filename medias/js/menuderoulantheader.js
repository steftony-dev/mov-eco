document.addEventListener("DOMContentLoaded", function() {
var menuButton = document.getElementById("menuButton");
var menuList = document.getElementById("menuList");
var isLoggedIn = sessionStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
    menuButton.addEventListener("click", function() {
        if (menuList.style.display === "none" || menuList.style.display === "") {
          menuList.style.display = "block";
        } else {
          menuList.style.display = "none";
        }
      });

} else {
    document.querySelector('.header_right_second > svg').remove();
    menuButton.addEventListener("click", function() {
        window.location.href = "./connexion.html";
      });
}

var deconnexionButton = document.getElementById("sedeconnecter");
    deconnexionButton.addEventListener("click", function() {
      sessionStorage.removeItem("isLoggedIn");
      window.location.reload();
    });

  var profilButton = document.getElementById("monprofil");
  profilButton.addEventListener("click", function() {
      window.location.href = "./infos_personnelles.html";
  });

  var historiquebutton = document.getElementById("monhistorique");
  historiquebutton.addEventListener("click", function() {
      window.location.href = "./historique.html";
  });

  var itinerairebutton = document.getElementById("buttonitineraire");
  itinerairebutton.addEventListener("click", function() {
      window.location.href = "./itineraire.html";
  });

  var accueilbutton = document.getElementById("buttonaccueil");
  accueilbutton.addEventListener("click", function() {
      window.location.href = "./index.html";
  });

  
});
