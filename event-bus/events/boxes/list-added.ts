import { BaseEvent } from "../base-event.ts";
import { PREFFIX } from "./prefix.ts";

export type BoxListAdded = {
  boxCode: string;
  listCode: string;
};

const event = `${PREFFIX}:list-added`;
const dispatch = (detail: BoxListAdded) => {
  const e = new CustomEvent(event, {
    detail
  });
  dispatchEvent(e);
};

export const BOX_LIST_ADDED: BaseEvent<BoxListAdded> = {
  event,
  dispatch
}
