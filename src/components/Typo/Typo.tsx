'use client';
import { FunctionComponent, HTMLAttributes, PropsWithChildren, ReactNode, useMemo } from 'react';
import HtmlTag from '../HtmlTag';
import { useOnMobile } from '@/hooks/layout';
import FONTS from '../../layout/fonts';
import styles from './Typo.module.css';

type TypoColor = 'dark' | 'light' | 'primary' | 'secondary' | string;
type TypoVariant = 'text' | 'paragraph' | 'header1' | 'header2' | 'header3';
type TypoAlign = 'center' | 'left' | 'right' | 'justify';

export interface TypoProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  align?: TypoAlign;
  bold?: boolean;
  capitalize?: boolean;
  className?: string;
  children: ReactNode;
  color?: TypoColor;
  tag?: keyof JSX.IntrinsicElements;
  variant?: TypoVariant;
  underline?: boolean;
}

/**
 * Renders text content with given variant
 * @component Typo
 * @param {TypoAlign} [align] - way to align text, defaults to 'left'
 * @param {boolean} [bold] - whether to render bold text or not
 * @param {boolean} [capitalize] - whether to render capitalize text or not
 * @param {TypoColor} [color] - color to render, defaults to 'dark'
 * @param {string} [tag] - HTML tag to render, defaults to 'span'
 * @param {string} [variant] - variant to render, defaults to 'text'
 * @param {boolean} [underline] - whether to render underline text or not
 */
const Typo: FunctionComponent<TypoProps> = ({
  align = 'left',
  bold,
  capitalize,
  children,
  className,
  color = 'dark',
  style,
  tag = 'span',
  variant = 'text',
  underline,
  ...restOfProps
}) => {
  const onMobile = useOnMobile();

  const classToRender = useMemo((): string | undefined => {
    const resultAsArray = [
      onMobile ? styles.mobile : styles.desktop,
      (variant as string).includes('header') ? FONTS.poppins.className : FONTS.inter.className,
      styles[variant],
      styles[color],
      align && styles[align],
      bold && styles.bold,
      capitalize && styles.capitalize,
      underline && styles.underline,
      className,
    ];
    const resultAsString: string = resultAsArray.filter(Boolean).join(' ');
    return Boolean(resultAsString) ? resultAsString : undefined;
  }, [align, bold, color, capitalize, className, onMobile, variant, underline]);

  const styleToRender = useMemo(
    () => ({
      ...(!styles?.[color] && { color }), // if exact color is not defined in stylesShared, pass the color as style
      ...style,
    }),
    [color, style]
  );

  return (
    <HtmlTag className={classToRender} style={styleToRender} tag={tag} {...restOfProps}>
      {children}
    </HtmlTag>
  );
};

export default Typo;
