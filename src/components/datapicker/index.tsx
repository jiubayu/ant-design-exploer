import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, {CSSProperties, css} from 'styled-components';
import {color, typography} from '../shared/styles';
import {rgba} from 'polished';
import {modalCloseAnimate, modalOpenAnimate} from '../shared/animation';
import {useClickOutside, useStateAnimation} from '../shared/hooks';
import Button from '../button';
import {Icon} from '../icon';

type CalendarProps = {
  /** 日期选择的回调 */
  callback?: (v: string) => void;
  /**  动画速度 */
  delay?: number;
  /** 初始值*/
  initDate?: string;
  /** 外层样式*/
  style?: CSSProperties;
  /** 外层类名 */
  classname?: string;
};
const CalendarWrapper = styled.div<{visible: boolean; delay: number}>`
  position: absolute;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
  transition: all ${(props) => props.delay / 1000}s
    cubic-bezier(0.23, 1, 0.32, 1);
  background: ${color.lightest};
  ${(props) =>
    props.visible &&
    css`
      animation: ${modalOpenAnimate} ${props.delay / 1000}s ease-in;
    `}
  ${(props) =>
    !props.visible &&
    css`
      animation: ${modalCloseAnimate} ${props.delay / 1000}s ease-in;
    `}
`;
const CalendarDateRow = styled.tr``;
const tableItemStyle = css`
  display: inline-block;
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 2px;
  margin: 2px;
  text-align: center;
`;
const CalendarHeadItem = styled.td`
  ${tableItemStyle}
  cursor: default;
`;
const CalendarDate = styled.td<Partial<DateItem>>`
  ${tableItemStyle}
  cursor: pointer;
  ${(props) => {
    if (props.isonDay) {
      return `color: ${color.lightest};background: ${color.primary}`;
    }
  }}
  ${(props) => {
    if (props.isonMonth === false) {
      return `color: ${color.mediumdark}`;
    }
    return '';
  }}
`;
const CalendarHeaderWrapper = styled.div`
  padding: 10px;
  display: flex;
  color: ${rgba(0, 0, 0, 0.85)};
  border-bottom: 1px solid #f0f0f0;
  justify-content: center;
`;

type calDataTye = [number, number, number];
const btnStyle = {
  padding: '0px',
  background: color.lightest,
};
const IconWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  & > svg {
    height: 12px;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  jutify-content: center;
  align-items: center;
  height: 24px;
  line-height: 24px;
`;

interface DateItem {
  day: number; //天
  isonMonth: boolean; //当月
  isonDay: boolean; //当日
  origin: Date;
}
type modeType = 'year' | 'month' | 'date';

const MonthWrapper = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const MonthItem = styled.div<{toGray?: boolean}>`
  width: 25%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.toGray &&
    css`
      color: ${color.mediumdark};
    `};
  &:hover {
    color: ${color.secondary};
  }
`;
const BWrapper = styled.b`
  cursor: pointer;
  &:hover {
    color: ${color.primary};
  }
`;
const DatePickerWrapper = styled.div`
  display: inline-block;
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
`;
const CalendarIcon = styled.span`
  display: inline-block;
