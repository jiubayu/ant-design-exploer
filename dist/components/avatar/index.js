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
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { color, typography } from "../shared/styles";
import { grow } from "../shared/animation";
import Icon from "../icon";
export var AvatarSizes = {
    large: 40,
    medium: 28,
    small: 20,
    tiny: 16,
};
var Image = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background: ", ";\n  border-radius: 50%;\n  display: inline-block;\n  vertical-align: top;\n  overflow: hidden;\n  text-transform: uppercase;\n\n  height: ", "px;\n  width: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  img {\n    width: 100%;\n    height: auto;\n    display: block;\n  }\n\n  svg {\n    position: relative;\n    bottom: -2px;\n    height: 100%;\n    width: 100%;\n    vertical-align: top;\n  }\n\n  path {\n    fill: ", ";\n    animation: ", " 1.5s ease-in-out infinite;\n  }\n"], ["\n  background: ", ";\n  border-radius: 50%;\n  display: inline-block;\n  vertical-align: top;\n  overflow: hidden;\n  text-transform: uppercase;\n\n  height: ", "px;\n  width: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  img {\n    width: 100%;\n    height: auto;\n    display: block;\n  }\n\n  svg {\n    position: relative;\n    bottom: -2px;\n    height: 100%;\n    width: 100%;\n    vertical-align: top;\n  }\n\n  path {\n    fill: ", ";\n    animation: ", " 1.5s ease-in-out infinite;\n  }\n"])), function (props) { return (!props.isLoading ? 'transparent' : color.light); }, AvatarSizes.medium, AvatarSizes.medium, AvatarSizes.medium, function (props) {
    return props.size === 'tiny' && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "], ["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "])), AvatarSizes.tiny, AvatarSizes.tiny, AvatarSizes.tiny);
}, function (props) {
    return props.size === 'small' && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "], ["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "])), AvatarSizes.small, AvatarSizes.small, AvatarSizes.small);
}, function (props) {
    return props.size === 'medium' && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "], ["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "])), AvatarSizes.medium, AvatarSizes.medium, AvatarSizes.medium);
}, function (props) {
    return props.size === 'large' && css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "], ["\n      height: ", "px;\n      width: ", "px;\n      line-height: ", "px;\n    "])), AvatarSizes.large, AvatarSizes.large, AvatarSizes.large);
}, function (props) {
    return !props.src && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      background: ", ";\n    "], ["\n      background: ", ";\n    "])), !props.isLoading && '#37D5D3');
}, color.medium, grow);
var Initial = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  color: ", ";\n  text-align: center;\n\n  font-size: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n"], ["\n  color: ", ";\n  text-align: center;\n\n  font-size: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n"])), color.lightest, typography.size.s2, AvatarSizes.medium, function (props) {
    return props.size === 'tiny' && css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      font-size: ", "px;\n      line-height: ", "px;\n    "], ["\n      font-size: ", "px;\n      line-height: ", "px;\n    "])), parseFloat(typography.size.s1) - 2, AvatarSizes.tiny);
}, function (props) {
    return props.size === 'small' && css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      font-size: ", "px;\n      line-height: ", "px;\n    "], ["\n      font-size: ", "px;\n      line-height: ", "px;\n    "])), typography.size.s1, AvatarSizes.small);
}, function (props) {
    return props.size === 'large' && css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      font-size: ", "px;\n      line-height: ", "px;\n    "], ["\n      font-size: ", "px;\n      line-height: ", "px;\n    "])), typography.size.s3, AvatarSizes.large);
});
export default function Avatar(props) {
    var size = props.size, src = props.src, username = props.username, isLoading = props.isLoading;
    var avatarFigure = useMemo(function () {
        var avatarFigure = React.createElement(Icon, { icon: "useralt" });
        var a11yProps = {};
        if (isLoading) {
            a11yProps['aria-busy'] = true;
            a11yProps['aria-label'] = 'Loading avatar ...';
        }
        else if (src) {
            avatarFigure = React.createElement("img", { src: src, alt: username });
        }
        else {
            a11yProps['aria-label'] = username;
            avatarFigure = (React.createElement(Initial, { size: size, "aria-hidden": 'true' }, username.substring(0, 1)));
        }
        return avatarFigure;
    }, [isLoading, src, size, username]);
    return (React.createElement(Image, __assign({ size: size, isLoading: isLoading, src: src }, props), avatarFigure));
}
Avatar.defaultProps = {
    isLoading: false,
    username: 'loading',
    src: null,
    size: 'mediumn'
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
