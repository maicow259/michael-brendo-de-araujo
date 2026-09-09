// Função que vai manter o menu em todas as páginas
function carregarMenu() {
    fetch("../docs/menu.html") // Busca o arquivo do menu
        .then(resposta => resposta.text()) // Transforma o arquivo em texto
        .then(htmlDoMenu => {
            // Coloca esse texto dentro da div container
            document.getElementById('menu-container').innerHTML = htmlDoMenu;

            // Descobre o nome do arquivo atual para depois comparar 
            let paginaAtual = window.location.pathname.split("/").pop();

            // Se o site for acessado pela raiz (URL terminando em /), define "sobre.html" como padrão
            if (paginaAtual === "") {
                paginaAtual = "index.html";
            }

            // Seleciona todos os links do menu dentro da estrutura de lista
            const links = document.querySelectorAll('header nav ul li a');

            // Passa por cada link para ver se o arquivo destino coincide com a página atual
            links.forEach(link => {
                if (link.getAttribute('href').includes(paginaAtual)) {
                    link.classList.add('ativo'); // Adiciona a classe de destaque no link ativo
                }
            });

            // --- Lógica menu escuro e claro ---
            const botaoTema = document.getElementById('botao-tema');
            
            // Verifica se a classe 'dark' já está ativa no HTML (vinda do head) para ajustar o ícone certo
            if (document.documentElement.classList.contains('dark')) {
                botaoTema.innerText = '☀️'; // Se já iniciou dark, mostra o sol
            } else {
                botaoTema.innerText = '🌙'; // Se iniciou light, mostra a lua
            }

            // Monitora o clique no botão para alternar o tema em tempo real
            botaoTema.addEventListener('click', () => {
                // Alterna a classe .dark na tag principal HTML
                document.documentElement.classList.toggle('dark');
                
                // Muda o ícone e salva no localStorage dependendo do modo ativo
                if (document.documentElement.classList.contains('dark')) {
                    botaoTema.innerText = '☀️';
                    localStorage.setItem('tema', 'dark'); // Salva a escolha como dark
                } else {
                    botaoTema.innerText = '🌙';
                    localStorage.setItem('tema', 'light'); // Salva a escolha como light
                }
            });
        });
}

// Executa a função assim que a página terminar de carregar por completo
window.onload = carregarMenu;
