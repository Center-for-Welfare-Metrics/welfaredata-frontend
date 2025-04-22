import styled, { CSSProperties, css } from "styled-components";
import { ThemeColors, ThemeColorsType } from "theme/globalStyle";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body1"
  | "body1Bold"
  | "body2"
  | "body2Bold"
  | "caption";
type TextAlign = "left" | "center" | "right";

const variants: Record<TextVariant, any> = {
  h1: css`
    font-size: 24px;
    font-weight: 700;
  `,
  h2: css`
    font-size: 20px;
    font-weight: 700;
  `,
  h3: css`
    font-size: 18px;
    font-weight: 700;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 400;
  `,
  body1Bold: css`
    font-size: 16px;
    font-weight: 700;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 400;
  `,
  body2Bold: css`
    font-size: 14px;
    font-weight: 700;
  `,
  caption: css`
    font-size: 12px;
    font-weight: 400;
  `,
};

interface TextProps extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
  color?: ThemeColorsType;
  customColor?: string;
  variant?: TextVariant;
  fontSize?: string;
  fontWeight?: CSSProperties["fontWeight"];
  align?: TextAlign;
  opacity?: number;
  mt?: number;
  px?: number;
  whiteSpace?: CSSProperties["whiteSpace"];
  decoration?: CSSProperties["textDecoration"];
  textElipsis?: boolean;
  maxWidth?: string;
  minWidth?: string;
  transition?: CSSProperties["transition"];
  fontStyle?: CSSProperties["fontStyle"];
  letterSpacing?: CSSProperties["letterSpacing"];
  cursor?: CSSProperties["cursor"];
}

export const Text = ({
  children,
  customColor,
  variant = "body1",
  color = "white",
  fontSize,
  fontWeight,
  align,
  opacity,
  mt,
  px,
  whiteSpace,
  decoration,
  textElipsis,
  maxWidth,
  minWidth,
  transition,
  fontStyle,
  letterSpacing,
  cursor,
  ...rest
}: TextProps) => {
  return (
    <TextStyled
      style={{
        marginTop: mt ? `${mt}rem` : undefined,
        paddingInline: px ? `${px}rem` : undefined,
      }}
      $variant={variant}
      $color={customColor ?? ThemeColors[color]}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $align={align}
      $opacity={opacity}
      $whiteSpace={whiteSpace}
      $decoration={decoration}
      $textElipsis={textElipsis}
      $maxWidth={maxWidth}
      $minWidth={minWidth}
      $transition={transition}
      $fontStyle={fontStyle}
      $letterSpacing={letterSpacing}
      title={textElipsis ? (children as string) : undefined}
      $cursor={cursor}
      {...rest}
    >
      {children}
    </TextStyled>
  );
};

type TextStyledProps = {
  $variant: TextVariant;
  $color: string;
  $fontSize?: string;
  $fontWeight?: CSSProperties["fontWeight"];
  $align?: TextAlign;
  $opacity?: number;
  $whiteSpace?: string;
  $decoration?: CSSProperties["textDecoration"];
  $maxWidth?: string;
  $textElipsis?: boolean;
  $minWidth?: string;
  $transition?: CSSProperties["transition"];
  $fontStyle?: CSSProperties["fontStyle"];
  $letterSpacing?: CSSProperties["letterSpacing"];
  $cursor?: CSSProperties["cursor"];
};

const TextStyled = styled.span<TextStyledProps>`
  ${({ $variant }) => variants[$variant]}
  ${({ $color }) => css`
    color: ${$color};
  `}
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize};
    `}

  ${({ $fontWeight }) =>
    $fontWeight &&
    css`
      font-weight: ${$fontWeight};
    `}

  ${({ $align }) =>
    $align &&
    css`
      text-align: ${$align};
    `}

    ${({ $opacity }) =>
    $opacity &&
    css`
      opacity: ${$opacity};
    `}

    ${({ $whiteSpace }) =>
    $whiteSpace &&
    css`
      white-space: ${$whiteSpace};
    `}

    ${({ $decoration }) =>
    $decoration &&
    css`
      text-decoration: ${$decoration};
    `}

    ${({ $textElipsis }) =>
    $textElipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      max-width: 200px;
    `}

    ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}

    ${({ $minWidth }) =>
    $minWidth &&
    css`
      min-width: ${$minWidth};
    `}

    ${({ $transition }) =>
    $transition &&
    css`
      transition: ${$transition};
    `}

    ${({ $fontStyle }) =>
    $fontStyle &&
    css`
      font-style: ${$fontStyle};
    `}

    ${({ $letterSpacing }) =>
    $letterSpacing &&
    css`
      letter-spacing: ${typeof $letterSpacing === "string"
        ? $letterSpacing
        : `${$letterSpacing}px`};
    `}

    ${({ $cursor }) =>
    $cursor &&
    css`
      cursor: ${$cursor};
    `}
`;
