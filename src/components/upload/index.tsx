import React, {
  Fragment,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import {color, typography} from '../shared/styles';
import {darken, rgba, opacify} from 'polished';
import axios, {AxiosRequestConfig, CancelTokenSource} from 'axios';
import Button from '../button';
import {message} from '../message';
import Progress from '../progress';
import Icon from '../icon';
import Modal from '../modal';
import { iconSpin } from '../shared/animation';

interface ProgressBar {
  filename: string;
  percent: number;
  status: ProgressBarStatus;
  uid: string;
  size: number;
  raw?: File | null;
  cancel?: CancelTokenSource;
  img?: string | ArrayBuffer | null;
}

type ProgressBarStatus = 'ready' | 'success' | 'failed' | 'upload';

function chooseProgressListColor(status: ProgressBarStatus) {
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
const ProgressBarListItemName = styled.div<{ status: ProgressBarStatus }>`
  color: ${(props) => chooseProgressListColor(props.status)};
`

export const updateFilist = (
  setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
  _file: ProgressBar,
  uploadPartial: Partial<ProgressBar>
) => {
  setFlist((preVFlist) => {
    if (preVFlist) {
      return preVFlist.map((f) => {
        if (f.uid === _file.uid) {
          return {...f, ...uploadPartial};
        } else {
          return f;
        }
      });
    } else {
      return preVFlist;
    }
  });
};

type onProgressType = ((p: number, f: File, i: number) => void) | undefined;

const postData = function (
  file: File,
  filename: string,
  config: Partial<AxiosRequestConfig>,
  i: number, // 多重上传 i用来标识第几个
  onProgress: onProgressType,
  setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
  successCallback: ((res: any, i: number) => void) | undefined,
  failCallback: ((res: any, i: number) => void) | undefined
) {
  const formData = new FormData();
  formData.append(filename, file);
  const source = axios.CancelToken.source();
  const _file: ProgressBar = {
    filename: file.name,
    percent: 0,
    status: 'ready',
    uid: Date.now() + 'upload',
    size: file.size,
    cancel: source,
    raw: file,
  };
  setFlist((prev) => {
    // 添加进队列
    return [_file, ...prev];
  });
  const defaultAxiosConfig: Partial<AxiosRequestConfig> = {
    method: 'post',
    url: 'http://localhost:51111/user/uploadAvatar/',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    cancelToken: source.token,
    onUploadProgress: (e) => {
      console.log(e.total, e.loaded, 'e.loaded');
      const percentage = Math.round((e.loaded * 100) / e.total!) || 0;
      updateFilist(setFlist, _file, {
        status: 'upload',
        percent: percentage,
      }); // 更新上传队列
      if (onProgress) {
        onProgress(percentage, file, i);
      }
    },
  };
  const mergeConfig = {...defaultAxiosConfig, ...config};
  return axios(mergeConfig)
    .then((res) => {
      updateFilist(setFlist, _file, {status: 'success', percent: 100});
      if (successCallback) {
        successCallback(res, i);
      }
    })
    .catch((err) => {
      updateFilist(setFlist, _file, {status: 'failed', percent: 0});
      if (failCallback) {
        failCallback(err, i);
      }
    });
};

const resolveFilename = function (
  uploadFilename: string[] | string,
  index: number
) {
  if (Array.isArray(uploadFilename)) {
    return uploadFilename[index];
  } else {
    return uploadFilename;
  }
};

const getBase64 = (raw: File, callback: Function) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    callback(reader.result);
  });
  reader.readAsDataURL(raw);
};

type UploadMode = 'default' | 'img';

type ModalContentType = {
  rotate: number;
  times: number;
  img: HTMLImageElement;
  left: number;
  right: number;
};

