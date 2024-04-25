import React from "react";
import { Avatar, AvatarSizes } from "./index";

export default {
  title: "Avatar",
  component: Avatar,
};

type AvatarSizeType = keyof typeof AvatarSizes;

export const knobAvatar = () => (
  <Avatar 
    size="medium"
    username="yehuozhili"
    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    isLoading={true}
  />
)

export const large = () => (
  <div>
    <Avatar isLoading size='large' />
    <Avatar size='large' username='yehuozhili' />
    <Avatar
      size='large'
      username='yehuozhili'
      src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    />
  </div>
)

export const medium = () => (
  <div>
    <Avatar isLoading />
    <Avatar username='中文' />
    <Avatar
      username='yehuozhili'
      src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    />
  </div>
);

export const small = () => (
  <div>
    <Avatar isLoading size='small' />
    <Avatar size='small' username='yehuozhili' />
    <Avatar
      size='small'
      username='yehuozhili'
      src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    />
  </div>
);

export const tiny = () => (
  <div>
    <Avatar isLoading size='tiny' />
    <Avatar size='tiny' username='yehuozhili' />
    <Avatar
      size='tiny'
      username='yehuozhili'
      src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    />
  </div>
);