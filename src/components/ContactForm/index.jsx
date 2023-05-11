import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

import useErrors from '../../hooks/useErrors';

import { isEmailValid } from '../../utils/email';
import { formatPhone } from '../../utils/phone';

import CategoriesService from '../../services/CategoriesService';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form } from './style';

export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
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

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome"
          name="name"
          value={fields.name}
          onChange={handleFields}
          error={getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={fields.email}
          onChange={handleFields}
          error={getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('phone')}>
        <Input
          type="tel"
          placeholder="Telefone"
          name="phone"
          value={fields.phone}
          maxLength={15}
          onChange={handleFields}
          error={getErrorMessageByFieldName('phone')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('category')}
        isLoading={isLoadingCategories}
      >
        <Select
          name="category"
          value={fields.category}
          onChange={handleFields}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="" disabled>Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Button
        type="submit"
        disabled={errors.length > 0}
        isLoading={isSubmitting}
      >
        {buttonLabel}
      </Button>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
