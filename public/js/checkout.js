document.getElementById('btn-finalizar').onclick = async () => {
    const token = localStorage.getItem('token');
    // Pegamos o carrinho do local apenas para validação rápida no front
    const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 1. Verificações de segurança no Front-end
    if (!token || token === "undefined") {
        return Swal.fire({
            title: 'Acesso Negado',
            text: 'Você precisa estar logado para finalizar a compra!',
            icon: 'error',
            confirmButtonText: 'Fazer Login'
        }).then(() => {
            window.location.href = 'login.html';
        });
    }

    if (carrinhoLocal.length === 0) {
        return Swal.fire('Carrinho Vazio', 'Adicione produtos antes de finalizar!', 'warning');
    }

    // 2. Feedback visual de carregamento
    Swal.fire({
        title: 'Processando seu pedido...',
        text: 'Estamos validando seu carrinho no servidor.',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        // 3. Chamada para o Back-end
        const res = await fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // Nota: Como seu back-end busca direto da tabela 'itemcarrinho', 
            // não precisamos enviar o body, mas deixamos os headers prontos.
        });

        const resultado = await res.json();

        if (res.ok) {
            // O seu back-end retorna: res.status(200).json({ novoPedido })
            const pedidoId = resultado.novoPedido ? resultado.novoPedido.id : null;

            Swal.fire({
                title: 'Pedido Gerado!',
                text: `Pedido #${pedidoId} aguardando pagamento.`,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });

            // Limpa o lixo do navegador
            localStorage.removeItem('carrinho');

            // 4. Redirecionamento para a tela de pagamento
            setTimeout(() => {
                if (pedidoId) {
                    window.location.href = `pagamento.html?id=${pedidoId}`;
                } else {
                    window.location.href = 'meus-pedidos.html';
                }
            }, 2000);

        } else {
            // Tratamento de erros vindo do ErrosApp do Back-end
            console.error("Erro do servidor:", resultado);
            Swal.fire(
                'Erro ao Finalizar',
                resultado.mensagem || resultado.erro || 'Não foi possível processar seu pedido.',
                'error'
            );
        }
    } catch (e) {
        console.error("Erro de rede:", e);
        Swal.fire('Erro Fatal', 'Servidor offline ou erro de rede. Tente novamente mais tarde.', 'error');
    }
};