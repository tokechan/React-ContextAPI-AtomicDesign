import styled, { css } from "styled-components";
import React from "react";

type InputSize = "small" | "medium" | "large";
type InputVariant = "default" | "outlined" | "filled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $inputSize?: InputSize; // sizeからinputSizeに変更
  variant?: InputVariant;
  $fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
}

const InputContainer = styled.div<{ $fullWidth?: boolean; error?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  position: relative;

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledInput = styled.input<InputProps>`
  font-family: inherit;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  color: #333;

  /* サイズによるスタイル変更 */
  ${(props) =>
    props.$inputSize === "small" &&
    css`
      padding: 6px 12px;
      font-size: 0.875rem;
    `}

  ${(props) =>
    (props.$inputSize === "medium" || !props.$inputSize) &&
    css`
      padding: 8px 16px;
      font-size: 1rem;
    `}
  
  ${(props) =>
    props.$inputSize === "large" &&
    css`
      padding: 10px 20px;
      font-size: 1.125rem;
    `}
  
  /* バリアントによるスタイル変更 */
  ${(props) =>
    (props.variant === "default" || !props.variant) &&
    css`
      border: 1px solid #cbd5e0;
      background-color: white;

      &:focus {
        border-color: #3182ce;
        box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
        outline: none;
      }
    `}
  
  ${(props) =>
    props.variant === "outlined" &&
    css`
      border: 2px solid #cbd5e0;
      background-color: transparent;

      &:focus {
        border-color: #3182ce;
        box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
        outline: none;
      }
    `}
  
  ${(props) =>
    props.variant === "filled" &&
    css`
      border: none;
      background-color: #e2e8f0;

      &:focus {
        background-color: #edf2f7;
        box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
        outline: none;
      }
    `}
  
  /* エラー状態のスタイル */
  ${(props) =>
    props.error &&
    css`
      border-color: #e53e3e;

      &:focus {
        border-color: #e53e3e;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2);
      }
    `}
  
  /* 幅100%のスタイル */
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
`;

const HelperText = styled.span<{ error?: boolean }>`
  font-size: 0.75rem;
  margin-top: 4px;

  ${(props) =>
    props.error &&
    css`
      color: #e53e3e;
    `}
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      $inputSize = "medium",
      variant = "default",
      $fullWidth,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <InputContainer $fullWidth={$fullWidth} error={error} className={className}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledInput
          ref={ref}
          $inputSize={$inputSize}
          variant={variant}
          $fullWidth={$fullWidth}
          error={error}
          {...props}
        />
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = "Input";
