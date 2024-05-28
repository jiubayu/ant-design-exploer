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
import React from "react";
import styled, { css } from "styled-components";
import { icons } from "../shared/icons";
import { typography } from "../shared/styles";
var Svg = styled.svg(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: ", ";\n  vertical-align: middle;\n\n  shape-rendering: inherit;\n  transform: translate3d(0, 0, 0);\n\n  ", "\n  ", "\n   ", "\n"], ["\n  display: ", ";\n  vertical-align: middle;\n\n  shape-rendering: inherit;\n  transform: translate3d(0, 0, 0);\n\n  ", "\n  ", "\n   ", "\n"])), function (props) { return (props.block ? 'block' : 'inline-block'); }, function (props) {
    return props.size === 'small' && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      width: ", "px;\n      height: ", "px;\n    "], ["\n      width: ", "px;\n      height: ", "px;\n    "])), typography.size.s1, typography.size.s1);
}, function (props) {
    return props.size === 'middle' && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      width: ", "px;\n      height: ", "px;\n    "], ["\n      width: ", "px;\n      height: ", "px;\n    "])), typography.size.s2, typography.size.s2);
}, function (props) {
    return props.size === 'large' && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      width: ", "px;\n      height: ", "px;\n    "], ["\n      width: ", "px;\n      height: ", "px;\n    "])), typography.size.s2, typography.size.s2);
});
var Path = styled.path(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  fill: ", ";\n"], ["\n  fill: ", ";\n"])), function (props) { return props.color; });
export default function Icon(props) {
    var icon = props.icon, color = props.color, block = props.block;
    return (React.createElement(Svg, __assign({ viewBox: '0 0 1024 1024', block: block, "data-testid": 'icon-path' }, props),
        React.createElement(Path, { color: color, "data-testid": 'icon-svg', d: icons[icon] })));
}
Icon.defaultProps = {
    block: false,
    color: 'black',
    size: 'middle'
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
