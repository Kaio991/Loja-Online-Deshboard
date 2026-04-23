// public/js/pagamento.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get('id');
    const token = localStorage.getItem('token');

    if (!pedidoId) {
        alert("ID do pedido não encontrado.");
        window.location.href = 'index.html';
        return;
    }

    // Exibe o ID na tela para o usuário saber o que está pagando
    document.getElementById('id-pedido-display').innerText = pedidoId;
});

async function realizarPagamento() {
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get('id');
    const token = localStorage.getItem('token');

    // Feedback de carregamento
    Swal.fire({
        title: 'Confirmando pagamento...',
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        // CHAMADA PARA A ROTA .put("/checkout/pagar/:id")
        const response = await fetch(`https://loja-online-deshboard-production.up.railway.app/checkout/pagar/${pedidoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire({
                title: 'Pagamento Confirmado!',
                text: 'Seu pedido agora está com status: PAGO',
                icon: 'success'
            }).then(() => {
                window.location.href = 'meus-pedidos.html'; // Ou sua página de sucesso
            });
        } else {
            const erro = await response.json();
            Swal.fire('Erro', erro.mensagem || 'Erro ao processar pagamento', 'error');
        }
    } catch (error) {
        Swal.fire('Erro', 'Servidor offline', 'error');
    }
}