type UploadProps = {
  /** 上传字段名*/
  uploadFilename: string[] | [];
  /** 发送设置，参考axios */
  axiosConfig?: Partial<AxiosRequestConfig>;
  /** 获取进度 */
  onProgress?: onProgressType;
  /** 成功回调 */
  successCallback?: ((res: any, i: number) => void) | undefined;
  /** 失败回调 */
  failCallback?: ((res: any, i: number) => void) | undefined;
  /** 上传列表初始值 */
  defaultProgressBar?: ProgressBar[];
  /** 如果返回promise，需要提供file，否则同步需要返回boolean，如果为false，则不发送*/
  beforeUpload?: (file: File, i: number) => boolean | Promise<File>;
  /** 上传模式 2种 */
  uploadMode?: UploadMode;
  /** 是否开启进度列表 */
  progress?: boolean;
  /** 删除文件列表时的回调，只有img与progress为true有效 */
  onRemoveCallback?: (f: ProgressBar) => void;
  /** 自定义删除行为，只有img与progress为true有效*/
  customRemove?: (
    file: ProgressBar,
    setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>
  ) => void;
  /** 允许上传最大容量*/
  max?: number;
  /** input的accept属性 */
  accept?: string;
  /** input的multiple属性   multiple为true和max冲突*/
  multiple?: boolean;
};

interface UploadListProps {
  flist: ProgressBar[];
  onRemove: (item: ProgressBar) => void;
}
function UploadList(props: UploadListProps) {
  const {flist, onRemove} = props;
  return (
    <ul>
      {flist.map((f) => {
        return (
          <ProgressLi key={f.uid}>
            <ProgressListItem>
              <ProgressBarListItemName status={f.status}>{f.filename}</ProgressBarListItemName>
              <div>
                <Button
                  style={{padding: 0, background: 'transparent'}}
                  onClick={() => onRemove(f)}
                >
                  <Icon icon='close' color={chooseProgressListColor(f.status)}></Icon>
                </Button>
              </div>
              {(f.status === 'upload' ||
                f.status === 'ready') && (
                <Progress count={f.percent}></Progress>
              )}
            </ProgressListItem>
          </ProgressLi>
        );
      })}
    </ul>
  );
}

export const IconSpin = styled.span`
  & > svg {
    ${css`
      animation: ${iconSpin} 2s linear infinite;
    `}
  }
`;
interface ImgListProps extends UploadListProps {
  setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>;
}
export function ImageList(props: ImgListProps) {
  const {flist, onRemove, setFlist} = props;
  useMemo(() => {
    if (flist) {

      flist.forEach((f) => {
        if (f.raw && !f.img) {
         
          // 如果有文件并且没有图片地址的话，直接生成bolb
          getBase64(f.raw, (e: string) => {
            updateFilist(setFlist, f, {
              img: e || 'error',
            })
          })
        }
      });
    }
  }, [flist, setFlist]);
  return (
    <Fragment>
      {flist.map((f) => {
        return (
          <span key={f.uid}>
            <ImgWraper>
              {f.status === 'success' && (
                <img src={f.img as string} alt='upload img' />
              )}
              {(f.status === 'upload' || f.status === 'ready') && (
                <IconSpin>
                  <Icon icon='sync' color={color.warning}></Icon>
                </IconSpin>
              )}
              {f.status === 'failed' && (
                <IconSpin>
                  <Icon icon='photo' color={color.negative}></Icon>
                </IconSpin>
              )}
              <ImageCloseButton
                className='closebtn'
                onClick={() => onRemove(f)}
              >
                <Icon icon='trash' color={color.light} />
              </ImageCloseButton>
            </ImgWraper>
          </span>
        );
      })}
    </Fragment>
  );
}
const btnStyle = {
  padding: '10px',
}
const rotateBtnStyle = {
  padding: '10px',
  transform: 'rotateY(180deg)'
};

const canvasDraw = (
  modalContent: ModalContentType,
  canvas: HTMLCanvasElement
) => {
  const img = modalContent.img;
  const ctx = canvas.getContext('2d');
  const {times, rotate, left, right} = modalContent;
  // eslint-disable-next-line no-self-assign
  canvas.height = canvas.height; // 清屏
  let imgWidth = img.width;
  let imgHeight = img.height;
  // canvas宽高均为300，判断图片属性，谁大就用300
  if (imgWidth > imgHeight) {
    let rate = canvas.width / imgWidth;
    imgWidth = canvas.width * times;
    imgHeight = canvas.height * rate * times;
  } else {
    let rate = canvas.height / imgHeight;
    imgHeight = canvas.height * times;
    imgWidth = imgWidth * rate * times;
  }
  // 此时，长度已经等比，计算图片偏移
  const startX = (canvas.width - imgWidth) / 2;
  const startY = (canvas.height - imgHeight) / 2;
  // 旋转操作
  // 旋转首先是移动原点到图片中心，然后再移动回来
  const midX = canvas.width / 2;
  const midY = canvas.height / 2;
  ctx?.translate(midX, midY);

  ctx?.rotate(rotate);
  ctx?.drawImage(img, startX - midX + left, startY - midY + right, imgWidth, imgHeight);
  ctx?.translate(0, 0);
};

