var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { color, messageBoxShadow, typography } from '../shared/styles';
import { iconSpin, messageCloseAnimate, messageOpenAnimate } from '../shared/animation';
import Icon from '../icon';
var MessageText = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  padding: 10px 16px;\n  background: ", ";\n  color: ", ";\n  font-size: ", "px;\n  font-weight: ", ";\n  margin: 10px;\n  ", ";\n  border-radius: 2px;\n"], ["\n  display: inline-block;\n  padding: 10px 16px;\n  background: ", ";\n  color: ", ";\n  font-size: ", "px;\n  font-weight: ", ";\n  margin: 10px;\n  ", ";\n  border-radius: 2px;\n"])), function (props) { return props.bg; }, function (props) { return props.fc; }, typography.size.s2, typography.weight.bold, messageBoxShadow);
var IconWrapper = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-right: 10px;\n  & > svg {\n    font-size: ", "px;\n    ", "\n  }\n"], ["\n  margin-right: 10px;\n  & > svg {\n    font-size: ", "px;\n    ", "\n  }\n"])), typography.size.s2, function (props) {
    return props.spin && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        animation: ", " 2s linear infinite;\n      "], ["\n        animation: ", " 2s linear infinite;\n      "])), iconSpin);
});
var MessageTextWrapper = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n"])), function (props) {
    return props.openState && css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      animation: ", " ", "s ease-in;\n    "], ["\n      animation: ", " ", "s ease-in;\n    "])), messageOpenAnimate, props.ani / 1000);
}, function (props) {
    return props.closeState && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      animation: ", " ", "s ease-in;\n    "], ["\n      animation: ", " ", "s ease-in;\n    "])), messageCloseAnimate, props.ani / 1000);
});
var wrap;
export function createMessage(type) {
    return function (content, config) {
        if (config === void 0) { config = {}; }
        var fconfig = __assign(__assign({}, config), defaultConfig);
        if (!wrap) {
            // 单例模式 如果有，说明已经调用这个方法了
            wrap = document.createElement('div');
            wrap.style.cssText = "\n        line-height: 1.5;\n        text-align: center;\n        color: #333;\n        box-sizing: border-box;\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        position: fixed;\n        z-index: 100000;\n        width: 100%;\n        top: 16px;\n        left: 0;\n        pointer-events: none;\n      ";
            if (wrap) {
                document.body && document.body.appendChild(wrap); // 挂在body上
            }
        }
        var divs = document.createElement('div');
        wrap.appendChild(divs);
        ReactDOM.render(React.createElement(Message, { rootDom: wrap, parentDom: divs, content: content, fconfig: fconfig, iconType: type }), divs);
    };
}
var defaultConfig = {
    mount: document.body,
    delay: 2000,
    callback: null,
    animationDuration: 300,
    background: color.lightest,
    color: color.dark,
};
export default function Message(props) {
    var rootDom = props.rootDom, parentDom = props.parentDom, content = props.content, fconfig = props.fconfig, iconType = props.iconType;
    var _a = useState(false), close = _a[0], setClose = _a[1];
    var renderIcon = useMemo(function () {
        switch (iconType) {
            case 'default':
                return null;
            case 'info':
                return (React.createElement(IconWrapper, null,
                    React.createElement(Icon, { icon: 'info', size: 'middle', color: color.primary })));
            case 'success':
                return (React.createElement(IconWrapper, null,
                    React.createElement(Icon, { icon: 'check', size: 'middle', color: color.positive })));
            case 'error':
                return (React.createElement(IconWrapper, null,
                    React.createElement(Icon, { icon: 'closeAlt', size: 'small', color: color.negative })));
            case 'warning':
                return (React.createElement(IconWrapper, null,
                    React.createElement(Icon, { icon: 'info', size: 'middle', color: color.warning })));
            case 'loading':
                return (React.createElement(IconWrapper, { spin: true },
                    React.createElement(Icon, { icon: 'sync', size: 'middle' })));
            default:
                return null;
        }
    }, [iconType]);
    var unmount = useMemo(function () {
        return function () {
            if (parentDom && rootDom) {
                unmountComponentAtNode(parentDom);
                rootDom.removeChild(parentDom);
            }
        };
    }, [parentDom, rootDom]);
    useEffect(function () {
        // 结束操作
        var closeStart = fconfig.delay - fconfig.animationDuration;
        var timer = window.setTimeout(function () {
            setClose(true);
        }, closeStart > 0 ? closeStart : 0);
        var timer2 = setTimeout(function () {
            setClose(true);
            unmount();
        }, fconfig.delay);
        return function () {
            window.clearTimeout(timer);
            window.clearTimeout(timer2);
        };
    }, [unmount, fconfig]);
    return (React.createElement(MessageTextWrapper, { openState: true, closeState: close, ani: fconfig.animationDuration },
        React.createElement(MessageText, { bg: fconfig.background, fc: fconfig.color },
            renderIcon,
            content)));
}
export var message = {
    info: createMessage('info'),
    success: createMessage('success'),
    error: createMessage('error'),
    warning: createMessage("warning"),
    loading: createMessage('loading'),
    default: createMessage('default'),
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
