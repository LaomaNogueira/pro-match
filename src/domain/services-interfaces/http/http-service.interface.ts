export interface IHttpService<T, U, V> {
  get(url: string, config?: U): Promise<V>;
  put(url: string, payload: T, config?: U): Promise<V>;
  patch(url: string, payload: T, config?: U): Promise<V>;
  post(url: string, payload: T, config?: U): Promise<V>;
  delete(url: string, config?: U): Promise<V>;
}
