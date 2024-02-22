import { Request, Response} from 'express';
import { IHttpContext } from '@/domain/services-interfaces/http/http-context.interface';

export class ExpressAdapter implements IHttpContext {
  constructor(
    private request: Request,
    private response: Response
  ) {}

  public getRequest(): Request {
    return this.request;
  }

  public sendResponse(status: number, data: any): void {
    this.response.status(status).json(data);
  }
}
