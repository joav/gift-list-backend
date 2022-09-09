export function listen<T>(event: string, callback: (e: CustomEvent<T>) => void) {
  addEventListener(event, (e) => {
    callback((e as CustomEvent<T>));
  });
}
