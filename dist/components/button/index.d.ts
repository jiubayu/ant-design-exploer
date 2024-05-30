import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
/**  ts类型  */
type btnType = 'primary' | 'primaryOutline' | 'secondary' | 'secondaryOutline' | 'tertiary' | 'outline' | 'inversePrimary' | 'inverseSecondary' | 'inverseOutline';
type AppearanceObj = {
    [key in btnType]: btnType;
};
export declare const APPEARANCES: AppearanceObj;
export type AppearanceTypes = keyof typeof APPEARANCES;
type sizeType = 'small' | 'medium';
type sizeObj = {
    [key in sizeType]: sizeType;
};
export type SizeTypes = keyof typeof SIZES;
export declare const SIZES: sizeObj;
export interface CustormButtonProps {
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否加载中 */
    isLoading?: boolean;
    /** 是否是a标签 */
    isLink?: boolean;
    /** 加载中文本 */
    loadingText?: ReactNode;
    /** 按钮大小 */
    size?: SizeTypes;
    /** 按钮类型 */
    appearance?: AppearanceTypes;
    /** 按钮类型 */
    isUnclickable?: boolean;
}
export declare const btnPadding: {
    medium: string;
    small: string;
};
export type ButtonProps = CustormButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;
declare function Button(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
declare namespace Button {
    var defaultProps: {
        isLoading: boolean;
        loadingText: null;
        isLink: boolean;
        appearance: btnType;
        isDisabled: boolean;
        isUnclickable: boolean;
        containsIcon: boolean;
        size: sizeType;
        ButtonWrapper: undefined;
    };
}
export default Button;
