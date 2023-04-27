import PropTypes from 'prop-types';

import FormGroup from '../FormGroup';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form } from './style';

export function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input type="text" placeholder="Nome" />
      </FormGroup>

      <FormGroup>
        <Input type="email" placeholder="Email" />
      </FormGroup>

      <FormGroup>
        <Input type="tel" placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select placeholder="Categoria">
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Facebook">Facebook</option>
        </Select>
      </FormGroup>

      <Button type="submit">{buttonLabel}</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.node.isRequired,
};
