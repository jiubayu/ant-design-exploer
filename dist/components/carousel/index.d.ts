/** @format */
import React, { PropsWithChildren } from 'react';
import { color } from '../shared/styles';
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
declare function Carousel(props: PropsWithChildren<CarouselProps>): React.JSX.Element;
declare namespace Carousel {
    var defaultProps: {
        defaultIndex: number;
        delay: number;
        height: number;
        autoplay: boolean;
        autoplayDelay: number;
        autoplayReverse: boolean;
    };
}
export default Carousel;
