import React, {PropsWithChildren, ReactNode, useEffect, useMemo, useState} from 'react';
import styled, { css } from 'styled-components';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import { color, messageBoxShadow, typography } from '../shared/styles';
import { iconSpin, messageCloseAnimate, messageOpenAnimate } from '../shared/animation';
import Icon from '../icon';

const MessageText = styled.span<{bg: string; fc: string}>`
  display: inline-block;
  padding: 10px 16px;
  background: ${(props) => props.bg};
  color: ${(props) => props.fc};
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
  margin: 10px;
  ${messageBoxShadow};
  border-radius: 2px;
`;

const IconWrapper = styled.span<{spin?: boolean}>`
  margin-right: 10px;
  & > svg {
    font-size: ${typography.size.s2}px;
    ${(props) =>
      props.spin &&
      css`
        animation: ${iconSpin} 2s linear infinite;
      `}
  }
`;

const MessageTextWrapper = styled.div<{
  openState: boolean;
  closeState: boolean;
  ani: number;
}>`
  ${(props) =>
    props.openState &&
    css`
      animation: ${messageOpenAnimate} ${props.ani / 1000}s ease-in;
    `}
  ${(props) =>
    props.closeState &&
    css`
      animation: ${messageCloseAnimate} ${props.ani / 1000}s ease-in;
    `}
`;

let wrap: HTMLElement;
type Partial<T> = {
  [key in keyof T]?: T[key];
};
export function createMessage(type: MessageType) {
  return (content: ReactNode, config: Partial<MessageConfig> = {}) => {
    const fconfig = { ...config, ...defaultConfig };
    if (!wrap) {
      // 单例模式 如果有，说明已经调用这个方法了
      wrap = document.createElement('div');
      wrap.style.cssText = `
        line-height: 1.5;
        text-align: center;
        color: #333;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
        position: fixed;
        z-index: 100000;
        width: 100%;
        top: 16px;
        left: 0;
        pointer-events: none;
      `;
      if (wrap) {
        document.body && document.body.appendChild(wrap); // 挂在body上
      }
    }
    const divs = document.createElement('div');
    wrap.appendChild(divs);
    ReactDOM.render(
      <Message
        rootDom={wrap}
        parentDom={divs}
        content={content}
        fconfig={fconfig}
        iconType={type}
      />,
      divs
    );
  };
}

type MessageProps = {
  rootDom: HTMLElement; // 这个用来干掉parentDom,可以常驻
  parentDom: Element | DocumentFragment;
  content: ReactNode;
  fconfig: MessageConfig;
  iconType: MessageType;
};

export type MessageType = "info" | "success" | "error" | "warning" | "loading" | "default";

export interface MessageConfig {
  /** 挂载点*/
  mount: HTMLElement;
  /** 动画延迟时间 */
  delay: number;
  /** 结束后回调 */
  callback: any;
  /** 动画持续时间 */
  animationDuration: number;
  /** 底色*/
  background: string;
  /** 文字颜色*/
  color: string;
}

const defaultConfig: MessageConfig = {
  mount: document.body,
  delay: 2000,
  callback: null,
  animationDuration: 300,
  background: color.lightest,
  color: color.dark,
};

export default function Message(props: PropsWithChildren<MessageProps>) {
  const { rootDom, parentDom, content, fconfig, iconType } = props;
  const [close, setClose] = useState(false);
  const renderIcon = useMemo(() => {
    switch (iconType) {
      case 'default':
        return null;
      case 'info':
        return (
          <IconWrapper>
            <Icon icon='info' size='middle' color={color.primary}></Icon>
          </IconWrapper>
        );
      case 'success':
        return (
          <IconWrapper>
            <Icon icon='check' size='middle' color={color.positive}></Icon>
          </IconWrapper>
        );
      case 'error':
        return (
          <IconWrapper>
            <Icon icon='closeAlt' size='small' color={color.negative}></Icon>
          </IconWrapper>
        );
      case 'warning':
        return (
          <IconWrapper>
            <Icon icon='info' size='middle' color={color.warning}></Icon>
          </IconWrapper>
        );
      case 'loading':
        return (
          <IconWrapper spin={true}>
            <Icon icon='sync' size='middle'></Icon>
          </IconWrapper>
        );
      default:
        return null;
    }
  }, [iconType]);
  const unmount = useMemo(() => {
    return () => {
      if (parentDom && rootDom) {
        unmountComponentAtNode(parentDom);
        rootDom.removeChild(parentDom);
      }
    };
  }, [parentDom, rootDom]);
  useEffect(() => {
    // 结束操作
    const closeStart = fconfig.delay - fconfig.animationDuration;
    const timer = window.setTimeout(() => {
      setClose(true);
    }, closeStart > 0 ? closeStart : 0);
    const timer2 = setTimeout(() => {
      setClose(true);
      unmount();
    }, fconfig.delay);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(timer2);
    }
  }, [unmount, fconfig]);
  return (
    <MessageTextWrapper openState={true} closeState={close} ani={fconfig.animationDuration}>
      <MessageText bg={fconfig.background} fc={fconfig.color}>
        {renderIcon}
        {content}
      </MessageText>
    </MessageTextWrapper>
  );
}

export const message = {
  info: createMessage('info'),
  success: createMessage('success'),
  error: createMessage('error'),
  warning: createMessage("warning"),
  loading: createMessage('loading'),
  default: createMessage('default'),
}
