import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form } from './style';
import useContactForm from './useContactForm';

export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    isLoadingCategories, categories,
    handleFields, fields, getErrorMessageByFieldName,
    isSubmitting, handleSubmit, buttonIsDisabled,
  } = useContactForm(onSubmit, ref);

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
        disabled={buttonIsDisabled}
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
