var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { Fragment, useCallback, useMemo, useRef, useState, } from 'react';
import styled, { css } from 'styled-components';
import { color } from '../shared/styles';
import axios from 'axios';
import Button from '../button';
import { message } from '../message';
import Progress from '../progress';
import Icon from '../icon';
import Modal from '../modal';
import { iconSpin } from '../shared/animation';
function chooseProgressListColor(status) {
    switch (status) {
        case 'ready':
            return color.warning;
        case 'success':
            return color.positive;
        case 'failed':
            return color.negative;
        case 'upload':
            return color.secondary;
    }
}
var ProgressBarListItemName = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (props) { return chooseProgressListColor(props.status); });
export var updateFilist = function (setFlist, _file, uploadPartial) {
    setFlist(function (preVFlist) {
        if (preVFlist) {
            return preVFlist.map(function (f) {
                if (f.uid === _file.uid) {
                    return __assign(__assign({}, f), uploadPartial);
                }
                else {
                    return f;
                }
            });
        }
        else {
            return preVFlist;
        }
    });
};
var postData = function (file, filename, config, i, // 多重上传 i用来标识第几个
onProgress, setFlist, successCallback, failCallback) {
    var formData = new FormData();
    formData.append(filename, file);
    var source = axios.CancelToken.source();
    var _file = {
        filename: file.name,
        percent: 0,
        status: 'ready',
        uid: Date.now() + 'upload',
        size: file.size,
        cancel: source,
        raw: file,
    };
    setFlist(function (prev) {
        // 添加进队列
        return __spreadArray([_file], prev, true);
    });
    var defaultAxiosConfig = {
        method: 'post',
        url: 'http://localhost:51111/user/uploadAvatar/',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        cancelToken: source.token,
        onUploadProgress: function (e) {
            console.log(e.total, e.loaded, 'e.loaded');
            var percentage = Math.round((e.loaded * 100) / e.total) || 0;
            updateFilist(setFlist, _file, {
                status: 'upload',
                percent: percentage,
            }); // 更新上传队列
            if (onProgress) {
                onProgress(percentage, file, i);
            }
        },
    };
    var mergeConfig = __assign(__assign({}, defaultAxiosConfig), config);
    return axios(mergeConfig)
        .then(function (res) {
        updateFilist(setFlist, _file, { status: 'success', percent: 100 });
        if (successCallback) {
            successCallback(res, i);
        }
    })
        .catch(function (err) {
        updateFilist(setFlist, _file, { status: 'failed', percent: 0 });
        if (failCallback) {
            failCallback(err, i);
        }
    });
};
var resolveFilename = function (uploadFilename, index) {
    if (Array.isArray(uploadFilename)) {
        return uploadFilename[index];
    }
    else {
        return uploadFilename;
    }
};
var getBase64 = function (raw, callback) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
        callback(reader.result);
    });
    reader.readAsDataURL(raw);
};
function UploadList(props) {
    var flist = props.flist, onRemove = props.onRemove;
    return (React.createElement("ul", null, flist.map(function (f) {
        return (React.createElement(ProgressLi, { key: f.uid },
            React.createElement(ProgressListItem, null,
                React.createElement(ProgressBarListItemName, { status: f.status }, f.filename),
                React.createElement("div", null,
                    React.createElement(Button, { style: { padding: 0, background: 'transparent' }, onClick: function () { return onRemove(f); } },
                        React.createElement(Icon, { icon: 'close', color: chooseProgressListColor(f.status) }))),
                (f.status === 'upload' ||
                    f.status === 'ready') && (React.createElement(Progress, { count: f.percent })))));
    })));
}
export var IconSpin = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  & > svg {\n    ", "\n  }\n"], ["\n  & > svg {\n    ", "\n  }\n"])), css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      animation: ", " 2s linear infinite;\n    "], ["\n      animation: ", " 2s linear infinite;\n    "])), iconSpin));
export function ImageList(props) {
    var flist = props.flist, onRemove = props.onRemove, setFlist = props.setFlist;
    useMemo(function () {
        if (flist) {
            flist.forEach(function (f) {
                if (f.raw && !f.img) {
                    // 如果有文件并且没有图片地址的话，直接生成bolb
                    getBase64(f.raw, function (e) {
                        updateFilist(setFlist, f, {
                            img: e || 'error',
                        });
                    });
                }
            });
        }
    }, [flist, setFlist]);
    return (React.createElement(Fragment, null, flist.map(function (f) {
        return (React.createElement("span", { key: f.uid },
            React.createElement(ImgWraper, null,
                f.status === 'success' && (React.createElement("img", { src: f.img, alt: 'upload img' })),
                (f.status === 'upload' || f.status === 'ready') && (React.createElement(IconSpin, null,
                    React.createElement(Icon, { icon: 'sync', color: color.warning }))),
                f.status === 'failed' && (React.createElement(IconSpin, null,
                    React.createElement(Icon, { icon: 'photo', color: color.negative }))),
                React.createElement(ImageCloseButton, { className: 'closebtn', onClick: function () { return onRemove(f); } },
                    React.createElement(Icon, { icon: 'trash', color: color.light })))));
    })));
}
var btnStyle = {
    padding: '10px',
};
var rotateBtnStyle = {
    padding: '10px',
    transform: 'rotateY(180deg)'
};
var canvasDraw = function (modalContent, canvas) {
    var img = modalContent.img;
    var ctx = canvas.getContext('2d');
    var times = modalContent.times, rotate = modalContent.rotate, left = modalContent.left, right = modalContent.right;
    // eslint-disable-next-line no-self-assign
    canvas.height = canvas.height; // 清屏
    var imgWidth = img.width;
    var imgHeight = img.height;
    // canvas宽高均为300，判断图片属性，谁大就用300
    if (imgWidth > imgHeight) {
        var rate = canvas.width / imgWidth;
        imgWidth = canvas.width * times;
        imgHeight = canvas.height * rate * times;
    }
    else {
        var rate = canvas.height / imgHeight;
        imgHeight = canvas.height * times;
        imgWidth = imgWidth * rate * times;
    }
    // 此时，长度已经等比，计算图片偏移
    var startX = (canvas.width - imgWidth) / 2;
    var startY = (canvas.height - imgHeight) / 2;
    // 旋转操作
    // 旋转首先是移动原点到图片中心，然后再移动回来
    var midX = canvas.width / 2;
    var midY = canvas.height / 2;
    ctx === null || ctx === void 0 ? void 0 : ctx.translate(midX, midY);
    ctx === null || ctx === void 0 ? void 0 : ctx.rotate(rotate);
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, startX - midX + left, startY - midY + right, imgWidth, imgHeight);
    ctx === null || ctx === void 0 ? void 0 : ctx.translate(0, 0);
};
var showModalToSlice = function (f, canvasRef, modalContent) {
    getBase64(f, function (s) {
        var canvas = canvasRef.current;
        if (canvas) {
            modalContent.img.src = s;
            modalContent.img.onload = function () {
                canvasDraw(modalContent, canvas);
            };
        }
    });
};
// 图片上传的按钮
var ImgWraper = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: inline-block;\n  position: relative;\n  width: 104px;\n  height: 104px;\n  margin-right: 8px;\n  margin-bottom: 8px;\n  text-align: center;\n  vertical-align: top;\n  background-color: #fafafa;\n  border: 1px dashed #d9d9d9;\n  border-radius: 2px;\n  cursor: pointer;\n  transition: border-color 0.3s ease;\n  > img {\n    width: 100%;\n    height: 100%;\n  }\n  &::before {\n    position: absolute;\n    left: 0;\n    z-index: 1;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 0;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    content: ' ';\n  }\n  &:hover::before {\n    position: absolute;\n    left: 0;\n    z-index: 1;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 1;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    content: ' ';\n  }\n  &:hover > .closebtn {\n    display: block;\n  }\n"], ["\n  display: inline-block;\n  position: relative;\n  width: 104px;\n  height: 104px;\n  margin-right: 8px;\n  margin-bottom: 8px;\n  text-align: center;\n  vertical-align: top;\n  background-color: #fafafa;\n  border: 1px dashed #d9d9d9;\n  border-radius: 2px;\n  cursor: pointer;\n  transition: border-color 0.3s ease;\n  > img {\n    width: 100%;\n    height: 100%;\n  }\n  &::before {\n    position: absolute;\n    left: 0;\n    z-index: 1;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 0;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    content: ' ';\n  }\n  &:hover::before {\n    position: absolute;\n    left: 0;\n    z-index: 1;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 1;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    content: ' ';\n  }\n  &:hover > .closebtn {\n    display: block;\n  }\n"])));
var ImageCloseButton = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n  display: none;\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n  display: none;\n"])));
var ImgUpload = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: inline-block;\n  position: relative;\n  width: 104px;\n  height: 104px;\n  margin-right: 8px;\n  margin-bottom: 8px;\n  text-align: center;\n  vertical-align: top;\n  background-color: #fafafa;\n  border: 1px dashed #d9d9d9;\n  border-radius: 2px;\n  cursor: pointer;\n  transition: border-color 0.3s ease;\n  > svg {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n"], ["\n  display: inline-block;\n  position: relative;\n  width: 104px;\n  height: 104px;\n  margin-right: 8px;\n  margin-bottom: 8px;\n  text-align: center;\n  vertical-align: top;\n  background-color: #fafafa;\n  border: 1px dashed #d9d9d9;\n  border-radius: 2px;\n  cursor: pointer;\n  transition: border-color 0.3s ease;\n  > svg {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n"])));
var ProgressListItem = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  align-item: center;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-item: center;\n  justify-content: space-between;\n"])));
var ProgressLi = styled.li(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  list-style: none;\n  padding: 10px;\n  box-shadow: 2px 2px 4px #d9d9d9;\n"], ["\n  list-style: none;\n  padding: 10px;\n  box-shadow: 2px 2px 4px #d9d9d9;\n"])));
export default function Upload(props) {
    var axiosConfig = props.axiosConfig, onProgress = props.onProgress, defaultProgressBar = props.defaultProgressBar, uploadFilename = props.uploadFilename, successCallback = props.successCallback, failCallback = props.failCallback, beforeUpload = props.beforeUpload, uploadMode = props.uploadMode, onRemoveCallback = props.onRemoveCallback, customRemove = props.customRemove, max = props.max, accept = props.accept, multiple = props.multiple;
    var _a = useState(defaultProgressBar || []), flist = _a[0], setFlist = _a[1];
    var _b = useState({
        restFn: function () { },
    }), resCallback = _b[0], setResCallback = _b[1];
    var _c = useState(false), modalOpen = _c[0], setModalOpen = _c[1];
    var _d = useState({
        rotate: 0,
        times: 1,
        img: new Image(),
        left: 0,
        right: 0,
    }), modalContent = _d[0], setModalContent = _d[1];
    var _e = useState(false), mouseActive = _e[0], setMouseActive = _e[1]; // 是否按下左键
    var _f = useState({ x: 0, y: 0 }), position = _f[0], setPosition = _f[1];
    var inputRef = useRef(null);
    var canvasRef = useRef(null);
    var handleChange = function (e) {
        if (!e.target.files)
            return;
        if (e.target.files && e.target.files.length <= 0)
            return;
        var fileList = Array.from(e.target.files);
        fileList.forEach(function (file, i) {
            var restFn = function (file) {
                console.log(file, 'file-----');
                if (beforeUpload) {
                    var p = beforeUpload(file, i);
                    if (p instanceof Promise) {
                        p.then(function (res) {
                            postData(res, resolveFilename(uploadFilename, i), axiosConfig, i, onProgress, setFlist, successCallback, failCallback);
                        });
                    }
                    else {
                        if (p) {
                            // false不执行
                            postData(file, resolveFilename(uploadFilename, i), axiosConfig, i, onProgress, setFlist, successCallback, failCallback);
                        }
                    }
                }
                else {
                    postData(file, resolveFilename(uploadFilename, i), axiosConfig, i, onProgress, setFlist, successCallback, failCallback);
                }
            };
            setResCallback({ restFn: restFn });
            if (showSlice) {
                setModalOpen(true);
                showModalToSlice(file, canvasRef, modalContent);
            }
            else {
                restFn(file);
            }
        });
    };
    var resolveBtnLoading = function (flist) {
        return flist.some(function (f) { return f.status === 'upload'; });
    };
    var handleClick = function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var onRemove = useCallback(function (file) {
        if (customRemove) {
            customRemove(file, setFlist);
        }
        else {
            setFlist(function (prev) {
                return prev.filter(function (f) {
                    if (f.uid === file.uid && f.status === 'upload' && f.cancel) {
                        f.cancel.cancel();
                    }
                    return f.uid !== file.uid;
                });
            });
        }
        if (onRemoveCallback) {
            onRemoveCallback(file);
        }
    }, [onRemoveCallback, setFlist, customRemove]);
    var shouldShow = useMemo(function () {
        if (max !== undefined) {
            return flist.length < max;
        }
        else {
            return true;
        }
    }, [max, flist]);
    var showSlice = useMemo(function () {
        if (uploadMode === 'img' && !multiple) {
            return true;
        }
        return false;
    }, [multiple, uploadMode]);
    var handleMouseDown = function (e) {
        setMouseActive(true);
        setPosition({
            x: e.clientX - modalContent.left,
            y: e.clientY - modalContent.right,
        });
    };
    var handleMouseMove = function (e) {
        if (mouseActive) {
            var dis = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            };
            var newModalContent = __assign(__assign({}, modalContent), { left: dis.x, right: dis.y });
            setModalContent(newModalContent);
            canvasDraw(newModalContent, canvasRef.current);
        }
    };
    var handleMouseUp = function () {
        setMouseActive(false);
    };
    var handleMouseLeave = function () {
        setMouseActive(false);
    };
    return (React.createElement("div", null,
        React.createElement("input", { ref: inputRef, type: 'file', onChange: handleChange, style: { display: 'none' }, value: '', accept: accept, multiple: multiple }),
        uploadMode === 'default' && (React.createElement(React.Fragment, null,
            shouldShow && (React.createElement(Button, { onClick: handleClick, isLoading: resolveBtnLoading(flist), loadingText: '\u4E0A\u4F20\u4E2D...' }, "upload")),
            React.createElement(UploadList, { flist: flist, onRemove: onRemove }))),
        uploadMode === 'img' && (React.createElement(React.Fragment, null,
            shouldShow && (React.createElement(ImgUpload, { onClick: handleClick },
                React.createElement(Icon, { icon: 'plus' }))),
            React.createElement(ImageList, { flist: flist, onRemove: onRemove, setFlist: setFlist }))),
        React.createElement(Modal, { title: '\u56FE\u7247\u88C1\u526A', callback: function (v) {
                var _a;
                if (v) {
                    (_a = canvasRef.current) === null || _a === void 0 ? void 0 : _a.toBlob(function (blob) {
                        resCallback.restFn && resCallback.restFn(blob);
                    });
                }
            }, maskClose: true, closeButton: false, confirm: true, visible: modalOpen, parentSetState: setModalOpen },
            React.createElement("div", { onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseLeave },
                React.createElement("canvas", { width: 300, height: 300, style: {
                        width: '100%',
                        height: '100%',
                        border: '1px dashed #ff4785',
                    }, ref: canvasRef }, "\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301canvas")),
            React.createElement("div", null,
                React.createElement(Button, { appearance: 'primary', style: btnStyle, onClick: function () {
                        var newContent = __assign(__assign({}, modalContent), { times: modalContent.times + 0.1 });
                        setModalContent(newContent);
                        canvasDraw(newContent, canvasRef.current);
                    } },
                    React.createElement(Icon, { icon: 'zoom', color: color.light })),
                React.createElement(Button, { appearance: 'primary', style: btnStyle, onClick: function () {
                        var newContent = __assign(__assign({}, modalContent), { times: modalContent.times - 0.1 });
                        setModalContent(newContent);
                        canvasDraw(newContent, canvasRef.current);
                    } },
                    React.createElement(Icon, { icon: 'zoomout', color: color.light })),
                React.createElement(Button, { appearance: 'primary', style: btnStyle, onClick: function () {
                        var newContent = __assign(__assign({}, modalContent), { rotate: modalContent.rotate - 0.1 });
                        setModalContent(newContent);
                        canvasDraw(newContent, canvasRef.current);
                    } },
                    React.createElement(Icon, { icon: 'undo', color: color.light })),
                React.createElement(Button, { appearance: 'primary', style: rotateBtnStyle, onClick: function () {
                        var newContent = __assign(__assign({}, modalContent), { rotate: modalContent.rotate + 0.1 });
                        setModalContent(newContent);
                        canvasDraw(newContent, canvasRef.current);
                    } },
                    React.createElement(Icon, { icon: 'undo', color: color.light })),
                React.createElement(Button, { appearance: 'primary', style: btnStyle, onClick: function () {
                        var newContent = __assign(__assign({}, modalContent), { rotate: 0, times: 1, left: 0, right: 0 });
                        setModalContent(newContent);
                        canvasDraw(newContent, canvasRef.current);
                    } },
                    React.createElement(Icon, { icon: 'zoomreset', color: color.light }))))));
}
Upload.defaultProps = {
    axiosConfig: {},
    uploadFilename: 'avatar',
    successCallback: function () { return message.success('上传成功！'); },
    failCallback: function () { return message.error('上传失败！'); },
    uploadMode: 'default',
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
