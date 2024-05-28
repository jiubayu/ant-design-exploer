var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { typography } from '../shared/styles';
import { modalOpenAnimate, modalCloseAnimate } from '../shared/animation';
import { createPortal } from 'react-dom';
import Button from '../button';
import Icon from '../icon';
/**
 * modal分为3个部分
 * 1 标题       可传可不传
 * 2 children  必显示，需要设置最小高度
 * 3 confirm   可显示可不显示
 */
var ModalWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 1000;\n"], ["\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 1000;\n"])));
var ModalViewPort = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #fff;\n  border: none;\n  border-radius: 5px;\n  box-shadow: 2px 2px 4px #d9d9d9;\n  text-shadow:\n    1px 1px 4px #d9d9d9,\n    -1px -1px 4px #fff;\n  margin: 0 auto;\n  min-width: 320px;\n  overflow: hidden;\n  padding: 8px;\n  position: relative;\n  top: 100px;\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  width: 30%;\n  z-index: 1001;\n  ", "\n\n  ", "\n"], ["\n  background: #fff;\n  border: none;\n  border-radius: 5px;\n  box-shadow: 2px 2px 4px #d9d9d9;\n  text-shadow:\n    1px 1px 4px #d9d9d9,\n    -1px -1px 4px #fff;\n  margin: 0 auto;\n  min-width: 320px;\n  overflow: hidden;\n  padding: 8px;\n  position: relative;\n  top: 100px;\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  width: 30%;\n  z-index: 1001;\n  ", "\n\n  ", "\n"])), function (props) {
    return props.visible && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      animation: ", " ", "s ease-in;\n    "], ["\n      animation: ", " ", "s ease-in;\n    "])), modalOpenAnimate, props.delay / 1000);
}, function (props) {
    return !props.visible && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      animation: ", " ", "s ease-in;\n    "], ["\n      animation: ", " ", "s ease-in;\n    "])), modalCloseAnimate, props.delay / 1000);
});
var ModalMask = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background-color: rgba(0, 0, 0, 0.45);\n  bottom: 0;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n"], ["\n  background-color: rgba(0, 0, 0, 0.45);\n  bottom: 0;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n"])));
var CloseBtn = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: absolute;\n  right: 5px;\n  top: 5px;\n"], ["\n  position: absolute;\n  right: 5px;\n  top: 5px;\n"])));
var ConfirmWrapper = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  align-item: center;\n  padding: 10px;\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  align-item: center;\n  padding: 10px;\n"])));
var ChildrenWrapper = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  min-height: 100px;\n  padding: 10px;\n"], ["\n  min-height: 100px;\n  padding: 10px;\n"])));
var TitleWrapper = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  height: 30px;\n  line-height: 30px;\n  font-size: ", "px;\n  font-weight: ", ";\n  padding: 5px;\n"], ["\n  height: 30px;\n  line-height: 30px;\n  font-size: ", "px;\n  font-weight: ", ";\n  padding: 5px;\n"])), typography.size.m2, typography.weight.bold);
export function useAnimation(parentSetState, delay) {
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
    }, [parentSetState, setState, delay]), innerClose = _b[0], unmount = _b[1];
    return [state, innerClose, unmount];
}
export function useStopScroll(state, delay, open) {
    if (open) {
        var width = window.innerWidth - document.body.clientWidth;
        if (state) {
            // 禁止滚动
            document.body.style.overflow = 'hidden';
            document.body.style.width = "calc(100% - ".concat(width, "px)");
        }
        else {
            // 等动画渲染
            setTimeout(function () {
                document.body.style.overflow = 'auto';
                document.body.style.width = '100%';
            }, delay);
        }
    }
}
export default function Modal(props) {
    var visible = props.visible, maskClose = props.maskClose, closeButton = props.closeButton, delay = props.delay, mask = props.mask, _a = props.container, container = _a === void 0 ? document.body : _a, confirm = props.confirm, okText = props.okText, style = props.style, cancelText = props.cancelText, onOk = props.onOk, onCancel = props.onCancel, callback = props.callback, title = props.title, parentSetState = props.parentSetState, stopScroll = props.stopScroll, portralstyle = props.portralstyle, refCallback = props.refCallback, closeCallback = props.closeCallback;
    var ref = useRef(null);
    var _b = useAnimation(parentSetState, delay), state = _b[0], setState = _b[1], unmount = _b[2];
    var render = useMemo(function () {
        if (!visible) {
            unmount();
            return null;
        }
        else {
            return createPortal(React.createElement(ModalWrapper, { ref: ref, style: portralstyle },
                React.createElement(ModalViewPort, { visible: visible, delay: delay },
                    React.createElement("div", null,
                        title && React.createElement(TitleWrapper, null, title),
                        closeButton && (React.createElement(CloseBtn, null,
                            React.createElement(Button, { style: {
                                    background: 'white',
                                    borderRadius: '5px',
                                    padding: '5px',
                                }, onClick: function () {
                                    setState(false);
                                    if (closeCallback)
                                        closeCallback();
                                } },
                                React.createElement(Icon, { icon: 'closeAlt' }))))),
                    React.createElement(ChildrenWrapper, null, props.children),
                    confirm && (React.createElement(ConfirmWrapper, null,
                        React.createElement(Button, { appearance: 'secondary', onClick: function () {
                                onOk ? onOk(setState) : setState(false);
                                if (callback)
                                    callback(true);
                            } }, okText ? okText : '确认'),
                        React.createElement(Button, { appearance: 'secondary', onClick: function () {
                                onCancel ? onCancel(setState) : setState(false);
                                if (callback)
                                    callback(false);
                            }, style: { marginLeft: '10px' } }, cancelText ? cancelText : '取消')))),
                mask && (React.createElement(ModalMask, { onClick: function () {
                        if (maskClose) {
                            setState(false);
                            if (closeCallback) {
                                closeCallback();
                            }
                        }
                    } }))), container);
        }
    }, [
        callback,
        cancelText,
        closeButton,
        closeCallback,
        confirm,
        container,
        mask,
        maskClose,
        okText,
        onCancel,
        onOk,
        portralstyle,
        props.children,
        setState,
        title,
        visible,
        delay,
        unmount,
    ]);
    useStopScroll(visible, 300, stopScroll);
    useEffect(function () {
        if (refCallback && ref.current) {
            refCallback(ref.current);
        }
    }, [refCallback]);
    return React.createElement(React.Fragment, null, render);
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
