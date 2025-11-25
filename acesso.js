// ARQUIVO: acesso.js (Versão Limpa - Fluxo de Sucesso)

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Referências aos elementos principais
    const formTitle = document.getElementById('form-title');
    const cadastroForm = document.getElementById('cadastro-form');
    const loginForm = document.getElementById('login-form');
    
    // Links de alternância
    const toggleToLogin = document.getElementById('toggle-to-login');
    const toggleToCadastro = document.getElementById('toggle-to-cadastro');

    // Referências do Modal de Recuperação
    const openRecovery = document.getElementById('open-recovery-modal');
    const closeRecovery = document.getElementById('close-recovery-modal');
    const recoveryModal = document.getElementById('recovery-modal');
    const recoveryForm = document.getElementById('recovery-form');
    const recoveryMessage = document.getElementById('recovery-message');


    // Função auxiliar para mostrar feedback
    function showFeedback(elementId, message, isSuccess) {
        const area = document.getElementById(elementId);
        if (!area) return;
        area.innerHTML = message;
        // Cor padrão: Vermelho escuro para erro (#780000) ou VERDE para sucesso (#006600)
        area.style.color = isSuccess ? '#006600' : '#780000';
    }
    
    // ----------------------------------------------------------------------
    // 🔄 Lógica de Alternância de Formulários
    // ----------------------------------------------------------------------

    function showForm(formToShow) {
        if(cadastroForm) cadastroForm.reset();
        if(loginForm) loginForm.reset();
        showFeedback('login-message', '', false);
        showFeedback('cadastro-message', '', false);
        if (recoveryMessage) recoveryMessage.innerHTML = ''; 

        if (formToShow === 'cadastro') {
            cadastroForm.classList.remove('hidden-form');
            loginForm.classList.add('hidden-form');
            formTitle.textContent = 'Cadastro';
        } else if (formToShow === 'login') {
            cadastroForm.classList.add('hidden-form');
            loginForm.classList.remove('hidden-form');
            formTitle.textContent = 'Login';
        }
    }

    if (toggleToLogin) {
        toggleToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('login');
        });
    }

    if (toggleToCadastro) {
        toggleToCadastro.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('cadastro'); 
        });
    }

    // ----------------------------------------------------------------------
    // 🛠️ Lógica de Cadastro
    // ----------------------------------------------------------------------

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const passwordInput = document.getElementById('reg-senha').value;
            const termosAceitos = document.getElementById('aceite-termos').checked;
            
            // Validações
            if (!termosAceitos) {
                showFeedback('cadastro-message', '❌ Você deve aceitar os Termos de Uso.', false);
                return;
            }
            if (passwordInput.length < 6) {
                showFeedback('cadastro-message', '❌ A senha deve ter no mínimo 6 caracteres.', false);
                return;
            }

            showFeedback('cadastro-message', ' Processando cadastro...', false);

            // SIMULAÇÃO DE ESPERA
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // MOSTRA A MENSAGEM E REDIRECIONA PARA O INDEX
            showFeedback('cadastro-message', 'Cadastro realizado com sucesso! Redirecionando para o Index...', true);
            
            cadastroForm.reset();
            // Redireciona para o index.html
            setTimeout(() => { window.location.href = 'index.html'; }, 1800); 
        });
    }
    
    // ----------------------------------------------------------------------
    // 🔑 Lógica de Login
    // ----------------------------------------------------------------------

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            showFeedback('login-message', ' Tentando login...', false);

            // SIMULAÇÃO DE ESPERA
            await new Promise(resolve => setTimeout(resolve, 800));

            // MOSTRA A MENSAGEM E REDIRECIONA PARA O INDEX
            showFeedback('login-message', 'Login realizado com sucesso! Redirecionando para o Index...', true);
            setTimeout(() => { window.location.href = 'index.html'; }, 1800);
        });
    }
    
    // ----------------------------------------------------------------------
    // 🔒 Lógica de Esqueci a Senha
    // ----------------------------------------------------------------------
    
    if (openRecovery && recoveryModal) {
        openRecovery.addEventListener('click', (e) => {
            e.preventDefault();
            if(recoveryForm) recoveryForm.reset();
            if (recoveryMessage) recoveryMessage.innerHTML = '';
            recoveryModal.classList.remove('hidden-element');
        });
    }

    if (closeRecovery && recoveryModal) {
        closeRecovery.addEventListener('click', () => {
            recoveryModal.classList.add('hidden-element');
        });
    }

    if (recoveryForm) {
        recoveryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            showFeedback('recovery-message', ' Enviando link de recuperação...', false);

            // SIMULAÇÃO DE ESPERA
            await new Promise(resolve => setTimeout(resolve, 800));

            // MOSTRA A MENSAGEM
            showFeedback('recovery-message', 'Sucesso! Um link para redefinir sua senha foi enviado para seu e-mail.', true);
            recoveryForm.reset();
        });
    }
});