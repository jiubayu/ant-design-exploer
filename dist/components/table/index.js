var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { color } from '../shared/styles';
import Pagination from '../pagination';
import Icon from '../icon';
var StyledTable = styled.table(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  text-align: left;\n  border-radius: 2px 2px 0 0;\n  border-collapse: separate;\n  border-spacing: 0;\n  table-layout: auto;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-variant: tabular-nums;\n  line-height: 1.5715;\n  list-style: none;\n  font-feature-settings: 'tnum';\n  position: relative;\n  z-index: 0;\n  clear: both;\n  font-size: 14px;\n  background: #fff;\n  border-radius: 2px;\n  & > thead > tr > th {\n    color: rgba(0, 0, 0, 0.85);\n    font-weight: 500;\n    text-align: left;\n    background: #fafafa;\n    border-bottom: 1px solid #f0f0f0;\n    transition: background 0.3s ease;\n    position: relative;\n    padding: 16px;\n    overflow-wrap: break-word;\n  }\n  & > tbody > tr {\n    & > td {\n      border-bottom: 1px solid #f0f0f0;\n      transition: background 0.3s;\n      position: relative;\n      padding: 16px;\n      overflow-wrap: break-word;\n    }\n    &:hover {\n      & > td {\n        background: #fafafa;\n      }\n    }\n  }\n"], ["\n  width: 100%;\n  text-align: left;\n  border-radius: 2px 2px 0 0;\n  border-collapse: separate;\n  border-spacing: 0;\n  table-layout: auto;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-variant: tabular-nums;\n  line-height: 1.5715;\n  list-style: none;\n  font-feature-settings: 'tnum';\n  position: relative;\n  z-index: 0;\n  clear: both;\n  font-size: 14px;\n  background: #fff;\n  border-radius: 2px;\n  & > thead > tr > th {\n    color: rgba(0, 0, 0, 0.85);\n    font-weight: 500;\n    text-align: left;\n    background: #fafafa;\n    border-bottom: 1px solid #f0f0f0;\n    transition: background 0.3s ease;\n    position: relative;\n    padding: 16px;\n    overflow-wrap: break-word;\n  }\n  & > tbody > tr {\n    & > td {\n      border-bottom: 1px solid #f0f0f0;\n      transition: background 0.3s;\n      position: relative;\n      padding: 16px;\n      overflow-wrap: break-word;\n    }\n    &:hover {\n      & > td {\n        background: #fafafa;\n      }\n    }\n  }\n"])));
var TableHeaderSpan = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: inline-block;\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 16px;\n  cursor: pointer;\n  & > svg {\n    width: 10px;\n    height: 10px;\n  }\n"], ["\n  display: inline-block;\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 16px;\n  cursor: pointer;\n  & > svg {\n    width: 10px;\n    height: 10px;\n  }\n"])));
var mapData = function (data, columnData) {
    return data.map(function (v) {
        return (React.createElement("tr", { key: v.key }, columnData.map(function (cm, i) {
            return (React.createElement("td", { key: i },
                React.createElement("span", null, cm.render
                    ? cm.render(v[cm.dataIndex], v, cm)
                    : v[cm.dataIndex])));
        })));
    });
};
export default function Table(props) {
    var data = props.data, pageSize = props.pageSize, columns = props.columns, sorted = props.sorted, pagination = props.pagination;
    var _a = useState([]), columnData = _a[0], setColumnData = _a[1];
    var _b = useState([]), sourceData = _b[0], setSourceData = _b[1];
    var _c = useState([]), paginationData = _c[0], setPaginationData = _c[1];
    var _d = useState([]), sortedData = _d[0], setSortedData = _d[1];
    var _e = useState([]), filterState = _e[0], setFilterState = _e[1]; // 记录第几列开启筛选
    var _f = useState(0), current = _f[0], setCurrent = _f[1];
    var originPagination = useMemo(function () {
        return function (data) {
            var tmp = [];
            var len = data.length;
            var pageNumber = Math.ceil(len / pageSize); // 页数
            for (var i = 0; i < pageNumber; i++) {
                tmp[i] = data.slice(0 + i * pageSize, pageSize + i * pageSize);
            }
            setPaginationData(tmp);
        };
    }, [pageSize]);
    var totalColumn = useMemo(function () {
        //表头总长
        setColumnData(columns); //表头拿来渲染
        setFilterState(new Array(columns.length).fill(0)); // 初始化
        return columns.length;
    }, [columns]);
    var totalLen = useMemo(function () {
        setSourceData(data);
        if (pagination) {
            // 分页走 paginationData
            originPagination(data);
        }
        return data.length;
    }, [data, pagination, originPagination]);
    var renderData = useMemo(function () {
        console.log(pagination, paginationData, 'paginationData---');
        var render;
        if (pagination && paginationData.length !== 0) {
            //如果分页，渲染分页
            render = mapData(paginationData[current], columnData);
        }
        else {
            if (sortedData.length === 0) {
                render = mapData(sourceData, columnData);
            }
            else {
                // 如果有排序数据，就根据排序数据进行处理
                render = mapData(sortedData, columnData);
            }
        }
        return render;
    }, [paginationData, pagination, current, columnData, sourceData, sortedData]);
    return (React.createElement("div", null,
        React.createElement(StyledTable, null,
            React.createElement("thead", null,
                React.createElement("tr", null, columnData.map(function (v, i) {
                    return (React.createElement("th", { key: v.dataIndex },
                        React.createElement("span", null, v.title),
                        v.sorter && sorted && v.sorter.compare && (React.createElement(TableHeaderSpan, { onClick: function () {
                                if (filterState[i]) {
                                    // 如果已经开启了排序
                                    // 1 进行逆序 否则 清空
                                    if (filterState[i] === 1) {
                                        var res = sourceData
                                            .slice()
                                            .sort(function (a, b) { return -v.sorter.compare(a, b); }); // 数据传给compare
                                        var newFilter = new Array(totalColumn).fill(0);
                                        newFilter[i] = 2;
                                        setSortedData(res);
                                        setFilterState(newFilter);
                                    }
                                    else {
                                        setSortedData([]); // 清空排序数据
                                        if (pagination) {
                                            originPagination(data);
                                        }
                                        filterState[i] = 0;
                                        setFilterState(__spreadArray([], filterState, true));
                                    }
                                }
                                else {
                                    // 没有开启就开启排序
                                    var res = sourceData
                                        .slice()
                                        .sort(v.sorter.compare); // 数据传给compare
                                    var newFilter = new Array(totalColumn).fill(0);
                                    newFilter[i] = 1;
                                    setSortedData(res);
                                    setFilterState(newFilter);
                                }
                            } },
                            React.createElement(Icon, { icon: 'arrowup', block: true, color: filterState[i] === 1 ? color.primary : color.dark }),
                            React.createElement(Icon, { icon: 'arrowdown', block: true, color: filterState[i] === 2 ? color.primary : color.dark })))));
                }))),
            React.createElement("tbody", null, renderData),
            pagination && (React.createElement(Pagination, { style: { justifyContent: 'flex-end' }, total: totalLen, pageSize: pageSize, callback: function (v) { return setCurrent(v - 1); }, defaultCurrent: 1 })))));
}
Table.defaultProps = {
    sorted: true,
    pagination: false,
    pageSize: 10,
};
var templateObject_1, templateObject_2;
