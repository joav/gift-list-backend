import { listAddedListener } from "./list-added.ts"

export const boxListeners = {
  initListeners() {
    listAddedListener.initListener();
  }
};
