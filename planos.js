(() => {
  const formulario = document.querySelector("#form-cupom");
  if (!formulario) return;

  const entrada = formulario.querySelector("#codigo-cupom");
  const status = formulario.querySelector("#status-cupom");
  const botao = formulario.querySelector("button[type='submit']");
  const chaveSessao = "charm-fit-cupom-aplicado";
  const planos = [...document.querySelectorAll(".preco-plano")].map(plano => ({
    cartao: plano,
    valorEmCentavos: Number(plano.dataset.valorCentavos),
    valor: plano.querySelector("[data-preco-atual]"),
    original: plano.querySelector("[data-preco-original]"),
    equivalente: plano.querySelector("[data-preco-equivalente]")
  }));
  const formatarValor = centavos => new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(centavos / 100);

  const aplicarDesconto = () => {
    planos.forEach(plano => {
      const valorComDesconto = Math.round(plano.valorEmCentavos * .9);
      plano.valor.textContent = formatarValor(valorComDesconto);
      plano.original.textContent = `Valor original: R$ ${formatarValor(plano.valorEmCentavos)}`;
      plano.original.hidden = false;
      if (plano.equivalente) plano.equivalente.textContent = formatarValor(Math.round(valorComDesconto / 12));
    });
    entrada.disabled = true;
    botao.disabled = true;
  };

  try {
    if (sessionStorage.getItem(chaveSessao) === "CHARM10") {
      aplicarDesconto();
      entrada.value = "CHARM10";
      status.textContent = "Cupom CHARM10 já aplicado nesta sessão: 10% OFF.";
      status.dataset.tipo = "sucesso";
    }
  } catch {
    // O cupom continua funcionando nesta página sem acesso ao armazenamento da sessão.
  }

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    const codigo = entrada.value.trim().toUpperCase();
    if (codigo !== "CHARM10") {
      status.textContent = "Cupom inválido ou expirado. Verifique o código e tente novamente.";
      status.dataset.tipo = "erro";
      return;
    }

    try {
      if (sessionStorage.getItem(chaveSessao) === "CHARM10") {
        status.textContent = "Este cupom já foi aplicado nesta sessão.";
        status.dataset.tipo = "erro";
        entrada.disabled = true;
        botao.disabled = true;
        return;
      }
      sessionStorage.setItem(chaveSessao, "CHARM10");
    } catch {
      // A aplicação única permanece garantida enquanto a página estiver aberta.
    }

    aplicarDesconto();
    status.textContent = "Cupom CHARM10 aplicado com sucesso: 10% OFF nos planos.";
    status.dataset.tipo = "sucesso";
  });
})();