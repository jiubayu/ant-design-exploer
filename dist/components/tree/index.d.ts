import React, { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
export declare const throttle: (fn: Function, delay?: number) => (...args: any[]) => void;
interface itemProps {
    value: string;
    level?: number;
    expand?: boolean;
    visible?: boolean;
    parent?: itemProps;
    children?: Array<itemProps>;
    key?: string;
}
type TreeProps = {
    /** 数据源*/
    source: itemProps[];
    /** 是否可以拖拽 */
    drag?: boolean;
    /** 高亮边框颜色 */
    borderColor?: string;
    /** 拖拽提示色 */
    backColor?: string;
    /**外层样式*/
    style?: CSSProperties;
    /**外层类名*/
    classname?: string;
};
declare function Tree(props: PropsWithChildren<TreeProps>): React.JSX.Element;
declare namespace Tree {
    var defaultProps: {
        source: any[];
        drag: boolean;
        borderColor: string;
        bckColor: string;
    };
}
export default Tree;
