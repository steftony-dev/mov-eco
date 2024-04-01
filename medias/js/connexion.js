document.addEventListener("DOMContentLoaded", function() {
    let ConnexionError = document.createElement('p');
    document.querySelector('#erreur').prepend(ConnexionError);
  
    function submitClicked(event) {
      event.preventDefault();
  
      var emailInput = document.getElementById("email");
      var passwordInput = document.getElementById("password");
      var email = emailInput.value;
      var password = passwordInput.value;
  
        fetch('http://nathanael-spriet.fr/users')
            .then(response => response.json())
            .then(data => {
            let user = data.find(user => user.mail === email);
            let userID = user.id;
            let surname = user.surname;
            let firstname = user.firstname;
            let emails = user.mail;

            
            let address = user.address;
            let street = address.street;
            let city = address.city;
            let postcode = address.postcode;
            let number = address.number;
                
            if (emails.includes(email) && emails.includes(password)) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("userId",userID);
                sessionStorage.setItem("surname", surname);
                sessionStorage.setItem("firstname", firstname);
                sessionStorage.setItem("mail", emails);
                sessionStorage.setItem("number", number);
                sessionStorage.setItem("street", street);
                sessionStorage.setItem("city", city);
                sessionStorage.setItem("postcode", postcode);
                var panier = [];
                panier = JSON.stringify(panier);
                sessionStorage.setItem('panier', panier);

                window.location.href = "./index.html";
            } else {
              ConnexionError.textContent = 'Adresse mail et/ou mot de passe invalide';
            }
            });
    }
  
    var form = document.querySelector('.se_connecter');
    form.addEventListener('submit', submitClicked);
  });