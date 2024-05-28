var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from '../button';
import Icon from '../icon';
var PageUl = styled.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  & > li {\n    list-style: none;\n  }\n  & button {\n    border-radius: 6px;\n    padding: 10px 8px;\n  }\n  & span {\n    line-height: 13.6px;\n    height: 13.6px;\n    min-width: 18px;\n  }\n  & svg {\n    height: 13.6px;\n    width: 13.6px;\n    vertical-align: bottom;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  & > li {\n    list-style: none;\n  }\n  & button {\n    border-radius: 6px;\n    padding: 10px 8px;\n  }\n  & span {\n    line-height: 13.6px;\n    height: 13.6px;\n    min-width: 18px;\n  }\n  & svg {\n    height: 13.6px;\n    width: 13.6px;\n    vertical-align: bottom;\n  }\n"])));
function calculateMove(current, state, totalPage) {
    var mid = state.length >> 1;
    if (current - 1 < mid || totalPage - current < mid)
        return null;
    var leftArr = new Array(mid).fill(1).map(function (v, i) { return current - i - 1; }).reverse();
    var rightArr = new Array(mid)
        .fill(1)
        .map(function (v, i) { return current + i + 1; });
    var arr = leftArr.concat(current).concat(rightArr);
    return arr;
}
export default function Pagination(props) {
    var pageSize = props.pageSize, defaultCurrent = props.defaultCurrent, barMaxSize = props.barMaxSize, total = props.total, callback = props.callback, style = props.style, classnames = props.classnames;
    var _a = useState(defaultCurrent), current = _a[0], setCurrent = _a[1];
    var _b = useState([]), state = _b[0], setState = _b[1];
    var totalPage = useMemo(function () {
        var number = Math.ceil(total / pageSize);
        if (number > barMaxSize) {
            var statetmp = new Array(barMaxSize).fill(1).map(function (x, y) { return y + 1; });
            setState(statetmp);
            var arr = calculateMove(defaultCurrent, statetmp, number);
            if (arr)
                setState(arr);
        }
        else {
            var statetmp = new Array(number).fill(1).map(function (x, y) { return y + 1; });
            setState(statetmp);
            var arr = calculateMove(defaultCurrent, statetmp, number);
            if (arr)
                setState(arr);
        }
        return number;
    }, [pageSize, total, barMaxSize, defaultCurrent]);
    useEffect(function () {
        if (callback)
            callback(current);
    }, [callback, current]);
    return (React.createElement(PageUl, { style: style, className: classnames },
        React.createElement("li", null,
            React.createElement(Button, { disabled: current === 1, appearance: 'primaryOutline', onClick: function () {
                    if (state.length > 0) {
                        if (state[0] > 1) {
                            var tmp = state.map(function (x) { return x - 1; });
                            setState(tmp);
                            setCurrent(current - 1);
                            var arr = calculateMove(current - 1, tmp, totalPage);
                            if (arr)
                                setState(arr);
                        }
                        else if (current !== state[0]) {
                            setCurrent(current - 1);
                            var arr = calculateMove(current - 1, state, totalPage);
                            if (arr)
                                setState(arr);
                        }
                    }
                } },
                React.createElement(Icon, { icon: 'arrowleft' }))),
        state.map(function (v, i) {
            return (React.createElement("li", { key: i },
                React.createElement(Button, { onClick: function () {
                        setCurrent(v);
                        var arr = calculateMove(v, state, totalPage);
                        if (arr)
                            setState(arr);
                    }, appearance: current === v ? 'primary' : 'primaryOutline' }, v)));
        }),
        React.createElement("li", null,
            React.createElement(Button, { disabled: current === totalPage, appearance: 'primaryOutline', onClick: function () {
                    if (state.length > 0) {
                        if (state[barMaxSize - 1] < totalPage) {
                            var tmp = state.map(function (x) { return x + 1; });
                            setState(tmp);
                            setCurrent(current + 1);
                            var arr = calculateMove(current + 1, tmp, totalPage);
                            if (arr)
                                setState(arr);
                        }
                        else {
                            if (current !== totalPage) {
                                setCurrent(current + 1);
                                var arr = calculateMove(current + 1, state, totalPage);
                                if (arr)
                                    setState(arr);
                            }
                        }
                    }
                } },
                React.createElement(Icon, { icon: 'arrowright' })))));
}
Pagination.defaultProps = {
    pageSize: 10,
    defaultCurrent: 4,
    barMaxSize: 5,
    total: 1000,
};
var templateObject_1;
