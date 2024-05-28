import React, { HTMLAttributes } from "react";
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
    username?: string;
    src?: string | null;
    size?: keyof typeof AvatarSizes;
}
export declare const AvatarSizes: {
    large: number;
    medium: number;
    small: number;
    tiny: number;
};
declare function Avatar(props: AvatarProps): React.JSX.Element;
declare namespace Avatar {
    var defaultProps: {
        isLoading: boolean;
        username: string;
        src: any;
        size: string;
    };
}
export default Avatar;
