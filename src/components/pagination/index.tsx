import React, {PropsWithChildren, ReactNode, useEffect, useMemo, useState} from 'react';
import styled, { CSSProperties } from 'styled-components';
import {color, typography} from '../shared/styles';
import {darken, rgba, opacify} from 'polished';
import {easing} from '../shared/animation';
import Button from '../button';
import {Icon} from '../icon';

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
const PageUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & > li {
    list-style: none;
  }
  & button {
    border-radius: 6px;
    padding: 10px 8px;
  }
  & span {
    line-height: 13.6px;
    height: 13.6px;
    min-width: 18px;
  }
  & svg {
    height: 13.6px;
    width: 13.6px;
    vertical-align: bottom;
  }
`;

function calculateMove(
  current: number,
  state: number[],
  totalPage: number
): number[] | null {
  const mid = state.length >> 1;
  if (current - 1 < mid || totalPage - current < mid) return null;
  const leftArr = new Array(mid).fill(1).map((v, i) => current - i - 1).reverse();
  const rightArr = new Array(mid)
    .fill(1)
    .map((v, i) => current + i + 1);
  const arr = leftArr.concat(current).concat(rightArr);
  return arr;
}

export function Pagination(props: PropsWithChildren<PaginationProps>) {
  const {pageSize, defaultCurrent, barMaxSize, total, callback, style, classnames} = props;
  const [current, setCurrent] = useState(defaultCurrent);
  const [state, setState] = useState<Array<number>>([]);
  const totalPage = useMemo(() => {
    let number = Math.ceil(total / pageSize!);
    if (number > barMaxSize!) {
      let statetmp = new Array(barMaxSize).fill(1).map((x, y) => y + 1);
      setState(statetmp);
      let arr = calculateMove(defaultCurrent!, statetmp, number);
      if (arr) setState(arr);
    } else {
      let statetmp = new Array(number).fill(1).map((x, y) => y + 1);
      setState(statetmp);
      let arr = calculateMove(defaultCurrent!, statetmp, number);
      if (arr) setState(arr);
    }
    return number;
  }, [pageSize, total, barMaxSize, defaultCurrent]);
  useEffect(() => {
    if (callback) callback(current!);
  }, [callback, current]);
  return (
    <PageUl style={style} className={classnames}>
      <li>
        <Button
          disabled={current === 1}
          appearance='primaryOutline'
          onClick={() => {
            if (state.length > 0) {
              if (state[0] > 1) {
                let tmp = state.map((x) => x - 1);
                setState(tmp);
                setCurrent(current! - 1);
                let arr = calculateMove(current! - 1, tmp, totalPage);
                if (arr) setState(arr);
              } else if (current !== state[0]) {
                setCurrent(current! - 1);
                let arr = calculateMove(current! - 1, state, totalPage);
                if (arr) setState(arr);
              }
            }
          }}
        >
          <Icon icon='arrowleft'></Icon>
        </Button>
      </li>
      {state.map((v, i) => {
        return (
          <li key={i}>
            <Button
              onClick={() => {
                setCurrent(v);
                let arr = calculateMove(v, state, totalPage);
                if (arr) setState(arr);
              }}
              appearance={current === v ? 'primary' : 'primaryOutline'}
            >
              {v}
            </Button>
          </li>
        );
      })}
      <li>
        <Button
          disabled={current ===totalPage}
          appearance='primaryOutline'
          onClick={() => {
            if (state.length > 0) {
              if (state[barMaxSize!-1]<totalPage) {
                let tmp = state.map((x) => x + 1);
                setState(tmp);
                setCurrent(current! + 1);
                let arr = calculateMove(current! + 1, tmp, totalPage);
                if (arr) setState(arr);
              } else {
                if (current !== totalPage) {
                   setCurrent(current! + 1);
                   let arr = calculateMove(current! + 1, state, totalPage);
                   if (arr) setState(arr);
                }
              }
            }
          }}
        >
          <Icon icon='arrowright'></Icon>
        </Button>
      </li>
    </PageUl>
  );
}
Pagination.defaultProps = {
  pageSize: 10,
  defaultCurrent: 4,
  barMaxSize: 5,
  total: 1000,
}
