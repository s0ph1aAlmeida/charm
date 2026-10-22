document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-copiar-endereco]").forEach(botao => {
    botao.addEventListener("click", async () => {
      const cartao = botao.closest(".home-localizacao-card");
      const feedback = cartao.querySelector("[data-feedback-copia]");

      try {
        await navigator.clipboard.writeText(botao.dataset.copiarEndereco);
        feedback.textContent = "Endereço copiado.";
      } catch {
        const campo = document.createElement("textarea");
        campo.value = botao.dataset.copiarEndereco;
        campo.style.position = "fixed";
        campo.style.opacity = "0";
        document.body.append(campo);
        campo.select();
        const copiado = document.execCommand("copy");
        campo.remove();
        feedback.textContent = copiado ? "Endereço copiado." : "Não foi possível copiar o endereço.";
      }
    });
  });

  const cpfInput = document.getElementById("cpf");
  const formulario = document.querySelector("#form-cadastro");
  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmar-senha");
  const statusCadastro = document.getElementById("status-cadastro");

  const formatarCpf = valor => {
    const apenasNumeros = valor.replace(/\D/g, "").slice(0, 11);
    if (apenasNumeros.length <= 3) return apenasNumeros;
    if (apenasNumeros.length <= 6) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3)}`;
    if (apenasNumeros.length <= 9) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6)}`;
    return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9)}`;
  };

  const validarCpf = valor => {
    const cpf = valor.replace(/\D/g, "");

    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i += 1) {
      soma += Number(cpf.charAt(i)) * (10 - i);
    }

    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10) primeiroDigito = 0;

    if (primeiroDigito !== Number(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i += 1) {
      soma += Number(cpf.charAt(i)) * (11 - i);
    }

    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10) segundoDigito = 0;

    return segundoDigito === Number(cpf.charAt(10));
  };

  if (cpfInput) {
    cpfInput.addEventListener("input", event => {
      event.target.value = formatarCpf(event.target.value);
      event.target.setCustomValidity(validarCpf(event.target.value) ? "" : "CPF inválido.");
    });

    cpfInput.addEventListener("blur", () => {
      if (cpfInput.value && !validarCpf(cpfInput.value)) {
        cpfInput.setCustomValidity("CPF inválido.");
        cpfInput.reportValidity();
      } else {
        cpfInput.setCustomValidity("");
      }
    });
  }

  const validarConfirmacaoSenha = () => {
    if (!confirmarSenhaInput || !senhaInput) return;
    confirmarSenhaInput.setCustomValidity(
      confirmarSenhaInput.value && confirmarSenhaInput.value !== senhaInput.value
        ? "As senhas não coincidem."
        : ""
    );
  };

  senhaInput?.addEventListener("input", validarConfirmacaoSenha);
  confirmarSenhaInput?.addEventListener("input", validarConfirmacaoSenha);

  if (formulario) {
    formulario.addEventListener("submit", event => {
      if (cpfInput && !validarCpf(cpfInput.value)) {
        event.preventDefault();
        cpfInput.setCustomValidity("CPF inválido.");
        cpfInput.reportValidity();
        cpfInput.focus();
        return;
      }

      if (cpfInput) {
        cpfInput.setCustomValidity("");
      }

      event.preventDefault();
      formulario.reset();
      statusCadastro.textContent = "Dados validados somente nesta página. Nenhum cadastro foi enviado ou armazenado; é necessário integrar um serviço seguro.";
    });
  }
});