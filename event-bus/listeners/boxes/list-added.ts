import { BoxListAdded, BOX_LIST_ADDED } from "../../events/index.ts";
import { BaseListener } from "../base-listener.ts";
import { listen } from "../listen.ts";
import { updateCounters } from "../../../repositories/box.ts";
import { getByCode as getList } from "../../../repositories/list.ts";
import { BoxCounters } from "../../../schemas/box.ts";
import { Logger } from "../../../utils/logger.ts";

const logger = new Logger('Box:listAddedListener');
export const listAddedListener: BaseListener = {
  initListener() {
    listen<BoxListAdded>(BOX_LIST_ADDED.event, async ({detail}) => {
      try {
        const list = await getList(detail.listCode);
  
        const counters: BoxCounters = {
          nLists: 1,
          nGifts: list?.items.length || 0
        };
        
        await updateCounters(detail.boxCode, counters);

        logger.success('Counters updated');
      } catch (error) {
        logger.error(error);
      }
    });
  }
};
