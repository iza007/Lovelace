const register = () => {
    
    if(document.getElementById('registration').style.display == "block")
    document.getElementById("registration").style.display = "none";
    else
    document.getElementById("registration").style.display = "block";
   }
// nowa wersja
// obsługa kliknięcia i wywołania formularza rejestracji
const register2 = () => {
    
    if(document.getElementById('register_form').style.display == "block")
    document.getElementById("register_form").style.display = "none";
    else
    document.getElementById("register_form").style.display = "block";

    // uwaga, profilaktycznie ukrywamy formularz logowanaia
    document.getElementById("login_form").style.display = "none";
   }

// nowa wersja
// obsługa kliknięcia i wywołania formularza logowania

const login2 = () => {
    
    if(document.getElementById('login_form').style.display == "block")
    document.getElementById("login_form").style.display = "none";
    else
    document.getElementById("login_form").style.display = "block";
    // uwaga, profilaktycznie ukrywamy formularz rejestracji
    document.getElementById("register_form").style.display = "none";
   }

   const login = () => {
    
    if(document.getElementById('login').style.display == "block")
    document.getElementById("login").style.display = "none";
    else
    document.getElementById("login").style.display = "block";
   }

   // funkcja pomocnicza, do walidacji adresu email
   // np. czy nie ma spacji w adresie, czy jest podana domena itp.
const ValidateEmail = (mail) => {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("Podano nieprawidłowy adres e-mail!")
    return (false)
}

// sprawdzenie czy hasło spełnia minimalne wymogi
// miniumum 8 znaków, mała i duża litera oraz cyfra
const CheckPasswordStregth = (passw) => {
  if(passw == "") {  
    alert("Hasło nie może być puste! ");
 }
   if(passw.length < 8) {  
    alert("Hasło musi mieć minimum 8 znaków! ");
 }   
}

const fetch_rooms = () => {
  fetch("/rooms").then(response => response.json())
  .then(data => {
    for(let id = 1;id <= 6;id++)
    {
      let room_name = "room" + id;
      let room_price = "price" + id;
      let room_description = "descr" + id;
      let db_index = id - 1;
      $("#" + room_name).html(data[db_index].name);
      $("#" + room_price).html(data[db_index].price);
      $("#" + room_description).html(data[db_index].description);
    }
  });
}

const fetch_treatments = () => {
  fetch("/treatments").then(response => response.json())
  .then(data => {
    for(let id = 1;id <= 6;id++)
    {
      let treatment_name = "treatment-" + id;
      let treatment_price = "price-" + id;
      let treatment_description = "descr-" + id;
      let db_index = id - 1;
      $("#" + treatment_name).html(data[db_index].name);
      $("#" + treatment_price).html(data[db_index].price);
      $("#" + treatment_description).html(data[db_index].description);
    }
  });
}

const fetch_all = () => {
  fetch_treatments();
  fetch_rooms();
}


$( ".modal" ).dialog( "option", "modal", true );

function test3(){
  console.log($('.add-to-cart'))
}
