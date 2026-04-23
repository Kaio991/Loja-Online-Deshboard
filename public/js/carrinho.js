// Recupera o carrinho do localStorage ou inicia um array vazio
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. ATUALIZA O NOME DO USUÁRIO NO HEADER
    const nomeSalvo = localStorage.getItem('usuarioNome');
    const userElement = document.getElementById('user-name');

    if (userElement && nomeSalvo && nomeSalvo !== 'undefined') {
        userElement.innerText = nomeSalvo;
    }

    // 2. RENDERIZA OS PRODUTOS
    exibirCarrinho();
});

function exibirCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const resumo = document.getElementById('resumo-compra');
    const totalElement = document.getElementById('total-carrinho');

    if (!container) return;

    if (carrinho.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: white; padding: 50px;">
                <h3>Seu carrinho está vazio 🛒</h3>
                <a href="index.html" style="color: #f0c040;">Voltar para a loja</a>
            </div>
        `;
        if (resumo) resumo.style.display = 'none';
        return;
    }

    // Mostra a área de total e botão finalizar
    if (resumo) resumo.style.display = 'block';

    container.innerHTML = ""; // Limpa a grid
    let valorTotalGeral = 0;

    carrinho.forEach((item, index) => {
        // Cálculo de valores
        const precoNum = parseFloat(item.preco) || 0;
        const subtotal = precoNum * item.quantidade;
        valorTotalGeral += subtotal;

        // Se o produto novo tiver imagem, ela aparece na tag <img> abaixo
        container.innerHTML += `
            <div class="cart-item" style="background: #1e1e1e; padding: 20px; border-radius: 10px; border: 1px solid #f0c040; color: white; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                
                <img src="${item.imagem || '../img/placeholder.png'}" alt="${item.nome}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">
                
                <h3 style="color: #f0c040; margin: 5px 0;">${item.nome || 'Produto ' + item.id}</h3>
                
                <p style="margin: 0;">Preço: R$ ${precoNum.toFixed(2)}</p>
                <p style="margin: 0;">Qtd: ${item.quantidade}</p>
                <p style="color: #2ecc71; font-weight: bold; margin: 5px 0;">Subtotal: R$ ${subtotal.toFixed(2)}</p>
                
                <button onclick="removerDoCarrinho(${index})" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; font-weight: bold; width: 100%;">
                    Remover
                </button>
            </div>
        `;
    });

    // Atualiza o valor do H2 de Total
    if (totalElement) {
        totalElement.innerText = `Total: R$ ${valorTotalGeral.toFixed(2)}`;
    }
}

// Remove o item e atualiza a página
window.removerDoCarrinho = function (index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
};