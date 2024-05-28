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
var _this = this;
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState, } from 'react';
import styled from 'styled-components';
import Icon from '../icon';
var levelSpace = 24; // 同级生效间距
var originPadding = 24;
// 1 插上级 2 插同级 3 插下级 0 不插
var switchInsert = function (diff, item) {
    if (!isNaN(diff)) {
        var origin_1 = item.level * levelSpace; //目标原本的padding
        if (diff < origin_1) {
            // 移动padding前全部算上级
            if (checkParent(item)) {
                // 排除最顶级
                return 2;
            }
            else {
                return 1;
            }
        }
        else if (diff < origin_1 + levelSpace) {
            return 2;
        }
        else {
            return 3;
        }
    }
    else {
        return 0;
    }
};
export var throttle = function (fn, delay) {
    if (delay === void 0) { delay = 300; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
};
var checkParent = function (item) {
    return item.level === 1;
};
var insertTop = function (key, g, data, callback) {
    var origin = findOrigin(key, data);
    // origin 插入target上级
    var parent = getParent(g);
    if (g.level !== 1 &&
        origin &&
        checkTargetOrigin(g, origin) &&
        judgeChildren(origin, g)) {
        // 修改以前的父节点
        changeOriginParent(origin);
        // 修改目标父节点的父节点 （与父节点同级）
        changeTargetParent(parent, origin, g);
        callback();
    }
};
function findOrigin(key, data) {
    var res = data.filter(function (v) { return v.key === key; });
    if (res.length > 0) {
        return res[0];
    }
    else {
        return null;
    }
}
function getParent(item) {
    if (item.parent && item.parent.parent) {
        return item.parent.parent;
    }
    else {
        return item.parent;
    }
}
// 判断是否是同一个item
function checkTargetOrigin(item, origin) {
    return item !== origin;
}
// 判断子级是否包含有target，如果包含target就是false
function judgeChildren(origin, target) {
    var sign = true; // 如果有孩子就是false
    var fn = function (child) {
        if (child.children) {
            child.children.forEach(function (v) {
                if (v === target) {
                    sign = false;
                    return;
                }
                fn(v);
            });
        }
    };
    fn(origin);
    return sign;
}
// 先将当前节点从父级中删除
function changeOriginParent(origin) {
    var parent = origin.parent;
    if (parent.children) {
        var index = parent.children.indexOf(origin);
        if (index > -1) {
            parent.children.splice(index, 1);
        }
    }
    // 有bug的方法
    // parent.children = parent.children?.filter((v) => v !== origin);
}
// 将当前节点插入到父级里
function changeTargetParent(parent, origin, g) {
    origin.parent = parent;
    if (parent.children) {
        // 有子节点
        // 判断应该插入父节点哪里
        if (g.parent.children) {
            var index = g.parent.children.indexOf(g);
            if (index > -1) {
                parent.children.splice(index + 1, 0, origin);
            }
            else {
                // parent会传递g进来
                parent.children.push(origin);
            }
        }
    }
    else {
        parent.children = [origin];
    }
}
var insertMiddle = function (key, g, data, callback) {
    var origin = findOrigin(key, data);
    // origin 插入 parent 同级
    var parent = g.parent;
    if (g.level !== 0 &&
        origin &&
        checkTargetOrigin(g, origin) &&
        judgeChildren(origin, g)) {
        changeOriginParent(origin);
        changeTargetParent(parent, origin, g);
        callback();
    }
};
var insertBottom = function (key, g, data, callback) {
    var origin = findOrigin(key, data);
    var parent = g;
    if (origin && checkTargetOrigin(g, origin) && judgeChildren(origin, g)) {
        changeOriginParent(origin);
        changeTargetParent(parent, origin, g);
        callback();
    }
};
var TreeItem = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-left: ", "px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n  ", "\n"], ["\n  padding-left: ", "px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n  ", "\n"])), function (props) { return originPadding * props.level; }, function (props) {
    if (props.highlight.drag && props.highlight.itemkey === props.itemkey) {
        return "border: 1px dashed ".concat(props.borderColor);
    }
    else {
        return '';
    }
});
var TreeIcon = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  & > svg {\n    transition: linear 0.2s;\n    height: 10px;\n    margin-bottom: 5px;\n    ", "\n  }\n"], ["\n  & > svg {\n    transition: linear 0.2s;\n    height: 10px;\n    margin-bottom: 5px;\n    ", "\n  }\n"])), function (props) {
    if (props.g.children && props.g.children.length !== 0) {
        if (props.g.children[0] && props.g.children[0].visible) {
            return 'display: inline-block;transform: rotate(-90deg)';
        }
        else {
            return 'display: inline-block;';
        }
    }
    else {
        return 'opacity: 0';
    }
});
var TreeGap = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 90%;\n  background-color: ", "\n  ", ";\n  ", "\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 90%;\n  background-color: ", "\n  ", ";\n  ", "\n"])), function (props) { return props.backColor; }, function (props) {
    switch (props.x) {
        case 1:
            return "margin-left: ".concat(-levelSpace, "px");
        case 2:
            return "";
        case 3:
            return "margin-left: ".concat(levelSpace, "px");
        default:
            return '';
    }
}, function (props) {
    if (props.key === props.gKey) {
        return 'background: #00000030';
    }
});
var flatten = function (list, level, parent, defaultExpand) {
    if (level === void 0) { level = 1; }
    if (defaultExpand === void 0) { defaultExpand = true; }
    var arr = []; //收集所有子项
    list.forEach(function (item) {
        item.level = level;
        if (item.expand === undefined) {
            item.expand = defaultExpand;
        }
        if (item.visible === undefined) {
            item.visible = true;
        }
        if (!parent.visible || !parent.expand) {
            item.visible = false;
        }
        if (item.key === undefined) {
            item.key = item.value + Math.random();
        }
        item.parent = parent;
        arr.push(item);
        if (item['children']) {
            arr.push.apply(arr, flatten(item['children'], level + 1, item, defaultExpand));
        }
    });
    return arr;
};
function changeVisible(item, callback) {
    // 给点击的children设置visible
    if (item.children) {
        // 避免children有显示不一的行为
        var visible_1;
        var depth_1 = function (item) {
            item.forEach(function (v) {
                if (visible_1 === undefined) {
                    visible_1 = !v.visible;
                }
                v.visible = visible_1;
                if (v.children) {
                    depth_1(v.children);
                }
            });
        };
        depth_1(item.children);
        callback(); // 更改后更新页面
    }
}
export default function Tree(props) {
    var source = props.source, drag = props.drag, borderColor = props.borderColor, backColor = props.backColor, style = props.style, classname = props.classname;
    var root = useMemo(function () {
        return {
            level: 0,
            visible: true,
            expand: true,
            children: source,
            value: 'root',
        };
    }, [source]);
    var forceUpdate = useState(0)[1];
    var _a = useState(0), dragState = _a[0], setDragState = _a[1];
    var _b = useState(0), start = _b[0], setStart = _b[1];
    var _c = useState({
        drag: false,
        x: 0,
        itemkey: '',
    }), doverState = _c[0], setDoverState = _c[1];
    var _d = useState({
        drag: true,
        itemkey: '',
    }), highlight = _d[0], setHighlight = _d[1];
    var ref = useRef(null);
    var data = useMemo(function () { return flatten(root.children, 1, root); }, [dragState, root]);
    var dragCalback = function () { return setDragState(function (state) { return state + 1; }); };
    var dragHandler = function (clientX, itemkey, g) {
        var diff = clientX - start;
        var x = switchInsert(diff, g);
        setDoverState({
            drag: true,
            x: x,
            itemkey: itemkey,
        });
    };
    useEffect(function () {
        if (ref.current) {
            setStart(ref.current.getBoundingClientRect().left); // 为了找到起始值
        }
        // 解决鼠标拖动出去的问题：
        var dragEndHandler = function () {
            setDoverState(function (prev) { return (__assign(__assign({}, prev), { drag: false })); });
            setHighlight({
                drag: false,
                itemkey: '',
            });
        };
        window.addEventListener('dragend', dragEndHandler);
        return function () { return window.removeEventListener('dragend', dragEndHandler); };
    }, []);
    return (React.createElement("div", { ref: ref, style: style, className: classname }, data
        .filter(function (v) { return v.visible === true; })
        .map(function (g) {
        return (React.createElement(TreeItem, { draggable: drag, highlight: highlight, itemkey: g.key, onClick: function () {
                return changeVisible(g, function () { return forceUpdate(function (state) { return state + 1; }); });
            }, level: g.level, key: g.key, borderColor: borderColor, style: {
                paddingLeft: "".concat(levelSpace * g.level, "px"),
                cursor: 'pointer',
            }, onDragStart: function (e) {
                e.dataTransfer.setData('atomkey', "".concat(g.key));
                e.currentTarget.style.width = '50%';
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                // e.currentTarget.style.border = 'none';
                e.currentTarget.style.boxShadow =
                    '0 0 4px 4px rgba(0, 0, 0, 0.4)';
                setHighlight({
                    drag: true,
                    itemkey: g.key,
                });
            }, onDragOver: function (e) {
                e.preventDefault();
                e.currentTarget.style.background = 'unset';
                e.currentTarget.style.boxShadow = 'unset';
                e.currentTarget.style.width = 'unset';
                throttle(dragHandler)(e.clientX, g.key, g);
            }, onDrop: function (e) {
                var key = e.dataTransfer.getData('atomkey');
                var left = e.clientX;
                var diff = left - start; // 离顶部差距
                var res = switchInsert(diff, g);
                switch (res) {
                    case 1:
                        insertTop(key, g, data, dragCalback);
                        break;
                    case 2:
                        insertMiddle(key, g, data, dragCalback);
                        break;
                    case 3:
                        insertBottom(key, g, data, dragCalback);
                        break;
                    default:
                        break;
                }
            } },
            React.createElement(TreeIcon, { g: g },
                React.createElement(Icon, { icon: 'arrowdown' })),
            React.createElement("span", null, g.value),
            doverState.drag && (React.createElement(TreeGap, { gKey: g.key, drag: doverState.drag, x: doverState.x, itemkey: doverState.itemkey, backColor: backColor }))));
    })));
}
Tree.defaultProps = {
    source: [],
    drag: true,
    borderColor: '#53c94fa8',
    bckColor: '#00000030',
};
var templateObject_1, templateObject_2, templateObject_3;
