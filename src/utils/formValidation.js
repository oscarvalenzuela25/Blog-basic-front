function removeClassErrorSuccess(inputData) {
  inputData.parentNode.classList.remove("success");
  inputData.parentNode.classList.remove("error");
}

export const minLengthValidation = (inputData, min) => {
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  if (value.length >= min) {
    inputData.parentNode.classList.add("success");
    return true;
  } else {
    inputData.parentNode.classList.add("error");
    return false;
  }
};

export const emailValidation = inputData => {
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = inputData;

  removeClassErrorSuccess(inputData);
  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    inputData.parentNode.classList.add("success");
    return true;
  } else {
    inputData.parentNode.classList.add("error");
    return false;
  }
};
