const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const cargo = "cliente";

        try {
            const response = await fetch('https://loja-online-deshboard-production.up.railway.app/usuarios/cadastro',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    idade: Number(idade),
                    email,
                    senha,
                    cargo
                })
            });

            const data = await response.json();

            if (response.ok) {
                
                Swal.fire({
                    title: 'Tudo pronto!',
                    text: 'Seu cadastro foi realizado com sucesso. 🚀',
                    icon: 'success',
                    confirmButtonText: 'Ir para Login',
                    confirmButtonColor: '#28a745'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "login.html";
                    }
                });

            } else {
                
                Swal.fire({
                    title: 'Ops...',
                    text: data.mensagem || 'Houve um erro ao realizar o cadastro.',
                    icon: 'error',
                    confirmButtonText: 'Tentar de novo',
                    confirmButtonColor: '#d33'
                });
            }

        } catch (error) {
            console.error("Erro na requisição:", error);

            
            Swal.fire({
                title: 'Servidor Offline',
                text: 'Não consegui falar com o servidor. O back-end está ligado?',
                icon: 'warning',
                confirmButtonText: 'Verificar conexão',
                confirmButtonColor: '#f39c12'
            });
        }
    });
}