import { listAddedListener } from "./list-added.ts"

export const listListeners = {
  initListeners() {
    listAddedListener.initListener();
  }
};
