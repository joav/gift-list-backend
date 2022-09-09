import { BoxListAdded, BOX_LIST_ADDED } from "../../events/index.ts";
import { BaseListener } from "../base-listener.ts";
import { listen } from "../listen.ts";
import { updateCounters } from "../../../repositories/list.ts";
import { Logger } from "../../../utils/logger.ts";
import { ListCounters } from "../../../schemas/list.ts";

const logger = new Logger('List:listAddedListener');
export const listAddedListener: BaseListener = {
  initListener() {
    listen<BoxListAdded>(BOX_LIST_ADDED.event, async ({detail}) => {
      try {
        const counters: ListCounters = {
          nBoxes: 1,
          nGifts: 0
        };
        
        await updateCounters(detail.listCode, counters);

        logger.success('Counters updated');
      } catch (error) {
        logger.error(error);
      }
    });
  }
};
