import styled, { css } from "styled-components";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* サイズによるスタイル変更 */
  ${(props) =>
    props.size === "small" &&
    css`
      padding: 6px 12px;
      font-size: 0.875rem;
    `}

  ${(props) =>
    (props.size === "medium" || !props.size) &&
    css`
      padding: 8px 16px;
      font-size: 1rem;
    `}
  
  ${(props) =>
    props.size === "large" &&
    css`
      padding: 10px 20px;
      font-size: 1.125rem;
    `}
  
  /* バリアントによるスタイル変更 */
  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: #3182ce;
      color: white;
      border: none;

      &:hover {
        background-color: #2b6cb0;
      }

      &:focus {
        box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.5);
        outline: none;
      }
    `}
  
  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: #e2e8f0;
      color: #2d3748;
      border: none;

      &:hover {
        background-color: #cbd5e0;
      }

      &:focus {
        box-shadow: 0 0 0 3px rgba(226, 232, 240, 0.5);
        outline: none;
      }
    `}
  
  ${(props) =>
    props.variant === "danger" &&
    css`
      background-color: #e53e3e;
      color: white;
      border: none;

      &:hover {
        background-color: #c53030;
      }

      &:focus {
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.5);
        outline: none;
      }
    `}
  
  /* 幅100%のスタイル */
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  
  /* 無効状態のスタイル */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};
