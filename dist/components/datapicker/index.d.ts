import { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
type CalendarProps = {
    /** 日期选择的回调 */
    callback?: (v: string) => void;
    /**  动画速度 */
    delay?: number;
    /** 初始值*/
    initDate?: string;
    /** 外层样式*/
    style?: CSSProperties;
    /** 外层类名 */
    classname?: string;
};
export default function DatePicker(props: PropsWithChildren<CalendarProps>): import("react/jsx-runtime").JSX.Element;
export {};
