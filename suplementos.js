const STORAGE_KEY = "charm-fit-suplementos";
const STORAGE_VERSION_KEY = `${STORAGE_KEY}-versao`;
const CART_KEY = "charm-fit-carrinho";
const categoriasPadrao = ["Todas", "Roupas femininas", "Suplementos", "Proteínas", "Creatina", "Vitaminas", "Minerais", "Pré-treino", "Aminoácidos", "Saúde e bem-estar", "Acessórios", "Outros"];
const categoriasSuplementos = ["Proteínas", "Creatina", "Vitaminas", "Minerais", "Pré-treino", "Aminoácidos", "Saúde e bem-estar", "Outros"];
const categoriasOcultasNaVitrine = ["Proteínas", "Creatina", "Vitaminas", "Minerais", "Pré-treino", "Aminoácidos", "Outros"];

function criarProduto(id, nome, categoria, imagem, preco, quantidade, descricao, extras = {}) {
  return {
    id, nome, categoria, imagem, preco, quantidade, descricao,
    caracteristicas: descricao,
    porcao: "Consulte o rótulo",
    recomendacao: "Consulte o rótulo e um profissional habilitado.",
    horario: "Consulte o rótulo.",
    ingredientes: "Consulte a embalagem do fabricante.",
    tabela: "Consulte as informações oficiais na embalagem.",
    advertencias: "Este produto não substitui uma alimentação equilibrada.",
    porcoes: "Consulte o rótulo",
    fabricante: "Produto demonstrativo",
    estoque: "Informação não disponível",
    linkCompra: "",
    tamanhos: "",
    cores: "",
    destaque: "",
    precoOriginal: "",
    ...extras
  };
}

