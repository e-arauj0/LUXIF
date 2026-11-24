
const luxif = {
    estado: "desconectado",
    mensagem: "Desconectado.",
    ultimaLeitura: null,

    // Formata valores numéricos para o padrão brasileiro
    formatarLux(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            maximumFractionDigits: 2
        });
    },

    aoMudarEstado() {},
    aoReceberLeitura() {},
    aoReceberMensagem() {}
};

(() => {
    const ENDERECO_WS = "wss://rk322x-box.tail96f38b.ts.net";

    let socket = null;
    let temporizadorReconexao = null;
    let modoAtual = null;
    let simulacaoAtiva = false;
    let temporizadorSimulacao = null;

    // ========================================
    // ESTADO DA CONEXAO
    // ========================================

    function mudarEstado(estado, mensagem) {
        luxif.estado = estado;
        luxif.mensagem = mensagem;

        luxif.aoMudarEstado(estado, mensagem);
    }

    // ========================================
    // RECEBIMENTO DAS LEITURAS
    // ========================================

    function receber(dados) {
        if (
            !dados ||
            typeof dados.lux !== "number" ||
            typeof dados.percentage !== "number"
        ) {
            return;
        }

        luxif.ultimaLeitura = dados;

        if (
            window.temaLuxif &&
            typeof window.temaLuxif.informarLux === "function"
        ) {
            window.temaLuxif.informarLux(dados.lux);
        }

        luxif.aoReceberLeitura(dados);
    }

    // ========================================
    // CONEXAO WEBSOCKET
    // ========================================

    function conectarWebSocket(endereco) {
        clearTimeout(temporizadorReconexao);

        if (socket) {
            socket.onclose = null;
            socket.close();
            socket = null;
        }

        mudarEstado("conectando", "Conectando ao servidor...");

        try {
            socket = new WebSocket(endereco);

            socket.onopen = () => {
                mudarEstado("conectado", "Conectado ao servidor.");

                luxif.aoReceberMensagem(
                    "Conexão estabelecida."
                );
            };

            socket.onmessage = (evento) => {
                try {
                    const dados = JSON.parse(evento.data);
                    receber(dados);

                } catch (erro) {
                    luxif.aoReceberMensagem(
                        "Mensagem recebida não é um JSON válido."
                    );
                }
            };

            socket.onerror = () => {
                mudarEstado(
                    "erro",
                    "Erro na conexão WebSocket."
                );
            };

            socket.onclose = () => {
                if (modoAtual === "internet" && !simulacaoAtiva) {
                    mudarEstado(
                        "desconectado",
                        "Conexão perdida. Tentando novamente..."
                    );

                    temporizadorReconexao = setTimeout(() => {
                        conectarWebSocket(ENDERECO_WS);
                    }, 5000);

                } else {
                    mudarEstado(
                        "desconectado",
                        "Desconectado."
                    );
                }
            };

        } catch (erro) {
            mudarEstado(
                "erro",
                "Não foi possível criar a conexão WebSocket."
            );

            console.error("Erro WebSocket:", erro);
        }
    }

    // ========================================
    // CONEXAO PELA INTERNET
    // ========================================

    luxif.conectarInternet = function () {
        simulacaoAtiva = false;
        modoAtual = "internet";

        localStorage.setItem("luxif_modo", "internet");
        localStorage.setItem("luxif_endereco", ENDERECO_WS);

        conectarWebSocket(ENDERECO_WS);
    };

    // ========================================
    // CONEXAO LOCAL
    // ========================================

    luxif.conectarLocal = function (endereco) {
        simulacaoAtiva = false;
        modoAtual = "local";

        let url = endereco.trim();

        if (!/^wss?:\/\//i.test(url)) {
            url = "ws://" + url;
        }

        localStorage.setItem("luxif_modo", "local");
        localStorage.setItem("luxif_endereco", url);

        conectarWebSocket(url);

        return url;
    };

    // ========================================
    // DESCONECTAR
    // ========================================

    luxif.desconectar = function () {
        modoAtual = null;
        simulacaoAtiva = false;

        clearTimeout(temporizadorReconexao);
        clearInterval(temporizadorSimulacao);

        if (socket) {
            socket.onclose = null;
            socket.close();
            socket = null;
        }

        mudarEstado("desconectado", "Desconectado.");
    };

    // ========================================
    // SIMULACAO
    // ========================================

    luxif.simular = function () {
        luxif.desconectar();

        simulacaoAtiva = true;

        mudarEstado(
            "conectado",
            "Modo de simulação ativo."
        );

        temporizadorSimulacao = setInterval(() => {
            const lux = Math.round(Math.random() * 20000);

            receber({
                lux: lux,
                resistance: null,
                percentage: Math.min(
                    100,
                    Math.round(lux / 200)
                ),
                simulated: true
            });

        }, 1000);
    };

    // ========================================
    // ENVIO DE MENSAGENS
    // ========================================

    luxif.enviar = function (mensagem) {
        if (
            socket &&
            socket.readyState === WebSocket.OPEN
        ) {
            socket.send(mensagem);
            return true;
        }

        luxif.aoReceberMensagem(
            "Não há conexão ativa para enviar mensagens."
        );

        return false;
    };

    // ========================================
    // PREFERENCIAS SALVAS
    // ========================================

    luxif.enderecoSalvo = function () {
        return localStorage.getItem("luxif_endereco") || ENDERECO_WS;
    };

    luxif.modo = function () {
        return localStorage.getItem("luxif_modo") || "internet";
    };

})();
