async function entrar(){
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    const data= {
        "email": email,
        "password": senha
    }
    fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(response => response.json()).then(data => {
        window.location.href = "index.html";
      }).catch(error => console.error('Error sending data:', error));
}