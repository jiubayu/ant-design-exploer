import { RefObject } from "react";
export declare function useClickOutside(ref: RefObject<HTMLElement>, handler: any): void;
export declare function useStateAnimation(parentSetState: (v: boolean) => void, delay?: number): [boolean, (v: boolean) => void, () => void];
