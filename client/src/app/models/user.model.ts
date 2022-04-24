export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public country: string,
    public currency: string,
  ) {}
}
