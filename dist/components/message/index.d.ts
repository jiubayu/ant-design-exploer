import React, { PropsWithChildren, ReactNode } from 'react';
type Partial<T> = {
    [key in keyof T]?: T[key];
};
export declare function createMessage(type: MessageType): (content: ReactNode, config?: Partial<MessageConfig>) => void;
type MessageProps = {
    rootDom: HTMLElement;
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
export default function Message(props: PropsWithChildren<MessageProps>): React.JSX.Element;
export declare const message: {
    info: (content: ReactNode, config?: Partial<MessageConfig>) => void;
    success: (content: ReactNode, config?: Partial<MessageConfig>) => void;
    error: (content: ReactNode, config?: Partial<MessageConfig>) => void;
    warning: (content: ReactNode, config?: Partial<MessageConfig>) => void;
    loading: (content: ReactNode, config?: Partial<MessageConfig>) => void;
    default: (content: ReactNode, config?: Partial<MessageConfig>) => void;
};
export {};
