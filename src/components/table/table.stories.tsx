import React from "react";
import Table, { SourceDataType } from "./index";
import { version } from "styled-components";

export default {
title: "Table",
component: Table,
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: {
      compare: (a: SourceDataType, b: SourceDataType) => a.chinese - b.chinese,
    },
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    render: (_: any, v: any) => {
      return <span style={{color: 'green'}}>{_}</span>;
    },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 55,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 78,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
  {
    key: '5',
    name: 'Joe Black',
    chinese: 78,
    math: 90,
    english: 70,
  },
  {
    key: '6',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];


export const knobsBtn = () => (
  <Table data={data} columns={columns} sorted={true} />
);