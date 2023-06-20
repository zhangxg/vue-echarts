// FIXME-xG@230620-1533:
/**
 * [import/export type]
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
 *
 * [an explanation](https://segmentfault.com/a/1190000039800522), but still not quite clear??
 */
import {
  init,
  type SetOptionOpts,
  type ECElementEvent,
  type ElementEvent
} from "echarts/core";

import type { Ref } from "vue";

export type Injection<T> = T | null | Ref<T | null> | { value: T | null };

type InitType = typeof init;
export type InitParameters = Parameters<InitType>;
export type Theme = NonNullable<InitParameters[1]>;
export type ThemeInjection = Injection<Theme>;
export type InitOptions = NonNullable<InitParameters[2]>;

export type InitOptionsInjection = Injection<InitOptions>;

export type UpdateOptions = SetOptionOpts;
export type UpdateOptionsInjection = Injection<UpdateOptions>;

export type EChartsType = ReturnType<InitType>;
type ZRenderType = ReturnType<EChartsType["getZr"]>;
export type EventTarget = EChartsType | ZRenderType;
type SetOptionType = EChartsType["setOption"];
export type Option = Parameters<SetOptionType>[0];

export type LoadingOptions = {
  text?: string;
  textColor?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontStyle?: string;
  fontFamily?: string;
  maskColor?: string;
  showSpinner?: boolean;
  color?: string;
  spinnerRadius?: number;
  lineWidth?: number;
  zlevel?: number;
};

// FIXME-xG@230620-1608:
/**
 * type-union
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
 */

type MouseEventName =
  | "click"
  | "dblclick"
  | "mouseout"
  | "mouseover"
  | "mouseup"
  | "mousedown"
  | "mousemove"
  | "contextmenu"
  | "globalout";

type ElementEventName =
  | MouseEventName
  | "mousewheel"
  | "drag"
  | "dragstart"
  | "dragend"
  | "dragenter"
  | "dragleave"
  | "dragover"
  | "drop";

type ZRenderEventName = `zr:${ElementEventName}`;

type OtherEventName =
  | "highlight"
  | "downplay"
  | "selectchanged"
  | "legendselectchanged"
  | "legendselected"
  | "legendunselected"
  | "legendselectall"
  | "legendinverseselect"
  | "legendscroll"
  | "datazoom"
  | "datarangeselected"
  | "graphroam"
  | "georoam"
  | "treeroam"
  | "timelinechanged"
  | "timelineplaychanged"
  | "restore"
  | "dataviewchanged"
  | "magictypechanged"
  | "geoselectchanged"
  | "geoselected"
  | "geounselected"
  | "axisareaselected"
  | "brush"
  | "brushEnd"
  | "brushselected"
  | "globalcursortaken";

// FIXME-xG@230620-1632:
/**
 * 'visual' this dynamically created types? how
 * interpretation:
 * 1. '[key in MouseEventName]' is the property
 * 2. '(params: ECElementEvent) => boolean;': is function signature
 * echarts api may give some clue.
 */
type MouseEmits = {
  [key in MouseEventName]: (params: ECElementEvent) => boolean;
};

type ZRenderEmits = {
  [key in ZRenderEventName]: (params: ElementEvent) => boolean;
};

type OtherEmits = {
  [key in OtherEventName]: null;
};

export type Emits = MouseEmits &
  OtherEmits & {
    rendered: (params: { elapsedTime: number }) => boolean;
    finished: () => boolean;
  } & ZRenderEmits;
