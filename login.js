// js/login.js - VERSÃO FINAL CORRIGIDA

// =======================================================
// 1. CONFIGURAÇÃO E CONEXÃO COM SUPABASE
// Esta parte pode ficar fora, pois não depende do DOM
// =======================================================
const SUPABASE_URL = 'https://isticmrrszpueieovlqq.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdGljbXJyc3pwdWVpZW92bHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzEwMjcsImV4cCI6MjA3OTQwNzAyN30.M3NNmuKrVFm-i4wQTHpVI0s-M3SCwHtB5CK93RZ2QL4';

// NOTA: Certifique-se de que a biblioteca Supabase está carregada no HTML antes deste script.
// O seu HTML já faz isso: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// =======================================================
// 2. LÓGICA PRINCIPAL - EXECUTADA APÓS O DOM ESTAR PRONTO
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 🔴 CORREÇÃO: CAPTURA DE TODOS OS ELEMENTOS DO DOM AGORA AQUI DENTRO 🔴
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const loginMessage = document.getElementById('login-message');
    const cadastroMessage = document.getElementById('cadastro-message');
    const showLoginBtn = document.getElementById('show-login');
    const showCadastroBtn = document.getElementById('show-cadastro');
    const forgotPasswordBtn = document.getElementById('forgot-password-btn'); 

    // Elementos do Modal de Recuperação de Senha
    const recoveryModal = document.getElementById('recovery-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const recoveryForm = document.getElementById('recovery-form');
    const recoveryEmailInput = document.getElementById('recovery-email');
    const recoveryMessage = document.getElementById('recovery-message');

    // =======================================================
    // 3. LÓGICA DE ALTERNÂNCIA DE FORMULÁRIO (Toggle) - Reescrita como função local
    // =======================================================

    function toggleForm(formToShow) {
        // Agora sabemos que os elementos existem, pois foram capturados acima
        if (formToShow === 'login') {
            loginForm?.classList.remove('hidden-form');
            cadastroForm?.classList.add('hidden-form');
            showLoginBtn?.classList.add('active');
            showCadastroBtn?.classList.remove('active');
        } else if (formToShow === 'cadastro') {
            cadastroForm?.classList.remove('hidden-form');
            loginForm?.classList.add('hidden-form');
            showCadastroBtn?.classList.add('active');
            showLoginBtn?.classList.remove('active');
        }
        if (loginMessage) loginMessage.textContent = '';
        if (cadastroMessage) cadastroMessage.textContent = '';
    }

    // Inicializa o estado do formulário
    toggleForm('login'); 
    
    // Event Listeners para o Toggle
    showLoginBtn?.addEventListener('click', () => toggleForm('login'));
    showCadastroBtn?.addEventListener('click', () => toggleForm('cadastro'));

    // 🔴 O BOTÃO AGORA FUNCIONA: Event Listener do botão "Esqueceu a Senha" 🔴
    forgotPasswordBtn?.addEventListener('click', () => {
        const loginEmail = document.getElementById('login-email')?.value || '';
        if (loginEmail && recoveryEmailInput) {
            recoveryEmailInput.value = loginEmail;
        }
        // Abre o modal
        recoveryModal?.classList.remove('hidden-modal');
        if (recoveryMessage) recoveryMessage.textContent = '';
    });
    
    // Event Listener para fechar o modal
    closeModalBtn?.addEventListener('click', () => {
        recoveryModal?.classList.add('hidden-modal');
    });

    // Fechar modal clicando fora
    recoveryModal?.addEventListener('click', (e) => {
        if (e.target.id === 'recovery-modal') {
            recoveryModal.classList.add('hidden-modal');
        }
    });

    // =======================================================
    // 4. LÓGICA DE LOGIN (Submit)
    // =======================================================

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (loginMessage) {
            loginMessage.textContent = 'Verificando...';
            loginMessage.style.color = 'orange';
        }

        const email = document.getElementById('login-email')?.value;
        const senha = document.getElementById('login-senha')?.value;

        if (!email || !senha) return; // Segurança contra campos vazios

        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

        if (error) {
            if (loginMessage) {
                loginMessage.textContent = `Erro no Login: ${error.message}`;
                loginMessage.style.color = 'red';
            }
            return;
        }

        if (loginMessage) {
            loginMessage.textContent = 'Login bem-sucedido! Redirecionando...';
            loginMessage.style.color = 'green';
        }
        
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 1000);
    });


    // =======================================================
    // 5. LÓGICA DE CADASTRO (Submit)
    // =======================================================

    cadastroForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (cadastroMessage) {
            cadastroMessage.textContent = 'Cadastrando...';
            cadastroMessage.style.color = 'orange';
        }

        const nome = document.getElementById('cadastro-nome')?.value;
        const email = document.getElementById('cadastro-email')?.value;
        const senha = document.getElementById('cadastro-senha')?.value;
        
        if (!nome || !email || !senha) return; // Segurança

        // 1. Cria o usuário no sistema de autenticação
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: senha,
        });

        if (authError) {
            if (cadastroMessage) {
                cadastroMessage.textContent = `Erro no cadastro: ${authError.message}`;
                cadastroMessage.style.color = 'red';
            }
            return;
        }

        // 2. Insere o perfil na tabela 'clientes'
        const newUserId = authData.user.id; 

        const { error: profileError } = await supabase
            .from('clientes')
            .insert([{ id: newUserId, nome: nome, is_admin: false }]);

        if (profileError) {
            if (cadastroMessage) {
                cadastroMessage.textContent = `Erro ao salvar perfil. Por favor, tente novamente.`;
                cadastroMessage.style.color = 'orange';
            }
            console.error('Erro ao criar perfil:', profileError.message);
            return;
        }

        if (cadastroMessage) {
            cadastroMessage.textContent = 'Cadastro concluído! Redirecionando...';
            cadastroMessage.style.color = 'green';
        }
        
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 2000);
    });


    // =======================================================
    // 6. LÓGICA DE ENVIO DE RECUPERAÇÃO DE SENHA (Do Modal Submit)
    // =======================================================
    recoveryForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = recoveryEmailInput?.value;
        if (!email) return;

        if (recoveryMessage) {
            recoveryMessage.textContent = 'Enviando link de redefinição...';
            recoveryMessage.style.color = 'orange';
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            // Opcional: URL de redirecionamento após a redefinição
        });

        if (error) {
            if (recoveryMessage) {
                recoveryMessage.textContent = `Erro: ${error.message}. Verifique o e-mail.`;
                recoveryMessage.style.color = 'red';
            }
            return;
        }

        if (recoveryMessage) {
            recoveryMessage.textContent = `Link de redefinição enviado para ${email}. Verifique sua caixa de entrada!`;
            recoveryMessage.style.color = 'green';
        }
        
        setTimeout(() => {
            recoveryModal?.classList.add('hidden-modal');
        }, 5000);
    });
});