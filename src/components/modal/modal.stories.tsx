import React, { useState } from "react";
import Modal from "./index";
import Button from "../button";

export default {
title: "Modal",
component: Modal,
};

function KnobsModal() {
  const [state, setState] = useState(false);
  const title =  '标题';
  const child =  'sdsdsssda';
  const confirm = true;
  const okText = '';
  const cancelText = '';
  return (
    <div>
      <Modal
        refCallback={() => console.log('refCallback')}
        stopScroll={true}
        delay={200}
        closeButton={true}
        mask={true}
        maskClose={true}
        callback={() => console.log('callback')}
        cancelText={cancelText}
        okText={okText}
        confirm={confirm}
        title={title}
        parentSetState={setState}
        visible={state}
      >
        {child}
      </Modal>
      <Button onClick={() => setState(!state)}>toggle</Button>
    </div>
  );
}

export const knobsModal = () => <KnobsModal></KnobsModal>;