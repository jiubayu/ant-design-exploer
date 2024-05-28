import React from "react";
import { icons } from "../shared/icons";
type sizeType = 'middle' | 'small' | 'large';
export interface IconProps {
    icon: keyof typeof icons;
    /** 是否块级元素 */
    block?: boolean;
    color?: string;
    size?: sizeType;
}
declare function Icon(props: IconProps): React.JSX.Element;
declare namespace Icon {
    var defaultProps: {
        block: boolean;
        color: string;
        size: string;
    };
}
export default Icon;
