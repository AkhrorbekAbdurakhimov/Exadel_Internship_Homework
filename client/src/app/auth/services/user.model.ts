export class User {
  constructor(
    public id: number,
    public email: string,
    public first_name: string,
    public last_name: string,
    public date_of_birth: Date,
    public country_id: number,
    public currency_id: number,
  ) {}
}
