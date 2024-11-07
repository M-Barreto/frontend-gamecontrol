const urlBase = "http://localhost:4001";

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => {
      if(response.status == 401){
        document.getElementById("erro").innerHTML = `<p>email ou senha inválido</p>`;
        throw new Error("senha inválida");
      }else if(response.status == 200){
        return response.json();
      }
    }  
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
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    return response.json();
  }).then(data => {
    let dataUser= data[0]
    document.getElementById("dataUser").innerHTML = `
    <h1>Seus Dados</h1>
    <p>Nome: ${dataUser.name}</p>
    <p>Email: ${dataUser.email}</p>
    <p>Data de Nascimento: ${dataUser.birth_date}</p>
    <button type="button" id="editBnt" >Editar</button>
    <button type="button" id="passBnt">Alterar Senha</button>
    <button type="button" id="deleteBnt">Deletar Conta</button>
    `
    const editButton = document.getElementById('editBnt');
     editButton.addEventListener('click', () => editUser(dataUser));
     const passButton = document.getElementById('passBnt');
     passButton.addEventListener('click', () => editPass(dataUser.id));
    const deleteButton = document.getElementById('deleteBnt');
     deleteButton.addEventListener('click', () => deleteUser(dataUser.id));
  }).catch(error => console.error('Error getting data:', error));
}

window.addEventListener("DOMContentLoaded", function() {
  const path = window.location.pathname;

  if (path === "/perfil.html") {
      getUser();
  }
});

function editUser(dataUser){
  document.getElementById("dataUser").innerHTML = `
     <div>
                <h1>Editar Usuário</h1>

                <div class="label-float">
                    <input type="email" id="updateEmail" placeholder="" value="${dataUser.email}" required>
                    <label for="email">Email</label>
                </div>

                <div class='label-float'>
                    <input type="text" id="updateNome" placeholder="" value="${dataUser.name}" required>
                    <label for="nome">Nome</label>
                </div>

                <div class="label-float">
                    <input type="text" id="updateData_nascimento" value="${dataUser.birth_date}" required>
                    <label for="data_nascimento">Data de Nascimento</label>
                </div>


                <div class="justify-center">
                    <button type="button" id="saveBtn" >Salvar</button>
                    

                </div>
            </div>
    `
    
    const saveButton = document.getElementById('saveBtn');
    saveButton.addEventListener('click', () => updateUser(dataUser.id));
}

async function updateUser(id) {
  const userInfo = {
    'id': id,
    'name': document.getElementById("updateNome").value,
    'email': document.getElementById("updateEmail").value,
    'birth_date': document.getElementById("updateData_nascimento").value
  }
  fetch(urlBase + '/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo)
  }).then(response => response.json()).then(data => {
    getUser();
  }).catch(error => console.error('Error sending data:', error));


}

async function deleteUser(id) {
  
 const userConfirm =  window.confirm("tem certeza q deseja deletar sua conta?");
 if(userConfirm){
  fetch(urlBase + '/user/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json()).then(data => {
    alert("sua conta foi deletada com sucesso!")
    window.location.href = "index.html";
  }).catch(error => console.error('Error sending data:', error));
 }
}

async function editPass(id) {
  document.getElementById("dataUser").innerHTML = `
     <div>
                <h1>Alterar Senha</h1>

                <div class="label-float">
                    <input type="password" id="oldPassword" placeholder="" value="" required>
                    <label for="email">Senha Atual</label>
                </div>

                <div class='label-float'>
                    <input type="password" id="newPassword" placeholder="" value="" required>
                    <label for="nome">Nova Senha</label>
                </div>

                <div class="justify-center">
                    <button type="button" id="savePassword" >Salvar</button>
                </div>
            </div>
    `
    const saveButton = document.getElementById('savePassword');
    saveButton.addEventListener('click', () => savePassword(id))
}

async function savePassword(id) {
  const passInfo = {
    'id': id,
    'newPassword': document.getElementById("newPassword").value,
    'oldPassword': document.getElementById("oldPassword").value
  }
  fetch(urlBase + '/user/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(passInfo)
  }).then(response => response.json()).then(data => {
    getUser();
  }).catch(error => console.error('Error sending data:', error));
}