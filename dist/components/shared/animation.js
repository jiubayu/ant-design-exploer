var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { keyframes } from 'styled-components';
export var easing = {
    rubber: 'cubic-bezier(0.175, 0.885, 0.335, 1.05)',
};
export var grow = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0%,100% {opacity: 1};\n  50% {opacity: .4}\n"], ["\n  0%,100% {opacity: 1};\n  50% {opacity: .4}\n"])));
export var modalOpenAnimate = keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  0% {\n    opacity: 0;\n    transform: scaleY(0,0);\n  }\n  100% {\n     opacity: 1;\n     transform: scaleY(1, 1);\n      transform-origin:center;\n  }\n"], ["\n  0% {\n    opacity: 0;\n    transform: scaleY(0,0);\n  }\n  100% {\n     opacity: 1;\n     transform: scaleY(1, 1);\n      transform-origin:center;\n  }\n"])));
export var modalCloseAnimate = keyframes(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  0% {\n    opacity: 1;\n     transform:scale(1, 1);\n    transform-origin:center;\n  }\n  100% {\n     opacity: 0;\n    transform: scaleY(0,0);\n  }\n"], ["\n  0% {\n    opacity: 1;\n     transform:scale(1, 1);\n    transform-origin:center;\n  }\n  100% {\n     opacity: 0;\n    transform: scaleY(0,0);\n  }\n"])));
export var messageOpenAnimate = keyframes(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  0% {\n    opacity: 0;\n    margin-top: -30px;\n  }\n  50% {\n    opacity: 0.1;\n    margin-top: -15px;\n  }\n  100% {\n    opacity: 1;\n    margin-top: 0;\n  }\n"], ["\n  0% {\n    opacity: 0;\n    margin-top: -30px;\n  }\n  50% {\n    opacity: 0.1;\n    margin-top: -15px;\n  }\n  100% {\n    opacity: 1;\n    margin-top: 0;\n  }\n"])));
export var messageCloseAnimate = keyframes(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  0% {\n    opacity: 1;\n    margin-top: 0;\n  }\n  100% {\n    opacity: 0;\n    margin-top: -30px;\n  }\n"], ["\n  0% {\n    opacity: 1;\n    margin-top: 0;\n  }\n  100% {\n    opacity: 0;\n    margin-top: -30px;\n  }\n"])));
export var iconSpin = keyframes(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  0% {\n     transform: rotate(0deg);\n  }\n  100% {\n     transform: rotate(360deg);\n  }\n"], ["\n  0% {\n     transform: rotate(0deg);\n  }\n  100% {\n     transform: rotate(360deg);\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
