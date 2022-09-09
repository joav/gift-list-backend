export interface BaseEvent<T> {
  event: string;
  dispatch(detail: T): void;
}
