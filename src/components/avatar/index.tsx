import React, {HTMLAttributes,useMemo} from "react";
import styled, {css} from "styled-components";
import { color, typography } from "../shared/styles";
import { grow } from "../shared/animation";
import { Icon } from "../icon";


interface a11yProps {
  [key: string]: boolean | string;
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  // 是否加载中
  isLoading?: boolean;
  // 用户名
  username?: string;
  // 图片地址
  src?: string | null;
  // 头像大小
  size?: keyof typeof AvatarSizes;
}

export const AvatarSizes = {
  large: 40,
  medium: 28,
  small: 20,
  tiny: 16,
};

const Image = styled.div<AvatarProps>`
  background: ${(props) => (!props.isLoading ? 'transparent' : color.light)};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;

  height: ${AvatarSizes.medium}px;
  width: ${AvatarSizes.medium}px;
  line-height: ${AvatarSizes.medium}px;

  ${(props) =>
    props.size === 'tiny' &&
    css`
      height: ${AvatarSizes.tiny}px;
      width: ${AvatarSizes.tiny}px;
      line-height: ${AvatarSizes.tiny}px;
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      height: ${AvatarSizes.small}px;
      width: ${AvatarSizes.small}px;
      line-height: ${AvatarSizes.small}px;
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      height: ${AvatarSizes.medium}px;
      width: ${AvatarSizes.medium}px;
      line-height: ${AvatarSizes.medium}px;
    `}

  ${(props) =>
    props.size === 'large' &&
    css`
      height: ${AvatarSizes.large}px;
      width: ${AvatarSizes.large}px;
      line-height: ${AvatarSizes.large}px;
    `}

  ${(props) =>
    !props.src &&
    css`
      background: ${!props.isLoading && '#37D5D3'};
    `}

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  svg {
    position: relative;
    bottom: -2px;
    height: 100%;
    width: 100%;
    vertical-align: top;
  }

  path {
    fill: ${color.medium};
    animation: ${grow} 1.5s ease-in-out infinite;
  }
`;

const Initial = styled.div<AvatarProps>`
  color: ${color.lightest};
  text-align: center;

  font-size: ${typography.size.s2}px;
  line-height: ${AvatarSizes.medium}px;

  ${(props) =>
    props.size === 'tiny' &&
    css`
      font-size: ${parseFloat(typography.size.s1) - 2}px;
      line-height: ${AvatarSizes.tiny}px;
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      font-size: ${typography.size.s1}px;
      line-height: ${AvatarSizes.small}px;
    `}

  ${(props) =>
    props.size === 'large' &&
    css`
      font-size: ${typography.size.s3}px;
      line-height: ${AvatarSizes.large}px;
    `}
`;

export function Avatar(props: AvatarProps) {
  const { size, src, username, isLoading } = props;
  const avatarFigure = useMemo(() => {
    let avatarFigure = <Icon icon="useralt" />;
    const a11yProps: a11yProps = {};
    if(isLoading) {
      a11yProps['aria-busy'] = true;
      a11yProps['aria-label'] = 'Loading avatar ...';
    }else if(src) {
      avatarFigure = <img src={src} alt={username}/>
    }else {
      a11yProps['aria-label'] = username!;
      avatarFigure = (<Initial size={size} aria-hidden='true'>
        {username!.substring(0, 1)}
      </Initial>);
    }
    return avatarFigure;
  }, [isLoading, src, size, username])
  return (
    <Image
      size={size}
      isLoading={isLoading}
      src={src}
      {...props}
    >
      {avatarFigure}
    </Image>
  )
}

Avatar.defaultProps = {
  isLoading: false,
  username: 'loading',
  src: null,
  size: 'mediumn'
}