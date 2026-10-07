// ================================================================================================================================================
// FUNÇÃO PRINCIPAL: GERENCIAMENTO DO MENU DINÂMICO
// ================================================================================================================================================
function carregarMenu() {
  // Requisição assíncrona para buscar o conteúdo estrutural do cabeçalho
  fetch("menu.html")
    .then((resposta) => resposta.text()) // Converte o arquivo recebido em formato de texto puro
    .then((htmlDoMenu) => {
      // Injeta o HTML renderizado do menu diretamente na div reservada de cada página
      document.getElementById("menu-container").innerHTML = htmlDoMenu;

      // ================================================================================================================================================
      // LOGICA DE DESTAQUE DA PÁGINA ATIVA (MENU)
      // ================================================================================================================================================
      // Descobre o nome exato do arquivo atual que o usuário está navegando (ex: "index.html")
      let paginaAtual = window.location.pathname.split("/").pop();

      // CASO DE BORDA (Edge Case): Se o site for acessado pela raiz (URL terminando em /), define o index como padrão
      if (paginaAtual === "") {
        paginaAtual = "index.html";
      }

      // Seleciona de forma universal todos os links de navegação gerados dentro do cabeçalho
      const links = document.querySelectorAll("header nav a");

      // Passa por cada link verificando se o atributo 'href' coincide com o nome da página atual
      links.forEach((link) => {
        if (link.getAttribute("href").includes(paginaAtual)) {
          link.classList.add("ativo"); // Carimba a classe CSS de destaque no botão da página atual
        }
      });

      // ================================================================================================================================================
      // LÓGICA DE ALTERNAÇÃO DE TEMA (DARK / LIGHT MODE)
      // ================================================================================================================================================
      const botaoTema = document.getElementById("botao-tema");

      // Sincronização do Botão: Verifica se a classe 'dark' já foi inserida no HTML pelo script do Head
      if (document.documentElement.classList.contains("dark")) {
        botaoTema.innerText = "☀️"; // Se a página já iniciou escura, o botão exibe o sol para voltar ao claro
      } else {
        botaoTema.innerText = "🌙"; // Se iniciou clara, o botão exibe a lua para avançar ao escuro
      }

      // Escutador de Evento: Monitora o clique no botão redondo do tema em tempo real
      botaoTema.addEventListener("click", () => {
        // Aplica ou remove a classe .dark diretamente na raiz absoluta do navegador (tag HTML)
        document.documentElement.classList.toggle("dark");

        // Atualiza os estados visuais do ícone e salva a escolha na memória local do navegador (localStorage)
        if (document.documentElement.classList.contains("dark")) {
          botaoTema.innerText = "☀️";
          localStorage.setItem("tema", "dark"); // Mantém o modo escuro mesmo se mudar de página
        } else {
          botaoTema.innerText = "🌙";
          localStorage.setItem("tema", "light"); // Mantém o modo claro mesmo se mudar de página
        }
      });

      // ================================================================================================================================================
      // VALIDAÇÃO E SIMULAÇÃO DO FORMULÁRIO DE CONTATO
      // ================================================================================================================================================
      const formulario = document.getElementById("formulario-contato");

      // Trava de Segurança: Só executa o código de validação se o formulário existir na tela atual (contato.html)
      if (formulario) {
        formulario.addEventListener("submit", (event) => {
          // Impede o comportamento padrão do navegador de atualizar a página ao enviar o formulário
          event.preventDefault();

          // Mapeia os elementos físicos de entrada do usuário na página
          const inputNome = document.getElementById("nome");
          const inputEmail = document.getElementById("email");
          const inputMensagem = document.getElementById("mensagem");
          const feedback = document.getElementById("mensagem-feedback");

          // Captura os valores digitados eliminando qualquer espaço em branco inútil (.trim())
          const nomeValor = inputNome.value.trim();
          const emailValor = inputEmail.value.trim();
          const mensagemValor = inputMensagem.value.trim();

          // Reseta as configurações visuais da div de feedback antes de iniciar uma nova validação
          feedback.className = "mensagem-feedback";
          feedback.innerText = "";

          // Validação do Campo Nome (Verifica se está vazio)
          if (nomeValor === "") {
            feedback.innerText = "Por favor, preencha o campo Nome.";
            feedback.classList.add("visivel", "erro"); // Ativa a exibição em vermelho
            inputNome.focus(); // Coloca o cursor de digitação direto no campo do erro
            return; // Interrompe o envio e impede o código de continuar
          }

          // Validação do Campo E-mail (Verifica se está vazio)
          if (emailValor === "") {
            feedback.innerText = "Por favor, preencha o campo E-mail.";
            feedback.classList.add("visivel", "erro");
            inputEmail.focus();
            return;
          }

          // Validação do Formato do E-mail via Expressão Regular (Regex)
          const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!regexEmail.test(emailValor)) {
            // Testa se o padrão bate com a regra estrutural
            feedback.innerText =
              "Por favor, insira um e-mail válido (exemplo@dominio.com).";
            feedback.classList.add("visivel", "erro");
            inputEmail.focus();
            return;
          }

          // Validação do Campo Mensagem (Verifica se está vazio)
          if (mensagemValor === "") {
            feedback.innerText = "Por favor, preencha o campo Mensagem.";
            feedback.classList.add("visivel", "erro");
            inputMensagem.focus();
            return;
          }

          // Simulação de Envio com Sucesso (Disparado se passou por todas as travas acima)
          feedback.innerText =
            "Mensagem enviada com sucesso! Obrigado pelo contato.";
          feedback.classList.add("visivel", "sucesso"); // Ativa a exibição em verde adaptável

          // Apaga instantaneamente todos os dados preenchidos nos inputs, preparando para o próximo envio
          formulario.reset();
        });
      }
    });
}

// Executa toda a lógica assim que a estrutura do DOM terminar de carregar por completo
window.onload = carregarMenu;
