import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
  }

  a {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    padding: 8px 16px;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bold;
    transition: all 0.5s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.primary.lighter};
    }
  }
`;
