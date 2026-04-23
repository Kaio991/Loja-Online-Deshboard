document.addEventListener('DOMContentLoaded', () => {
    const nomeSalvo = localStorage.getItem('usuarioNome') || 'Visitante';
    const userElement = document.getElementById('user-name');
    if (userElement) {
        userElement.innerText = nomeSalvo;
    }

    carregarProdutos();
    configurarBusca();
    verificarLogin();
    atualizarContadorCarrinho(); // Garante que o número apareça ao abrir a página
});

async function carregarProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');

    try {
        const response = await fetch('http://localhost:3000/produtos/listar');
        if (!response.ok) throw new Error('Servidor offline ou rota inválida');

        const data = await response.json();
        const produtos = data.produtosListados;

        if (!produtos || produtos.length === 0) {
            listaProdutos.innerHTML = `<p style="color: #f0c040;">Nenhum produto encontrado.</p>`;
            return;
        }

        listaProdutos.innerHTML = produtos.map(prod => {
            const imgUrl = prod.imagemUrl || 'https://placehold.co/400x300?text=Sem+Foto';

            return `
                <div class="produto-card">
                    <img src="${imgUrl}" alt="${prod.nome}">
                    <div>
                        <h3>${prod.nome}</h3>
                        <p class="preco">R$ ${Number(prod.preco).toFixed(2)}</p>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarAoCarrinho(${prod.id}, '${prod.nome}', ${prod.preco}, '${imgUrl}')">
                        🛒 Adicionar
                    </button>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error("Erro ao carregar vitrine:", error);
        listaProdutos.innerHTML = `<p style="color: #ff4444; text-align: center; grid-column: 1/-1;">Erro de conexão com o servidor.</p>`;
    }
}

// ALTERAÇÃO AQUI: Agora a função é ASYNC para falar com o banco
async function adicionarAoCarrinho(id, nome, preco, imagem) {
    const token = localStorage.getItem('token');

    if (!token) {
        return Swal.fire('Atenção', 'Você precisa estar logado para comprar!', 'warning');
    }

    try {
        // 1. SALVA NO BANCO (MySQL) - Isso resolve o erro 400 do checkout
        const response = await fetch('http://localhost:3000/carrinho', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                produtoId: id,
                quantidade: 1
            })
        });

        if (!response.ok) throw new Error('Erro ao salvar no banco de dados');

        // 2. SALVA NO LOCALSTORAGE (Para o visual do front-end)
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                id: id,
                nome: nome,
                preco: parseFloat(preco),
                imagem: imagem,
                quantidade: 1
            });
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // 3. ATUALIZA O NÚMERO
        atualizarContadorCarrinho();

        Swal.fire({
            title: 'Adicionado!',
            text: `${nome} foi para o seu carrinho.`,
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
            background: '#1e1e1e',
            color: '#f0c040'
        });

    } catch (error) {
        console.error("Erro no processo de adicionar:", error);
        Swal.fire('Erro', 'O servidor não respondeu. Tente logar novamente.', 'error');
    }
}

function atualizarContadorCarrinho() {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contador = document.getElementById('carrinho-count');
    if (contador) {
        const totalItens = carrinhoAtual.reduce((acc, item) => acc + item.quantidade, 0);
        contador.innerText = totalItens;
    }
}

function configurarBusca() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.produto-card');

            cards.forEach(card => {
                const nome = card.querySelector('h3').innerText.toLowerCase();
                card.style.display = nome.includes(termo) ? "flex" : "none";
            });
        });
    }
}

function verificarLogin() {
    const authContainer = document.getElementById('auth-buttons');
    const token = localStorage.getItem('token');
    if (token) {
        authContainer.innerHTML = `<button class="btn-sair" onclick="logout()">Sair</button>`;
    } else {
        authContainer.innerHTML = `<button onclick="window.location.href='/pages/login.html'">Entrar</button>`;
    }
}

function logout() {
    localStorage.clear();
    window.location.href = '/pages/login.html';
}