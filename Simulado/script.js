let loginBtn = document.getElementById("btn");
let modal = document.getElementById("modal");
let fecharModal = document.getElementById("fechar");
let cancelarModal = document.getElementById("cancelar");
let entrarBtn = document.getElementById("entrar");
let emailInput = document.getElementById("email");
let senhaInput = document.getElementById("senha");
let erroLogin = document.getElementById("erro-login");

let usuarioLogado = false;

// Abrir e fechar o modal de login
loginBtn.addEventListener("click", function() {
    if (usuarioLogado) {
        usuarioLogado = false;
        loginBtn.textContent = "Login";
        loginBtn.className = "login";
        document.getElementById("perfil").style.display = "none";
        document.getElementById("btn-registros").disabled = true;
        document.getElementById("btn-registros").classList.remove("ativo");
    } else {
        modal.style.display = "flex";
        erroLogin.textContent = "";
        emailInput.value = "";
        senhaInput.value = "";
        emailInput.classList.remove("invalido");
        senhaInput.classList.remove("invalido");
    }
});

fecharModal.addEventListener("click", function() {
    modal.style.display = "none";
});

cancelarModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Botão Entrar do Modal
entrarBtn.addEventListener("click", function() {
    let emailVal = emailInput.value.trim();
    let senhaVal = senhaInput.value.trim();

    emailInput.classList.remove("invalido");
    senhaInput.classList.remove("invalido");
    erroLogin.textContent = "";

    if (emailVal === "" || senhaVal === "") {
        if (emailVal === "") emailInput.classList.add("invalido");
        if (senhaVal === "") senhaInput.classList.add("invalido");
        erroLogin.textContent = "email ou senha obrigatório";
        return;
    }

    if (emailVal === "mateus.inovatech@gmail.com" && senhaVal === "123") {
        usuarioLogado = true;
        modal.style.display = "none";
        
        loginBtn.textContent = "Logout";
        loginBtn.className = "logout";
        
        document.getElementById("perfil").style.display = "block";
        document.getElementById("perfil-nome").textContent = "Mateus Chaves";
        document.getElementById("btn-registros").disabled = false;
    } else {
        emailInput.classList.add("invalido");
        senhaInput.classList.add("invalido");
        erroLogin.textContent = "email ou senha incorreta";
    }
    if(emailVal === "gooby" && senhaVal === "123"){
        alert("Quem é gooby?")
    }
});

// Trava para visitantes
function verificarVisitante() {
    if (!usuarioLogado) {
        modal.style.display = "flex";
        return false;
    }
    return true;
}


let botoesLike = document.querySelectorAll(".btn-like");

for (let i = 0; i < botoesLike.length; i++) {
    let botao = botoesLike[i];
    let curtido = false;

    botao.addEventListener("click", function() {
        if (!verificarVisitante()) return;

        let spanCurtidas = botao.querySelector(".curtidas");
        let numero = parseInt(spanCurtidas.textContent);

        if (curtido === false) {
            numero = numero + 1;
            botao.classList.add("ativo");
            curtido = true;
        } else {
            numero = numero - 1;
            botao.classList.remove("ativo");
            curtido = false;
        }
        spanCurtidas.textContent = numero;
    });
}

// abrir comentario
let botoesAcao = document.querySelectorAll(".acoes button");

for (let i = 0; i < botoesAcao.length; i++) {
    if (i % 2 !== 0) { // Pega apenas os botões de chat
        botoesAcao[i].addEventListener("click", function() {
            if (!verificarVisitante()) return;

            let cardAtual = botoesAcao[i].closest(".card");
            let areaComentario = cardAtual.querySelector(".comentarios");

            if (areaComentario.style.display === "block") {
                areaComentario.style.display = "none";
            } else {
                areaComentario.style.display = "block";
            }
        });
    }
}

// enviar comentário
let botoesEnviar = document.querySelectorAll(".comentarios button");

for (let i = 0; i < botoesEnviar.length; i++) {
    let btnEnviar = botoesEnviar[i];

    btnEnviar.addEventListener("click", function() {
        if (!verificarVisitante()) return;

        let blocoComentarios = btnEnviar.closest(".comentarios");
        let campoTexto = blocoComentarios.querySelector("input");
        let lista = blocoComentarios.querySelector(".lista");
        let spanErro = blocoComentarios.querySelector(".erro");
        let spanQtdComent = btnEnviar.closest(".card").querySelector(".qtd-coment");

        let textoDigitado = campoTexto.value.trim();
        spanErro.textContent = "";

        if (textoDigitado.length <= 2) {
            spanErro.textContent = "não é possível enviar um comentário vazio";
            return;
        }

        let novoParagrafo = document.createElement("p");
        novoParagrafo.textContent = textoDigitado;
        lista.appendChild(novoParagrafo);

        let qtdAtual = parseInt(spanQtdComent.textContent);
        spanQtdComent.textContent = qtdAtual + 1;

        campoTexto.value = "";
    });
}

