/** @format */
import React, { PropsWithChildren, ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
export type ProgressProps = {
    /** 进度值 */
    count: number;
    /** 是否要末尾计数文本 */
    countNumber?: boolean;
    /** 进度条高度 环状不生效 */
    height?: number;
    /** 是否是环状 */
    circle?: boolean;
    /** 环状大小  */
    size?: number;
    /** 自定义环状文本 */
    circleText?: ReactNode;
    /** 自定义长条进度文本 */
    progressText?: ReactNode;
    bottomColor?: string;
    style?: CSSProperties;
    className?: string;
    /** 长条闪烁动画颜色 */
    flashColor?: string;
    /** 主色 */
    primary?: string;
    /** 副色 */
    secondary?: string;
};
export declare const progressFlash: import("styled-components/dist/models/Keyframes").default;
declare function Progress(props: PropsWithChildren<ProgressProps>): React.JSX.Element;
declare namespace Progress {
    var defaultProps: {
        countNumber: boolean;
        circle: boolean;
        size: number;
        primary: string;
        secondary: string;
        flashColor: string;
        bottomColor: string;
    };
}
export default Progress;
