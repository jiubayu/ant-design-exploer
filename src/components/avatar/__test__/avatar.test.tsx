/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Avatar, AvatarSizes } from "../index";
import { color, typography } from "../../shared/styles";




describe("test Avatar component", () => {
  it("it should render default avatar", () => {
    let wrapper = render(<Avatar data-testid='avatar-div'></Avatar>);
    expect(wrapper).toMatchSnapshot();
    const div = wrapper.getByTestId('avatar-div');
    expect(div).toBeInTheDocument();
    const username = wrapper.getByText('1');
    expect(username).toBeTruthy();
  })
  it('it should render correct size', () => {
    let wrapper = render(<Avatar data-testid='avatar-div'></Avatar>);
    let div = wrapper.getByTestId('avatar-div');
    expect(div).toHaveStyle(`height:${AvatarSizes.medium}px`);
    expect(div).toHaveStyle(`width:${AvatarSizes.medium}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSizes.medium}px`);
    let username = div.firstChild;
    expect(username).toHaveStyle(`line-height:${AvatarSizes.medium}px`);
    cleanup();

    wrapper = render(<Avatar data-testid='avatar-div' size='large'></Avatar>);
    div = wrapper.getByTestId('avatar-div');
    expect(div).toHaveStyle(`height:${AvatarSizes.large}px`);
    expect(div).toHaveStyle(`width:${AvatarSizes.large}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSizes.large}px`);
    username = div.firstChild;
    expect(username).toHaveStyle(`line-height:${AvatarSizes.large}px`);
    cleanup();

    wrapper = render(<Avatar data-testid='avatar-div' size='small'></Avatar>);
    div = wrapper.getByTestId('avatar-div');
    expect(div).toHaveStyle(`height:${AvatarSizes.small}px`);
    expect(div).toHaveStyle(`width:${AvatarSizes.small}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSizes.small}px`);
    username = div.firstChild;
    expect(username).toHaveStyle(`line-height:${AvatarSizes.small}px`);
    cleanup();

    wrapper = render(<Avatar data-testid='avatar-div' size='tiny'></Avatar>);
    div = wrapper.getByTestId('avatar-div');
    expect(div).toHaveStyle(`height:${AvatarSizes.tiny}px`);
    expect(div).toHaveStyle(`width:${AvatarSizes.tiny}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSizes.tiny}px`);
    username = div.firstChild;
    expect(username).toHaveStyle(`line-height:${AvatarSizes.tiny}px`);
    cleanup();

    wrapper = render(<Avatar data-testid='avatar-div' size='medium'></Avatar>);
    div = wrapper.getByTestId('avatar-div');
    expect(div).toHaveStyle(`height:${AvatarSizes.medium}px`);
    expect(div).toHaveStyle(`width:${AvatarSizes.medium}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSizes.medium}px`);
    username = div.firstChild;
    expect(username).toHaveStyle(`line-height:${AvatarSizes.medium}px`);
  });

  it('should correct loading', () => {
    let wrapper = render(<Avatar data-testid='avatar-div' isLoading></Avatar>);
    expect(wrapper).toMatchSnapshot();
    let div = wrapper.getByTestId('avatar-div');
    let svg = div.firstChild;
    expect(svg).toBeVisible();
    cleanup();

    wrapper = render(
      <Avatar
        data-testid='avatar-div'
        isLoading
        username='123'
        src='/'
        size='tiny'
      ></Avatar>
    );
    div = wrapper.getByTestId('avatar-div');
    svg = div.firstChild;
    expect(svg).toBeVisible();
  });

  it('should correct img', () => {
    let wrapper = render(
      <Avatar data-testid='avatar-div' src='www.test.com'></Avatar>
    );
    let div = wrapper.getByTestId('avatar-div');
    let img: HTMLImageElement = div.firstChild as HTMLImageElement;
    expect(img?.tagName).toEqual('IMG');
    expect(img).toHaveStyle('width:100%');
    expect(img).toHaveAttribute('src', 'www.test.com');
    expect(img).toHaveAttribute('alt', 'loading');
    cleanup();

    wrapper = render(
      <Avatar
        data-testid='avatar-div'
        src='www.yehuozhili.xyz'
        username='yehuozhili'
      ></Avatar>
    );
    div = wrapper.getByTestId('avatar-div');
    img = div.firstChild as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'www.yehuozhili.xyz');
    expect(img).toHaveAttribute('alt', 'yehuozhili');
  });

  it('should render correct username', () => {
    let wrapper = render(
      <Avatar data-testid='avatar-div' username='yehuozhili'></Avatar>
    );
    expect(wrapper).toMatchSnapshot();
    let div = wrapper.getByTestId('avatar-div');
    expect(div).toHaveStyle('text-transform:uppercase');
    let username = wrapper.getByText('y');
    expect(username).toBeVisible();
    cleanup();

    wrapper = render(<Avatar username='中文汉字'></Avatar>);
    username = wrapper.getByText('中');
    expect(username).toBeTruthy();
  });
})