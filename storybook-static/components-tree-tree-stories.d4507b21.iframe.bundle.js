"use strict";(self.webpackChunkant_design_explorer=self.webpackChunkant_design_explorer||[]).push([[601],{"./src/components/tree/tree.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>tree_stories,knobsBtn:()=>knobsBtn});var _templateObject,_templateObject2,_templateObject3,react=__webpack_require__("./node_modules/react/index.js"),taggedTemplateLiteral=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),icon=__webpack_require__("./src/components/icon/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const switchInsert=(diff,item)=>{if(isNaN(diff))return 0;{const origin=24*item.level;return diff<origin?checkParent(item)?2:1:diff<origin+24?2:3}},checkParent=item=>1===item.level;function findOrigin(key,data){const res=data.filter((v=>v.key===key));return res.length>0?res[0]:null}function checkTargetOrigin(item,origin){return item!==origin}function judgeChildren(origin,target){let sign=!0;const fn=child=>{child.children&&child.children.forEach((v=>{v!==target?fn(v):sign=!1}))};return fn(origin),sign}function changeOriginParent(origin){const parent=origin.parent;if(parent.children){const index=parent.children.indexOf(origin);index>-1&&parent.children.splice(index,1)}}function changeTargetParent(parent,origin,g){if(origin.parent=parent,parent.children){if(g.parent.children){const index=g.parent.children.indexOf(g);index>-1?parent.children.splice(index+1,0,origin):parent.children.push(origin)}}else parent.children=[origin]}const TreeItem=styled_components_browser_esm.Ay.div(_templateObject||(_templateObject=(0,taggedTemplateLiteral.A)(["\n  padding-left: ","px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n  ","\n"])),(props=>24*props.level),(props=>props.highlight.drag&&props.highlight.itemkey===props.itemkey?"border: 1px dashed ".concat(props.borderColor):"")),TreeIcon=styled_components_browser_esm.Ay.span(_templateObject2||(_templateObject2=(0,taggedTemplateLiteral.A)(["\n  & > svg {\n    transition: linear 0.2s;\n    height: 10px;\n    margin-bottom: 5px;\n    ","\n  }\n"])),(props=>props.g.children&&0!==props.g.children.length?props.g.children[0]&&props.g.children[0].visible?"display: inline-block;transform: rotate(-90deg)":"display: inline-block;":"opacity: 0")),TreeGap=styled_components_browser_esm.Ay.div(_templateObject3||(_templateObject3=(0,taggedTemplateLiteral.A)(["\n  position: absolute;\n  width: 100%;\n  height: 90%;\n  background-color: ","\n  ",";\n  ","\n"])),(props=>props.backColor),(props=>{switch(props.x){case 1:return"margin-left: ".concat(-24,"px");case 2:default:return"";case 3:return"margin-left: ".concat(24,"px")}}),(props=>{if(props.key===props.gKey)return"background: #00000030"})),flatten=function(list){let level=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,parent=arguments.length>2?arguments[2]:void 0,defaultExpand=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],arr=[];return list.forEach((item=>{item.level=level,void 0===item.expand&&(item.expand=defaultExpand),void 0===item.visible&&(item.visible=!0),parent.visible&&parent.expand||(item.visible=!1),void 0===item.key&&(item.key=item.value+Math.random()),item.parent=parent,arr.push(item),item.children&&arr.push(...flatten(item.children,level+1,item,defaultExpand))})),arr};function Tree(props){const{source,drag,borderColor,backColor,style,classname}=props,root=(0,react.useMemo)((()=>({level:0,visible:!0,expand:!0,children:source,value:"root"})),[source]),forceUpdate=(0,react.useState)(0)[1],[dragState,setDragState]=(0,react.useState)(0),[start,setStart]=(0,react.useState)(0),[doverState,setDoverState]=(0,react.useState)({drag:!1,x:0,itemkey:""}),[highlight,setHighlight]=(0,react.useState)({drag:!0,itemkey:""}),ref=(0,react.useRef)(null),data=(0,react.useMemo)((()=>flatten(root.children,1,root)),[dragState,root]),dragCalback=()=>setDragState((state=>state+1)),dragHandler=(clientX,itemkey,g)=>{const x=switchInsert(clientX-start,g);setDoverState({drag:!0,x,itemkey})};return(0,react.useEffect)((()=>{ref.current&&setStart(ref.current.getBoundingClientRect().left);const dragEndHandler=()=>{setDoverState((prev=>({...prev,drag:!1}))),setHighlight({drag:!1,itemkey:""})};return window.addEventListener("dragend",dragEndHandler),()=>window.removeEventListener("dragend",dragEndHandler)}),[]),(0,jsx_runtime.jsx)("div",{ref,style,className:classname,children:data.filter((v=>!0===v.visible)).map((g=>(0,jsx_runtime.jsxs)(TreeItem,{draggable:drag,highlight,itemkey:g.key,onClick:()=>function changeVisible(item,callback){if(item.children){let visible;const depth=item=>{item.forEach((v=>{void 0===visible&&(visible=!v.visible),v.visible=visible,v.children&&depth(v.children)}))};depth(item.children),callback()}}(g,(()=>forceUpdate((state=>state+1)))),level:g.level,borderColor,style:{paddingLeft:"".concat(24*g.level,"px"),cursor:"pointer"},onDragStart:e=>{e.dataTransfer.setData("atomkey","".concat(g.key)),e.currentTarget.style.width="50%",e.currentTarget.style.background="rgba(255,255,255,0.5)",e.currentTarget.style.boxShadow="0 0 4px 4px rgba(0, 0, 0, 0.4)",setHighlight({drag:!0,itemkey:g.key})},onDragOver:e=>{e.preventDefault(),e.currentTarget.style.background="unset",e.currentTarget.style.boxShadow="unset",e.currentTarget.style.width="unset",function(fn){let timer,delay=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];timer&&clearTimeout(timer),timer=setTimeout((()=>{fn.apply(void 0,args)}),delay)}}(dragHandler)(e.clientX,g.key,g)},onDrop:e=>{const key=e.dataTransfer.getData("atomkey"),left=e.clientX;switch(switchInsert(left-start,g)){case 1:((key,g,data,callback)=>{const origin=findOrigin(key,data),parent=function getParent(item){return item.parent&&item.parent.parent?item.parent.parent:item.parent}(g);1!==g.level&&origin&&checkTargetOrigin(g,origin)&&judgeChildren(origin,g)&&(changeOriginParent(origin),changeTargetParent(parent,origin,g),callback())})(key,g,data,dragCalback);break;case 2:((key,g,data,callback)=>{const origin=findOrigin(key,data),parent=g.parent;0!==g.level&&origin&&checkTargetOrigin(g,origin)&&judgeChildren(origin,g)&&(changeOriginParent(origin),changeTargetParent(parent,origin,g),callback())})(key,g,data,dragCalback);break;case 3:((key,g,data,callback)=>{const origin=findOrigin(key,data),parent=g;origin&&checkTargetOrigin(g,origin)&&judgeChildren(origin,g)&&(changeOriginParent(origin),changeTargetParent(parent,origin,g),callback())})(key,g,data,dragCalback)}},children:[(0,jsx_runtime.jsx)(TreeIcon,{g,children:(0,jsx_runtime.jsx)(icon.A,{icon:"arrowdown"})}),(0,jsx_runtime.jsx)("span",{children:g.value}),doverState.drag&&(0,jsx_runtime.jsx)(TreeGap,{gKey:g.key,drag:doverState.drag,x:doverState.x,itemkey:doverState.itemkey,backColor})]},g.key)))})}Tree.defaultProps={source:[],drag:!0,borderColor:"#53c94fa8",bckColor:"#00000030"},Tree.__docgenInfo={description:"",methods:[],displayName:"Tree",props:{source:{required:!1,tsType:{name:"Array",elements:[{name:"itemProps"}],raw:"itemProps[]"},description:"数据源",defaultValue:{value:"[]",computed:!1}},drag:{required:!1,tsType:{name:"boolean"},description:"是否可以拖拽",defaultValue:{value:"true",computed:!1}},borderColor:{required:!1,tsType:{name:"string"},description:"高亮边框颜色",defaultValue:{value:"'#53c94fa8'",computed:!1}},backColor:{required:!1,tsType:{name:"string"},description:"拖拽提示色"},style:{required:!1,tsType:{name:"CSSProperties"},description:""},classname:{required:!1,tsType:{name:"string"},description:""},bckColor:{defaultValue:{value:"'#00000030'",computed:!1},required:!1}}};const tree_stories={title:"Tree",component:Tree},source=[{value:"北京分行",children:[{value:"朝阳支行办事处",children:[{value:"朝阳支行办事处-1"},{value:"朝阳支行办事处-2"}]},{value:"海淀支行办事处"},{value:"石景山支行办事处"}]},{value:"天津分行",children:[{value:"和平支行办事处"},{value:"河东支行办事处"},{value:"南开支行办事处"}]}],knobsBtn=()=>(0,jsx_runtime.jsx)(Tree,{source});knobsBtn.parameters={...knobsBtn.parameters,docs:{...knobsBtn.parameters?.docs,source:{originalSource:"() => <Tree source={source} />",...knobsBtn.parameters?.docs?.source}}};const __namedExportsOrder=["knobsBtn"]}}]);