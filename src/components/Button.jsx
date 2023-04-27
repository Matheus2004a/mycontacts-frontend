import styled, { css } from 'styled-components';

export default styled.button`
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: none;
  padding: 1rem 0;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #FFFFFF;
  font-weight: bold;
  transition: background 0.5s;

  &:hover {
    background: ${({ theme }) => theme.colors.danger.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc;
    cursor: not-allowed;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
    background: ${theme.colors.danger.light};
  }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
