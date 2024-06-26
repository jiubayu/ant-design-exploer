import { HTMLAttributes, PropsWithChildren } from "react";
export declare const badgeColor: {
    positive: string;
    negative: string;
    neutral: string;
    warning: string;
    error: string;
};
export declare const badgeBackground: {
    positive: string;
    negative: string;
    neutral: string;
    warning: string;
    error: string;
};
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    /** 状态色 */
    status?: 'positive' | 'negative' | 'neutral' | 'warning' | 'error';
}
declare function Badge(props: PropsWithChildren<BadgeProps>): import("react/jsx-runtime").JSX.Element;
declare namespace Badge {
    var defaultProps: {
        status: string;
    };
}
export default Badge;