const showModalToSlice = (
  f: File,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  modalContent: ModalContentType
): void => {
  getBase64(f, (s: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      modalContent.img.src = s;
      modalContent.img.onload = function () {
        canvasDraw(modalContent, canvas);
      };
    }
  });
};

// 图片上传的按钮
const ImgWraper = styled.div`
  display: inline-block;
  position: relative;
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  > img {
    width: 100%;
    height: 100%;
  }
  &::before {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    content: ' ';
  }
  &:hover::before {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    content: ' ';
  }
  &:hover > .closebtn {
    display: block;
  }
`;
const ImageCloseButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: none;
`;
const ImgUpload = styled.div`
  display: inline-block;
  position: relative;
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ProgressListItem = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
`;
const ProgressLi = styled.li`
  list-style: none;
  padding: 10px;
  box-shadow: 2px 2px 4px #d9d9d9;
`;

export default function Upload(props: PropsWithChildren<UploadProps>) {
  const {
    axiosConfig,
    onProgress,
    defaultProgressBar,
    uploadFilename,
    successCallback,
    failCallback,
    beforeUpload,
    uploadMode,
    onRemoveCallback,
    customRemove,
    max,
    accept,
    multiple,
  } = props;
  const [flist, setFlist] = useState<ProgressBar[]>(defaultProgressBar || []);
  const [resCallback, setResCallback] = useState<{restFn: Function}>({
    restFn: () => {},
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContentType>({
    rotate: 0,
    times: 1,
    img: new Image(),
    left: 0,
    right: 0,
  });
  const [mouseActive, setMouseActive] = useState<boolean>(false); // 是否按下左键
  const [position, setPosition] = useState({x: 0, y: 0});
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files && e.target.files.length <= 0) return;
    const fileList = Array.from(e.target.files);
    fileList.forEach((file, i) => {
      const restFn = (file: File) => {
        console.log(file, 'file-----');
        if (beforeUpload) {
          const p = beforeUpload(file, i);
          if (p instanceof Promise) {
            p.then((res: File) => {
              postData(
                res,
                resolveFilename(uploadFilename, i),
                axiosConfig!,
                i,
                onProgress,
                setFlist,
                successCallback,
                failCallback
              );
            });
          } else {
            if (p) {
              // false不执行
              postData(
                file,
                resolveFilename(uploadFilename, i),
                axiosConfig!,
                i,
                onProgress,
                setFlist,
                successCallback,
                failCallback
              );
            }
          }
        } else {
          postData(
            file,
            resolveFilename(uploadFilename, i),
            axiosConfig!,
            i,
            onProgress,
            setFlist,
            successCallback,
            failCallback
          );
        }
      };
      setResCallback({restFn});
      if (showSlice) {
        setModalOpen(true);
        showModalToSlice(file, canvasRef, modalContent);
      } else {
        restFn(file);
      }
    });
  };
  const resolveBtnLoading = (flist: ProgressBar[]) => {
    return flist.some((f) => f.status === 'upload');
  };
  const handleClick = () => {
    inputRef.current?.click();
  };
  const onRemove = useCallback(
    (file: ProgressBar) => {
      if (customRemove) {
        customRemove(file, setFlist);
      } else {
        setFlist((prev) => {
          return prev.filter((f) => {
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
    },
    [onRemoveCallback, setFlist, customRemove]
  );
  const shouldShow = useMemo(() => {
    if (max !== undefined) {
      return flist.length < max;
    } else {
      return true;
    }
  }, [max, flist]);
  const showSlice = useMemo(() => {
    if (uploadMode === 'img' && !multiple) {
      return true;
    }
    return false;
  }, [multiple, uploadMode]);
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setMouseActive(true);
    setPosition({
      x: e.clientX - modalContent.left,
      y: e.clientY - modalContent.right,
    })
  };
  const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (mouseActive) {
      let dis = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      }
      const newModalContent = {
        ...modalContent,
        left: dis.x,
        right: dis.y,
      };
      setModalContent(newModalContent);
      canvasDraw(newModalContent, canvasRef.current!);
    }
  }
  const handleMouseUp = () => {
    setMouseActive(false);
  }
  const handleMouseLeave = () => {
    setMouseActive(false);
  };
  return (
    <div>
      <input
        ref={inputRef}
        type='file'
        onChange={handleChange}
        style={{display: 'none'}}
        value=''
        accept={accept}
        multiple={multiple}
      ></input>
      {uploadMode === 'default' && (
        <>
          {shouldShow && (
            <Button
              onClick={handleClick}
              isLoading={resolveBtnLoading(flist)}
              loadingText='上传中...'
            >
              upload
            </Button>
          )}
          <UploadList flist={flist} onRemove={onRemove} />
        </>
      )}
      {uploadMode === 'img' && (
        <>
          {shouldShow && (
            <ImgUpload onClick={handleClick}>
              <Icon icon='plus'></Icon>
            </ImgUpload>
          )}
          <ImageList flist={flist} onRemove={onRemove} setFlist={setFlist} />
        </>
      )}
      <Modal
        title='图片裁剪'
        callback={(v:boolean) => {
          if (v) {
            canvasRef.current?.toBlob(function (blob) {
              resCallback.restFn && resCallback.restFn(blob);
            })
          }
        }}
        maskClose={true}
        closeButton={false}
        confirm={true}
        visible={modalOpen}
        parentSetState={setModalOpen}
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <canvas
            width={300}
            height={300}
            style={{
              width: '100%',
              height: '100%',
              border: '1px dashed #ff4785',
            }}
            ref={canvasRef}
          >
            您的浏览器不支持canvas
          </canvas>
        </div>
        <div>
          <Button
            appearance='primary'
            style={btnStyle}
            onClick={() => {
              let newContent = {
                ...modalContent,
                times: modalContent.times + 0.1,
              };
              setModalContent(newContent);
              canvasDraw(newContent, canvasRef.current!);
            }}
          >
            <Icon icon='zoom' color={color.light}></Icon>
          </Button>
          <Button
            appearance='primary'
            style={btnStyle}
            onClick={() => {
              let newContent = {
                ...modalContent,
                times: modalContent.times - 0.1,
              };
              setModalContent(newContent);
              canvasDraw(newContent, canvasRef.current!);
            }}
          >
            <Icon icon='zoomout' color={color.light}></Icon>
          </Button>
          <Button
            appearance='primary'
            style={btnStyle}
            onClick={() => {
              let newContent = {
                ...modalContent,
                rotate: modalContent.rotate - 0.1,
              };
              setModalContent(newContent);
              canvasDraw(newContent, canvasRef.current!);
            }}
          >
            <Icon icon='undo' color={color.light}></Icon>
          </Button>
          <Button
            appearance='primary'
            style={rotateBtnStyle}
            onClick={() => {
              let newContent = {
                ...modalContent,
                rotate: modalContent.rotate + 0.1,
              };
              setModalContent(newContent);
              canvasDraw(newContent, canvasRef.current!);
            }}
          >
            <Icon icon='undo' color={color.light}></Icon>
          </Button>
          <Button
            appearance='primary'
            style={btnStyle}
            onClick={() => {
              let newContent = {
                ...modalContent,
                rotate: 0,
                times: 1,
                left: 0,
                right: 0,
              };
              setModalContent(newContent);
              canvasDraw(newContent, canvasRef.current!);
            }}
          >
            <Icon icon='zoomreset' color={color.light}></Icon>
          </Button>
        </div>
      </Modal>
    </div>
  );
}
Upload.defaultProps = {
  axiosConfig: {},
  uploadFilename: 'avatar',
  successCallback: () => message.success('上传成功！'),
  failCallback: () => message.error('上传失败！'),
  uploadMode: 'default',
};
