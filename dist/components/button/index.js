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
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { color, typography } from '../shared/styles';
// A lightweight toolset for writing styles in JavaScript
import { darken, rgba, opacify } from 'polished';
import { easing } from '../shared/animation';
export var APPEARANCES = {
    primary: 'primary',
    primaryOutline: 'primaryOutline',
    secondary: 'secondary',
    secondaryOutline: 'secondaryOutline',
    tertiary: 'tertiary',
    outline: 'outline',
    inversePrimary: 'inversePrimary',
    inverseSecondary: 'inverseSecondary',
    inverseOutline: 'inverseOutline',
};
export var SIZES = {
    small: 'small',
    medium: 'medium',
};
/** style样式 */
var Text = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  vertical-align: top;\n"], ["\n  display: inline-block;\n  vertical-align: top;\n"])));
var Loading = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  opacity: 0;\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  opacity: 0;\n"])));
export var btnPadding = {
    medium: '13px 20px',
    small: '8px 16px',
};
/** StyledButton */
var StyledButton = styled.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  padding: ", ";\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  transition: all 150ms ease-out;\n  transform: translate3d(0, 0, 0);\n  vertical-align: top;\n  white-space: nowrap;\n  user-select: none;\n  opacity: 1;\n  margin: 0;\n  background: transparent;\n\n  font-size: ", "px;\n  font-weight: ", ";\n  line-height: 1;\n\n  ", "\n\n  ", " {\n    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);\n    transition: transform 700ms ", ";\n    opacity: 1;\n  }\n\n  ", " {\n    transform: translate3d(0, 100%, 0);\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", ";\n\n  ", ";\n\n  ", ";\n\n  ", "\n\n  ", "\n\n      ", ";\n"], ["\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  padding: ", ";\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  transition: all 150ms ease-out;\n  transform: translate3d(0, 0, 0);\n  vertical-align: top;\n  white-space: nowrap;\n  user-select: none;\n  opacity: 1;\n  margin: 0;\n  background: transparent;\n\n  font-size: ", "px;\n  font-weight: ", ";\n  line-height: 1;\n\n  ", "\n\n  ", " {\n    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);\n    transition: transform 700ms ", ";\n    opacity: 1;\n  }\n\n  ", " {\n    transform: translate3d(0, 100%, 0);\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", ";\n\n  ", ";\n\n  ", ";\n\n  ", "\n\n  ", "\n\n      ", ";\n"])), function (props) {
    return props.size === SIZES.small ? '8px 16px' : '13px 20px';
}, function (props) {
    return props.size === SIZES.small ? typography.size.s1 : typography.size.s2;
}, typography.weight.extrabold, function (props) {
    return !props.isLoading &&
        "\n      &:hover {\n        transform: translate3d(0, -2px, 0);\n        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;\n      }\n\n      &:active {\n        transform: translate3d(0, 0, 0);\n      }\n\n      &:focus {\n        box-shadow: ".concat(rgba(color.primary, 0.4), " 0 1px 9px 2px;\n      }\n\n      &:focus:hover {\n        box-shadow: ").concat(rgba(color.primary, 0.2), " 0 8px 18px 0px;\n      }\n    ");
}, Text, easing.rubber, Loading, function (props) {
    return props.disabled &&
        "\n      cursor: not-allowed !important;\n      opacity: 0.5;\n      &:hover {\n        transform: none;\n      }\n    ";
}, function (props) {
    return props.isUnclickable &&
        "\n      cursor: default !important;\n      pointer-events: none;\n      &:hover {\n        transform: none;\n      }\n    ";
}, function (props) {
    return props.isLoading &&
        "\n      cursor: progress !important;\n      opacity: 0.7;\n\n      ".concat(Loading, " {\n        transition: transform 700ms ").concat(easing.rubber, ";\n        transform: translate3d(0, -50%, 0);\n        opacity: 1;\n      }\n\n      ").concat(Text, " {\n        transform: scale3d(0, 0, 1) translate3d(0, -100%, 0);\n        opacity: 0;\n      }\n\n      &:hover {\n        transform: none;\n      }\n    ");
}, function (props) {
    return props.appearance === APPEARANCES.primary &&
        "\n      background: ".concat(color.primary, ";\n      color: ").concat(color.lightest, ";\n\n      ").concat(!props.isLoading &&
            "\n          &:hover {\n            background: ".concat(darken(0.05, color.primary), ";\n          }\n          &:active {\n            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n          }\n          &:focus {\n            box-shadow: ").concat(rgba(color.primary, 0.4), " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: ").concat(rgba(color.primary, 0.2), " 0 8px 18px 0px;\n          }\n        "), "\n    ");
}, function (props) {
    return props.appearance === APPEARANCES.secondary &&
        "\n      background: ".concat(color.secondary, ";\n      color: ").concat(color.lightest, ";\n\n      ").concat(!props.isLoading &&
            "\n          &:hover {\n            background: ".concat(darken(0.05, color.secondary), ";\n          }\n          &:active {\n            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n          }\n          &:focus {\n            box-shadow: ").concat(rgba(color.secondary, 0.4), " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: ").concat(rgba(color.secondary, 0.2), " 0 8px 18px 0px;\n          }\n        "), "\n    ");
}, function (props) {
    return props.appearance === APPEARANCES.tertiary &&
        "\n      background: ".concat(color.tertiary, ";\n      color: ").concat(color.darkest, ";\n\n      ").concat(!props.isLoading &&
            "\n          &:hover {\n            background: ".concat(darken(0.05, color.tertiary), ";\n          }\n          &:active {\n            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n          }\n          &:focus {\n            box-shadow: ").concat(rgba(color.darkest, 0.15), " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: ").concat(rgba(color.darkest, 0.05), " 0 8px 18px 0px;\n          }\n        "), "\n    ");
}, function (props) {
    return props.appearance === APPEARANCES.outline &&
        "\n      box-shadow: ".concat(opacify(0.05, color.border), " 0 0 0 1px inset;\n      color: ").concat(color.dark, ";\n      background: transparent;\n\n      ").concat(!props.isLoading &&
            "\n          &:hover {\n            box-shadow: ".concat(opacify(0.3, color.border), " 0 0 0 1px inset;\n          }\n\n          &:active {\n            background: ").concat(opacify(0.05, color.border), ";\n            box-shadow: transparent 0 0 0 1px inset;\n            color: ").concat(color.darkest, ";\n          }\n\n          &:active:focus:hover {\n            ").concat(
            /* This prevents the semi-transparent border from appearing atop the background */ '', "\n            background: ").concat(opacify(0.05, color.border), ";\n            box-shadow:  ").concat(rgba(color.darkest, 0.15), " 0 1px 9px 2px;\n          }\n\n          &:focus {\n            box-shadow: ").concat(opacify(0.05, color.border), " 0 0 0 1px inset, \n            ").concat(rgba(color.darkest, 0.15), " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: ").concat(opacify(0.05, color.border), " 0 0 0 1px inset, \n            ").concat(rgba(color.darkest, 0.05), " 0 8px 18px 0px;\n          }\n        "), ";\n    ");
}, function (props) {
    return props.appearance === APPEARANCES.primaryOutline &&
        "\n        box-shadow: ".concat(color.primary, " 0 0 0 1px inset;\n        color: ").concat(color.primary, ";\n\n        &:hover {\n          box-shadow: ").concat(color.primary, " 0 0 0 1px inset;\n          background: transparent;\n        }\n\n        &:active {\n          background: ").concat(color.primary, ";\n          box-shadow: ").concat(color.primary, " 0 0 0 1px inset;\n          color: ").concat(color.lightest, ";\n        }\n        &:focus {\n          box-shadow: ").concat(color.primary, " 0 0 0 1px inset, ").concat(rgba(color.primary, 0.4), " 0 1px 9px 2px;\n        }\n        &:focus:hover {\n          box-shadow: ").concat(color.primary, " 0 0 0 1px inset, ").concat(rgba(color.primary, 0.2), " 0 8px 18px 0px;\n        }\n      ");
}, function (props) {
    return props.appearance === APPEARANCES.secondaryOutline &&
        "\n        box-shadow: ".concat(color.secondary, " 0 0 0 1px inset;\n        color: ").concat(color.secondary, ";\n\n        &:hover {\n          box-shadow: ").concat(color.secondary, " 0 0 0 1px inset;\n          background: transparent;\n        }\n\n        &:active {\n          background: ").concat(color.secondary, ";\n          box-shadow: ").concat(color.secondary, " 0 0 0 1px inset;\n          color: ").concat(color.lightest, ";\n        }\n        &:focus {\n          box-shadow: ").concat(color.secondary, " 0 0 0 1px inset,\n            ").concat(rgba(color.secondary, 0.4), " 0 1px 9px 2px;\n        }\n        &:focus:hover {\n          box-shadow: ").concat(color.secondary, " 0 0 0 1px inset,\n            ").concat(rgba(color.secondary, 0.2), " 0 8px 18px 0px;\n        }\n      ");
}, function (props) {
    return props.appearance === APPEARANCES.inversePrimary &&
        "\n          background: ".concat(color.lightest, ";\n          color: ").concat(color.primary, ";\n\n          ").concat(!props.isLoading &&
            "\n              &:hover {\n                background: ".concat(color.lightest, ";\n              }\n              &:active {\n                box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n              }\n              &:focus {\n                box-shadow: ").concat(rgba(color.primary, 0.4), " 0 1px 9px 2px;\n              }\n              &:focus:hover {\n                box-shadow: ").concat(rgba(color.primary, 0.2), " 0 8px 18px 0px;\n              }\n          "), "\n      ");
}, function (props) {
    return props.appearance === APPEARANCES.inverseSecondary &&
        "\n          background: ".concat(color.lightest, ";\n          color: ").concat(color.secondary, ";\n\n          ").concat(!props.isLoading &&
            "\n              &:hover {\n                background: ".concat(color.lightest, ";\n              }\n              &:active {\n                box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n              }\n              &:focus {\n                box-shadow: ").concat(rgba(color.secondary, 0.4), " 0 1px 9px 2px;\n              }\n              &:focus:hover {\n                box-shadow: ").concat(rgba(color.secondary, 0.2), " 0 8px 18px 0px;\n              }\n          "), "\n      ");
}, function (props) {
    return props.appearance === APPEARANCES.inverseOutline &&
        "\n          box-shadow: ".concat(color.lightest, " 0 0 0 1px inset;\n          color: ").concat(color.lightest, ";\n\n          &:hover {\n            box-shadow: ").concat(color.lightest, " 0 0 0 1px inset;\n            background: transparent;\n          }\n\n          &:active {\n            background: ").concat(color.lightest, ";\n            box-shadow: ").concat(color.lightest, " 0 0 0 1px inset;\n            color: ").concat(color.darkest, ";\n          }\n          &:focus {\n            box-shadow: ").concat(color.lightest, " 0 0 0 1px inset,\n              ").concat(rgba(color.darkest, 0.4), " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: ").concat(color.lightest, " 0 0 0 1px inset,\n              ").concat(rgba(color.darkest, 0.2), " 0 8px 18px 0px;\n          }\n      ");
});
function Button(props) {
    var children = props.children, isLoading = props.isLoading, isLink = props.isLink, loadingText = props.loadingText;
    var buttonInner = (React.createElement(React.Fragment, null,
        React.createElement(Text, null, children),
        isLoading && React.createElement(Loading, null, loadingText || 'Loading...')));
    var btnType = useMemo(function () {
        if (isLink) {
            return 'a';
        }
    }, [isLink]);
    // as 调用组件的时候我们可以通过as来修改组件 as="元素名称" as='a'意味着内部样式使用的是a标签
    return (React.createElement(StyledButton, __assign({ as: btnType }, props, { "data-testid": 'button' }), buttonInner));
}
// 同时定义默认传参与导出
Button.defaultProps = {
    isLoading: false,
    loadingText: null,
    isLink: false,
    appearance: APPEARANCES.tertiary,
    isDisabled: false,
    isUnclickable: false,
    containsIcon: false,
    size: SIZES.medium,
    ButtonWrapper: undefined,
};
export default Button;
var templateObject_1, templateObject_2, templateObject_3;