const produtosIniciais = [
  criarProduto("whey-charm-fit", "Whey Protein Concentrado", "Proteínas", "imagens/Протеин Nl.jpg", "129,90", "900 g", "Proteína em pó para complementar a ingestão diária de proteínas.", {
    caracteristicas: "Consulte o rótulo para conferir a composição e os valores por porção.",
    porcao: "30 g",
    recomendacao: "Usar conforme orientação do fabricante e de profissional habilitado.",
    ingredientes: "Consulte a embalagem do fabricante.",
    tabela: "Porção: 30 g\nProteínas: consulte o rótulo\nCarboidratos: consulte o rótulo\nGorduras totais: consulte o rótulo",
    advertencias: "Este produto não substitui uma alimentação equilibrada. Consulte médico ou nutricionista.",
    porcoes: "30 porções",
    fabricante: "Charm Fit (produto demonstrativo)",
    estoque: "Informação não disponível"
  }),
  criarProduto("creatina-monohidratada", "Creatina Monohidratada", "Creatina", "imagens/creatinapure.jpg", "89,90", "300 g", "Creatina monohidratada para complementar a rotina de quem treina.", {
    caracteristicas: "Produto demonstrativo. Verifique pureza, lote e informações oficiais na embalagem.",
    recomendacao: "Siga a recomendação do fabricante ou de um profissional de saúde.",
    ingredientes: "Creatina monohidratada.",
    tabela: "Porção: consulte o rótulo\nCreatina: consulte o rótulo",
    advertencias: "Não use durante gestação, lactação ou em caso de condição de saúde sem orientação profissional.",
    fabricante: "Charm Fit (produto demonstrativo)",
    estoque: "Informação não disponível"
  }),
  criarProduto("legging-vinho", "Legging Essential Vinho", "Roupas femininas", "imagens/leggin vinho.jpg", "179,90", "1 peça", "Legging de cintura alta para acompanhar seus treinos e a rotina.", { tamanhos: "PP, P, M, G, GG", cores: "Vinho, Preto", destaque: "Lançamento", precoOriginal: "219,90" }),
  criarProduto("top-sustentacao", "Top Alta Sustentação", "Roupas femininas", "imagens/topdeacademia.jpg", "119,90", "1 peça", "Top esportivo confortável com sustentação para diferentes atividades.", { tamanhos: "PP, P, M, G, GG", cores: "Rosa, Preto", destaque: "Novidade" }),
  criarProduto("shorts-fitness", "Shorts Move", "Roupas femininas", "imagens/Dfyne shorts 🫶🏻.jpg", "99,90", "1 peça", "Shorts fitness versátil para treinos e movimento ao ar livre.", { tamanhos: "PP, P, M, G, GG", cores: "Preto, Bege" }),
  criarProduto("conjunto-fitness", "Conjunto", "Roupas femininas", "imagens/Pilates Princess.jpg", "249,90", "2 peças", "Conjunto fitness coordenado com top e legging.", { tamanhos: "PP, P, M, G, GG", cores: "Vinho, Preto", destaque: "Mais vendido", precoOriginal: "289,90" }),
  criarProduto("camiseta-dry", "Camiseta Dry Fit", "Roupas femininas", "imagens/camiseta dry fit.jpg", "79,90", "1 peça", "Camiseta leve para acompanhar sua rotina de treinos.", { tamanhos: "P, M, G, GG", cores: "Rosa, Preto" }),
  criarProduto("pre-treino-frutas", "Creatina", "Pré-treino", "imagens/Creatine.jpg", "99,90", "300 g", "Suplemento demonstrativo. Consulte a embalagem para composição e orientações.", { destaque: "Novidade", precoOriginal: "119,90" }),
  criarProduto("vitaminas-diarias", "Multivitamínico diário", "Vitaminas", "imagens/Gummy.jpg", "69,90", "60 cápsulas", "Suplemento demonstrativo com informações a conferir no rótulo.", {}),
  criarProduto("bcaa-essencial", "Aminoácidos BCAA", "Aminoácidos", "imagens/bcaa.jpg", "74,90", "120 cápsulas", "Suplemento demonstrativo. Consulte o rótulo para composição e orientações de uso.", {}),
  criarProduto("magnesio-mineral", "Magnésio", "Minerais", "imagens/download.jpg", "54,90", "60 cápsulas", "Suplemento demonstrativo. Confira a composição e as informações oficiais na embalagem.", {}),
  criarProduto("garrafa-termica", "Garrafa térmica Move", "Acessórios", "imagens/garrafa.jpg", "59,90", "700 ml", "Garrafa reutilizável para levar sua bebida à academia.", { cores: "Rosa, Bege, Preto" }),
  criarProduto("luvas-treino", "Luvas para treino", "Acessórios", "imagens/garotas.jpg", "49,90", "1 par", "Luvas para auxiliar na pegada durante os treinos.", { tamanhos: "P, M, G", cores: "Preto, Rosa" }),
  criarProduto("faixa-elastica", "Faixas elásticas — kit", "Acessórios", "imagens/Booty Bands.jpg", "39,90", "3 unidades", "Kit de faixas elásticas para diferentes exercícios e alongamentos.", { cores: "Rosa, Lilás" }),
  criarProduto("bolsa-esportiva", "Bolsa esportiva Daily", "Acessórios", "imagens/Life Gym Studio.jpg", "139,90", "1 unidade", "Bolsa espaçosa para organizar seus itens de treino.", { cores: "Vinho, Preto" }),
  criarProduto("tapete-treino", "Tapete de treino", "Acessórios", "imagens/૮꒰ ྀི◜๑◝ ꒱ა ᶻ 𝗓 𐰁.jpg", "89,90", "1 unidade", "Tapete para exercícios no solo, alongamentos e práticas em casa.", { cores: "Rosa, Vinho" }),
  criarProduto("straps-essenciais", "Straps de levantamento", "Acessórios", "imagens/skddk.jpg", "34,90", "1 par", "Acessório de apoio para exercícios de levantamento.", { cores: "Preto, Rosa" })
];

