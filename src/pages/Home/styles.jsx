import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
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
