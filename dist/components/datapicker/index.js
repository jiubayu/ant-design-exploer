var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import styled, { css } from 'styled-components';
import { color } from '../shared/styles';
import { rgba } from 'polished';
import { modalCloseAnimate, modalOpenAnimate } from '../shared/animation';
import { useClickOutside, useStateAnimation } from '../shared/hooks';
import Button from '../button';
import Icon from '../icon';
var CalendarWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);\n  transition: all ", "s\n    cubic-bezier(0.23, 1, 0.32, 1);\n  background: ", ";\n  ", "\n  ", "\n"], ["\n  position: absolute;\n  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);\n  transition: all ", "s\n    cubic-bezier(0.23, 1, 0.32, 1);\n  background: ", ";\n  ", "\n  ", "\n"])), function (props) { return props.delay / 1000; }, color.lightest, function (props) {
    return props.visible && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      animation: ", " ", "s ease-in;\n    "], ["\n      animation: ", " ", "s ease-in;\n    "])), modalOpenAnimate, props.delay / 1000);
}, function (props) {
    return !props.visible && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      animation: ", " ", "s ease-in;\n    "], ["\n      animation: ", " ", "s ease-in;\n    "])), modalCloseAnimate, props.delay / 1000);
});
var CalendarDateRow = styled.tr(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var tableItemStyle = css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: inline-block;\n  min-width: 24px;\n  height: 24px;\n  line-height: 24px;\n  border-radius: 2px;\n  margin: 2px;\n  text-align: center;\n"], ["\n  display: inline-block;\n  min-width: 24px;\n  height: 24px;\n  line-height: 24px;\n  border-radius: 2px;\n  margin: 2px;\n  text-align: center;\n"])));
var CalendarHeadItem = styled.td(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  ", "\n  cursor: default;\n"], ["\n  ", "\n  cursor: default;\n"])), tableItemStyle);
var CalendarDate = styled.td(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  ", "\n  cursor: pointer;\n  ", "\n  ", "\n"], ["\n  ", "\n  cursor: pointer;\n  ", "\n  ", "\n"])), tableItemStyle, function (props) {
    if (props.isonDay) {
        return "color: ".concat(color.lightest, ";background: ").concat(color.primary);
    }
}, function (props) {
    if (props.isonMonth === false) {
        return "color: ".concat(color.mediumdark);
    }
    return '';
});
var CalendarHeaderWrapper = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  padding: 10px;\n  display: flex;\n  color: ", ";\n  border-bottom: 1px solid #f0f0f0;\n  justify-content: center;\n"], ["\n  padding: 10px;\n  display: flex;\n  color: ", ";\n  border-bottom: 1px solid #f0f0f0;\n  justify-content: center;\n"])), rgba(0, 0, 0, 0.85));
var btnStyle = {
    padding: '0px',
    background: color.lightest,
};
var IconWrapper = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: inline-block;\n  vertical-align: middle;\n  & > svg {\n    height: 12px;\n  }\n"], ["\n  display: inline-block;\n  vertical-align: middle;\n  & > svg {\n    height: 12px;\n  }\n"])));
var BtnDiv = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;\n  jutify-content: center;\n  align-items: center;\n  height: 24px;\n  line-height: 24px;\n"], ["\n  display: flex;\n  jutify-content: center;\n  align-items: center;\n  height: 24px;\n  line-height: 24px;\n"])));
var MonthWrapper = styled.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n"], ["\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n"])));
var MonthItem = styled.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  width: 25%;\n  height: 60px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  ", ";\n  &:hover {\n    color: ", ";\n  }\n"], ["\n  width: 25%;\n  height: 60px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  ", ";\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
    return props.toGray && css(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), color.mediumdark);
}, color.secondary);
var BWrapper = styled.b(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  cursor: pointer;\n  &:hover {\n    color: ", ";\n  }\n"], ["\n  cursor: pointer;\n  &:hover {\n    color: ", ";\n  }\n"])), color.primary);
var DatePickerWrapper = styled.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  display: inline-block;\n  border-color: #40a9ff;\n  border-right-width: 1px !important;\n  outline: 0;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n"], ["\n  display: inline-block;\n  border-color: #40a9ff;\n  border-right-width: 1px !important;\n  outline: 0;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n"])));
var CalendarIcon = styled.span(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  display: inline-block;\n"], ["\n  display: inline-block;\n"])));
var getDateData = function (year, month, day) {
    var firstDay = new Date(year, month, 1);
    var weekDay = firstDay.getDay(); // 获取周几
    weekDay = weekDay === 0 ? 7 : weekDay;
    var start = firstDay.getTime() - weekDay * 60 * 60 * 24 * 1000;
    var arr = [];
    for (var i = 0; i < 42; i++) {
        var current = new Date(start + i * 60 * 60 * 24 * 1000);
        var onMonth = isCurrentMonth(current, year, month);
        arr.push({
            day: current.getDate(),
            isonMonth: onMonth,
            isonDay: isCurrentDay(current, day, onMonth),
            origin: current,
        });
    }
    var k = -1;
    var dateData = Array.from({ length: 6 }, function () {
        k++;
        return arr.slice(k * 7, (k + 1) * 7);
    });
    return dateData;
};
// 通过系统来计算年月
var getYearMonthDay = function (date) {
    var temp = new Date(date);
    return [temp.getFullYear(), temp.getMonth(), temp.getDate()];
};
var changeCalData = function (sign, calData) {
    var oldDate = new Date(calData[0], calData[1]);
    var newDate = oldDate.setMonth(oldDate.getMonth() + sign);
    return getYearMonthDay(newDate);
};
var changeCalYear = function (sign, calData) {
    var oldDate = new Date(calData[0], calData[1]);
    var newDate = oldDate.setFullYear(oldDate.getFullYear() + sign);
    return getYearMonthDay(newDate);
};
var isCurrentMonth = function (current, year, month) {
    return current.getFullYear() === year && current.getMonth() === month;
};
var isCurrentDay = function (current, day, onMonth) {
    return current.getDate() === day && onMonth;
};
var generateDate = function (calData) {
    return "".concat(calData[0], "-").concat(calData[1] + 1, "-").concat(calData[2]);
};
var validateDate = function (value) {
    var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (reg.exec(value)) {
        return true;
    }
    else {
        return false;
    }
};
var monthData = new Array(12).fill(1).map(function (_x, y) { return y + 1; });
var getStartYear = function (calData) {
    return calData[0] - (calData[0] % 10);
};
export default function DatePicker(props) {
    var callback = props.callback, delay = props.delay, initDate = props.initDate, style = props.style, classname = props.classname;
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState(function () { return [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
    ]; }), calData = _b[0], setCalData = _b[1];
    var _c = useState(function () {
        if (initDate) {
            return initDate;
        }
        return generateDate(calData);
    }), state = _c[0], setState = _c[1];
    var _d = useState('date'), mode = _d[0], setMode = _d[1];
    var ref = useRef(null);
    var _e = useStateAnimation(setShow, 200), st = _e[0], setst = _e[1], unmount = _e[2];
    useClickOutside(ref, function () { return setst(false); });
    var handleChange = function (event) {
        setState(event.target.value);
    };
    var handleClick = function () {
        setShow(true);
    };
    useEffect(function () {
        if (callback) {
            callback(state);
        }
    }, [state, callback]);
    var dayData = useMemo(function () {
        var arr = getDateData.apply(void 0, calData);
        return arr;
    }, [calData]);
    var handleBlur = useCallback(function () {
        // 如果相等，说明是点击日期出现的
        if (state !== generateDate(calData)) {
            var res = validateDate(state); // 校验日期格式
            if (!res) {
                // 格式错误，使用之前数据
                setState(generateDate(calData));
            }
            else {
                var p = state.split('-');
                var newDate = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]));
                var newCal = [
                    newDate.getFullYear(),
                    newDate.getMonth(),
                    newDate.getDate(),
                ];
                setCalData(newCal);
                setState(generateDate(newCal));
            }
        }
    }, [state, calData]);
    var modeDay = useMemo(function () { return (React.createElement("table", { style: { display: mode === 'date' ? 'table' : 'none' } },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement(CalendarHeadItem, null, "\u65E5"),
                React.createElement(CalendarHeadItem, null, "\u4E00"),
                React.createElement(CalendarHeadItem, null, "\u4E8C"),
                React.createElement(CalendarHeadItem, null, "\u4E09"),
                React.createElement(CalendarHeadItem, null, "\u56DB"),
                React.createElement(CalendarHeadItem, null, "\u4E94"),
                React.createElement(CalendarHeadItem, null, "\u516D"))),
        React.createElement("tbody", null, dayData.map(function (d, index) { return (React.createElement(CalendarDateRow, { key: index }, d.map(function (v, i) { return (React.createElement(CalendarDate, { key: i, isonDay: v.isonDay, isonMonth: v.isonMonth, onClick: function () {
                var origin = v.origin;
                var newCalDate = [
                    origin.getFullYear(),
                    origin.getMonth(),
                    origin.getDate(),
                ];
                setCalData(newCalDate);
                setState(generateDate(newCalDate));
                setst(false);
            } }, v.day)); }))); })))); }, [dayData, setst, mode]);
    var modeMonth = useMemo(function () { return (React.createElement(MonthWrapper, { style: { display: mode === 'month' ? 'flex' : 'none' } }, monthData.map(function (v, i) {
        return (React.createElement(MonthItem, { key: i, onClick: function () {
                // 获取当前月 计算和之前日期月的差值
                var diff = v - calData[1] - 1;
                var res = changeCalData(diff, calData);
                setCalData(res);
                setMode('date');
            } },
            v,
            "\u6708"));
    }))); }, [mode, calData]);
    var modeYear = useMemo(function () {
        var startYear = getStartYear(calData);
        var yeamMap = new Array(12).fill(1).map(function (_x, y) { return startYear + y - 1; });
        return (React.createElement(MonthWrapper, { style: { display: mode === 'year' ? 'flex' : 'none' } }, yeamMap.map(function (v, i) { return (React.createElement(MonthItem, { toGray: i === 0 || i === 11, key: i, onClick: function () {
                // 获取选择年份的差值
                var diff = v - calData[0];
                var res = changeCalYear(diff, calData);
                setCalData(res);
                setMode('month');
            } }, v)); })));
    }, [calData, mode]);
    var render = useMemo(function () {
        function handleLeft() {
            var res;
            if (mode === 'date') {
                res = changeCalData(-1, calData);
            }
            else if (mode === 'month') {
                res = changeCalYear(-1, calData);
            }
            else if (mode === 'year') {
                res = changeCalYear(-10, calData);
            }
            setCalData(res);
        }
        function handleRight() {
            var res;
            if (mode === 'date') {
                res = changeCalData(1, calData);
            }
            else if (mode === 'month') {
                res = changeCalYear(1, calData);
            }
            else if (mode === 'year') {
                res = changeCalYear(10, calData);
            }
            setCalData(res);
        }
        var startYear = getStartYear(calData);
        if (!show) {
            unmount();
            return null;
        }
        else {
            return (React.createElement(CalendarWrapper, { style: style, className: classname, visible: st, delay: delay },
                React.createElement(CalendarHeaderWrapper, null,
                    React.createElement(BtnDiv, null,
                        React.createElement(Button, { size: 'small', style: btnStyle, onClick: handleLeft },
                            React.createElement(IconWrapper, null,
                                React.createElement(Icon, { icon: 'arrowleft' }))),
                        React.createElement(BtnDiv, null,
                            React.createElement("span", null,
                                React.createElement(BWrapper, { style: { display: mode === 'year' ? 'inline-block' : 'none' } }, "".concat(startYear, "-").concat(startYear + 9)),
                                React.createElement(BWrapper, { style: {
                                        display: mode === 'month' || mode === 'date'
                                            ? 'inline-block'
                                            : 'none',
                                    }, onClick: function () { return setMode('year'); } },
                                    calData[0],
                                    "\u5E74"),
                                React.createElement(BWrapper, { style: {
                                        display: mode === 'date' ? 'inline-block' : 'none',
                                    }, onClick: function () { return setMode('month'); } },
                                    calData[1] + 1,
                                    "\u6708"))),
                        React.createElement(Button, { size: 'small', style: btnStyle, onClick: handleRight },
                            React.createElement(IconWrapper, null,
                                React.createElement(Icon, { icon: 'arrowright' }))))),
                React.createElement("div", { style: { padding: '10px' } },
                    modeDay,
                    modeMonth,
                    modeYear)));
        }
    }, [show, unmount, st, calData, modeDay, modeMonth, modeYear, mode]);
    return (React.createElement(DatePickerWrapper, { ref: ref },
        React.createElement("input", { "aria-label": 'date picker', value: state, onChange: handleChange, onClick: handleClick, onBlur: handleBlur, style: { border: 'none', boxShadow: 'none', outline: 'none' } }),
        React.createElement(CalendarIcon, null,
            React.createElement(Icon, { icon: 'calendar' })),
        render));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