function obterProdutos() {
  const salvos = localStorage.getItem(STORAGE_KEY);
  if (!salvos) {
    salvarProdutos(produtosIniciais);
    localStorage.setItem(STORAGE_VERSION_KEY, "13");
    return produtosIniciais;
  }

  let produtos;
  try {
    produtos = JSON.parse(salvos);
    if (!Array.isArray(produtos)) throw new TypeError("O catálogo salvo não é uma lista.");
  } catch (erro) {
    console.error("Não foi possível ler o catálogo salvo da Charm Fit.", erro);
    return produtosIniciais;
  }

  const produtosSemEquipamentos = produtos.filter(produto => produto.categoria !== "Equipamentos");
  if (produtosSemEquipamentos.length !== produtos.length) {
    produtos = produtosSemEquipamentos;
    salvarProdutos(produtos);
  }

  if (localStorage.getItem(STORAGE_VERSION_KEY) !== "13") {
    const idsSalvos = new Set(produtos.map(produto => produto.id));
    const imagensAntigas = {
      "imagens/Juguito de gym girl.jpg": "imagens/AdobeStock_348848381.jpeg",
      "imagens/download.jpg": "imagens/Life Gym Studio.jpg"
    };
    produtos = produtos.map(produto => ({
      ...produto,
      nome: produto.id === "conjunto-fitness"
        ? "Conjunto"
        : produto.id === "pre-treino-frutas"
          ? "Creatina"
          : produto.nome,
      imagem: produto.id === "legging-vinho"
        ? "imagens/leggin vinho.jpg"
        : produto.id === "top-sustentacao"
          ? "imagens/topdeacademia.jpg"
          : produto.id === "conjunto-fitness"
            ? "imagens/Pilates Princess.jpg"
            : produto.id === "pre-treino-frutas"
              ? "imagens/Creatine.jpg"
              : produto.id === "shorts-fitness"
                ? "imagens/Dfyne shorts 🫶🏻.jpg"
                : produto.id === "camiseta-dry"
                  ? "imagens/camiseta dry fit.jpg"
                  : produto.id === "garrafa-termica"
                    ? "imagens/garrafa.jpg"
        : imagensAntigas[produto.imagem] || produto.imagem,
      tamanhos: produto.tamanhos || "",
      cores: produto.cores || "",
      destaque: produto.destaque || "",
      precoOriginal: produto.precoOriginal || ""
    }));
    produtosIniciais.forEach(produto => {
      if (!idsSalvos.has(produto.id)) produtos.push(produto);
    });
    salvarProdutos(produtos);
    localStorage.setItem(STORAGE_VERSION_KEY, "13");
  }

  const garrafaTermica = produtos.find(produto => produto.id === "garrafa-termica");
  if (garrafaTermica && garrafaTermica.imagem !== "imagens/garrafa.jpg") {
    garrafaTermica.imagem = "imagens/garrafa.jpg";
    salvarProdutos(produtos);
  }

  const whey = produtos.find(produto => produto.id === "whey-charm-fit");
  if (whey && whey.imagem !== "imagens/Протеин Nl.jpg") {
    whey.imagem = "imagens/Протеин Nl.jpg";
    salvarProdutos(produtos);
  }

  const creatinaMonohidratada = produtos.find(produto => produto.id === "creatina-monohidratada");
  if (creatinaMonohidratada && creatinaMonohidratada.imagem !== "imagens/creatinapure.jpg") {
    creatinaMonohidratada.imagem = "imagens/creatinapure.jpg";
    salvarProdutos(produtos);
  }

  const multivitaminico = produtos.find(produto => produto.id === "vitaminas-diarias");
  if (multivitaminico && multivitaminico.imagem !== "imagens/Gummy.jpg") {
    multivitaminico.imagem = "imagens/Gummy.jpg";
    salvarProdutos(produtos);
  }

  const bcaa = produtos.find(produto => produto.id === "bcaa-essencial");
  if (bcaa && bcaa.imagem !== "imagens/bcaa.jpg") {
    bcaa.imagem = "imagens/bcaa.jpg";
    salvarProdutos(produtos);
  }

  const magnesio = produtos.find(produto => produto.id === "magnesio-mineral");
  if (magnesio && magnesio.imagem !== "imagens/download.jpg") {
    magnesio.imagem = "imagens/download.jpg";
    salvarProdutos(produtos);
  }

  const faixasElasticas = produtos.find(produto => produto.id === "faixa-elastica");
  if (faixasElasticas && faixasElasticas.imagem !== "imagens/Booty Bands.jpg") {
    faixasElasticas.imagem = "imagens/Booty Bands.jpg";
    salvarProdutos(produtos);
  }

  const tapeteTreino = produtos.find(produto => produto.id === "tapete-treino");
  if (tapeteTreino && tapeteTreino.imagem !== "imagens/૮꒰ ྀི◜๑◝ ꒱ა ᶻ 𝗓 𐰁.jpg") {
    tapeteTreino.imagem = "imagens/૮꒰ ྀི◜๑◝ ꒱ა ᶻ 𝗓 𐰁.jpg";
    salvarProdutos(produtos);
  }

  const straps = produtos.find(produto => produto.id === "straps-essenciais");
  if (straps && straps.imagem !== "imagens/skddk.jpg") {
    straps.imagem = "imagens/skddk.jpg";
    salvarProdutos(produtos);
  }

  return produtos;
}

