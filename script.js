const urlBase= "https://a072-2804-29b8-507d-5911-7094-8f2b-90fb-9ea.ngrok-free.app";
// const urlBase = "http://localhost:4001";

//função para guardar usuario e senha quando cadastrar
async function cadastrar() {
  let email = document.getElementById("email").value;
  let nome = document.getElementById("nome").value;
  let senha = document.getElementById("senha").value;
  let data_nascimento = document.getElementById("data_nascimento").value;
  const data = {
    "email": email,
    "name": nome,
    "password": senha,
    "birth_date": data_nascimento
  }
  console.log(data)
  fetch(urlBase + '/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    window.location.href = "index.html";
  }).catch(error => console.error('Error sending data:', error));

 }

async function entrar(){
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  const data= {
      "email": email,
      "password": senha
  }
    fetch(urlBase + '/login', {
      method: 'POST',
      credentials: 'include' , 
      headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
      body: JSON.stringify(data)
    }).then(response => 
        response.json()
    ).then(data => {
      console.log(data.id);
      localStorage.setItem("userId", data.id);
      window.location.href = "paginaInicial.html";
    }).catch(error => console.error('Error sending data:', error));
}

async function getUser() {
  let userId = localStorage.getItem("userId");
  fetch(urlBase + "/user/" + userId, {
    method: 'GET',
    credentials: 'include' ,
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
  }).catch(error => console.error('Error getting data:', error));
}

window.addEventListener("DOMContentLoaded", function() {
  const path = window.location.pathname;

  if (path === "/perfil.html") {
      getUser();
  }
});