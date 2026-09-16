let produtoAdicionado = [];

function carregarProduto() {
  let produtoSalvoJSON = localStorage.getItem("produtos");

  let produtoSalvoArray = JSON.parse(produtoSalvoJSON);

  produtoAdicionado = produtoSalvoArray || [];
}

function salvarProdutos() {
  let produtoSalvos = JSON.stringify(produtoAdicionado);

  localStorage.setItem("produtos", produtoSalvos);
}

function taxaVenda(preco) {
  let valorTaxa = preco * 0.05 + 0.2;

  return valorTaxa.toFixed(2);
}

function lucro(preco, gasto) {
  let taxa = taxaVenda(preco);

  let valor = preco - taxa;

  let lucro = valor - gasto;

  return lucro;
}
