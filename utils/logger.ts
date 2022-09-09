import {
  green,
  cyan,
  red,
  yellow,
} from "https://deno.land/std@0.53.0/fmt/colors.ts";
import { format } from "https://deno.land/std@0.149.0/datetime/mod.ts";

enum Levels {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

const color = {
  [Levels.INFO]: cyan,
  [Levels.SUCCESS]: green,
  [Levels.WARN]: yellow,
  [Levels.ERROR]: red
};

const DEFAULT_CHANNEL = 'default';

export class Logger {
  constructor(private name: string) {}

  info(...args: unknown[]) {
    this.infoWithChannel(DEFAULT_CHANNEL, ...args);
  }

  infoWithChannel(channel: string, ...args: unknown[]) {
    this.log(Levels.INFO, channel, ...args);
  }

  success(...args: unknown[]) {
    this.successWithChannel(DEFAULT_CHANNEL, ...args);
  }

  successWithChannel(channel: string, ...args: unknown[]) {
    this.log(Levels.SUCCESS, channel, ...args);
  }

  warn(...args: unknown[]) {
    this.warnWithChannel(DEFAULT_CHANNEL, ...args);
  }

  warnWithChannel(channel: string, ...args: unknown[]) {
    this.log(Levels.WARN, channel, ...args);
  }

  error(...args: unknown[]) {
    this.errorWithChannel(DEFAULT_CHANNEL, ...args);
  }

  errorWithChannel(channel: string, ...args: unknown[]) {
    this.log(Levels.ERROR, channel, ...args);
  }

  log(level: Levels, channel: string, ...args: unknown[]) {
    if (args.length === 1 && typeof args[0] === 'string') console.log(color[level](`[${format(new Date(Date.now()), "MM-dd-yyyy hh:mm:ss.SSS")} ${this.name}::${channel}::${level}] ${args[0]}`));
    else console.log(color[level](`[${format(new Date(Date.now()), "MM-dd-yyyy hh:mm:ss.SSS")} ${this.name}::${channel}::${level}]`), ...args);
  }
} 
