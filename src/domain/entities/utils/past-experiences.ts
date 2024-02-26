export class PastExperiences {
  public sales: boolean;
  public support: boolean;

  constructor(data: PastExperiences) {
    Object.assign(this, data);
  }
}
