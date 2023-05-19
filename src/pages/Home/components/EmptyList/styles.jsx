import styled from 'styled-components';

export const Container = styled.figure`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[200]};

  strong {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  figcaption {
    text-align: center;
    margin-top: 8px;
  }
`;
