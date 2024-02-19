const validatePassword = (password, setValidateInputError) => {
  if (password.length === 0) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      password: "Password is required.",
    }));
    return false;
  }

  if (password.length < 6) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      password: "Password must be between 3 and 16 characters.",
    }));
    return false;
  }

  if (!/^(?=.*[0-9]).+$/.test(password)) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      password: "Password must contain at least one number.",
    }));
    return false;
  }

  if (!/^(?=.*[!@#$%^&*()_+\-=]).+$/.test(password)) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      password:
        "Password must contain at least one special character (!@#$%^&*()-_+=).",
    }));
    return false;
  }

  if (!/^(?=.*[a-z]).+$/.test(password)) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      password: "Password must contain at least one lowercase letter.",
    }));
    return false;
  }

  if (!/^(?=.*[A-Z]).+$$/.test(password)) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      password: "Password must contain at least one uppercase letter.",
    }));
    return false;
  }

  return true;
};

export { validatePassword };
