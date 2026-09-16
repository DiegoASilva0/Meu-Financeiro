/* Elementos */

let nomeProduto = document.getElementById("nome");
let precoProduto = document.getElementById("valorVenda");
let valorGasto = document.getElementById("valorGasto");
let dataVenda = document.getElementById("data");

let trocarTexto = document.getElementById("enviarVenda");

let spanTaxaCalculada = document.getElementById("taxaCalculada");
let spanValorReceber = document.getElementById("valorReceber");
let spanLucroEstimado = document.getElementById("lucroEstimado");

carregarProduto();

/* =========================
   DATA ATUAL
========================= */

let dataAtual = new Date();

const ano = dataAtual.getFullYear();
const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
const dia = String(dataAtual.getDate()).padStart(2, "0");

dataVenda.value = `${ano}-${mes}-${dia}`;

/* =========================
   FORMULÁRIO
========================= */

document
  .getElementById("formVenda")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    adicionarVenda();
  });

/* =========================
   EDIÇÃO
========================= */

let indiceSalvo = localStorage.getItem("indiceEdicao");

if (indiceSalvo != null) {
  let venda = produtoAdicionado[indiceSalvo];

  trocarTexto.innerText = "Salvar Edição";

  nomeProduto.value = venda.nome;
  precoProduto.value = venda.preco;
  valorGasto.value = venda.gasto;
  dataVenda.value = venda.data;

  atualizarFormulario();
}

/* =========================
   ADICIONAR / EDITAR
========================= */

function adicionarVenda() {
  let produto = {
    nome: nomeProduto.value,
    preco: Number(precoProduto.value),
    gasto: Number(valorGasto.value),
    data: dataVenda.value,
  };

  /* EDITANDO */
  if (indiceSalvo != null) {
    produtoAdicionado[indiceSalvo] = produto;
    localStorage.setItem("msg_notificacao", "Venda Atualizada");
  } else {
    
    /* NOVA VENDA */
    produtoAdicionado.push(produto);
    localStorage.setItem("msg_notificacao", "Venda adicionada com sucesso.");
  }

  salvarProdutos();

  localStorage.removeItem("indiceEdicao");

  window.location.href = "index.html";
}

/* =========================
   CÁLCULOS
========================= */

function atualizarFormulario() {
  let preco = Number(precoProduto.value);
  let gasto = Number(valorGasto.value);

  let taxa = taxaVenda(preco);

  let receber = valorReceber(preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let valorLucro = Number(lucroEstimado(preco, gasto).toFixed(2));

  let lucroFormatado = valorLucro.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  spanTaxaCalculada.innerText = `R$ ${taxa}`;

  spanValorReceber.innerText = receber;

  if (valorLucro >= 0) {
    spanLucroEstimado.style.color = "#22c55e";
  } else {
    spanLucroEstimado.style.color = "#FB3A2B";
  }

  spanLucroEstimado.innerText = lucroFormatado;
}

precoProduto.addEventListener("input", atualizarFormulario);

valorGasto.addEventListener("input", atualizarFormulario);

function valorReceber(preco) {
  return preco - taxaVenda(preco);
}

function lucroEstimado(preco, gasto) {
  return valorReceber(preco) - gasto;
}
