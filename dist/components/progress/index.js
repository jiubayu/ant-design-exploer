/** @format */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useMemo, useState, } from 'react';
import styled, { keyframes } from 'styled-components';
import { color, typography } from '../shared/styles';
export var progressFlash = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% { opacity: 0.1;\n    width: 0; \n  }\n  20% { opacity: 0.5;\n    width: 0; \n  } \n  100% { opacity: 0;\n    width: 100%; \n  }\n"], ["\n  0% { opacity: 0.1;\n    width: 0; \n  }\n  20% { opacity: 0.5;\n    width: 0; \n  } \n  100% { opacity: 0;\n    width: 100%; \n  }\n"])));
var BarWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tdisplay: flex;\n\tpadding: 5px;\n\talign-items: center;\n"], ["\n\tdisplay: flex;\n\tpadding: 5px;\n\talign-items: center;\n"])));
var BarMain = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: ", "%;\n  height: ", "px;\n  background-color: ", ";\n  background-image: linear-gradient(\n    to right,\n    ", ",\n    ", "\n  );\n  transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;\n  border-radius: 5px;\n  position: relative;\n  &::before {\n    animation: ", " 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;\n    background: ", ";\n    border-radius: 10px;\n    bottom: 0;\n    content: '';\n    left: 0;\n    opacity: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n  }\n"], ["\n  width: ", "%;\n  height: ", "px;\n  background-color: ", ";\n  background-image: linear-gradient(\n    to right,\n    ", ",\n    ", "\n  );\n  transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;\n  border-radius: 5px;\n  position: relative;\n  &::before {\n    animation: ", " 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;\n    background: ", ";\n    border-radius: 10px;\n    bottom: 0;\n    content: '';\n    left: 0;\n    opacity: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n  }\n"])), function (props) { return props.state; }, function (props) { return (props.height ? props.height : 8); }, function (props) { return props.primary; }, function (props) { return props.primary; }, function (props) { return props.secondary; }, progressFlash, function (props) { return props.flashColor; });
var BarMainWrapper = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 100%;\n  border-radius: 5px;\n  position: relative;\n  background: ", ",\n  height: ", "px,\n"], ["\n  width: 100%;\n  border-radius: 5px;\n  position: relative;\n  background: ", ",\n  height: ", "px,\n"])), function (props) { return props.bottomColor; }, function (props) { return (props.height ? props.height : 8); });
var BarText = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  line-height: ", "px;\n  font-weight: ", ";\n  text-align: center;\n  display: inline-block;\n  margin-left: 10px;\n  min-width: 55px;\n"], ["\n  line-height: ", "px;\n  font-weight: ", ";\n  text-align: center;\n  display: inline-block;\n  margin-left: 10px;\n  min-width: 55px;\n"])), function (props) { return (props.height ? props.height : 8); }, typography.weight.bold);
var CircleWrapper = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n  border-radius: 50%;\n"], ["\n  position: relative;\n  display: inline-block;\n  border-radius: 50%;\n"])));
var CircleText = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  line-height: ", "px;\n  width: ", "px;\n  height: ", "px;\n  border-radius: 50%;\n  display: inline-block;\n  font-weight: ", ";\n  left: 50%;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  transform: translateX(-50%) translateY(-50%);\n"], ["\n  line-height: ", "px;\n  width: ", "px;\n  height: ", "px;\n  border-radius: 50%;\n  display: inline-block;\n  font-weight: ", ";\n  left: 50%;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  transform: translateX(-50%) translateY(-50%);\n"])), function (props) { return props.size * 0.62; }, function (props) { return props.size * 0.62; }, function (props) { return props.size * 0.62; }, typography.weight.bold);
export default function Progress(props) {
    var count = props.count, countNumber = props.countNumber, height = props.height, circle = props.circle, size = props.size, circleText = props.circleText, progressText = props.progressText, bottomColor = props.bottomColor, style = props.style, className = props.className, flashColor = props.flashColor, primary = props.primary, secondary = props.secondary;
    var _a = useState(0), state = _a[0], setState = _a[1];
    var _b = useState(''), dasharray = _b[0], setDasharray = _b[1];
    useMemo(function () {
        if (count < 0) {
            setState(0);
        }
        else if (count > 100) {
            setState(100);
        }
        else {
            setState(count);
        }
    }, [count]);
    useEffect(function () {
        if (circle) {
            var percent = state / 100;
            var perimeter = Math.PI * 2 * 170;
            var dasharray_1 = perimeter * percent + '' + perimeter * (1 - percent);
            setDasharray(dasharray_1);
        }
    }, [circle, state]);
    var render = useMemo(function () {
        if (circle) {
            return (React.createElement(CircleWrapper, { style: style, className: className },
                React.createElement("svg", { width: size, height: size, viewBox: '0 0 420 420', style: { transform: 'rotate(270deg)' } },
                    React.createElement("defs", null,
                        React.createElement("radialGradient", { id: 'linear', r: '100%', cx: '100%', cy: '100%', spreadMethod: 'pad' },
                            React.createElement("stop", { offset: '0%', stopColor: '#40a9ff' }),
                            React.createElement("stop", { offset: '100%', stopColor: '#36cfc9' }))),
                    React.createElement("circle", { cx: '210', cy: '210', r: '170', strokeWidth: '40', stroke: '#f5f5f5', fill: 'none' }),
                    React.createElement("circle", { cx: '210', cy: '210', r: '170', strokeWidth: '40', stroke: 'url(#linear)', fill: 'none', opacity: state === 0 ? 0 : 1, strokeLinecap: 'round', strokeDasharray: dasharray, strokeDashoffset: '0px', style: {
                            transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s',
                        } })),
                React.createElement("div", { style: {
                        lineHeight: "".concat(size * 0.6, "px"),
                        width: "".concat(size * 0.6, "px"),
                        height: "".concat(size * 0.62, "px"),
                    } },
                    React.createElement(CircleText, { size: size }, progressText ? progressText : "".concat(state, "%")))));
        }
        else {
            return (React.createElement(BarWrapper, { style: style, className: className },
                React.createElement(BarMainWrapper, { bottomColor: bottomColor, height: height },
                    React.createElement(BarMain, { flashColor: flashColor, primary: primary, secondary: secondary, state: state, height: height })),
                countNumber && (React.createElement(BarText, { height: height }, progressText ? progressText : "".concat(state, "%")))));
        }
    }, [
        circle,
        state,
        height,
        progressText,
        size,
        countNumber,
        dasharray,
        flashColor,
        primary,
        secondary,
        bottomColor,
        className,
        style,
    ]);
    return React.createElement(React.Fragment, null, render);
}
Progress.defaultProps = {
    countNumber: true,
    circle: false,
    size: 100,
    primary: color.primary,
    secondary: color.gold,
    flashColor: color.lightest,
    bottomColor: color.medium,
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
