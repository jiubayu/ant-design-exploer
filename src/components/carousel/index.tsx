/** @format */

import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {color, typography} from '../shared/styles';
import {darken, rgba, opacify} from 'polished';
import {easing} from '../shared/animation';
import {Radio} from '../radio';

const Transition = styled.div<TransitionType>`
  ${(props) =>
    !props.animation &&
    props.direction === 'left' &&
    `
      transform: translateX(100%);
    `}
  ${(props) =>
    !props.animation &&
    props.direction === 'right' &&
    `
		transform: translateX(-100%);
		`}
  ${(props) =>
    props.animation &&
    props.direction === 'left' &&
    `
		  transform: translateX(0);
			transition: all ${props.delay / 1000}s ease;
	  `}
  ${(props) =>
    props.animation &&
    props.direction === 'right' &&
    `
		transform: translateX(0);
		transition: all ${props.delay / 1000}s ease;
		`}
`;

const Wrapper = styled.div<WrapperProps>`
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${(props) => props.viewportBoxshadow};
`;

type CarouselProps = {
  /** 默认索引 */
  defaultIndex?: number;
  /** 轮播图高度 */
  height?: number;
  /** 是否自动播放 */
  autoplay: boolean;
  /** 自动播放延迟 1000是1秒 */
  autoplayDelay: number;
  /** 翻页动画延迟 */
  delay?: number;
  autoplayReverse?: boolean;
  /** radio color */
  radioAppear?: keyof typeof color;
};

type AnimationType = {
  animation: boolean;
  direction: '' | 'left' | 'right';
};

interface TransitionType extends AnimationType {
  delay: number;
}

interface WrapperProps {
  viewportBoxshadow: string;
}

function currentSetMap(
  current: number,
  map: [number, number, number]
): [number, number, number] {
  let mid = map[1];
  if (mid === current) {
    return map;
  } else if (mid < current) {
    return [mid, current, -1];
  } else {
    return [-1, current, mid];
  }
}

function mapToState(
  map: [number, number, number],
  children: ReactNode,
  totalLen: number
) {
  if (totalLen <= 1) {
    return [null, children, null];
  } else {
    return map.map((v) => {
      if (v === -1) {
        return null;
      } else {
        let child = children as ReactElement[];
        return child[v];
      }
    });
  }
}

function toMove(
  right: boolean,
  totalLen: number,
  indexMap: [number, number, number],
  setIndexMap: React.Dispatch<React.SetStateAction<[number, number, number]>>
) {
  let y;
  if (right) {
    if (indexMap[1] < totalLen - 1) {
      y = indexMap[1] + 1;
    } else {
      y = 0;
    }
  } else {
    if (indexMap[1] === 0) {
       y = totalLen - 1;
    } else {
     y = indexMap[1] - 1;
    }
  }
  setIndexMap(currentSetMap(y, indexMap));
}

export function Carousel(props: PropsWithChildren<CarouselProps>) {
  const {
    defaultIndex,
    height,
    autoplay,
    autoplayDelay,
    autoplayReverse,
    delay,
    radioAppear,
  } = props;
  // 设置需要展示的元素
  const [state, setState] = useState<ReactNode[]>([]);
  // 设置显示索引用
  const [indexMap, setIndexMap] = useState<[number, number, number]>([
    -1, -1, -1,
  ]);
  // 控制方向进出用
  const [animation, setAnimation] = useState<AnimationType>({
    animation: true,
    direction: '',
  });
  // 设置宽度用
  const [bound, setBound] = useState<DOMRect>();
  // 适配移动端的拖动
  const [start, setStart] = useState<number>(0);
  const touchStart = (e: TouchEvent) => {
    setStart(e.touches[0].clientX);
  }
  const touchEnd = (e: TouchEvent) => {
    const end = e.touches[0].clientX;
    const val = end - start;
    if (val > 0) {
     toMove(true, totalLen, indexMap, setIndexMap);
    } else {
       toMove(true, totalLen, indexMap, setIndexMap);
    }
  }

  const totalLen = useMemo(() => {
    let len: number;
    if (props.children instanceof Array) {
      len = props.children.length;
    } else {
      len = 1;
    }
    return len;
  }, [props.children]);
  useMemo(() => {
    let map: [number, number, number] = [-1, -1, -1];
    map[1] = defaultIndex!;
    let res = mapToState(map, props.children, totalLen);
    setState(res);
    setIndexMap(map);
  }, [defaultIndex, props.children, totalLen]);
  useEffect(() => {
    let child = props.children as ReactNode[];
    let timer: number;
    if (child) {
      let temp = indexMap.map((v) => {
        return v !== -1 ? child[v] : null;
      });
      let sign: boolean;
      setState(temp); // 后setState会有补足问题必须先设

      if (indexMap[0] !== -1 && indexMap[2] !== -1) {
        // 首轮
        return;
      } else if (indexMap[0] === -1) {
        sign = true;
        setAnimation({animation: false, direction: 'right'});
      } else {
        sign = false;
        setAnimation({animation: false, direction: 'left'});
      }
      timer = window.setTimeout(() => {
        if (sign) {
          setAnimation({animation: true, direction: 'right'});
        } else {
          setAnimation({animation: true, direction: 'left'});
        }
        return () => window.clearTimeout(timer);
      }, delay);
    }
  }, [props.children, delay, indexMap]);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const setBoundFunc = () => {
      if (ref.current) {
        let bound = ref.current.getBoundingClientRect();
        setBound(bound);
      }
    };
    setBoundFunc();
    const resizeFunc = () => setBoundFunc();
    window.addEventListener('resize', resizeFunc);
    return () => window.removeEventListener('resize', resizeFunc);
  }, []);
  // 自动播放功能
  useEffect(() => {
    let timer: number;
    if (autoplay) {
      timer = window.setTimeout(() => {
        toMove(!autoplayReverse, totalLen, indexMap, setIndexMap);
      }, autoplayDelay);
    }
    return () => window.clearTimeout(timer);
  }, [autoplay, indexMap, totalLen, autoplayDelay, autoplayReverse]);
  return (
    <Wrapper ref={ref} viewportBoxshadow='' >
      <div
        className='viewport'
        style={{
          width: '100%',
          height: `${height}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Transition
          animation={animation.animation}
          direction={animation.direction}
          delay={autoplayDelay!}
        >
          <div
            style={{
              display: 'flex',
              width: `${bound?.width! * 3}px`,
              position: 'absolute',
              left: `${-bound?.width!}px`,
            }}
          >
            {state.map((v, i) => (
              <div
                key={i}
                style={{
                  width: `${bound?.width}px`,
                  height: `${height}px`,
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </Transition>
      </div>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {new Array(totalLen).fill(1).map((x, y) => {
          return (
            <Radio
              label=''
              key={y}
              hideLabel
              value={0}
              appearance={radioAppear}
              checked={y === indexMap[1]}
              onChange={() => {}}
              onClick={() => {
                const newMap = currentSetMap(y, indexMap);
                setIndexMap(newMap);
              }}
            />
          );
        })}
      </ul>
    </Wrapper>
  );
}
Carousel.defaultProps = {
  defaultIndex: 0,
  delay: 100,
  height: 200,
  autoplay: true,
  autoplayDelay: 5000,
  autoplayReverse: true,
};
