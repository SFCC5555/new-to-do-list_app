const validateTaskDescription = (description, setValidateInputError) => {
  if (description.length === 0) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      description: "Description is required.",
    }));
    return false;
  }

  return true;
};

export { validateTaskDescription };
