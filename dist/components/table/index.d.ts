import { PropsWithChildren, ReactNode } from 'react';
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
declare function Table(props: PropsWithChildren<TableProps>): import("react/jsx-runtime").JSX.Element;
declare namespace Table {
    var defaultProps: {
        sorted: boolean;
        pagination: boolean;
        pageSize: number;
    };
}
export default Table;
