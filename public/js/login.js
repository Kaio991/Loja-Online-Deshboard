// public/js/login.js

const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            // 1. Faz a chamada para o seu servidor Node.js
            const response = await fetch('https://loja-online-deshboard-production.up.railway.app/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            // LOG DE SEGURANÇA: Aperte F12 no navegador para conferir o campo 'nome'
            console.log("Dados recebidos do servidor:", data);

            if (response.ok) {
                // 2. SALVA OS DADOS NO LOCALSTORAGE
                localStorage.setItem('token', data.token);
                localStorage.setItem('cargo', data.cargo);

                // Pega o nome vindo do dataValues.nome do Backend
                // Se por algum motivo vier vazio, ele salva 'Usuário' para não dar undefined
                const nomeParaSalvar = data.nome || "Usuário";
                localStorage.setItem('usuarioNome', nomeParaSalvar);

                // 3. ALERTA DE SUCESSO (SweetAlert2)
                Swal.fire({
                    title: `Olá, ${nomeParaSalvar}!`,
                    text: 'Login realizado com sucesso. Redirecionando...',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                }).then(() => {
                    // 4. REDIRECIONAMENTO
                    // Se o login.html está em /pages/ e a index também, use "index.html"
                    window.location.href = "/pages/index.html";
                });

            } else {
                // Caso o backend retorne erro (Senha ou Email incorretos)
                Swal.fire({
                    title: 'Acesso Negado',
                    text: data.message || 'E-mail ou senha incorretos.',
                    icon: 'warning',
                    confirmButtonText: 'Tentar novamente',
                    confirmButtonColor: '#f0c040'
                });
            }
        } catch (error) {
            console.error("Erro ao logar:", error);
            Swal.fire({
                title: 'Erro de Conexão',
                text: 'Não foi possível falar com o servidor. Verifique o terminal do Node.',
                icon: 'error',
                confirmButtonText: 'Entendi',
                confirmButtonColor: '#d33'
            });
        }
    });
}