// navegação do btn de registros
let btnRegistros = document.getElementById("btn-registros");
let feedArea = document.getElementById("feed-area");
let formArea = document.getElementById("form-area");

btnRegistros.addEventListener("click", function() {
    if (!verificarVisitante()) return;

    btnRegistros.classList.add("ativo");
    feedArea.style.display = "none";
    formArea.style.display = "block";
});

// cadastrando um registro
let btnCriar = document.getElementById("btn-criar");

btnCriar.addEventListener("click", function() {
    let inputTipo = document.getElementById("tipo");
    let inputDistancia = document.getElementById("distancia");
    let inputTempo = document.getElementById("tempo");

    let tipoValor = inputTipo.value.trim().toLowerCase();
    let distanciaMetros = inputDistancia.value.trim();
    let tempoMinutos = inputTempo.value.trim();

    if (tipoValor === "" || distanciaMetros === "" || tempoMinutos === "") {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    // Conversões simples
    let km = (parseFloat(distanciaMetros) / 1000).toFixed(2);
    let horas = (parseFloat(tempoMinutos) / 60).toFixed(2);
    let eficiencia = (km / horas).toFixed(2);

    // Data e hora simples sem frescura
    let agora = new Date();
    let hora = agora.getHours();
    let minuto = agora.getMinutes();
    let dia = agora.getDate();
    let mes = agora.getMonth() + 1;
    let dataFormatada = hora + ":" + minuto + " - " + dia + "/" + mes;

    let feed = document.getElementById("feed");
    let conteudoAntigo = feed.innerHTML;
//seção onde o DOM criará um card por cima dos outros elementos html, com as informações do formulário preenchido pelo usuário
    let novoCardHtml = `
        <article class="card">
            <h3 class="titulo">Apontamento de ${tipoValor}</h3>
            <div class="operador">
                <img src="assets/placeholder.jpg" alt="Foto do operador">
                <span class="nome">Mateus Oliveira</span>
            </div>
            <div class="dados">
                <span>Tipo: <strong class="tipo">${tipoValor}</strong></span>
                <span>Distância: <strong class="km">${km}</strong> km</span>
                <span>Tempo: <strong class="horas">${horas}</strong> h</span>
                <span>Eficiência: <strong class="eficiencia">${eficiencia}</strong> km/h</span>
                <span class="data">${dataFormatada}</span>
            </div>
            <div class="acoes">
                <button class="btn-like"><img src="assets/like.svg" alt="Apoiar"><span class="curtidas">0</span></button>
                <button><img src="assets/chat.svg" alt="Comentar"><span class="qtd-coment">0</span></button>
            </div>
            <div class="comentarios" style="display: none;">
                <div class="lista"></div>
                <input type="text" placeholder="Escrever um comentário...">
                <button><img src="assets/send.svg" alt="Enviar"></button>
                <span class="erro"></span>
            </div>
        </article>
    `;

    feed.innerHTML = novoCardHtml + conteudoAntigo;

    inputTipo.value = "";
    inputDistancia.value = "";
    inputTempo.value = "";
    formArea.style.display = "none";
    feedArea.style.display = "block";
    btnRegistros.classList.remove("ativo");

    let totalGeral = document.getElementById("total");
    totalGeral.textContent = parseInt(totalGeral.textContent) + 1;

    let perfilTotal = document.getElementById("perfil-total");
    perfilTotal.textContent = parseInt(perfilTotal.textContent) + 1;
});

let btnManutencao = document.getElementById("f-manutencao");
let btnOperacao = document.getElementById("f-operacao");
let btnInspecao = document.getElementById("f-inspecao");

function filtrarCards(tipoDesejado, botaoClicado) {
    if (!verificarVisitante()) return;

    // Remove a classe "ativo" de todos e coloca só no clicado
    btnManutencao.classList.remove("ativo");
    btnOperacao.classList.remove("ativo");
    btnInspecao.classList.remove("ativo");
    botaoClicado.classList.add("ativo");

    // Volta para o feed caso estivesse na tela de cadastro
    feedArea.style.display = "block";
    formArea.style.display = "none";
    btnRegistros.classList.remove("ativo");

    // Pega todos os cards do feed atual
    let cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let spanTipo = card.querySelector(".tipo");
        
        if (spanTipo) {
            let tipoDoCard = spanTipo.textContent.trim().toLowerCase();

            // Se o tipo do card bater com o filtro, mostra. Se não, esconde.
            if (tipoDoCard === tipoDesejado) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    }
}

btnManutencao.addEventListener("click", function() {
    filtrarCards("manutenção", btnManutencao);
});

btnOperacao.addEventListener("click", function() {
    filtrarCards("operação", btnOperacao);
});

btnInspecao.addEventListener("click", function() {
    filtrarCards("inspeção", btnInspecao);
});