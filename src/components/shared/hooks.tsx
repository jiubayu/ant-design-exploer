import { RefObject, useEffect, useMemo, useState } from "react";

// 就是当鼠标移入input并点击可以产生弹框。点击组件外，可以关闭弹窗。
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: any
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    window.addEventListener('click', listener);
    return window.removeEventListener('click', listener);
  }, [ref, handler]);
}

export function useStateAnimation(
  parentSetState: (v: boolean) => void,
  delay: number = 300
):[boolean, (v:boolean)=> void, () => void] {
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
    let unmount = () => window.clearTimeout(timer);
    return [innerclose, unmount]
  }, [setState, parentSetState, delay]);
  return [state, innerClose, unmount];
}
