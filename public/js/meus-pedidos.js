// public/js/meus-pedidos.js

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const listaContainer = document.getElementById('lista-pedidos');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/checkout/listar', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();
        const pedidos = data.produtosDaLista || data.pedidos || data;

        if (!pedidos || !Array.isArray(pedidos) || pedidos.length === 0) {
            listaContainer.innerHTML = `<p style="text-align:center; color:#f0c040;">Nenhum pedido encontrado.</p>`;
            return;
        }

        listaContainer.innerHTML = pedidos.map(p => `
            <div class="pedido-card" onclick="verDetalhes(${p.id})" style="background:#1e1e1e; border:1px solid #f0c040; padding:20px; border-radius:10px; margin-bottom:15px; color: white; cursor: pointer;">
                <div style="display:flex; justify-content:space-between;">
                    <h3 style="color:#f0c040;">Pedido #${p.id}</h3>
                    <span style="background:${p.status === 'PAGO' ? '#2ecc71' : '#f1c40f'}; padding:5px 10px; border-radius:5px; color:#000; font-weight:bold; font-size:0.8rem;">
                        ${p.status}
                    </span>
                </div>
                <p style="margin-top:10px;">Total: <strong>R$ ${Number(p.valorTotal).toFixed(2)}</strong></p>
                <p style="font-size:0.8rem; color:#888;">Data: ${new Date(p.createdAt).toLocaleDateString('pt-BR')}</p>
                <p style="color:#f0c040; font-size:0.7rem; margin-top:5px;">(Clique para ver itens)</p>
            </div>
        `).join('');

    } catch (error) {
        console.error("Erro ao listar:", error);
    }
});

// FUNÇÃO FORA DO DOMContentLoaded PARA GARANTIR ACESSO GLOBAL
async function verDetalhes(pedidoId) {
    console.log("Cliquei no pedido:", pedidoId); // SE ISSO APARECER, O CLIQUE FUNCIONOU

    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`http://localhost:3000/checkout/detalhes/${pedidoId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Erro na requisição");

        const itens = await res.json();
        console.log("Itens recebidos:", itens);

        let listaHtml = '<div style="text-align: left;">';
        itens.forEach(item => {
            const nome = item.produto ? item.produto.nome : "Produto";
            listaHtml += `
                <div style="border-bottom: 1px solid #333; padding: 8px 0; display: flex; justify-content: space-between;">
                    <span>${nome} (x${item.quantidade})</span>
                    <span style="color:#f0c040;">R$ ${Number(item.precoUnitario).toFixed(2)}</span>
                </div>`;
        });
        listaHtml += '</div>';

        Swal.fire({
            title: `Detalhes do Pedido #${pedidoId}`,
            html: listaHtml,
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#f0c040'
        });

    } catch (error) {
        console.error("Erro na modal:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Não foi possível carregar os itens.',
            background: '#1a1a1a',
            color: '#fff'
        });
    }
}