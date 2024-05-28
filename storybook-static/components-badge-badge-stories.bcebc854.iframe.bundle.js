"use strict";(self.webpackChunkant_design_explorer=self.webpackChunkant_design_explorer||[]).push([[211],{"./src/components/badge/badge.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,all:()=>badge_stories_all,default:()=>badge_stories,knobsBtn:()=>knobsBtn,withIcon:()=>withIcon});__webpack_require__("./node_modules/react/index.js");var _templateObject,_templateObject2,_templateObject3,_templateObject4,_templateObject5,_templateObject6,taggedTemplateLiteral=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),styles=__webpack_require__("./src/components/shared/styles.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const badgeColor={positive:styles.yW.positive,negative:styles.yW.negative,neutral:styles.yW.dark,warning:styles.yW.warning,error:styles.yW.lightest},badgeBackground={positive:styles.Tp.positive,negative:styles.Tp.negative,neutral:styles.yW.mediumlight,warning:styles.Tp.warning,error:styles.yW.negative},BedgeWrapper=styled_components_browser_esm.Ay.div(_templateObject||(_templateObject=(0,taggedTemplateLiteral.A)(["\n  display: inline-block;\n  vertical-align: top;\n  font-size: 11px;\n  line-height: 12px;\n  padding: 4px 12px;\n  border-radius: 3em;\n  font-weight: ",";\n\n  svg {\n    height: 12px;\n    width: 12px;\n    margin-right: 4px;\n    margin-top: -2px;\n  }\n\n  ","\n\n  ","\n\n  ","\n\n  ","\n\n  ","\n"])),styles.Il.weight.bold,(props=>"positive"===props.status&&(0,styled_components_browser_esm.AH)(_templateObject2||(_templateObject2=(0,taggedTemplateLiteral.A)(["\n      color: ",";\n      background: ",";\n    "])),badgeColor.positive,badgeBackground.positive)),(props=>"negative"===props.status&&(0,styled_components_browser_esm.AH)(_templateObject3||(_templateObject3=(0,taggedTemplateLiteral.A)(["\n      color: ",";\n      background: ",";\n    "])),badgeColor.negative,badgeBackground.negative)),(props=>"neutral"===props.status&&(0,styled_components_browser_esm.AH)(_templateObject4||(_templateObject4=(0,taggedTemplateLiteral.A)(["\n      color: ",";\n      background: ",";\n    "])),badgeColor.neutral,badgeBackground.neutral)),(props=>"warning"===props.status&&(0,styled_components_browser_esm.AH)(_templateObject5||(_templateObject5=(0,taggedTemplateLiteral.A)(["\n      color: ",";\n      background: ",";\n    "])),badgeColor.warning,badgeBackground.warning)),(props=>"error"===props.status&&(0,styled_components_browser_esm.AH)(_templateObject6||(_templateObject6=(0,taggedTemplateLiteral.A)(["\n      color: ",";\n      background: ",";\n    "])),badgeColor.error,badgeBackground.error)));function Badge(props){return(0,jsx_runtime.jsx)(BedgeWrapper,{...props})}Badge.defaultProps={status:"neutral"},Badge.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{status:{required:!1,tsType:{name:"union",raw:"'positive' | 'negative' | 'neutral' | 'warning' | 'error'",elements:[{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'neutral'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"状态色",defaultValue:{value:"'neutral'",computed:!1}}},composes:["HTMLAttributes"]};var icon=__webpack_require__("./src/components/icon/index.tsx");const badge_stories={title:"Badge",component:Badge},knobsBtn=()=>(0,jsx_runtime.jsx)(Badge,{children:"Neutral"}),badge_stories_all=()=>(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Badge,{status:"positive",children:"Positive"}),(0,jsx_runtime.jsx)(Badge,{status:"negative",children:"Negative"}),(0,jsx_runtime.jsx)(Badge,{status:"neutral",children:"Neutral"}),(0,jsx_runtime.jsx)(Badge,{status:"error",children:"Error"}),(0,jsx_runtime.jsx)(Badge,{status:"warning",children:"Warning"})]}),withIcon=()=>(0,jsx_runtime.jsxs)(Badge,{status:"warning",children:[(0,jsx_runtime.jsx)(icon.A,{icon:"check"}),"with icon"]});knobsBtn.parameters={...knobsBtn.parameters,docs:{...knobsBtn.parameters?.docs,source:{originalSource:"() => <Badge>Neutral</Badge>",...knobsBtn.parameters?.docs?.source}}},badge_stories_all.parameters={...badge_stories_all.parameters,docs:{...badge_stories_all.parameters?.docs,source:{originalSource:"() => <div>\n    <Badge status='positive'>Positive</Badge>\n    <Badge status='negative'>Negative</Badge>\n    <Badge status='neutral'>Neutral</Badge>\n    <Badge status='error'>Error</Badge>\n    <Badge status='warning'>Warning</Badge>\n  </div>",...badge_stories_all.parameters?.docs?.source}}},withIcon.parameters={...withIcon.parameters,docs:{...withIcon.parameters?.docs,source:{originalSource:"() => <Badge status='warning'>\n    <Icon icon='check' />\n    with icon\n  </Badge>",...withIcon.parameters?.docs?.source}}};const __namedExportsOrder=["knobsBtn","all","withIcon"]}}]);