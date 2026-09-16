/* Resumo do mês */
let totalVendasMes = document.getElementById("totalVendasMensal");
let faturamentoMes = document.getElementById("faturamentoMensal");
let gastosMes = document.getElementById("gastosMensal");
let taxasMensal = document.getElementById("taxasMensal");
let lucroMensal = document.getElementById("lucroMensal");

/* Resumo acumulado */
let totalVendas = document.getElementById("totalProdutosVendidos");
let faturamentoTotal = document.getElementById("faturamentoTotal");
let gastosTotais = document.getElementById("gastosTotais");
let lucroAcumulado = document.getElementById("lucroTotalAcumulado");
let taxasAcumulado = document.getElementById("taxasTotais");

/* =========================
   NOTIFICAÇÃO
========================= */

let notificacao = document.getElementById("notificacao");
let msgNotificacao = document.getElementById("msg_notificacao");

let mensagem = localStorage.getItem("msg_notificacao");

if (mensagem) {
  msgNotificacao.innerText = mensagem;

  notificacao.style.display = "block";
  notificacao.style.opacity = "1";

  localStorage.removeItem("msg_notificacao");

  setTimeout(function () {
    notificacao.style.opacity = "0";
  }, 2000);
}

/* =========================
   DATA / ANOS / MÊS
========================= */

let mesAtual = document.getElementById("mes");

let dataMes = new Date();

const ano = dataMes.getFullYear();
const mes = String(dataMes.getMonth() + 1).padStart(2, "0");

let mesSalvo = localStorage.getItem("mesSelecionado");

if (mesSalvo) {
  mesAtual.value = mesSalvo;
} else {
  mesAtual.value = `${ano}-${mes}`;
}

mesAtual.addEventListener("change", function () {
  localStorage.setItem("mesSelecionado", mesAtual.value);

  resumoMes();
});

carregarProduto();

/* ====================
   RESUMO DO MÊS
==================== */

function resumoMes() {
  let faturamentoDoMes = 0;
  let gastoMes = 0;
  let taxaMes = 0;
  let lucroMes = 0;
  let totalVendasM = 0;

  // Filtra somente as vendas do ano e mês escolhidos

  let filtrarAnoEMes = produtoAdicionado.filter(function (produto) {
    let dataAtual = "";

    let dataMes = produto.data;

    let separados = dataMes.split("-");

    dataAtual = `${separados[0]}-${separados[1]}`;

    if (mesAtual.value == dataAtual) {
      return produto;
    } else {
      return false;
    }
  });

  // Calcula os valores usando somente as vendas filtradas

  for (let i = 0; i < filtrarAnoEMes.length; i++) {
    faturamentoDoMes += filtrarAnoEMes[i].preco;

    gastoMes += filtrarAnoEMes[i].gasto;

    taxaMes += Number(taxaVenda(filtrarAnoEMes[i].preco));

    lucroMes += Number(lucro(filtrarAnoEMes[i].preco, filtrarAnoEMes[i].gasto));

    totalVendasM += 1;
  }

  // Mostra os resultados

  faturamentoMes.innerHTML = `${faturamentoDoMes.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;

  gastosMes.innerHTML = `${gastoMes.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;

  taxasMensal.innerHTML = `${taxaMes.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;

  totalVendasMes.innerHTML = `${totalVendasM}`;

  if (lucroMes <= -1) {
    lucroMensal.style.color = "#FB3A2B";
  } else {
    lucroMensal.style.color = "";
  }

  lucroMensal.innerHTML = `${lucroMes.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

/* ========================
   RESUMO ACUMULADO
======================== */

function totalLucroAcumulado() {
  let total = 0;

  for (let i = 0; i < produtoAdicionado.length; i++) {
    total += Number(
      lucro(produtoAdicionado[i].preco, produtoAdicionado[i].gasto),
    );
  }

  if (total <= -1) {
    lucroAcumulado.style.color = "#FB3A2B";
  } else {
    lucroAcumulado.style.color = "";
  }

  lucroAcumulado.innerHTML = `${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

function vendasTotais() {
  totalVendas.innerText = `${produtoAdicionado.length}`;
}

function totalTaxasAcumulado() {
  let total = 0;

  for (let i = 0; i < produtoAdicionado.length; i++) {
    total += Number(taxaVenda(produtoAdicionado[i].preco));
  }

  taxasAcumulado.innerHTML = `${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

function totalFaturamentoAcumulado() {
  let total = 0;

  for (let i = 0; i < produtoAdicionado.length; i++) {
    total += produtoAdicionado[i].preco;
  }

  faturamentoTotal.innerHTML = `${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

function totalGastoAcumulado() {
  let total = 0;

  for (let i = 0; i < produtoAdicionado.length; i++) {
    total += produtoAdicionado[i].gasto;
  }

  gastosTotais.innerHTML = `${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

/* Atualiza o resumo acumulado */

vendasTotais();
totalFaturamentoAcumulado();
totalGastoAcumulado();
totalTaxasAcumulado();
totalLucroAcumulado();
resumoMes();
