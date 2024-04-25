import React, {PropsWithChildren, ReactNode, useMemo, useState} from 'react';
import styled from 'styled-components';
import {color, typography} from '../shared/styles';
import {darken, rgba, opacify} from 'polished';
import {easing} from '../shared/animation';
import { Pagination } from '../pagination';
import { Icon } from '../icon';
export type TableProps = {
  /** 表内数据部分 */
  data: SourceDataType[];
  /** 表头部分*/
  columns: ColumnType[];
  /** 是否开启排序 */
  sorted?: boolean;
  /** 是否开启页码 */
  pagination?: boolean;
  /** 开启页码时才有效，设置每页显示几个*/
  pageSize?: number;
};
export interface SourceDataType {
  key?: string;
  [key: string]: any;
}
export interface ColumnType {
  title: ReactNode;
  /** 排序等操作用来代替这列的 */
  dataIndex: string;
  sorter?: {
    compare: (a: SourceDataType, b: SourceDataType) => number;
  };
  render?: (v: any, value: SourceDataType, rowData: ColumnType) => ReactNode;
}
const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  z-index: 0;
  clear: both;
  font-size: 14px;
  background: #fff;
  border-radius: 2px;
  & > thead > tr > th {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    text-align: left;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
    position: relative;
    padding: 16px;
    overflow-wrap: break-word;
  }
  & > tbody > tr {
    & > td {
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s;
      position: relative;
      padding: 16px;
      overflow-wrap: break-word;
    }
    &:hover {
      & > td {
        background: #fafafa;
      }
    }
  }
`;
const TableHeaderSpan = styled.span`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  padding: 16px;
  cursor: pointer;
  & > svg {
    width: 10px;
    height: 10px;
  }
`;

const mapData = (data: SourceDataType[], columnData: ColumnType[]) => {
  return data.map((v) => {
    return (
      <tr key={v.key}>
        {
          columnData.map((cm, i) => {
            return (
              <td key={i}>
                <span>
                  {cm.render
                    ? cm.render(v[cm.dataIndex], v, cm)
                    : v[cm.dataIndex]}
                </span>
              </td>
            );
          })
        }
      </tr>
    )
  })
}
export function Table(props: PropsWithChildren<TableProps>) {
  const { data, pageSize, columns, sorted, pagination } = props;
  const [columnData, setColumnData] = useState<ColumnType[]>([]);
  const [sourceData, setSourceData] = useState<SourceDataType[]>([]);
  const [paginationData, setPaginationData] = useState<SourceDataType[][]>([]);
  const [sortedData, setSortedData] = useState<SourceDataType[]>([]);
  const [filterState, setFilterState] = useState<number[]>([]); // 记录第几列开启筛选
  const [current, setCurrent] = useState(0);
  const originPagination = useMemo(() => {
    return (data: SourceDataType[]) => {
      let tmp: SourceDataType[][] = [];
      const len = data.length;
      const pageNumber = Math.ceil(len / pageSize!); // 页数
      for (let i = 0; i < pageNumber; i++) {
        tmp[i] = data.slice(0 + i * pageSize!, pageSize! + i * pageSize!);
      }
      setPaginationData(tmp);
    };
  }, [pageSize]);
  const totalColumn = useMemo(() => {
    //表头总长
    setColumnData(columns); //表头拿来渲染
    setFilterState(new Array(columns.length).fill(0)); // 初始化
    return columns.length;
  }, [columns]);
  const totalLen = useMemo(() => {
    setSourceData(data);
    if (pagination) {
      // 分页走 paginationData
      originPagination(data);
    }
    return data.length;
  }, [data, pagination, originPagination]);
  const renderData = useMemo(() => {
    console.log(pagination, paginationData, 'paginationData---');
    let render;
    if (pagination && paginationData.length !== 0) {
      //如果分页，渲染分页
      render = mapData(paginationData[current], columnData);
    } else {
      if (sortedData.length === 0) {
        render = mapData(sourceData, columnData);
      } else {
        // 如果有排序数据，就根据排序数据进行处理
        render = mapData(sortedData, columnData);
      }
    }
    return render;
  }, [paginationData, pagination, current, columnData, sourceData, sortedData]);
  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            {columnData.map((v, i) => {
              return (
                <th key={v.dataIndex}>
                  <span>{v.title}</span>
                  {v.sorter && sorted && v.sorter.compare! && (
                    <TableHeaderSpan
                      onClick={() => {
                        if (filterState[i]) {
                          // 如果已经开启了排序
                          // 1 进行逆序 否则 清空
                          if (filterState[i] === 1) {
                            const res = sourceData
                              .slice()
                              .sort((a, b) => -v.sorter!.compare(a, b)); // 数据传给compare
                            let newFilter = new Array(totalColumn).fill(0);
                            newFilter[i] = 2;
                            setSortedData(res);
                            setFilterState(newFilter);
                          } else {
                            setSortedData([]); // 清空排序数据
                            if (pagination) {
                              originPagination(data);
                            }
                            filterState[i] = 0;
                            setFilterState([...filterState]);
                          }
                        } else {
                          // 没有开启就开启排序
                          const res = sourceData
                            .slice()
                            .sort(v.sorter!.compare); // 数据传给compare
                          let newFilter = new Array(totalColumn).fill(0);
                          newFilter[i] = 1;
                          setSortedData(res);
                          setFilterState(newFilter);
                        }
                      }}
                    >
                      <Icon
                        icon='arrowup'
                        block
                        color={
                          filterState[i] === 1 ? color.primary : color.dark
                        }
                      ></Icon>
                      <Icon
                        icon='arrowdown'
                        block
                        color={
                          filterState[i] === 2 ? color.primary : color.dark
                        }
                      ></Icon>
                    </TableHeaderSpan>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{renderData}</tbody>
        {pagination && (
          <Pagination
            style={{justifyContent: 'flex-end'}}
            total={totalLen}
            pageSize={pageSize}
            callback={(v) => setCurrent(v - 1)}
            defaultCurrent={1}
          ></Pagination>
        )}
      </StyledTable>
    </div>
  );
}

Table.defaultProps = {
  sorted: true,
  pagination: false,
  pageSize: 10,
};
