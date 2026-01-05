document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Função de validação solicitada
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Intercepta o evento submit
        let isFormValid = true;

        // 1. Validação do Nome (Vazio vs Nome Completo)
        const nameValue = nameInput.value.trim();
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ']+(\s+[A-Za-zÀ-ÖØ-öø-ÿ']+)+$/;

        if (nameValue === "") {
            exibirErro(nameInput, "Nome obrigatório.");
            isFormValid = false;
        } else if (!nameRegex.test(nameValue)) {
            exibirErro(nameInput, "Por favor, informe seu nome completo.");
            isFormValid = false;
        } else {
            removerErro(nameInput);
        }

        // 2. Validação do E-mail (Vazio vs Formato Inválido)
        const emailValue = emailInput.value.trim();

        if (emailValue === "") {
            exibirErro(emailInput, "E-mail obrigatório.");
            isFormValid = false;
        } else if (!validarEmail(emailValue)) {
            exibirErro(emailInput, "Por favor, insira um e-mail válido.");
            isFormValid = false;
        } else {
            removerErro(emailInput);
        }

        // 3. Sucesso
        if (isFormValid) {
            toast.classList.add('show');
            form.reset();
            setTimeout(() => toast.classList.remove('show'), 4000);
        }
    });

    // Funções auxiliares para manipulação visual
    function exibirErro(input, mensagem) {
        const group = input.parentElement;
        const msgSpan = group.querySelector('.error-message');
        msgSpan.textContent = mensagem;
        group.classList.add('error');
    }

    function removerErro(input) {
        input.parentElement.classList.remove('error');
    }

    // Limpa o erro enquanto o usuário digita
    [nameInput, emailInput].forEach(input => {
        input.addEventListener('input', () => removerErro(input));
    });
});