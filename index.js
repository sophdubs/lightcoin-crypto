class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();
    if (this.isAllowed()) {
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

}



class Withdrawal extends Transaction{

  get value(){
    return -this.amount;
  }

  isAllowed() {
    if (this.account.balance + this.value < 0) {
      return false;
    }
    return true;
  }

}

class Deposit extends Transaction{

  get value(){
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
// console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
let result = t2.commit();
console.log('rejected withdrawal result:', result);
// console.log('Transaction 2:', t2);

// console.log('Balance:', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
let result2 = t3.commit();
console.log('deposit result:', result2);
// console.log('Transaction 3:', t3);

// console.log('Balance:', myAccount.balance);
t4 = new Withdrawal(100.00, myAccount);
let result3 = t4.commit();
console.log('approved withdrawal result:', result3);


console.log(myAccount.balance);

