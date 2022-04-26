export class Subscription {
  constructor(
    public id: number,
    public title: string,
    public categories: string[],
    public amount: number,
    public description: string,
    public initialDate: string,
    public lastDate: string,
    public currency: string
  ) {}
}
