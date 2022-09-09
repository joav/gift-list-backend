import { boxListeners, listListeners } from "./listeners/index.ts";

export const eventBus = {
  initListeners() {
    boxListeners.initListeners();
    listListeners.initListeners();
  }
}
