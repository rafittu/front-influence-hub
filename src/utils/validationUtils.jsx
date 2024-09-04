export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const zipcodeRegex = /^\d{8}$/;

export const isPasswordValid = (password) => {
  const minLength = 7;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumberOrSymbol = /[\d\W]/.test(password);

  return {
    minLength: password.length >= minLength,
    hasUppercase,
    hasLowercase,
    hasNumberOrSymbol,
  };
};

export const validateForm = (fullName, email, password, passwordConfirmation, setError) => {
  if (fullName.length < 3) {
    setError('Nome deve ter pelo menos 3 caracteres.');
    return false;
  }

  if (!emailRegex.test(email)) {
    setError('O e-mail é inválido.');
    return false;
  }

  if (!passwordRegex.test(password)) {
    setError('Senha fraca.');
    return false;
  }

  if (password !== passwordConfirmation) {
    setError('As senhas não coincidem.');
    return false;
  }

  return true;
};

export const validateCreateInfluencerForm = (formData, setError) => {
  const { name, email, zipCode } = formData;

  if (name.length < 3) {
    setError('Nome deve ter pelo menos 3 caracteres.');
    return false;
  }

  if (!emailRegex.test(email)) {
    setError('O e-mail é inválido.');
    return false;
  }

  if (!zipcodeRegex.test(zipCode)) {
    setError('O CEP deve conter somente números.');
    return false;
  }

  return true;
};
