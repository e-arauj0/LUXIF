(function () {
	var CHAVE = "luxif-tema";
	var raiz = document.documentElement;
	var escolha = "claro";

	try { escolha = localStorage.getItem(CHAVE) || "claro"; } catch (_) {}
	if (escolha !== "claro" && escolha !== "escuro") escolha = "claro"; // ignora valores antigos, como "auto"

	function aplicar() {
		raiz.dataset.tema = escolha;
		document.querySelectorAll(".seletor-tema button").forEach(function (botao) {
			botao.setAttribute("aria-pressed", String(botao.dataset.escolha === escolha));
		});
	}

	function escolher(nova) {
		escolha = nova;
		try { localStorage.setItem(CHAVE, escolha); } catch (_) {}
		aplicar();
	}

	window.temaLuxif = { escolher: escolher };

	aplicar(); // define data-tema antes da renderização (sem piscar)

	document.addEventListener("DOMContentLoaded", function () {
		document.querySelectorAll(".seletor-tema button").forEach(function (botao) {
			botao.addEventListener("click", function () {
				escolher(botao.dataset.escolha);
			});
		});
		aplicar(); // agora os botões existem: marca o aria-pressed certo
	});
})();