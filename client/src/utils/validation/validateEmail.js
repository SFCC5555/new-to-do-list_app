const validateEmail = (email, setValidateInputError) => {
  if (email.length === 0) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      email: "Email is required.",
    }));
    return false;
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      email: "Invalid email.",
    }));
    return false;
  }

  return true;
};
export { validateEmail };
