import React, { useState } from "react";
import Message,{ MessageType, createMessage, message } from "./index";
import Button from "../button";
import Icon from "../icon";

export default {
title: "Message",
component: Message,
};

const Options: MessageType[] = [
  'info',
  'success',
  'error',
  'warning',
  'loading',
  'default',
];

export const knobsMessage = () => {
  const [option, setOption] = useState<MessageType>('default');
  	const op = {
      delay: 2000,
      animationDuring: 300,
      background: '#fff',
      color: '#333',
    };
  const ms = 'hello message';
  const onClick = ()  => message[option](ms, op);
  return (
    <div>
      <select onChange={(e) => setOption(e.target.value as MessageType)}>
        {Options.map((o) => (
          <option value={o}>{o}</option>
        ))}
      </select>
      <Button onClick={onClick}>click</Button>
    </div>
  );
};

export const callbackTest = () => (
  <div>
    <Button
      onClick={() =>
        message.loading('加载中', {
          callback: () => message.success('加载完成'),
        })
      }
    >
      callback
    </Button>
  </div>
);

export const withIcon = () => (
  <div>
    <Button
      onClick={() =>
        message.default(
          <span>
            <Icon icon='admin'></Icon>111
          </span>
        )
      }
    >
      callback
    </Button>
  </div>
);