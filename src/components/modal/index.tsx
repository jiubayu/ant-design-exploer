import React, {PropsWithChildren, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import styled, { CSSProperties, css } from 'styled-components';
import {color, typography} from '../shared/styles';
import {darken, rgba, opacify} from 'polished';
import {modalOpenAnimate, modalCloseAnimate} from '../shared/animation';
import {createPortal} from 'react-dom';
import Button from '../button';
import Icon from '../icon';

/**
 * modal分为3个部分
 * 1 标题       可传可不传  
 * 2 children  必显示，需要设置最小高度
 * 3 confirm   可显示可不显示
 */
const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
`
const ModalViewPort = styled.div<{visible: boolean; delay: number}>`
  background: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 4px #d9d9d9;
  text-shadow:
    1px 1px 4px #d9d9d9,
    -1px -1px 4px #fff;
  margin: 0 auto;
  min-width: 320px;
  overflow: hidden;
  padding: 8px;
  position: relative;
  top: 100px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  width: 30%;
  z-index: 1001;
  ${(props) =>
    props.visible &&
    css`
      animation: ${modalOpenAnimate} ${props.delay / 1000}s ease-in;
    `}

  ${(props) =>
    !props.visible &&
    css`
      animation: ${modalCloseAnimate} ${props.delay / 1000}s ease-in;
    `}
`;

const ModalMask = styled.div`
  background-color: rgba(0, 0, 0, 0.45);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const ConfirmWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-item: center;
  padding: 10px;
`;

const ChildrenWrapper = styled.div`
  min-height: 100px;
  padding: 10px;
`;

const TitleWrapper = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: ${typography.size.m2}px;
  font-weight: ${typography.weight.bold};
  padding: 5px;
`;

type ModalProps = {
  /** 父组件用来控制的状态 */
  visible: boolean;
  /** 容器位置 */
  container?: Element;
  /** 父组件setstate */
  parentSetState: (v: boolean) => void;
  /** 弹出框标题 */
  title?: ReactNode;
  /** 是否有确认按钮 */
  confirm?: boolean;
  /** 改变确认按钮文本*/
  okText?: string;
  /** 改变取消按钮文本*/
  cancelText?: string;
  /** 点了确认的回调，如果传了，需要自行处理关闭 */
  onOk?: (set: (v: boolean) => void) => void;
  /** 点了取消的回调，如果传了，需要自行处理关闭*/
  onCancel?: (set: (v: boolean) => void) => void;
  /** 点确认或者取消都会走的回调 */
  callback?: (v: boolean) => void;
  /** 点击mask是否关闭模态框 */
  maskClose?: boolean;
  /** 是否有mask */
  mask?: boolean;
  /** 自定义模态框位置 */
  style?: CSSProperties;
  /** 是否有右上角关闭按钮 */
  closeButton?: boolean;
  /** 动画时间 */
  delay?: number;
  /** 是否停止滚动*/
  stopScroll?: boolean;
  /** portralstyle*/
  portralstyle?: CSSProperties;
  /** portral的回调 */
  refCallback?: (ref: HTMLDivElement) => void;
  /** 没点确认于取消，直接关闭的回调 */
  closeCallback?: () => void;
};

export function useAnimation(
  parentSetState: (v: boolean) => void,
  delay?: number
): [boolean, (v: boolean) => void, () => void] {
  const [state, setState] = useState(true);
  const [innerClose, unmount] = useMemo(() => {
    let timer: number;
    let innerclose = (v: boolean) => {
      setState(v);
      timer = window.setTimeout(() => {
        parentSetState(v);
        setState(true);
      }, delay);
    };
    const unmount = () => window.clearTimeout(timer);
    return [innerclose, unmount];
  }, [parentSetState, setState, delay]);
  return [state, innerClose, unmount];
}

export function useStopScroll(state: boolean, delay?: number, open?: boolean) {
  if (open) {
    const width = window.innerWidth - document.body.clientWidth;
    if (state) {
      // 禁止滚动
      document.body.style.overflow = 'hidden';
      document.body.style.width = `calc(100% - ${width}px)`;
    } else {
      // 等动画渲染
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.body.style.width = '100%';
      }, delay);
    }
  }
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  	const {
      visible,
      maskClose,
      closeButton,
      delay,
      mask,
      container = document.body,
      confirm,
      okText,
      style,
      cancelText,
      onOk,
      onCancel,
      callback,
      title,
      parentSetState,
      stopScroll,
      portralstyle,
      refCallback,
      closeCallback,
    } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState, unmount] = useAnimation(parentSetState, delay);
  const render = useMemo(() => {
    if (!visible) {
      unmount();
      return null;
    } else {
      return createPortal(
        <ModalWrapper ref={ref} style={portralstyle}>
          <ModalViewPort visible={visible} delay={delay!}>
            <div>
              {title && <TitleWrapper>{title}</TitleWrapper>}
              {closeButton && (
                <CloseBtn>
                  <Button
                    style={{
                      background: 'white',
                      borderRadius: '5px',
                      padding: '5px',
                    }}
                    onClick={() => {
                      setState(false);
                      if (closeCallback) closeCallback();
                    }}
                  >
                    <Icon icon='closeAlt'></Icon>
                  </Button>
                </CloseBtn>
              )}
            </div>
            {<ChildrenWrapper>{props.children}</ChildrenWrapper>}
            {confirm && (
              <ConfirmWrapper>
                <Button
                  appearance='secondary'
                  onClick={() => {
                    onOk ? onOk(setState) : setState(false);
                    if (callback) callback(true);
                  }}
                >
                  {okText ? okText : '确认'}
                </Button>
                <Button
                  appearance='secondary'
                  onClick={() => {
                    onCancel ? onCancel(setState) : setState(false);
                    if (callback) callback(false);
                  }}
                  style={{marginLeft: '10px'}}
                >
                  {cancelText ? cancelText : '取消'}
                </Button>
              </ConfirmWrapper>
            )}
          </ModalViewPort>
          {mask && (
            <ModalMask
              onClick={() => {
                if (maskClose) {
                  setState(false);
                  if (closeCallback) {
                    closeCallback();
                  }
                }
              }}
            ></ModalMask>
          )}
        </ModalWrapper>,
        container!
      );
    }
  }, [
    callback,
    cancelText,
    closeButton,
    closeCallback,
    confirm,
    container,
    mask,
    maskClose,
    okText,
    onCancel,
    onOk,
    portralstyle,
    props.children,
    setState,
    title,
    visible,
    delay,
    unmount,
  ]);
  useStopScroll(visible!, 300, stopScroll);
  useEffect(() => {
    if (refCallback && ref.current) {
      refCallback(ref.current);
    }
  }, [refCallback]);
  return <>{render}</>;
}
