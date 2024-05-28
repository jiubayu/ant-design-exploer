import React, { PropsWithChildren } from 'react';
import { AxiosRequestConfig, CancelTokenSource } from 'axios';
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
export declare const updateFilist: (setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>, _file: ProgressBar, uploadPartial: Partial<ProgressBar>) => void;
type onProgressType = ((p: number, f: File, i: number) => void) | undefined;
type UploadMode = 'default' | 'img';
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
    customRemove?: (file: ProgressBar, setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>) => void;
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
export declare const IconSpin: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, never>> & string;
interface ImgListProps extends UploadListProps {
    setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>;
}
export declare function ImageList(props: ImgListProps): React.JSX.Element;
declare function Upload(props: PropsWithChildren<UploadProps>): React.JSX.Element;
declare namespace Upload {
    var defaultProps: {
        axiosConfig: {};
        uploadFilename: string;
        successCallback: () => void;
        failCallback: () => void;
        uploadMode: string;
    };
}
export default Upload;
