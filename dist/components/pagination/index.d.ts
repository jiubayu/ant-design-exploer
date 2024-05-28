import React, { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
type PaginationProps = {
    /** 每页显示多少条*/
    pageSize?: number;
    /** 默认显示第几页 */
    defaultCurrent?: number;
    /** 总共条数*/
    total: number;
    /** 分页条目最大显示长度 */
    barMaxSize?: number;
    /** 回调页数 */
    callback?: (v: number) => void;
    /** 外层style*/
    style?: CSSProperties;
    /**外层类名 */
    classnames?: string;
};
declare function Pagination(props: PropsWithChildren<PaginationProps>): React.JSX.Element;
declare namespace Pagination {
    var defaultProps: {
        pageSize: number;
        defaultCurrent: number;
        barMaxSize: number;
        total: number;
    };
}
export default Pagination;
