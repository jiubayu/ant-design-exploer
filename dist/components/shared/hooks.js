import { useEffect, useMemo, useState } from "react";
// 就是当鼠标移入input并点击可以产生弹框。点击组件外，可以关闭弹窗。
export function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        window.addEventListener('click', listener);
        return window.removeEventListener('click', listener);
    }, [ref, handler]);
}
export function useStateAnimation(parentSetState, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(true), state = _a[0], setState = _a[1];
    var _b = useMemo(function () {
        var timer;
        var innerclose = function (v) {
            setState(v);
            timer = window.setTimeout(function () {
                parentSetState(v);
                setState(true);
            }, delay);
        };
        var unmount = function () { return window.clearTimeout(timer); };
        return [innerclose, unmount];
    }, [setState, parentSetState, delay]), innerClose = _b[0], unmount = _b[1];
    return [state, innerClose, unmount];
}
