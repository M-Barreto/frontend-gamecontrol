document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

  if (path === "/paginaJogo.html") {
      getGame();
  }else if(path === "/paginaInicial.html"){
    getGames();
  }
});

async function getGames() {
    const listaJogos = document.getElementById('lista-jogos');

    // Função para buscar jogos da API e exibir no front-end
        try {
            const response = await fetch('http://localhost:4001/games',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
            ); // Altere a URL conforme necessário
            const jogos = await response.json();
            
            jogos.forEach(jogo => {
                const jogoLi = document.createElement('li');
                jogoLi.className = 'jogo';

                jogoLi.innerHTML = `
                    <li>
                    <a 
                    target="_self"
                    href="./paginaJogo.html?id=${jogo.id}">
                        <img src="${jogo.imagem}" alt="imagem do jogo ${jogo.nome}">  
                    </a>
                </li>
                `;

                listaJogos.appendChild(jogoLi);
            });
        } catch (error) {
            console.error('Erro ao buscar jogos:', error);
        }
}

async function getGame() { 
    const urlParams = new URLSearchParams(window.location.search); 
    const id = urlParams.get('id'); 
    console.log(id)
    try{
        const response = await fetch('http://localhost:4001/game/' + id,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
            ); // Altere a URL conforme necessário
            const jogos = await response.json();
            document.getElementById('info').innerHTML = `
            <section>

            <div class="card" >
            <div>
            <img class="poster" src="${jogos[0].imagem}" alt="imagem do jogos ${jogos[0].nome}">
            </div>

            <div class="sinopse">
            <h1>${jogos[0].nome}</h1>
            <p><strong>Sinopse: </strong> ${jogos[0].sinopse}</p>
            </div>
            </div>

            </section>

        <section id="informacoes">
        <div class="informacoes">
            <p>Lançamento: ${jogos[0].lancamento}</p>
            <p>Gênero: ${jogos[0].genero}</p>
            <p>IMDb: ${jogos[0].nota}</p>
        </div>

        <div class="botoes">
            <!-- <input type="button" value="já jogado">
            <input type="button" value="favorito">
            <input type="button" value="quero jogar">
            <input type="button" value="excluir da lista"> -->
        </div>
        
        </section>
            `
    }catch(erro){
        document.getElementById('info').innerHTML = `
        <p>deu errado</p>
        `
        console.log(erro);
    }
 }