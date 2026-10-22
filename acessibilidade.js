(() => {
  const chavePreferencias = "charm-fit-acessibilidade";
  const padrao = { escalaFonte: 1, altoContraste: false, escalaCinza: false, reduzirMovimento: false, cursorMaior: false, fonteSimples: false };
  let preferencias = { ...padrao };

  try {
    preferencias = { ...padrao, ...JSON.parse(localStorage.getItem(chavePreferencias) || "{}") };
  } catch {
    preferencias = { ...padrao };
  }

  const botao = document.createElement("button");
  botao.className = "acessibilidade-abrir";
  botao.type = "button";
  botao.setAttribute("aria-expanded", "false");
  botao.setAttribute("aria-controls", "painel-acessibilidade");
  botao.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4" r="2.2"/><path d="M19.2 8.1a1 1 0 0 0-.4-1.9H5.2a1 1 0 0 0-.4 1.9l5.1 1.7-1.2 3.7-3.5 4.1a1 1 0 0 0 1.5 1.3l3.1-3.5 1.1-3.1 1.1 3.1 3.1 3.5a1 1 0 0 0 1.5-1.3l-3.5-4.1-1.2-3.7z"/></svg><span>Acessibilidade</span>`;

  const painel = document.createElement("section");
  painel.className = "acessibilidade-painel";
  painel.id = "painel-acessibilidade";
  painel.setAttribute("aria-labelledby", "titulo-painel-acessibilidade");
  painel.hidden = true;
  painel.innerHTML = `
    <div class="acessibilidade-painel-cabecalho"><h2 id="titulo-painel-acessibilidade">Acessibilidade</h2><button class="acessibilidade-fechar" type="button" aria-label="Fechar painel de acessibilidade">×</button></div>
    <div class="acessibilidade-grupo"><h3>Leitura de texto</h3><div class="acessibilidade-acoes"><button type="button" data-leitura="iniciar">Ler página</button><button type="button" data-leitura="pausar" disabled>Pausar</button><button type="button" data-leitura="continuar" disabled>Continuar</button><button type="button" data-leitura="parar" disabled>Parar</button></div><p class="acessibilidade-status" data-status-leitura aria-live="polite"></p></div>
    <div class="acessibilidade-grupo"><h3>Tamanho do texto</h3><div class="acessibilidade-acoes"><button type="button" data-fonte="diminuir" aria-label="Diminuir tamanho do texto">A−</button><button type="button" data-fonte="aumentar" aria-label="Aumentar tamanho do texto">A+</button><button type="button" data-fonte="restaurar">Tamanho original</button></div></div>
    <div class="acessibilidade-grupo"><h3>Recursos de leitura</h3><div class="acessibilidade-acoes"><button type="button" data-preferencia="altoContraste" aria-pressed="false">Alto contraste</button><button type="button" data-preferencia="escalaCinza" aria-pressed="false">Escala de cinza</button><button type="button" data-preferencia="fonteSimples" aria-pressed="false">Fonte acessível</button></div></div>
    <div class="acessibilidade-grupo"><h3>Conforto e navegação</h3><div class="acessibilidade-acoes"><button type="button" data-preferencia="reduzirMovimento" aria-pressed="false">Reduzir animações</button><button type="button" data-preferencia="cursorMaior" aria-pressed="false">Cursor maior</button></div></div>
  `;

  const controles = document.createElement("div");
  controles.className = "acessibilidade-controles";
  controles.append(painel, botao);
  document.body.prepend(controles);

  const pular = document.createElement("a");
  pular.className = "acessibilidade-pular";
  pular.href = "#conteudo-principal";
  pular.textContent = "Pular para o conteúdo principal";
  document.body.prepend(pular);
  const principal = document.querySelector("main");
  if (principal) {
    principal.id = principal.id || "conteudo-principal";
    principal.tabIndex = -1;
    pular.href = `#${principal.id}`;
  }

  const atualizarPreferencias = () => {
    const raiz = document.documentElement;
    raiz.style.fontSize = `${preferencias.escalaFonte * 100}%`;
    raiz.classList.toggle("acessibilidade-alto-contraste", preferencias.altoContraste);
    raiz.classList.toggle("acessibilidade-escala-cinza", preferencias.escalaCinza);
    raiz.classList.toggle("acessibilidade-reduzir-movimento", preferencias.reduzirMovimento);
    raiz.classList.toggle("acessibilidade-cursor-maior", preferencias.cursorMaior);
    raiz.classList.toggle("acessibilidade-fonte-simples", preferencias.fonteSimples);
    painel.querySelectorAll("[data-preferencia]").forEach(controle => {
      controle.setAttribute("aria-pressed", String(preferencias[controle.dataset.preferencia]));
    });
    try {
      localStorage.setItem(chavePreferencias, JSON.stringify(preferencias));
    } catch {
      // As configurações continuam funcionando nesta página sem armazenamento disponível.
    }
  };

  const fecharPainel = () => {
    painel.hidden = true;
    botao.setAttribute("aria-expanded", "false");
    botao.focus();
  };

  botao.addEventListener("click", () => {
    const aberto = botao.getAttribute("aria-expanded") === "true";
    botao.setAttribute("aria-expanded", String(!aberto));
    painel.hidden = aberto;
    if (!aberto) painel.querySelector("button:not(:disabled)").focus();
  });
  painel.querySelector(".acessibilidade-fechar").addEventListener("click", fecharPainel);
  document.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && !painel.hidden) fecharPainel();
  });
  document.addEventListener("pointerdown", evento => {
    if (!painel.hidden && !controles.contains(evento.target)) fecharPainel();
  });

  painel.querySelectorAll("[data-preferencia]").forEach(controle => {
    controle.addEventListener("click", () => {
      const chave = controle.dataset.preferencia;
      preferencias[chave] = !preferencias[chave];
      atualizarPreferencias();
    });
  });
  painel.querySelectorAll("[data-fonte]").forEach(controle => {
    controle.addEventListener("click", () => {
      preferencias.escalaFonte = Math.min(1.5, Math.max(.9, preferencias.escalaFonte + (controle.dataset.fonte === "aumentar" ? .1 : -.1)));
      preferencias.escalaFonte = Math.round(preferencias.escalaFonte * 10) / 10;
      atualizarPreferencias();
    });
  });
  painel.querySelector('[data-fonte="restaurar"]').addEventListener("click", () => {
    preferencias.escalaFonte = 1;
    atualizarPreferencias();
  });

  const statusLeitura = painel.querySelector("[data-status-leitura]");
  const controleLeitura = acao => painel.querySelector(`[data-leitura="${acao}"]`);
  let trechosLeitura = [];
  let indiceLeitura = 0;
  let lendo = false;
  let leituraPausada = false;
  let geracaoLeitura = 0;
  const atualizarBotoesLeitura = () => {
    const disponivel = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    controleLeitura("iniciar").disabled = !disponivel || lendo;
    controleLeitura("pausar").disabled = !lendo || leituraPausada;
    controleLeitura("continuar").disabled = !lendo || !leituraPausada;
    controleLeitura("parar").disabled = !lendo;
    return disponivel;
  };
  const falarProximoTrecho = () => {
    if (indiceLeitura >= trechosLeitura.length) {
      lendo = false;
      leituraPausada = false;
      statusLeitura.textContent = "Leitura concluída.";
      atualizarBotoesLeitura();
      return;
    }
    const fala = new SpeechSynthesisUtterance(trechosLeitura[indiceLeitura]);
    fala.lang = "pt-BR";
    const geracaoAtual = geracaoLeitura;
    fala.onend = () => {
      if (geracaoAtual !== geracaoLeitura || !lendo) return;
      indiceLeitura += 1;
      falarProximoTrecho();
    };
    fala.onerror = () => {
      if (geracaoAtual !== geracaoLeitura || !lendo) return;
      lendo = false;
      leituraPausada = false;
      statusLeitura.textContent = "Não foi possível concluir a leitura.";
      atualizarBotoesLeitura();
    };
    speechSynthesis.speak(fala);
  };
  atualizarBotoesLeitura();
  painel.querySelector('[data-leitura="iniciar"]').addEventListener("click", () => {
    if (!atualizarBotoesLeitura()) {
      statusLeitura.textContent = "A leitura em voz alta não está disponível neste navegador.";
      return;
    }
    const conteudo = document.querySelector("main")?.innerText || document.body.innerText;
    trechosLeitura = conteudo.split(/\n+/).map(trecho => trecho.trim()).filter(Boolean).flatMap(trecho => {
      const partes = [];
      while (trecho.length > 1800) {
        let corte = trecho.lastIndexOf(" ", 1800);
        if (corte < 900) corte = 1800;
        partes.push(trecho.slice(0, corte));
        trecho = trecho.slice(corte).trim();
      }
      if (trecho) partes.push(trecho);
      return partes;
    });
    if (!trechosLeitura.length) return;
    geracaoLeitura += 1;
    speechSynthesis.cancel();
    indiceLeitura = 0;
    lendo = true;
    leituraPausada = false;
    statusLeitura.textContent = "Lendo o conteúdo da página.";
    atualizarBotoesLeitura();
    falarProximoTrecho();
  });
  controleLeitura("pausar").addEventListener("click", () => {
    speechSynthesis.pause();
    leituraPausada = true;
    atualizarBotoesLeitura();
    statusLeitura.textContent = "Leitura pausada.";
  });
  controleLeitura("continuar").addEventListener("click", () => {
    speechSynthesis.resume();
    leituraPausada = false;
    atualizarBotoesLeitura();
    statusLeitura.textContent = "Leitura em andamento.";
  });
  controleLeitura("parar").addEventListener("click", () => {
    geracaoLeitura += 1;
    speechSynthesis.cancel();
    lendo = false;
    leituraPausada = false;
    statusLeitura.textContent = "Leitura parada.";
    atualizarBotoesLeitura();
  });

  atualizarPreferencias();
})();