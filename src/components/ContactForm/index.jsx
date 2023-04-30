import { useState } from 'react';
import PropTypes from 'prop-types';

import useErrors from '../../hooks/useErrors';

import { isEmailValid } from '../../utils/email';
import { formatPhone } from '../../utils/phone';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form } from './style';

export function ContactForm({ buttonLabel }) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    telephone: '',
    category: '',
  });

  const { errors, setError, getErrorMessageByFieldName, removeError } = useErrors();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleFields(e) {
    const { name, value } = e.target;

    if (!value) {
      setError({ field: name, message: `${name} é obrigatório` });
    } else {
      removeError(name);
    }

    if (name === 'email' && !isEmailValid(value)) setError({ field: name, message: 'E-mail inválido' });

    if (name === 'telephone') {
      return setFields((prevState) => ({ ...prevState, [name]: formatPhone(value) }));
    }

    return setFields((prevState) => ({ ...prevState, [name]: value }));
  }

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
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('telephone')}>
        <Input
          type="tel"
          placeholder="Telefone"
          name="telephone"
          value={fields.telephone}
          maxLength={15}
          onChange={handleFields}
          error={getErrorMessageByFieldName('telephone')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('category')}>
        <Select
          name="category"
          value={fields.category}
          onChange={handleFields}
        >
          <option value="" disabled>Categoria</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Facebook">Facebook</option>
        </Select>
      </FormGroup>

      <Button type="submit" disabled={errors.length}>{buttonLabel}</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.node.isRequired,
};
