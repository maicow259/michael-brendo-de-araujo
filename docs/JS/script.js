// Função que vai manter o menu em todas as páginas
function carregarMenu() {
    fetch("menu.html") // Busca o arquivo do menu
        .then(resposta => resposta.text()) // Transforma o arquivo em texto
        .then(htmlDoMenu => {
            // Coloca esse texto dentro da div container
            document.getElementById('menu-container').innerHTML = htmlDoMenu;

            // Descobre o nome do arquivo atual para depois comparar 
            let paginaAtual = window.location.pathname.split("/").pop();

            // Se o site for acessado pela raiz (URL terminando em /), define "index.html" como padrão
            if (paginaAtual === "") {
                paginaAtual = "index.html";
            }

            // Seleciona todos os links do menu dentro da estrutura de lista
            const links = document.querySelectorAll('header nav a');

            // Passa por cada link para ver se o arquivo destino coincide com a página atual
            links.forEach(link => {
                if (link.getAttribute('href').includes(paginaAtual)) {
                    link.classList.add('ativo'); // Adiciona a classe de destaque no link ativo
                }
            });

            // --- Lógica do menu escuro e claro ---
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
            }); // <-- FECHAMENTO CORRETO DO BOTAOTEMA

            // --- VALIDAÇÃO E SIMULAÇÃO DO FORMULÁRIO DE CONTATO ---
            const formulario = document.getElementById('formulario-contato');
            
            // Só executa o código se o formulário realmente existir na página atual (contato.html)
            if (formulario) {
                formulario.addEventListener('submit', (event) => {
                    // Evita que o navegador recarregue a página
                    event.preventDefault();

                    // Captura os elementos e os valores limpando espaços em branco (.trim())
                    const inputNome = document.getElementById('nome');
                    const inputEmail = document.getElementById('email');
                    const inputMensagem = document.getElementById('mensagem');
                    const feedback = document.getElementById('mensagem-feedback');

                    const nomeValor = inputNome.value.trim();
                    const emailValor = inputEmail.value.trim();
                    const mensagemValor = inputMensagem.value.trim();

                    // Limpa estados de feedback anteriores
                    feedback.className = 'mensagem-feedback'; 
                    feedback.innerText = '';

                    // 1. Validação do Campo Nome
                    if (nomeValor === "") {
                        feedback.innerText = "Por favor, preencha o campo Nome.";
                        feedback.classList.add('visivel', 'erro');
                        inputNome.focus();
                        return; // Para a execução do código aqui
                    }

                    // 2. Validação do Campo E-mail Vazio
                    if (emailValor === "") {
                        feedback.innerText = "Por favor, preencha o campo E-mail.";
                        feedback.classList.add('visivel', 'erro');
                        inputEmail.focus();
                        return;
                    }

                    // 3. Validação do Formato do E-mail (Regex)
                    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!regexEmail.test(emailValor)) {
                        feedback.innerText = "Por favor, insira um e-mail válido (exemplo@dominio.com).";
                        feedback.classList.add('visivel', 'erro');
                        inputEmail.focus();
                        return;
                    }

                    // 4. Validação do Campo Mensagem
                    if (mensagemValor === "") {
                        feedback.innerText = "Por favor, preencha o campo Mensagem.";
                        feedback.classList.add('visivel', 'erro');
                        inputMensagem.focus();
                        return;
                    }

                    // 5. SIMULAÇÃO DE ENVIO BEM-SUCEDIDO (Se passou por todas as travas acima)
                    feedback.innerText = "Mensagem enviada com sucesso! Obrigado pelo contato.";
                    feedback.classList.add('visivel', 'sucesso');

                    // Limpa todos os campos digitados no formulário
                    formulario.reset();
                });
            } // <-- FECHAMENTO CORRETO DO IF(FORMULARIO)

        });
}

// Executa a função assim que a página terminar de carregar por completo
window.onload = carregarMenu;
