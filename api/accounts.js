/* eslint-disable */
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const pathFile = path.join(process.cwd(), 'database', 'accounts.json');

const getData = (filePath) => (fs.readFileSync(filePath, 'utf8') ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : []);

class Account {
  constructor({
    title, currency, description, userId,
  }) {
    this.title = title;
    this.currency = currency;
    this.description = description;
    this.userId = userId;
    this.created_date = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static async getAccounts() {
    return new Promise(async (resolve, reject) => {
      try {
        const accounts = getData(pathFile);
        resolve(accounts);
      } catch (err) {
        reject(err);
      }
    });
  }

  async addAccount() {
    const accounts = await Account.getAccounts();
    const account = {
      id: accounts.length ? accounts[accounts.length - 1].id + 1 : 1,
      title: this.title,
      currency: this.currency,
      userId: this.userId,
      description: this.description,
      created_date: this.created_date,
    };
    accounts.push(account);
    return new Promise(async (resolve, reject) => {
      try {
        fs.writeFileSync(pathFile, JSON.stringify(accounts, null, 4));
        resolve(account);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Account;
