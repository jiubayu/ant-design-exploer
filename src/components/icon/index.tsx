import React from "react";
import styled, { css } from "styled-components";
import { icons } from "../shared/icons";
import { typography } from "../shared/styles";


type sizeType = 'middle' | 'small' | 'large' 
export interface IconProps {
  icon: keyof typeof icons;
  /** 是否块级元素 */
  block?: boolean;
  color?: string;
  size?: sizeType;
}

const Svg = styled.svg<IconProps>`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  vertical-align: middle;

  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);

  ${(props) =>
    props.size === 'small' &&
    css`
      width: ${typography.size.s1}px;
      height: ${typography.size.s1}px;
    `}
  ${(props) =>
    props.size === 'middle' &&
    css`
      width: ${typography.size.s2}px;
      height: ${typography.size.s2}px;
    `}
   ${(props) =>
    props.size === 'large' &&
    css`
      width: ${typography.size.s2}px;
      height: ${typography.size.s2}px;
    `}
`;
const Path = styled.path`
  fill: ${(props) => props.color};
`;
export function Icon(props: IconProps) {
  const {icon, color, block} = props;
  return (
    <Svg
      viewBox='0 0 1024 1024'
      block={block}
      data-testid='icon-path'
      {...props}
    >
      <Path color={color} data-testid='icon-svg' d={icons[icon]} />
    </Svg>
  );
}
Icon.defaultProps = {
  block: false,
  color: 'black',
  size: 'middle'
}