function salvarProdutos(produtos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

function escapar(texto) {
  return String(texto || "").replace(/[&<>\"']/g, caractere => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[caractere]));
}

function precoEmNumero(preco) {
  return Number(String(preco || "0").replace(/\./g, "").replace(",", ".")) || 0;
}

function formatarPreco(preco) {
  return precoEmNumero(preco).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function obterCarrinho() {
  try {
    const carrinho = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(carrinho) ? carrinho : [];
  } catch (erro) {
    console.error("Não foi possível ler o carrinho salvo da Charm Fit.", erro);
    return [];
  }
}

function salvarCarrinho(carrinho) {
  localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
}

function renderizarVitrine() {
  const lista = document.querySelector("#lista-produtos");
  if (!lista) return;
  const busca = document.querySelector("#busca-produto");
  const categorias = document.querySelector("#categorias");
  const filtroPreco = document.querySelector("#filtro-preco");
  const valorPreco = document.querySelector("#valor-preco");
  const filtroTamanho = document.querySelector("#filtro-tamanho");
  const vazio = document.querySelector("#catalogo-vazio");
  const resultado = document.querySelector("#resultado-catalogo");
  const listaDestaques = document.querySelector("#lista-destaques");
  const conteudoSaude = document.querySelector("#conteudo-saude");
  const extrasFiltros = document.querySelector(".loja-filtros-extras");
  const resultadoSaude = document.querySelector("#resultado-saude");
  const vazioSaude = document.querySelector("#saude-vazio");
  const filtrosSaude = document.querySelector("#filtros-saude");
  const produtos = obterProdutos();
  const opcoesCategorias = [...new Set([...categoriasPadrao.slice(1), ...produtos.map(produto => produto.categoria)])]
    .filter(categoria => !categoriasOcultasNaVitrine.includes(categoria));
  let categoriaAtiva = "Todas";
  let temaSaudeAtivo = "todos";
  const precos = produtos.map(produto => precoEmNumero(produto.preco));
  const precoMaximo = Math.max(...precos, 300);
  filtroPreco.max = String(Math.ceil(precoMaximo / 50) * 50);
  filtroPreco.value = filtroPreco.max;
  const tamanhos = [...new Set(produtos.flatMap(produto => String(produto.tamanhos || "").split(",").map(item => item.trim()).filter(Boolean)))];

  categorias.innerHTML = ["Todas", ...opcoesCategorias].map((categoria, indice) => `<button class="filtro-categoria${indice === 0 ? " ativo" : ""}" type="button" data-categoria="${escapar(categoria)}" aria-pressed="${indice === 0}">${escapar(categoria)}</button>`).join("");
  filtroTamanho.innerHTML = `<option value="">Todos os tamanhos</option>${tamanhos.map(tamanho => `<option value="${escapar(tamanho)}">${escapar(tamanho)}</option>`).join("")}`;

  function imagemProduto(produto) {
    return escapar(produto.imagem || "imagens/treino.jpg");
  }

  function cartao(produto) {
    const tamanhosProduto = String(produto.tamanhos || "").split(",").map(item => item.trim()).filter(Boolean);
    const coresProduto = String(produto.cores || "").split(",").map(item => item.trim()).filter(Boolean);
    const linkProduto = `produto.html?id=${encodeURIComponent(produto.id)}`;
    const selo = produto.precoOriginal ? "Oferta" : produto.destaque;
    const exibirCategoria = !categoriasOcultasNaVitrine.includes(produto.categoria);
    return `<article class="produto-card">
      <a class="produto-imagem" href="${linkProduto}" aria-label="Ver ${escapar(produto.nome)}"><img src="${imagemProduto(produto)}" alt="${escapar(produto.nome)}" loading="lazy" onerror="this.onerror=null;this.src='imagens/treino.jpg'">${selo ? `<span class="produto-selo">${escapar(selo)}</span>` : ""}${exibirCategoria ? `<span class="produto-categoria-selo">${escapar(produto.categoria)}</span>` : ""}</a>
      <div class="produto-conteudo">${exibirCategoria ? `<p class="categoria">${escapar(produto.categoria)}</p>` : ""}<h3>${escapar(produto.nome)}</h3><p class="produto-descricao">${escapar(produto.descricao)}</p>
      ${coresProduto.length ? `<p class="produto-opcoes"><strong>Cores:</strong> ${escapar(coresProduto.join(" · "))}</p>` : ""}
      ${tamanhosProduto.length ? `<label class="seletor-variante"><span>Tamanho</span><select data-tamanho="${escapar(produto.id)}"><option value="">Selecione</option>${tamanhosProduto.map(tamanho => `<option value="${escapar(tamanho)}">${escapar(tamanho)}</option>`).join("")}</select></label>` : ""}
      <div class="produto-meta"><span>${escapar(produto.quantidade)}</span><div>${produto.precoOriginal ? `<del>R$ ${escapar(produto.precoOriginal)}</del>` : ""}<strong>R$ ${escapar(produto.preco)}</strong></div></div>
      <div class="produto-acoes"><a class="link-card" href="${linkProduto}">Ver produto <span aria-hidden="true">→</span></a><button class="botao botao-comprar" type="button" data-adicionar="${escapar(produto.id)}">Adicionar</button></div></div>
    </article>`;
  }

  function atualizarSaude(termo) {
    const dicas = [...document.querySelectorAll("#saude-dicas [data-saude-tema]")];
    const dicasVisiveis = dicas.filter(dica => {
      const correspondeTema = temaSaudeAtivo === "todos" || dica.dataset.saudeTema === temaSaudeAtivo;
      const correspondeBusca = dica.textContent.toLowerCase().includes(termo);
      dica.hidden = !correspondeTema || !correspondeBusca;
      return !dica.hidden;
    });
    resultadoSaude.textContent = `${dicasVisiveis.length} ${dicasVisiveis.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}`;
    vazioSaude.hidden = dicasVisiveis.length > 0;
  }

  function atualizar() {
    const termo = busca.value.toLowerCase().trim();
    const saudeAtiva = categoriaAtiva === "Saúde e bem-estar";
    conteudoSaude.hidden = !saudeAtiva;
    extrasFiltros.hidden = saudeAtiva;
    resultado.hidden = saudeAtiva;
    lista.hidden = saudeAtiva;
    vazio.hidden = saudeAtiva;
    busca.placeholder = saudeAtiva ? "Buscar dicas de movimento" : "Buscar na loja";
    busca.setAttribute("aria-label", saudeAtiva ? "Buscar dicas de movimento" : "Buscar produtos");
    if (saudeAtiva) {
      atualizarSaude(termo);
      return;
    }

    const limitePreco = Number(filtroPreco.value);
    const tamanhoSelecionado = filtroTamanho.value;
    const filtrados = produtos.filter(produto => {
      const correspondeCategoria = categoriaAtiva === "Todas" || (categoriaAtiva === "Suplementos" ? categoriasSuplementos.includes(produto.categoria) : produto.categoria === categoriaAtiva);
      const correspondeBusca = `${produto.nome} ${produto.categoria} ${produto.descricao} ${produto.cores || ""}`.toLowerCase().includes(termo);
      const correspondePreco = precoEmNumero(produto.preco) <= limitePreco;
      const tamanhosProduto = String(produto.tamanhos || "").split(",").map(item => item.trim());
      const correspondeTamanho = !tamanhoSelecionado || tamanhosProduto.includes(tamanhoSelecionado);
      return correspondeCategoria && correspondeBusca && correspondePreco && correspondeTamanho;
    });
    resultado.textContent = `${filtrados.length} ${filtrados.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
    vazio.hidden = filtrados.length > 0;
    lista.innerHTML = filtrados.map(cartao).join("");
  }

  function atualizarCarrinho() {
    const carrinho = obterCarrinho();
    const produtosAtuais = obterProdutos();
    const itens = carrinho.map(item => ({ ...item, produto: produtosAtuais.find(produto => produto.id === item.id) })).filter(item => item.produto);
    const quantidade = itens.reduce((total, item) => total + item.quantidade, 0);
    const botaoCarrinho = document.querySelector("#abrir-carrinho");
    document.querySelector("#contador-carrinho").textContent = String(quantidade);
    botaoCarrinho.setAttribute("aria-label", `Abrir carrinho, ${quantidade} ${quantidade === 1 ? "item" : "itens"}`);
    document.querySelector("#itens-carrinho").innerHTML = itens.length ? itens.map(item => `<article class="item-carrinho"><img src="${imagemProduto(item.produto)}" alt="" onerror="this.onerror=null;this.src='imagens/treino.jpg'"><div><strong>${escapar(item.produto.nome)}</strong><span>${[item.tamanho, item.cor].filter(Boolean).map(escapar).join(" · ")}</span><span>${item.quantidade} × R$ ${formatarPreco(item.produto.preco)}</span></div><button type="button" data-remover="${escapar(item.id)}" data-tamanho="${escapar(item.tamanho || "")}" data-cor="${escapar(item.cor || "")}" aria-label="Remover ${escapar(item.produto.nome)} do carrinho">Remover</button></article>`).join("") : `<p class="carrinho-vazio">Seu carrinho está vazio.</p>`;
    document.querySelector("#total-carrinho").textContent = `R$ ${itens.reduce((total, item) => total + precoEmNumero(item.produto.preco) * item.quantidade, 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    salvarCarrinho(itens.map(({ produto, ...item }) => item));
  }

  if (listaDestaques) {
    const destaques = produtos.filter(produto => produto.destaque || produto.precoOriginal).slice(0, 4);
    listaDestaques.innerHTML = destaques.map(produto => `<article class="destaque-card"><img src="${imagemProduto(produto)}" alt="${escapar(produto.nome)}" loading="lazy" onerror="this.onerror=null;this.src='imagens/treino.jpg'"><div><span>${produto.precoOriginal ? "Oferta especial" : escapar(produto.destaque)}</span><h3>${escapar(produto.nome)}</h3><p>${produto.precoOriginal ? `<del>R$ ${escapar(produto.precoOriginal)}</del> ` : ""}<strong>R$ ${escapar(produto.preco)}</strong></p><a href="produto.html?id=${encodeURIComponent(produto.id)}">Descobrir <span aria-hidden="true">↗</span></a></div></article>`).join("");
    document.querySelector("#secao-destaques").hidden = destaques.length === 0;
  }

  const carrinhoPainel = document.querySelector("#carrinho");
  document.querySelector("#abrir-carrinho").addEventListener("click", () => {
    carrinhoPainel.hidden = false;
    document.querySelector("#fechar-carrinho").focus();
  });
  document.querySelector("#fechar-carrinho").addEventListener("click", () => {
    carrinhoPainel.hidden = true;
    document.querySelector("#abrir-carrinho").focus();
  });
  document.querySelector("#limpar-carrinho").addEventListener("click", () => {
    salvarCarrinho([]);
    atualizarCarrinho();
  });
  document.querySelector("#itens-carrinho").addEventListener("click", evento => {
    const botao = evento.target.closest("[data-remover]");
    if (!botao) return;
    const carrinho = obterCarrinho();
    const indice = carrinho.findIndex(item => item.id === botao.dataset.remover && (item.tamanho || "") === botao.dataset.tamanho && (item.cor || "") === botao.dataset.cor);
    if (indice >= 0) carrinho.splice(indice, 1);
    salvarCarrinho(carrinho);
    atualizarCarrinho();
  });
  lista.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-adicionar]");
    if (!botao) return;
    const produto = produtos.find(item => item.id === botao.dataset.adicionar);
    if (!produto) return;
    const seletorTamanho = lista.querySelector(`[data-tamanho="${CSS.escape(produto.id)}"]`);
    const tamanho = seletorTamanho ? seletorTamanho.value : "";
    if (seletorTamanho && !tamanho) {
      seletorTamanho.focus();
      document.querySelector("#mensagem-carrinho").textContent = "Selecione um tamanho antes de adicionar a peça.";
      return;
    }
    const carrinho = obterCarrinho();
    const existente = carrinho.find(item => item.id === produto.id && (item.tamanho || "") === tamanho);
    if (existente) existente.quantidade += 1;
    else carrinho.push({ id: produto.id, quantidade: 1, tamanho });
    salvarCarrinho(carrinho);
    atualizarCarrinho();
    document.querySelector("#mensagem-carrinho").textContent = `${produto.nome} adicionado ao carrinho.`;
  });

  busca.addEventListener("input", atualizar);
  filtroPreco.addEventListener("input", () => {
    valorPreco.textContent = `Até R$ ${Number(filtroPreco.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    atualizar();
  });
  filtroTamanho.addEventListener("change", atualizar);
  categorias.addEventListener("click", evento => {
    const botao = evento.target.closest("button");
    if (!botao) return;
    categoriaAtiva = botao.dataset.categoria;
    temaSaudeAtivo = "todos";
    filtrosSaude.querySelectorAll("button").forEach(item => {
      const ativo = item.dataset.saudeCategoria === temaSaudeAtivo;
      item.classList.toggle("ativo", ativo);
      item.setAttribute("aria-pressed", String(ativo));
    });
    categorias.querySelectorAll("button").forEach(item => {
      const ativo = item === botao;
      item.classList.toggle("ativo", ativo);
      item.setAttribute("aria-pressed", String(ativo));
    });
    atualizar();
  });
  filtrosSaude.addEventListener("click", evento => {
    const botao = evento.target.closest("button[data-saude-categoria]");
    if (!botao) return;
    temaSaudeAtivo = botao.dataset.saudeCategoria;
    filtrosSaude.querySelectorAll("button").forEach(item => {
      const ativo = item === botao;
      item.classList.toggle("ativo", ativo);
      item.setAttribute("aria-pressed", String(ativo));
    });
    atualizarSaude(busca.value.toLowerCase().trim());
  });
  valorPreco.textContent = `Até R$ ${Number(filtroPreco.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  atualizarCarrinho();
  atualizar();
}

document.addEventListener("DOMContentLoaded", renderizarVitrine);
