import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExist = errors.find((error) => error.field === 'email');

    if (errorAlreadyExist) return;

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  function removeError(fieldName) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }

  return {
    errors,
    setError,
    getErrorMessageByFieldName,
    removeError,
  };
}
