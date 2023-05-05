import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    height: 50px;
    padding-left: 16px;
    border: none;
    border-radius: 25px;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  margin-top: 32px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  padding-bottom: 1rem;

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

export const ListContainer = styled.div`
  margin-top: 24px;

  header {
    margin-bottom: 8px;

    .sort-button {
      display: flex;
      align-items: center;
      gap: 8.5px;
      background: transparent;
      border: none;

      span {
        font-weight: bold;
      }

      img {
        transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)')};
        transition: transform 0.2s ease-in;
      }
    }
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 1rem;

  & + & {
    margin-top: 1rem;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        padding: 3px 6px;
        border-radius: 4px;
        text-transform: uppercase;
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      background: transparent;
      border: none;
    }
  }
`;

export const ErrorContainer = styled.figure`
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

export const EmptyListContainer = styled.figure`
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

export const SearchNotFoundContainer = styled.figure`
  display: flex;
  align-items: flex-start;
  gap: 24px;

  figcaption {
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-all;
    margin-top: 1rem;
  }
`;
