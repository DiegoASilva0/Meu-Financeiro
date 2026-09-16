var msg = document.getElementById("vendas");

let pesquisar = document.getElementById("pesquisarProduto");

let categoria = document.getElementById("categoria");

carregarProduto();

let mesSelecionado = localStorage.getItem("mesSelecionado");

function filtrarVendasDoMes() {

    let vendasDoMes = produtoAdicionado.filter(function(produto) {

        let dataMes = produto.data;

        let separados = dataMes.split("-");

        let dataAtual = `${separados[0]}-${separados[1]}`;

        if (mesSelecionado == dataAtual) {
            return produto;
        } else {
            return false;
        }
    });

    return vendasDoMes;
}

let vendasDoMes = filtrarVendasDoMes();

// Filtro e ordenação
categoria.addEventListener("change", function () {

    let valores = categoria.value;

    if (valores == "vendasRecentes") {

        ordenarRecentes(vendasDoMes);
        msg_produto(vendasDoMes);

    } else if (valores == "vendasAntigas") {

        ordenarVendasAntigas(vendasDoMes);
        msg_produto(vendasDoMes);

    } else if (valores == "maiorLucro") {

        ordenarLucros(vendasDoMes);
        msg_produto(vendasDoMes);

    } else if (valores == "maiorValordeVendas") {

        ordenarVendas(vendasDoMes);
        msg_produto(vendasDoMes);

    }
});

// Pesquisa de vendas
pesquisar.addEventListener("input", function () {

    let nomeProduto = pesquisar.value.toLowerCase();

    if (nomeProduto === "") {

        msg_produto(vendasDoMes);

    } else {

        let guardarPesquisa = pesquisarVendas(vendasDoMes, nomeProduto);
        msg_produto(guardarPesquisa);

    }
});

function pesquisarVendas(vendasDoMes, nomeProduto) {

    let produtoEncontrado = [];

    let olharProdutos;
    let nomeProdutoAtual;

    for (let i = 0; i < vendasDoMes.length; i++) {

        olharProdutos = vendasDoMes[i];

        nomeProdutoAtual = olharProdutos.nome.toLowerCase();

        if (nomeProdutoAtual.includes(nomeProduto)) {

            produtoEncontrado.push(olharProdutos);

        }
    }

    return produtoEncontrado;
}

function msg_produto(guardarPesquisa) {

    let textoAtualizado = "";
    let textoAparecer = "";
    let dataJuntas = "";

    for (let i = 0; i < guardarPesquisa.length; i++) {

        textoAtualizado = guardarPesquisa[i];

        let data = guardarPesquisa[i].data;

        let separados = data.split("-");

        dataJuntas = `${separados[2]}/${separados[1]}/${separados[0]}`;

        let índiceOriginal = produtoAdicionado.indexOf(guardarPesquisa[i]);

        let taxaFormatada = Number(taxaVenda(textoAtualizado.preco))
            .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        let lucroFormatado = Number(lucro(textoAtualizado.preco, textoAtualizado.gasto))
            .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        let texto = ` 

        <section class="mensagemVenda">

            <div class="tituloPrincpal">

                <div class="tituloVenda">

                    <span>${textoAtualizado.nome}</span>

                </div>

                <div class="dataCriada">

                    <span>${dataJuntas}</span>

                </div>

            </div>

            <div class="grid-container">

                <div class="card card-info">

                    <span>Venda</span>

                    <p>${textoAtualizado.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</p>

                </div>

                <div class="card card-info">

                    <span>Gastos</span>

                    <p>${textoAtualizado.gasto.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</p>

                </div>

                <div class="card card-info">

                    <span>Taxas</span>

                    <p>${taxaFormatada}</p>

                </div>

                <div class="card card-info">

                    <span>Lucro</span>

                    <p>${lucroFormatado}</p>

                </div>

                <button type="button" class="card card-editar" onclick="editarVenda(${índiceOriginal})">

                    <i class="fa-solid fa-pencil"></i>

                    <span>Editar</span>

                </button>

                <button type="button" class="card card-excluir" onclick="excluirVenda(${índiceOriginal})">

                    <i class="fa-regular fa-trash-can"></i>

                    <span>Excluir</span>

                </button>

            </div>

        </section>`;

        textoAparecer += texto;
    }

    msg.innerHTML = textoAparecer;

    return textoAparecer;
}

// Funções de ordenação

function ordenarRecentes(produtoAdicionado) {

    produtoAdicionado.sort(function (a, b) {

        let dataRecentesA = new Date(a.data);

        let dataRecentesB = new Date(b.data);

        return dataRecentesB - dataRecentesA;
    });
}

function ordenarVendas(produtoAdicionado) {

    produtoAdicionado.sort(function (a, b) {

        return b.preco - a.preco;
    });
}

function ordenarVendasAntigas(produtoAdicionado) {

    produtoAdicionado.sort(function (a, b) {

        let dataRecentesA = new Date(a.data);

        let dataRecentesB = new Date(b.data);

        return dataRecentesA - dataRecentesB;
    });
}

function ordenarLucros(produtoAdicionado) {

    produtoAdicionado.sort(function (a, b) {

        let lucroA = Number(lucro(a.preco, a.gasto));

        let lucroB = Number(lucro(b.preco, b.gasto));

        let resultado = lucroB - lucroA;

        return resultado;
    });
}

// Editar e excluir vendas

function editarVenda(indice) {

    localStorage.setItem("indiceEdicao", indice);

    window.location.href = "adicionar.html";
}

function excluirVenda(indice) {

    produtoAdicionado.splice(indice, 1);

    salvarProdutos();

    vendasDoMes = filtrarVendasDoMes();

    let excluirProduto = pesquisar.value.toLowerCase();

    if (excluirProduto === "") {

        msg_produto(vendasDoMes);

    } else {

        let novaLista = pesquisarVendas(vendasDoMes, excluirProduto);

        msg_produto(novaLista);
    }
}

msg_produto(vendasDoMes);