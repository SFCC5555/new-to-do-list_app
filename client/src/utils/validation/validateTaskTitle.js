const validateTaskTitle = (title, setValidateInputError) => {
  if (title.length === 0) {
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      title: "Title is required.",
    }));
    return false;
  }

  return true;
};

export { validateTaskTitle };
