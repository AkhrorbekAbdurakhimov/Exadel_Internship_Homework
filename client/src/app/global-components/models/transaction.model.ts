import { Category } from "./category.model";

export class Transaction {
  constructor(
    public id: number,
    public title: string,
    public type: string,
    public amount: number,
    public date: Date,
    public categories: Category[],
    public currency: string,
    public description: string
  ) {}
}
