const validateUsername = (username, setValidateInputError) => {
  if (username.length === 0) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      username: "Username is required.",
    }));
    return false;
  }

  if (username.length < 3) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      username: "Username must be between 3 and 30 characters.",
    }));
    return false;
  }

  if (!/^[a-zA-Z0-9_-]*$/.test(username)) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      username: "Username must contain only letters, numbers, or hyphens.",
    }));
    return false;
  }

  return true;
};

export { validateUsername };
