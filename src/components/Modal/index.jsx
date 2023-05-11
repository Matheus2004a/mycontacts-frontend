import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, Container, Footer } from './styles';

import Button from '../Button';

export default function Modal({
  visible, danger, isLoading, children,
  cancelLabel, confirmLabel, onCancel, onConfirm,
}) {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        {children}

        <Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>

          <Button
            type="button"
            danger={danger}
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  visible: false,
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
