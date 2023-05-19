import { useState, useCallback, useImperativeHandle, useEffect } from 'react';

import { isEmailValid } from '../../utils/email';
import { formatPhone } from '../../utils/phone';

import CategoriesService from '../../services/CategoriesService';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import useErrors from '../../hooks/useErrors';

export default function useContactForm(onSubmit, ref) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
  });

  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, setError, getErrorMessageByFieldName, removeError } = useErrors();

  const buttonIsDisabled = !fields.name || errors.length > 0;

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      Object.entries(contact).forEach(([key, value]) => {
        setFields((prevState) => ({ ...prevState, [key]: value }));
      });
    },

    resetFields: () => {
      Object.entries(fields).forEach(([key]) => {
        setFields((prevState) => ({ ...prevState, [key]: '' }));
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await onSubmit(fields);

    setIsSubmitting(false);
  }

  function handleFields(e) {
    const { name, value } = e.target;

    if (!value) {
      setError({ field: name, message: `${name} é obrigatório` });
    } else {
      removeError(name);
    }

    if (name === 'email' && !isEmailValid(value)) setError({ field: name, message: 'E-mail inválido' });

    if (name === 'phone') {
      return setFields((prevState) => ({ ...prevState, [name]: formatPhone(value) }));
    }

    return setFields((prevState) => ({ ...prevState, [name]: value }));
  }

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);
    } catch { } finally {
      setIsLoadingCategories(false);
    }
  }, [setCategories, setIsLoadingCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    fields,
    categories,
    isLoadingCategories,
    isSubmitting,
    buttonIsDisabled,
    getErrorMessageByFieldName,
    handleSubmit,
    handleFields,
  };
}
