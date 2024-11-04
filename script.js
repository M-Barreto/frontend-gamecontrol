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
  fetch('https://49dd-187-181-113-218.ngrok-free.app/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    window.location.href = "login.html";
  }).catch(error => console.error('Error sending data:', error));

 }

 
