const source = [
  {
    value: '北京分行',
    children: [
      {
        value: '朝阳支行办事处',
        children: [{value: '朝阳支行办事处-1'}, {value: '朝阳支行办事处-2'}],
      },
      {value: '海淀支行办事处'},
      {value: '石景山支行办事处'},
    ],
  },
  {
    value: '天津分行',
    children: [
      {value: '和平支行办事处'},
      {value: '河东支行办事处'},
      {value: '南开支行办事处'},
    ],
  },
];

function flatten(
  list,
  childKey = 'children',
  level = 1,
  parent = null,
  defaultExpand = true
) {
  let arr = [];
  // if(list.length)
  list.forEach((l) => {
    l.level = level;
    if (l.expand === undefined) {
      l.expand = defaultExpand;
    }
    if (l.visible === undefined) {
      l.visible = true;
    }
    if (!parent?.visible || !parent?.expand) {
      list.visible = false;
    }
    l.parent = parent;
    arr.push(l);
    // console.log(arr, 'arr---')
    if (l[childKey]) {
      arr.push(...flatten(l[childKey], childKey, level + 1, l, defaultExpand));
    }
  });
  return arr;
}
console.log(flatten(source, 'children', 1, {
  level: 0,
  visible: true,
  expand: true,
  children: source,
}))
