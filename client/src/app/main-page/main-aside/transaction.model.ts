export class Transaction {
  constructor(
    public id: number,
    public title: string,
    public type: string,
    public amount: number,
    public date: Date,
    public categoryname: string,
    public currency: string,
  ) {}
}
