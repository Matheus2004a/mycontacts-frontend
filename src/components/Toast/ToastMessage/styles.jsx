import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
    `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
    `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  color: #FFFFFF;
  padding: 1rem 2rem;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  animation: ${messageIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${messageOut} 0.3s;
  `}

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 12px;
  }
`;
