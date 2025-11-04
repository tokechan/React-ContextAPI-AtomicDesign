import styled, { css } from "styled-components";
import React from "react";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";
type TextWeight = "normal" | "bold" | "light";
type TextAlign = "left" | "center" | "right";

interface TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

// 共通のスタイルを定義
const textStyles = css<TextProps>`
  margin: 0;
  color: ${(props) => props.color || "#666"};

  /* バリアントによるスタイル変更 */
  ${(props) =>
    props.variant === "h1" &&
    css`
      font-size: 2.5rem;
      font-weight: bold;
      line-height: 1.2;
    `}

  ${(props) =>
    props.variant === "h2" &&
    css`
      font-size: 2rem;
      font-weight: bold;
      line-height: 1.2;
    `}
  
  ${(props) =>
    props.variant === "h3" &&
    css`
      font-size: 1.75rem;
      font-weight: bold;
      line-height: 1.3;
    `}
  
  ${(props) =>
    props.variant === "h4" &&
    css`
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.3;
    `}
  
  ${(props) =>
    props.variant === "h5" &&
    css`
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 1.4;
    `}
  
  ${(props) =>
    props.variant === "h6" &&
    css`
      font-size: 1rem;
      font-weight: bold;
      line-height: 1.4;
    `}
  
  ${(props) =>
    props.variant === "p" &&
    css`
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    `}
  
  ${(props) =>
    props.variant === "span" &&
    css`
      font-size: 1rem;
      line-height: 1.5;
    `}
  
  ${(props) =>
    props.variant === "label" &&
    css`
      font-size: 0.875rem;
      line-height: 1.5;
      display: inline-block;
      margin-bottom: 0.5rem;
    `}
  
  /* フォントの太さ */
  ${(props) =>
    props.weight === "bold" &&
    css`
      font-weight: 700;
    `}
  
  ${(props) =>
    props.weight === "normal" &&
    css`
      font-weight: 400;
    `}
  
  ${(props) =>
    props.weight === "light" &&
    css`
      font-weight: 300;
    `}
  
  /* テキストの配置 */
  ${(props) =>
    props.align === "center" &&
    css`
      text-align: center;
    `}
  
  ${(props) =>
    props.align === "right" &&
    css`
      text-align: right;
    `}
  
  ${(props) =>
    props.align === "left" &&
    css`
      text-align: left;
    `}
  
  /* 色 */
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

// 各要素タイプごとにスタイル付きコンポーネントを作成
const StyledH1 = styled.h1<TextProps>`
  ${textStyles}
`;
const StyledH2 = styled.h2<TextProps>`
  ${textStyles}
`;
const StyledH3 = styled.h3<TextProps>`
  ${textStyles}
`;
const StyledH4 = styled.h4<TextProps>`
  ${textStyles}
`;
const StyledH5 = styled.h5<TextProps>`
  ${textStyles}
`;
const StyledH6 = styled.h6<TextProps>`
  ${textStyles}
`;
const StyledP = styled.p<TextProps>`
  ${textStyles}
`;
const StyledSpan = styled.span<TextProps>`
  ${textStyles}
`;
const StyledLabel = styled.label<TextProps>`
  ${textStyles}
`;

export const Text = ({ variant = "span", children, ...props }: TextProps) => {
  switch (variant) {
    case "h1":
      return (
        <StyledH1 variant={variant} {...props}>
          {children}
        </StyledH1>
      );
    case "h2":
      return (
        <StyledH2 variant={variant} {...props}>
          {children}
        </StyledH2>
      );
    case "h3":
      return (
        <StyledH3 variant={variant} {...props}>
          {children}
        </StyledH3>
      );
    case "h4":
      return (
        <StyledH4 variant={variant} {...props}>
          {children}
        </StyledH4>
      );
    case "h5":
      return (
        <StyledH5 variant={variant} {...props}>
          {children}
        </StyledH5>
      );
    case "h6":
      return (
        <StyledH6 variant={variant} {...props}>
          {children}
        </StyledH6>
      );
    case "p":
      return (
        <StyledP variant={variant} {...props}>
          {children}
        </StyledP>
      );
    case "label":
      return (
        <StyledLabel variant={variant} {...props}>
          {children}
        </StyledLabel>
      );
    case "span":
    default:
      return (
        <StyledSpan variant={variant} {...props}>
          {children}
        </StyledSpan>
      );
  }
};
