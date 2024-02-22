export interface IHttpContext {
  getRequest(): any;
  sendResponse(status: number, data: any): void;
}
