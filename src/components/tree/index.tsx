/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { CSSProperties } from 'styled-components';
import {color, typography} from '../shared/styles';
import Icon from '../icon';

const levelSpace = 24; // 同级生效间距
const originPadding = 24;
// 1 插上级 2 插同级 3 插下级 0 不插
const switchInsert = (diff: number, item: itemPropsRequired) => {
  if (!isNaN(diff)) {
    const origin = item.level * levelSpace; //目标原本的padding
    if (diff < origin) {
      // 移动padding前全部算上级
      if (checkParent(item)) {
        // 排除最顶级
        return 2;
      } else {
        return 1;
      }
    } else if (diff < origin + levelSpace) {
      return 2;
    } else {
      return 3;
    }
  } else {
    return 0;
  }
};

export const throttle = (fn: Function, delay: number = 300) => {
  let timer: any;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const checkParent = (item: itemPropsRequired) => {
  return item.level === 1;
};

const insertTop = (
  key: string,
  g: itemPropsRequired,
  data: itemPropsRequired[],
  callback: Function
) => {
  const origin = findOrigin(key, data);
  // origin 插入target上级
  const parent = getParent(g);
  if (
    g.level !== 1 &&
    origin &&
    checkTargetOrigin(g, origin) &&
    judgeChildren(origin, g)
  ) {
    // 修改以前的父节点
    changeOriginParent(origin);
    // 修改目标父节点的父节点 （与父节点同级）
    changeTargetParent(parent, origin, g);
    callback();
  }
};

function findOrigin(key: string, data: itemPropsRequired[]) {
  const res = data.filter((v) => v.key === key);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}
function getParent(item: itemPropsRequired) {
  if (item.parent && item.parent.parent) {
    return item.parent.parent;
  } else {
    return item.parent;
  }
}
// 判断是否是同一个item
function checkTargetOrigin(
  item: itemPropsRequired,
  origin: itemPropsRequired | null
) {
  return item !== origin;
}
// 判断子级是否包含有target，如果包含target就是false
function judgeChildren(origin: itemPropsRequired, target: itemPropsRequired) {
  let sign = true; // 如果有孩子就是false
  const fn = (child: itemPropsRequired) => {
    if (child.children) {
      child.children.forEach((v) => {
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
function changeOriginParent(origin: itemPropsRequired) {
  const parent = origin.parent;
  if (parent.children) {
    const index = parent.children.indexOf(origin);
    if (index > -1) {
      parent.children.splice(index, 1);
    }
  }
  // 有bug的方法
  // parent.children = parent.children?.filter((v) => v !== origin);
}
// 将当前节点插入到父级里
function changeTargetParent(
  parent: itemPropsRequired,
  origin: itemPropsRequired,
  g: itemPropsRequired
) {
  origin.parent = parent;
  if (parent.children) {
    // 有子节点
    // 判断应该插入父节点哪里
    if (g.parent.children) {
      const index = g.parent.children.indexOf(g);
      if (index > -1) {
        parent.children.splice(index + 1, 0, origin);
      } else {
        // parent会传递g进来
        parent.children.push(origin);
      }
    }
  } else {
    parent.children = [origin];
  }
}

const insertMiddle = (
  key: string,
  g: itemPropsRequired,
  data: itemPropsRequired[],
  callback: Function
) => {
  const origin = findOrigin(key, data);
  // origin 插入 parent 同级
  const parent = g.parent;
  if (
    g.level !== 0 &&
    origin &&
    checkTargetOrigin(g, origin) &&
    judgeChildren(origin, g)
  ) {
    changeOriginParent(origin);
    changeTargetParent(parent, origin, g);

    callback();
  }
};

const insertBottom = (
  key: string,
  g: itemPropsRequired,
  data: itemPropsRequired[],
  callback: Function
) => {
  const origin = findOrigin(key, data);
  const parent = g;
  if (origin && checkTargetOrigin(g, origin) && judgeChildren(origin, g)) {
    changeOriginParent(origin);
    changeTargetParent(parent, origin, g);
    callback();
  }
};

interface itemProps {
  value: string;
  level?: number;
  expand?: boolean;
  visible?: boolean;
  parent?: itemProps;
  children?: Array<itemProps>;
  key?: string;
}

interface itemPropsRequired
  extends Omit<Required<itemProps>, 'children' | 'parent'> {
  children?: itemPropsRequired[];
  parent: itemPropsRequired;
}

interface DragHighlight {
	drag: boolean;
	itemkey: string;
}
interface TreeItemType {
  level: number;
  highlight: DragHighlight;
  itemkey: string;
  borderColor?: string;
}
const TreeItem = styled.div<TreeItemType>`
  padding-left: ${(props) => originPadding * props.level}px;
  padding-top: 2px;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  ${(props) => {
  if (props.highlight.drag && props.highlight.itemkey === props.itemkey) {
    return `border: 1px dashed ${props.borderColor}`;
  } else {
    return '';
  }
  }}
`;
const TreeIcon = styled.span<{g: itemPropsRequired}>`
  & > svg {
    transition: linear 0.2s;
    height: 10px;
    margin-bottom: 5px;
    ${(props) => {
      if (props.g.children && props.g.children.length !== 0) {
        if (props.g.children[0] && props.g.children[0].visible) {
          return 'display: inline-block;transform: rotate(-90deg)';
        } else {
          return 'display: inline-block;';
        }
      } else {
        return 'opacity: 0';
      }
    }}
  }
`;
type TreeGapType = {gKey: string; backColor?: string} & DragControlData;
const TreeGap = styled.div<TreeGapType>`
  position: absolute;
  width: 100%;
  height: 90%;
  background-color: ${props => props.backColor}
  ${(props) => {
    switch (props.x) {
      case 1:
        return `margin-left: ${-levelSpace}px`;
      case 2:
        return ``;
      case 3:
        return `margin-left: ${levelSpace}px`;
      default:
        return '';
    }
  }};
  ${(props) => {
    if (props.key === props.gKey) {
      return 'background: #00000030';
    }
  }}
`;

const flatten = function (
  list: Array<itemProps>,
  level = 1,
  parent: itemProps,
  defaultExpand = true
): itemPropsRequired[] {
  let arr: itemPropsRequired[] = []; //收集所有子项
  list.forEach((item) => {
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
    arr.push(item as itemPropsRequired);
    if (item['children']) {
      arr.push(...flatten(item['children'], level + 1, item, defaultExpand));
    }
  });
  return arr;
};

interface DragControlData {
  drag: boolean;
  x: number;
  itemkey: string;
}
type TreeProps = {
  /** 数据源*/
  source: itemProps[];
  /** 是否可以拖拽 */
  drag?: boolean;
  /** 高亮边框颜色 */
  borderColor?: string;
  /** 拖拽提示色 */
  backColor?: string;
  /**外层样式*/
  style?: CSSProperties;
  /**外层类名*/
  classname?: string;
};

function changeVisible(item: itemPropsRequired, callback: Function) {
  // 给点击的children设置visible
  if (item.children) {
    // 避免children有显示不一的行为
    let visible: boolean;
    const depth = (item: itemPropsRequired[]) => {
      item.forEach((v) => {
        if (visible === undefined) {
          visible = !v.visible;
        }
        v.visible = visible;
        if (v.children) {
          depth(v.children);
        }
      });
    };
    depth(item.children);
    callback(); // 更改后更新页面
  }
}

export default function Tree(props: PropsWithChildren<TreeProps>) {
  const {source, drag, borderColor, backColor, style, classname} = props;
   const root = useMemo(() => {
    return {
      level: 0,
      visible: true,
      expand: true,
      children: source,
      value: 'root',
    };
  }, [source]);
  const forceUpdate = useState(0)[1];
  const [dragState, setDragState] = useState(0);
  const [start, setStart] = useState(0);
  const [doverState, setDoverState] = useState<DragControlData>({
    drag: false,
    x: 0,
    itemkey: '',
  });
  const [highlight, setHighlight] = useState({
    drag: true,
    itemkey: '',
  });
  const ref = useRef<HTMLDivElement>(null);
  const data = useMemo(
    () => flatten(root.children, 1, root),
    [dragState, root]
  );
  const dragCalback = () => setDragState((state) => state + 1);
  const dragHandler = (
    clientX: number,
    itemkey: string,
    g: itemPropsRequired
  ) => {
    const diff = clientX - start;
    const x = switchInsert(diff, g);
    setDoverState({
      drag: true,
      x,
      itemkey,
    });
  };
  useEffect(() => {
    if (ref.current) {
      setStart(ref.current.getBoundingClientRect().left); // 为了找到起始值
    }
    // 解决鼠标拖动出去的问题：
    const dragEndHandler = () => {
      setDoverState((prev) => ({ ...prev, drag: false }));
      setHighlight({
        drag: false,
        itemkey:'',
      })
    };
    window.addEventListener('dragend', dragEndHandler);
    return () => window.removeEventListener('dragend', dragEndHandler);
  }, []);
  return (
    <div ref={ref} style={style} className={classname}>
      {data
        .filter((v) => v.visible === true)
        .map((g) => {
          return (
            <TreeItem
              draggable={drag}
              highlight={highlight}
              itemkey={g.key}
              onClick={() =>
                changeVisible(g, () => forceUpdate((state) => state + 1))
              }
              level={g.level}
              key={g.key}
              borderColor={borderColor}
              style={{
                paddingLeft: `${levelSpace * g.level}px`,
                cursor: 'pointer',
              }}
              onDragStart={(e) => {
                e.dataTransfer.setData('atomkey', `${g.key}`);
                e.currentTarget.style.width = '50%';
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                // e.currentTarget.style.border = 'none';
                e.currentTarget.style.boxShadow =
                  '0 0 4px 4px rgba(0, 0, 0, 0.4)';
                setHighlight({
                  drag: true,
                  itemkey: g.key,
                });
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.background = 'unset';
                e.currentTarget.style.boxShadow = 'unset';
                e.currentTarget.style.width = 'unset';
                throttle(dragHandler)(e.clientX, g.key, g);
              }}
              onDrop={(e) => {
                const key = e.dataTransfer.getData('atomkey');
                const left = e.clientX;
                const diff = left - start; // 离顶部差距
                const res = switchInsert(diff, g);
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
              }}
            >
              <TreeIcon g={g}>
                <Icon icon='arrowdown'></Icon>
              </TreeIcon>
              <span>{g.value}</span>
              {doverState.drag && (
                <TreeGap
                  gKey={g.key}
                  drag={doverState.drag}
                  x={doverState.x}
                  itemkey={doverState.itemkey}
                  backColor={backColor}
                ></TreeGap>
              )}
            </TreeItem>
          );
        })}
    </div>
  );
}
Tree.defaultProps = {
  source: [],
  drag: true,
  borderColor: '#53c94fa8',
  bckColor: '#00000030',
};