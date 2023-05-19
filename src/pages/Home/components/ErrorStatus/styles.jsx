import styled from 'styled-components';

export const Container = styled.figure`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 24px;

  strong {
    display: block;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.danger.main};
  }

  button {
    width: calc(100% - 50%);
  }
`;