`;

const getDateData = (year: number, month: number, day: number) => {
  let firstDay = new Date(year, month, 1);
  let weekDay = firstDay.getDay(); // 获取周几
  weekDay = weekDay === 0 ? 7 : weekDay;
  let start = firstDay.getTime() - weekDay * 60 * 60 * 24 * 1000;
  let arr: DateItem[] = [];
  for (let i = 0; i < 42; i++) {
    let current = new Date(start + i * 60 * 60 * 24 * 1000);
    let onMonth = isCurrentMonth(current, year, month);
    arr.push({
      day: current.getDate(),
      isonMonth: onMonth,
      isonDay: isCurrentDay(current, day, onMonth),
      origin: current,
    });
  }
  let k = -1;
  const dateData = Array.from({length: 6}, () => {
    k++;
    return arr.slice(k * 7, (k + 1) * 7);
  });
  return dateData;
};
// 通过系统来计算年月
const getYearMonthDay = function (date: number): calDataTye {
  let temp = new Date(date);
  return [temp.getFullYear(), temp.getMonth(), temp.getDate()];
};
const changeCalData = (sign: number, calData: calDataTye): calDataTye => {
  const oldDate = new Date(calData[0], calData[1]);
  const newDate = oldDate.setMonth(oldDate.getMonth() + sign);
  return getYearMonthDay(newDate);
};
const changeCalYear = (sign: number, calData: calDataTye): calDataTye => {
  const oldDate = new Date(calData[0], calData[1]);
  const newDate = oldDate.setFullYear(oldDate.getFullYear() + sign);
  return getYearMonthDay(newDate);
};
const isCurrentMonth = (
  current: Date,
  year: number,
  month: number
): boolean => {
  return current.getFullYear() === year && current.getMonth() === month;
};
const isCurrentDay = (
  current: Date,
  day: number,
  onMonth: boolean
): boolean => {
  return current.getDate() === day && onMonth;
};
const generateDate = (calData: calDataTye) => {
  return `${calData[0]}-${calData[1] + 1}-${calData[2]}`;
};
const validateDate = (value: string) => {
  const reg = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (reg.exec(value)) {
    return true;
  } else {
    return false;
  }
};
const monthData = new Array(12).fill(1).map((_x, y) => y + 1);
const getStartYear = (calData: calDataTye) => {
  return calData[0] - (calData[0] % 10);
};

export function DatePicker(props: PropsWithChildren<CalendarProps>) {
  const {callback, delay, initDate, style, classname} = props;
  const [show, setShow] = useState(false);
  const [calData, setCalData] = useState<calDataTye>(() => [
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ]);
  const [state, setState] = useState(() => {
    if (initDate) {
      return initDate;
    }
    return generateDate(calData)
  });
  const [mode, setMode] = useState<modeType>('date');
  const ref = useRef<HTMLDivElement>(null);
  const [st, setst, unmount] = useStateAnimation(setShow, 200);
  useClickOutside(ref, () => setst(false));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };
  const handleClick = () => {
    setShow(true);
  };
  useEffect(() => {
    if (callback) {
      callback(state);
    }
  }, [state, callback]);
  const dayData = useMemo(() => {
    const arr = getDateData(...calData);
    return arr;
  }, [calData]);
  const handleBlur = useCallback(() => {
    // 如果相等，说明是点击日期出现的
    if (state !== generateDate(calData)) {
      let res = validateDate(state); // 校验日期格式
      if (!res) {
        // 格式错误，使用之前数据
        setState(generateDate(calData));
      } else {
        const p = state.split('-');
        const newDate = new Date(
          parseInt(p[0]),
          parseInt(p[1]) - 1,
          parseInt(p[2])
        );
        const newCal: calDataTye = [
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
        ];
        setCalData(newCal);
        setState(generateDate(newCal));
      }
    }
  }, [state, calData]);
  const modeDay = useMemo(
    () => (
      <table style={{display: mode === 'date' ? 'table' : 'none'}}>
        <thead>
          <tr>
            <CalendarHeadItem>日</CalendarHeadItem>
            <CalendarHeadItem>一</CalendarHeadItem>
            <CalendarHeadItem>二</CalendarHeadItem>
            <CalendarHeadItem>三</CalendarHeadItem>
            <CalendarHeadItem>四</CalendarHeadItem>
            <CalendarHeadItem>五</CalendarHeadItem>
            <CalendarHeadItem>六</CalendarHeadItem>
          </tr>
        </thead>
        <tbody>
          {dayData.map((d, index) => (
            <CalendarDateRow key={index}>
              {d.map((v, i) => (
                <CalendarDate
                  key={i}
                  isonDay={v.isonDay}
                  isonMonth={v.isonMonth}
                  onClick={() => {
                    const origin = v.origin;
                    const newCalDate: calDataTye = [
                      origin.getFullYear(),
                      origin.getMonth(),
                      origin.getDate(),
                    ];
                    setCalData(newCalDate);
                    setState(generateDate(newCalDate));
                    setst(false);
                  }}
                >
                  {v.day}
                </CalendarDate>
              ))}
            </CalendarDateRow>
          ))}
        </tbody>
      </table>
    ),
    [dayData, setst, mode]
  );
  const modeMonth = useMemo(
    () => (
      <MonthWrapper style={{display: mode === 'month' ? 'flex' : 'none'}}>
        {monthData.map((v, i) => {
          return (
            <MonthItem
              key={i}
              onClick={() => {
                // 获取当前月 计算和之前日期月的差值
                const diff = v - calData[1] - 1;
                const res = changeCalData(diff, calData);
                setCalData(res);
                setMode('date');
              }}
            >
              {v}月
            </MonthItem>
          );
        })}
      </MonthWrapper>
    ),
    [mode, calData]
  );
  const modeYear = useMemo(() => {
    const startYear = getStartYear(calData);
    const yeamMap = new Array(12).fill(1).map((_x, y) => startYear + y - 1);
    return (
      <MonthWrapper style={{display: mode === 'year' ? 'flex' : 'none'}}>
        {yeamMap.map((v, i) => (
          <MonthItem
            toGray={i === 0 || i === 11}
            key={i}
            onClick={() => {
              // 获取选择年份的差值
              let diff = v - calData[0];
              let res = changeCalYear(diff, calData);
              setCalData(res);
              setMode('month');
            }}
          >
            {v}
          </MonthItem>
        ))}
      </MonthWrapper>
    );
  }, [calData, mode]);
  const render = useMemo(() => {
    function handleLeft() {
      let res: calDataTye;
      if (mode === 'date') {
        res = changeCalData(-1, calData);
      } else if (mode === 'month') {
        res = changeCalYear(-1, calData);
      } else if (mode === 'year') {
        res = changeCalYear(-10, calData);
      }
      setCalData(res!);
    }
    function handleRight() {
      let res: calDataTye;
      if (mode === 'date') {
        res = changeCalData(1, calData);
      } else if (mode === 'month') {
        res = changeCalYear(1, calData);
      } else if (mode === 'year') {
        res = changeCalYear(10, calData);
      }
      setCalData(res!);
    }
    const startYear = getStartYear(calData);
    if (!show) {
      unmount();
      return null;
    } else {
      return (
        <CalendarWrapper style={style} className={classname} visible={st} delay={delay!}>
          <CalendarHeaderWrapper>
            <BtnDiv>
              <Button size='small' style={btnStyle} onClick={handleLeft}>
                <IconWrapper>
                  <Icon icon='arrowleft'></Icon>
                </IconWrapper>
              </Button>
              <BtnDiv>
                <span>
                  <BWrapper
                    style={{display: mode === 'year' ? 'inline-block' : 'none'}}
                  >
                    {`${startYear}-${startYear + 9}`}
                  </BWrapper>
                  <BWrapper
                    style={{
                      display:
                        mode === 'month' || mode === 'date'
                          ? 'inline-block'
                          : 'none',
                    }}
                    onClick={() => setMode('year')}
                  >
                    {calData[0]}年
                  </BWrapper>
                  <BWrapper
                    style={{
                      display: mode === 'date' ? 'inline-block' : 'none',
                    }}
                    onClick={() => setMode('month')}
                  >
                    {calData[1] + 1}月
                  </BWrapper>
                </span>
              </BtnDiv>
              <Button size='small' style={btnStyle} onClick={handleRight}>
                <IconWrapper>
                  <Icon icon='arrowright'></Icon>
                </IconWrapper>
              </Button>
            </BtnDiv>
          </CalendarHeaderWrapper>
          <div style={{padding: '10px'}}>
            {modeDay}
            {modeMonth}
            {modeYear}
          </div>
        </CalendarWrapper>
      );
    }
  }, [show, unmount, st, calData, modeDay, modeMonth, modeYear, mode]);
  return (
    <DatePickerWrapper ref={ref}>
      <input
        aria-label='date picker'
        value={state}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        style={{border: 'none', boxShadow: 'none', outline: 'none'}}
      ></input>
      <CalendarIcon>
        <Icon icon='calendar'></Icon>
      </CalendarIcon>
      {render}
    </DatePickerWrapper>
  );
}
