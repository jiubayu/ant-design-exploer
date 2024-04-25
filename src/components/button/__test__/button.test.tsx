/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, cleanup, fireEvent } from '@testing-library/react';
import Button, {ButtonProps, btnPadding} from "..";
import { color,typography } from "../../shared/styles";
import '@testing-library/jest-dom';
import initStoryshots from '@storybook/addon-storyshots';

// initStoryshots();

const defaultProps = {
  onClick: jest.fn(),
  className: 'testprops',
};
const testProps: ButtonProps = {
  appearance: 'primary',
  size: 'small',
  className: 'testprops',
};
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Btton component', () => {
  it('should render the correct default button', () => {
    const view = render(<Button {...defaultProps}>hello</Button>);
    const ele = view.queryByTestId('button');
    expect(ele).toBeInTheDocument();
    // 正确渲染文本
    const text = view.queryByText('hello');
    expect(text).toBeTruthy();
    // button标签
    expect(ele?.tagName).toEqual('BUTTON');
    expect(ele).not.toHaveAttribute('disabled');
    expect(ele).not.toHaveAttribute('isLinked');
    // 正常添加className
    expect(ele?.getAttribute('class')?.split(' ').includes('testprops')).toEqual(true);
    // 正常click
    fireEvent.click(ele as Element);
    expect(defaultProps.onClick).toHaveBeenCalled();
    // span正常显示
    // eslint-disable-next-line testing-library/no-node-access
    expect(ele?.getElementsByTagName('span')).toBeTruthy();
    // 正常默认样式
    expect(ele).toHaveStyle(`background: rgb(208, 208, 208)`);
    expect(ele).toHaveStyle(`color: ${color.darkest}`);
    // 正常大小
    expect(ele).toHaveStyle(`padding: ${btnPadding.medium}`);
    expect(ele).toHaveStyle(`font-size:${typography.size.s2}px`);
  })
  it('should render correct appearance ', () => {
    let view = render(<Button {...testProps}>hello</Button>);
    let ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`background: rgb(255, 45, 116)}`);
    expect(ele).toHaveStyle(`color: ${color.lightest}`);
    cleanup();
    view = render(<Button appearance='inverseOutline'>hello</Button>);
    ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`box-shadow: ${color.lightest} 0 0 0 1px inset`);
    expect(ele).toHaveStyle(`color: rgb(51, 51, 51)`);
    cleanup();
    view = render(<Button appearance='inversePrimary'>hello</Button>);
    ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`background:${color.lightest}`);
    expect(ele).toHaveStyle(`color: ${color.primary}`);
    cleanup();
    view = render(<Button appearance='inverseSecondary'>hello</Button>);
    ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`background: rgb(255, 255, 255)`);
    expect(ele).toHaveStyle(`color: ${color.secondary}`);
    cleanup();
    view = render(<Button appearance='outline'>hello</Button>);
    ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`background:rgba(0, 0, 0, 0.15)`);
    expect(ele).toHaveStyle(`color: rgb(51, 51, 51)`);
    cleanup();
    view = render(<Button appearance='primaryOutline'>hello</Button>);
    ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`box-shadow: ${color.primary} 0 0 0 1px inset`);
    expect(ele).toHaveStyle(`color: rgb(255, 255, 255)`);
    cleanup();
    view = render(<Button appearance='secondary'>hello</Button>);
    ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`background: rgb(5, 157, 253)`);
    expect(ele).toHaveStyle(`color: ${color.lightest}`);
    cleanup();
    view = render(<Button appearance='secondaryOutline'>hello</Button>);
    ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`box-shadow: ${color.secondary} 0 0 0 1px inset`);
    expect(ele).toHaveStyle(`color: rgb(255, 255, 255)`);

    expect(ele).toMatchSnapshot();
  });
  it('should render correct size ', () => {
    let view = render(<Button {...testProps}>hello</Button>);
    const ele = view.getByTestId('button');
    expect(ele).toHaveStyle(`padding: ${btnPadding.small}`);
    expect(ele).toHaveStyle(`font-size:${typography.size.s1}px`);
  });
  it('should render a link', () => {
    const view = render(
      <Button isLink href='/'>
        linkbutton
      </Button>
    );
    const ele = view.getByTestId('button');
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('A');
    expect(ele).toHaveAttribute('href', '/');
  });
  it('should render disabled ', () => {
    const view = render(<Button {...disabledProps}>hello</Button>);
    const ele = view.getByTestId('button');
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveStyle('cursor: not-allowed');
    fireEvent.click(ele);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
  it('should render loading ', () => {
    const view = render(<Button isLoading>hello</Button>);
    const ele = view.getByTestId('button');
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveStyle('cursor: progress');
    const text = view.getByText('hello');
    expect(text).toHaveStyle('opacity: 0');
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const view2 = render(
      <Button isLoading loadingText='yehuozhili'>
        hello
      </Button>
    );
    const text2 = view2.getByText('yehuozhili');
    expect(text2).toBeTruthy();
  });
  it('should isUnclickable ', () => {
    const view = render(<Button isUnclickable>hello</Button>);
    const ele = view.getByTestId('button');
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveStyle('pointer-events: none');
    fireEvent.click(ele);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
})