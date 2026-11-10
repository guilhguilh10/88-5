let carrinho = [];
let usuarioLogado = "";

function mudarTela(idTela) {
    let telas = document.querySelectorAll('.tela');
    for (let i = 0; i < telas.length; i++) {
        telas[i].style.display = 'none';
    }
    document.getElementById(idTela).style.display = 'block';

    if (idTela === 'carrinho') {
        renderizarCarrinho();
    }
}

function adicionarAoCarrinho(nomeProduto, valorProduto, imagemProduto) {
    carrinho.push({ nome: nomeProduto, preco: valorProduto, img: imagemProduto });
    document.getElementById('contador-carrinho-topo').innerText = carrinho.length;
    alert('Produto adicionado ao carrinho com sucesso!');
}

function removerDoCarrinho(indice) {
    carrinho.splice(indice, 1);
    document.getElementById('contador-carrinho-topo').innerText = carrinho.length;
    renderizarCarrinho();
}

function renderizarCarrinho() {
    let caixaCarrinho = document.getElementById('itens-carrinho');
    let textoHtml = '';
    let somaTotal = 0;

    for (let i = 0; i < carrinho.length; i++) {
        let produto = carrinho[i];
        somaTotal += produto.preco;

        textoHtml += `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${produto.img}" style="width: 55px; height: 55px; object-fit: contain; border-radius: 6px;">
                    <div>
                        <h4 style="color: #0f172a; margin: 0 0 4px 0; font-size: 15px;">${produto.nome}</h4>
                        <p style="color: #2563eb; margin: 0; font-size: 13px; font-weight: bold;">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <button onclick="removerDoCarrinho(${i})" style="background: #dc2626; color: #ffffff; border: none; width: 32px; height: 32px; border-radius: 6px; cursor: pointer;">✕</button>
            </div>
        `;
    }

    if (carrinho.length === 0) {
        caixaCarrinho.innerHTML = `<p style="padding: 20px; text-align: center; color: #64748b;">O seu carrinho está vazio.</p>`;
    } else {
        caixaCarrinho.innerHTML = textoHtml;
    }

    document.getElementById('total-geral-carrinho').innerText = `R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
}

function iniciarCheckout() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }   
    if (usuarioLogado === "") {
        alert("Você precisa fazer login para continuar!");
        mudarTela('login');
    } else {
        mudarTela('pagamento');
    }
}

function processarLogin(e) {
    e.preventDefault();
    let campoUsuario = document.getElementById('login-usuario').value;
    usuarioLogado = campoUsuario;
    
    document.getElementById('btn-usuario-topo').innerText = "👤 " + usuarioLogado;
    mudarTela('menu-principal');
    document.getElementById('login-usuario').value = '';
}

function processarCadastro(e) {
    e.preventDefault();
    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    mudarTela('login');
}

function finalizarPedido() {
    carrinho = [];
    document.getElementById('contador-carrinho-topo').innerText = 0;
    mudarTela('sucesso');
}

document.addEventListener('DOMContentLoaded', function() {
    mudarTela('menu-principal');
});