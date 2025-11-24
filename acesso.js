// ARQUIVO: acesso.js

// 🚨 SUBSTITUA PELAS SUAS CHAVES DO SUPABASE!
const SUPABASE_URL = 'https://isticmrrszpueieovlqq.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdGljbXJyc3pwdWVpZW92bHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzEwMjcsImV4cCI6MjA3OTQwNzAyN30.M3NNmuKrVFm-i4wQTHpVI0s-M3SCwHtB5CK93RZ2QL4';

// Inicializa o cliente Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Referências aos elementos do Toggle e Formulários
    const showLoginBtn = document.getElementById('show-login');
    const showCadastroBtn = document.getElementById('show-cadastro');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const loginSubmitBtn = loginForm ? loginForm.querySelector('button[type="submit"]') : null;
    const forgotPasswordLink = document.getElementById('open-recovery-modal');
    const backToHomeBtn = document.getElementById('back-to-home'); // NOVO: Botão de voltar (Adicionado ao HTML)
    
    // 2. Referências aos elementos do Modal
    const openModalBtn = document.getElementById('open-recovery-modal');
    const closeModalBtn = document.getElementById('close-recovery-modal');
    const recoveryModal = document.getElementById('recovery-modal');
    const recoveryForm = document.getElementById('recovery-form');
    const recoveryMessageArea = document.getElementById('recovery-message');

    // Função auxiliar para mostrar feedback
    function showFeedback(elementId, message, isSuccess) {
        const area = document.getElementById(elementId);
        area.innerHTML = message;
        area.style.color = isSuccess ? '#006600' : '#FFDEB4';
    }

    // Função de Alternância
    function showForm(formToShow, buttonToActivate) {
        // 1. Oculta todos os formulários
        loginForm.classList.add('hidden-form');
        cadastroForm.classList.add('hidden-form');
        
        // 2. Remove o estado ativo de ambos os botões
        showLoginBtn.classList.remove('active');
        showCadastroBtn.classList.remove('active');

        // 3. Mostra o formulário desejado e ativa o botão
        formToShow.classList.remove('hidden-form');
        buttonToActivate.classList.add('active');

        // 4. Limpa as mensagens de feedback
        document.getElementById('login-message').innerHTML = '';
        document.getElementById('cadastro-message').innerHTML = '';

        // 5. Restaura o estado dos botões de Login
        if (loginSubmitBtn) loginSubmitBtn.style.display = 'block';
        if (forgotPasswordLink) forgotPasswordLink.style.display = 'block';
        if (backToHomeBtn) backToHomeBtn.classList.add('hidden-form');
    }

    // --- Listeners para o Toggle ---
    if(showLoginBtn) {
        showLoginBtn.addEventListener('click', () => showForm(loginForm, showLoginBtn));
    }
    if(showCadastroBtn) {
        showCadastroBtn.addEventListener('click', () => showForm(cadastroForm, showCadastroBtn));
    }

    // ----------------------------------------------------------------------
    // 🛠️ Lógica de Cadastro com Supabase (SIGN UP)
    // ----------------------------------------------------------------------

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const nomeInput = document.getElementById('reg-nome').value;
            const emailInput = document.getElementById('reg-email').value;
            const passwordInput = document.getElementById('reg-senha').value;
            const confirmInput = document.getElementById('reg-confirmar-senha').value;

            // Validações front-end (existentes)
            if (passwordInput !== confirmInput) {
                showFeedback('cadastro-message', '❌ As senhas digitadas não coincidem. Tente novamente.', false);
                return;
            }
            if (passwordInput.length < 6) {
                showFeedback('cadastro-message', '❌ A senha deve ter no mínimo 6 caracteres.', false);
                return;
            }

            showFeedback('cadastro-message', '⏳ Enviando cadastro...', false);
            
            // Chamada ao Supabase para Cadastro
            const { data, error } = await supabase.auth.signUp({
                email: emailInput,
                password: passwordInput,
                options: {
                    data: { full_name: nomeInput } // Guarda o nome como metadado
                }
            });

            if (error) {
                showFeedback('cadastro-message', `❌ Erro ao cadastrar: ${error.message}`, false);
            } else if (data.user && data.session) {
                showFeedback('cadastro-message', '✅ Cadastro e Login realizados com sucesso!', true);
                // Opcional: Redirecionar
                setTimeout(() => { window.location.href = 'index.html'; }, 1500); 
            } else if (data.user && !data.session) {
                // Supabase enviou e-mail de confirmação
                showFeedback('cadastro-message', '📧 Sucesso! Verifique seu e-mail para confirmar a conta antes de fazer login.', true);
                cadastroForm.reset();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 🛠️ Lógica de Login com Supabase (SIGN IN)
    // ----------------------------------------------------------------------

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('login-email').value;
            const passwordInput = document.getElementById('login-senha').value;
            
            showFeedback('login-message', '⏳ Tentando login...', false);

            // Chamada ao Supabase para Login
            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailInput,
                password: passwordInput,
            });

            if (error) {
                showFeedback('login-message', `❌ Erro no Login: ${error.message}`, false);
            } else if (data.user) {
                // LOGIN REALIZADO COM SUCESSO!
                showFeedback('login-message', '✅ Login realizado com sucesso! Use o botão abaixo para ir para a Home.', true);
                
                // Oculta botões de acesso
                if (loginSubmitBtn) loginSubmitBtn.style.display = 'none';
                if (forgotPasswordLink) forgotPasswordLink.style.display = 'none';

                // Mostra o botão de Voltar para Home
                if (backToHomeBtn) {
                    backToHomeBtn.classList.remove('hidden-form');
                }
            }
        });
    }
    
    // ----------------------------------------------------------------------
    // 🛠️ Lógica do Modal de Recuperação com Supabase (PASSWORD RECOVERY)
    // ----------------------------------------------------------------------

    if (openModalBtn && closeModalBtn && recoveryModal && recoveryForm) {
        
        // Abrir Modal
        openModalBtn.addEventListener('click', () => {
            recoveryModal.classList.remove('hidden-modal');
            recoveryMessageArea.innerHTML = ''; // Limpa a mensagem ao abrir
            recoveryForm.reset();
        });

        // Fechar Modal
        closeModalBtn.addEventListener('click', () => {
            recoveryModal.classList.add('hidden-modal');
        });

        // Fechar Modal clicando fora
        recoveryModal.addEventListener('click', (e) => {
            if (e.target === recoveryModal) {
                recoveryModal.classList.add('hidden-modal');
            }
        });

        // Submissão do formulário de Recuperação
        recoveryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const recoveryEmail = document.getElementById('recovery-email').value;
            
            showFeedback('recovery-message', '⏳ Enviando link de recuperação...', false);

            // Chamada ao Supabase para Recuperação de Senha
            const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail, {
                redirectTo: 'URL_PARA_REDEFINIR_SENHA_NO_SEU_SITE', // Deve ser configurada no Supabase
            });

            if (error) {
                showFeedback('recovery-message', `❌ Erro: ${error.message}`, false);
            } else {
                showFeedback('recovery-message', '📧 Link de recuperação enviado para o e-mail. Verifique sua caixa de spam.', true);
                recoveryForm.reset();
            }
        });
    }
});