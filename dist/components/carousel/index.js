/** @format */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useMemo, useRef, useState, } from 'react';
import styled from 'styled-components';
import Radio from '../radio';
var Transition = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n  ", "\n  ", "\n"])), function (props) {
    return !props.animation &&
        props.direction === 'left' &&
        "\n      transform: translateX(100%);\n    ";
}, function (props) {
    return !props.animation &&
        props.direction === 'right' &&
        "\n\t\ttransform: translateX(-100%);\n\t\t";
}, function (props) {
    return props.animation &&
        props.direction === 'left' &&
        "\n\t\t  transform: translateX(0);\n\t\t\ttransition: all ".concat(props.delay / 1000, "s ease;\n\t  ");
}, function (props) {
    return props.animation &&
        props.direction === 'right' &&
        "\n\t\ttransform: translateX(0);\n\t\ttransition: all ".concat(props.delay / 1000, "s ease;\n\t\t");
});
var Wrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px;\n  border-radius: 5px;\n  box-shadow: ", ";\n"], ["\n  padding: 10px;\n  border-radius: 5px;\n  box-shadow: ", ";\n"])), function (props) { return props.viewportBoxshadow; });
function currentSetMap(current, map) {
    var mid = map[1];
    if (mid === current) {
        return map;
    }
    else if (mid < current) {
        return [mid, current, -1];
    }
    else {
        return [-1, current, mid];
    }
}
function mapToState(map, children, totalLen) {
    if (totalLen <= 1) {
        return [null, children, null];
    }
    else {
        return map.map(function (v) {
            if (v === -1) {
                return null;
            }
            else {
                var child = children;
                return child[v];
            }
        });
    }
}
function toMove(right, totalLen, indexMap, setIndexMap) {
    var y;
    if (right) {
        if (indexMap[1] < totalLen - 1) {
            y = indexMap[1] + 1;
        }
        else {
            y = 0;
        }
    }
    else {
        if (indexMap[1] === 0) {
            y = totalLen - 1;
        }
        else {
            y = indexMap[1] - 1;
        }
    }
    setIndexMap(currentSetMap(y, indexMap));
}
export default function Carousel(props) {
    var defaultIndex = props.defaultIndex, height = props.height, autoplay = props.autoplay, autoplayDelay = props.autoplayDelay, autoplayReverse = props.autoplayReverse, delay = props.delay, radioAppear = props.radioAppear;
    // 设置需要展示的元素
    var _a = useState([]), state = _a[0], setState = _a[1];
    // 设置显示索引用
    var _b = useState([
        -1, -1, -1,
    ]), indexMap = _b[0], setIndexMap = _b[1];
    // 控制方向进出用
    var _c = useState({
        animation: true,
        direction: '',
    }), animation = _c[0], setAnimation = _c[1];
    // 设置宽度用
    var _d = useState(), bound = _d[0], setBound = _d[1];
    // 适配移动端的拖动
    var _e = useState(0), start = _e[0], setStart = _e[1];
    var touchStart = function (e) {
        setStart(e.touches[0].clientX);
    };
    var touchEnd = function (e) {
        var end = e.touches[0].clientX;
        var val = end - start;
        if (val > 0) {
            toMove(true, totalLen, indexMap, setIndexMap);
        }
        else {
            toMove(true, totalLen, indexMap, setIndexMap);
        }
    };
    var totalLen = useMemo(function () {
        var len;
        if (props.children instanceof Array) {
            len = props.children.length;
        }
        else {
            len = 1;
        }
        return len;
    }, [props.children]);
    useMemo(function () {
        var map = [-1, -1, -1];
        map[1] = defaultIndex;
        var res = mapToState(map, props.children, totalLen);
        setState(res);
        setIndexMap(map);
    }, [defaultIndex, props.children, totalLen]);
    useEffect(function () {
        var child = props.children;
        var timer;
        if (child) {
            var temp = indexMap.map(function (v) {
                return v !== -1 ? child[v] : null;
            });
            var sign_1;
            setState(temp); // 后setState会有补足问题必须先设
            if (indexMap[0] !== -1 && indexMap[2] !== -1) {
                // 首轮
                return;
            }
            else if (indexMap[0] === -1) {
                sign_1 = true;
                setAnimation({ animation: false, direction: 'right' });
            }
            else {
                sign_1 = false;
                setAnimation({ animation: false, direction: 'left' });
            }
            timer = window.setTimeout(function () {
                if (sign_1) {
                    setAnimation({ animation: true, direction: 'right' });
                }
                else {
                    setAnimation({ animation: true, direction: 'left' });
                }
                return function () { return window.clearTimeout(timer); };
            }, delay);
        }
    }, [props.children, delay, indexMap]);
    var ref = useRef(null);
    useEffect(function () {
        var setBoundFunc = function () {
            if (ref.current) {
                var bound_1 = ref.current.getBoundingClientRect();
                setBound(bound_1);
            }
        };
        setBoundFunc();
        var resizeFunc = function () { return setBoundFunc(); };
        window.addEventListener('resize', resizeFunc);
        return function () { return window.removeEventListener('resize', resizeFunc); };
    }, []);
    // 自动播放功能
    useEffect(function () {
        var timer;
        if (autoplay) {
            timer = window.setTimeout(function () {
                toMove(!autoplayReverse, totalLen, indexMap, setIndexMap);
            }, autoplayDelay);
        }
        return function () { return window.clearTimeout(timer); };
    }, [autoplay, indexMap, totalLen, autoplayDelay, autoplayReverse]);
    return (React.createElement(Wrapper, { ref: ref, viewportBoxshadow: '' },
        React.createElement("div", { className: 'viewport', style: {
                width: '100%',
                height: "".concat(height, "px"),
                overflow: 'hidden',
                position: 'relative',
            } },
            React.createElement(Transition, { animation: animation.animation, direction: animation.direction, delay: autoplayDelay },
                React.createElement("div", { style: {
                        display: 'flex',
                        width: "".concat((bound === null || bound === void 0 ? void 0 : bound.width) * 3, "px"),
                        position: 'absolute',
                        left: "".concat(-(bound === null || bound === void 0 ? void 0 : bound.width), "px"),
                    } }, state.map(function (v, i) { return (React.createElement("div", { key: i, style: {
                        width: "".concat(bound === null || bound === void 0 ? void 0 : bound.width, "px"),
                        height: "".concat(height, "px"),
                    } }, v)); })))),
        React.createElement("ul", { style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            } }, new Array(totalLen).fill(1).map(function (x, y) {
            return (React.createElement(Radio, { label: '', key: y, hideLabel: true, value: 0, appearance: radioAppear, checked: y === indexMap[1], onChange: function () { }, onClick: function () {
                    var newMap = currentSetMap(y, indexMap);
                    setIndexMap(newMap);
                } }));
        }))));
}
Carousel.defaultProps = {
    defaultIndex: 0,
    delay: 100,
    height: 200,
    autoplay: true,
    autoplayDelay: 5000,
    autoplayReverse: true,
};
var templateObject_1, templateObject_2;
