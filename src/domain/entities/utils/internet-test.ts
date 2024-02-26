export class InternetTest {
  public downloadSpeed: number;
  public uploadSpeed: number;

  constructor(data: InternetTest) {
    Object.assign(this, data);
  }
}
