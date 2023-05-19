import styled from 'styled-components';

export const Container = styled.figure`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-top: 1rem;

  figcaption {
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-all;
    margin-top: 1rem;
  }
`;
