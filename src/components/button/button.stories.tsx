import React from "react";
import { action } from '@storybook/addon-actions';
import Button, { APPEARANCES, AppearanceTypes, SIZES, SizeTypes } from ".";
// import {withKnobs, text, boolean, select} from '@storybook/addon-knobs';

export default {
  title: 'Button',
  component: Button,
}

export const KnobsBtn = () => (
  <Button
    size={SIZES.medium}
    href={ ''}
    isLink={false}
    loadingText={'I AM LOADING'}
    isLoading={false}
    disabled={false}
    appearance={
      APPEARANCES.primary}
  >
    'Hello Storybook'
  </Button>
);

export const buttons = () => (
  <>
    <Button appearance='primary'>Primary</Button>
    <Button appearance='secondary'>Secondary</Button>
    <Button appearance='tertiary'>Tertiary</Button>
    <Button appearance='outline'>Outline</Button>
    <Button appearance='primaryOutline'>Outline primary</Button>
    <Button appearance='secondaryOutline'>Outline secondary</Button>
    <div style={{ background: 'grey', display: 'inline-block' }}>
      <Button appearance='inversePrimary'>Primary inverse</Button>
    </div>
    <div style={{ background: 'grey', display: 'inline-block' }}>
      <Button appearance='inverseSecondary'>Secondary inverse</Button>
    </div>
    <div style={{ background: 'grey', display: 'inline-block' }}>
      <Button appearance='inverseOutline'>Outline inverse</Button>
    </div>
  </>
);

export const sizes = () => (
  <>
    <Button appearance='primary'>Default</Button>
    <Button appearance='primary' size='small'>
      Small
    </Button>
  </>
);

export const loading = () => (
  <>
    <Button appearance='primary' isLoading>
      Primary
    </Button>
    <Button appearance='secondary' isLoading>
      Secondary
    </Button>
    <Button appearance='tertiary' isLoading>
      Tertiary
    </Button>
    <Button appearance='outline' isLoading>
      Outline
    </Button>
    <Button appearance='outline' isLoading loadingText='Custom...'>
      Outline
    </Button>
  </>
);

export const disabled = () => (
  <>
    <Button appearance='primary' disabled>
      Primary
    </Button>
    <Button appearance='secondary' disabled>
      Secondary
    </Button>
    <Button appearance='tertiary' disabled>
      Tertiary
    </Button>
    <Button appearance='outline' disabled>
      Outline
    </Button>
  </>
);

export const link = () => (
  <>
    <Button appearance='primary' isLink href='/'>
      Primary
    </Button>
    <Button appearance='secondary' isLink href='/'>
      Secondary
    </Button>
    <Button appearance='tertiary' isLink href='/'>
      Tertiary
    </Button>
    <Button appearance='outline' isLink href='/'>
      Outline
    </Button>
  </>
);
