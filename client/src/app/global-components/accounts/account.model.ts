export class Account {
  constructor(
    public id: number,
    public title: string,
    public balance: number,
    public currency: string,
    public isSelected: boolean,
    public description: string,
  ) {}
}
