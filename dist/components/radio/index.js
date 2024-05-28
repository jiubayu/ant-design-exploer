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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import styled, { css } from "styled-components";
import { color, typography } from "../shared/styles";
var Label = styled.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  height: 1em;\n  display: flex;\n  align-items: center;\n  cursor: ", ";\n  font-size: ", "px;\n  font-weight: ", ";\n"], ["\n  position: relative;\n  height: 1em;\n  display: flex;\n  align-items: center;\n  cursor: ", ";\n  font-size: ", "px;\n  font-weight: ", ";\n"])), function (props) { return (props.disabled ? 'not-allowed' : 'pointer'); }, typography.size.s2, typography.weight.bold);
var OptionalText = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), function (props) {
    return props.hideLabel && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      border: 0px !important;\n      clip: rect(0 0 0 0) !important;\n      -webkit-clip-path: inset(100%) !important;\n      clip-path: inset(100%) !important;\n      height: 1px !important;\n      overflow: hidden !important;\n      padding: 0px !important;\n      position: absolute !important;\n      white-space: nowrap !important;\n      width: 1px !important;\n    "], ["\n      border: 0px !important;\n      clip: rect(0 0 0 0) !important;\n      -webkit-clip-path: inset(100%) !important;\n      clip-path: inset(100%) !important;\n      height: 1px !important;\n      overflow: hidden !important;\n      padding: 0px !important;\n      position: absolute !important;\n      white-space: nowrap !important;\n      width: 1px !important;\n    "])));
});
var Description = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n  margin-top: 4px;\n  margin-left: calc(", "px + 0.4em);\n  width: 100%;\n"], ["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n  margin-top: 4px;\n  margin-left: calc(", "px + 0.4em);\n  width: 100%;\n"])), typography.size.s1, typography.weight.regular, color.mediumdark, typography.size.s2);
var RadioWrapper = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n"], ["\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n"])));
var Input = styled.input(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin: 0 0.4em 0 0;\n  font-size: initial;\n  opacity: 0;\n\n  & + span {\n    &:before,\n    &:after {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 1em;\n      width: 1em;\n      content: '';\n      display: block;\n      border-radius: 3em;\n    }\n  }\n\n  & + span:before {\n    box-shadow: ", " 0 0 0 1px inset;\n  }\n\n  &:focus + span:before {\n    box-shadow: ", " 0 0 0 1px inset;\n  }\n\n  &:checked + span:before {\n    box-shadow: ", " 0 0 0 1px inset;\n  }\n\n  &:checked:focus + span:before {\n    box-shadow:\n      ", " 0 0 0 1px inset;\n  }\n\n  & + span:after {\n    transition: all 150ms ease-out;\n    transform: scale3d(0, 0, 1);\n\n    height: 10px;\n    margin-left: 2px;\n    margin-top: 2px;\n    width: 10px;\n\n    opacity: 0;\n  }\n\n  &:checked + span:after {\n    transform: scale3d(1, 1, 1);\n    background: ", ";\n    opacity: 1;\n  }\n"], ["\n  margin: 0 0.4em 0 0;\n  font-size: initial;\n  opacity: 0;\n\n  & + span {\n    &:before,\n    &:after {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 1em;\n      width: 1em;\n      content: '';\n      display: block;\n      border-radius: 3em;\n    }\n  }\n\n  & + span:before {\n    box-shadow: ", " 0 0 0 1px inset;\n  }\n\n  &:focus + span:before {\n    box-shadow: ", " 0 0 0 1px inset;\n  }\n\n  &:checked + span:before {\n    box-shadow: ", " 0 0 0 1px inset;\n  }\n\n  &:checked:focus + span:before {\n    box-shadow:\n      ", " 0 0 0 1px inset;\n  }\n\n  & + span:after {\n    transition: all 150ms ease-out;\n    transform: scale3d(0, 0, 1);\n\n    height: 10px;\n    margin-left: 2px;\n    margin-top: 2px;\n    width: 10px;\n\n    opacity: 0;\n  }\n\n  &:checked + span:after {\n    transform: scale3d(1, 1, 1);\n    background: ", ";\n    opacity: 1;\n  }\n"])), color.mediumdark, function (props) { return color[props.appearance]; }, function (props) { return color[props.appearance]; }, function (props) { return color[props.appearance]; }, function (props) { return color[props.appearance]; });
var Error = styled.span(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-weight: ", ";\n  font-size: ", "px;\n  color: ", ";\n  margin-left: 6px;\n  height: 1em;\n  display: flex;\n  align-items: center;\n"], ["\n  font-weight: ", ";\n  font-size: ", "px;\n  color: ", ";\n  margin-left: 6px;\n  height: 1em;\n  display: flex;\n  align-items: center;\n"])), typography.weight.regular, typography.size.s2, color.negative);
export default function Radio(props) {
    var appearance = props.appearance, label = props.label, hideLabel = props.hideLabel, error = props.error, description = props.description, wrapperClass = props.wrapperClass, disabled = props.disabled, restProps = __rest(props, ["appearance", "label", "hideLabel", "error", "description", "wrapperClass", "disabled"]);
    return (React.createElement(RadioWrapper, null,
        React.createElement(Label, { disabled: disabled },
            React.createElement(Input, __assign({}, restProps, { role: "radio", "aria-invalid": !!error, type: "radio" })),
            React.createElement("span", null,
                React.createElement(OptionalText, { hideLabel: hideLabel }, label))),
        error && React.createElement(Error, null, error),
        description && React.createElement(Description, null, description)));
}
Radio.defaultProps = {
    appearance: 'primary',
    hideLabel: false,
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
