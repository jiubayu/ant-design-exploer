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
import { color, background, typography } from '../shared/styles';
export var badgeColor = {
    positive: color.positive,
    negative: color.negative,
    neutral: color.dark,
    warning: color.warning,
    error: color.lightest,
};
export var badgeBackground = {
    positive: background.positive,
    negative: background.negative,
    neutral: color.mediumlight,
    warning: background.warning,
    error: color.negative,
};
var BedgeWrapper = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: inline-block;\n  vertical-align: top;\n  font-size: 11px;\n  line-height: 12px;\n  padding: 4px 12px;\n  border-radius: 3em;\n  font-weight: ", ";\n\n  svg {\n    height: 12px;\n    width: 12px;\n    margin-right: 4px;\n    margin-top: -2px;\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"], ["\n  display: inline-block;\n  vertical-align: top;\n  font-size: 11px;\n  line-height: 12px;\n  padding: 4px 12px;\n  border-radius: 3em;\n  font-weight: ", ";\n\n  svg {\n    height: 12px;\n    width: 12px;\n    margin-right: 4px;\n    margin-top: -2px;\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), typography.weight.bold, function (props) {
    return props.status === 'positive' && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      color: ", ";\n      background: ", ";\n    "], ["\n      color: ", ";\n      background: ", ";\n    "])), badgeColor.positive, badgeBackground.positive);
}, function (props) {
    return props.status === 'negative' && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      color: ", ";\n      background: ", ";\n    "], ["\n      color: ", ";\n      background: ", ";\n    "])), badgeColor.negative, badgeBackground.negative);
}, function (props) {
    return props.status === 'neutral' && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      color: ", ";\n      background: ", ";\n    "], ["\n      color: ", ";\n      background: ", ";\n    "])), badgeColor.neutral, badgeBackground.neutral);
}, function (props) {
    return props.status === 'warning' && css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      color: ", ";\n      background: ", ";\n    "], ["\n      color: ", ";\n      background: ", ";\n    "])), badgeColor.warning, badgeBackground.warning);
}, function (props) {
    return props.status === 'error' && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      color: ", ";\n      background: ", ";\n    "], ["\n      color: ", ";\n      background: ", ";\n    "])), badgeColor.error, badgeBackground.error);
});
export default function Badge(props) {
    return React.createElement(BedgeWrapper, __assign({}, props));
}
Badge.defaultProps = {
    status: 'neutral',
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
