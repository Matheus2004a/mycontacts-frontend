import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3.5px);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 24px;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;

  h1 {
    font-size: 22px;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray[900])}
  }

  p {
    margin-top: 8px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  button {
    width: 100%;
    max-width: 94px;
    padding: 10px 1rem;
  }
`;