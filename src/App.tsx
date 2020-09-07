import React, { useState } from 'react';
import './App.css';
import TransactionTable, { Transaction } from './TransactionTable/TransactionTable';

function App() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <section className="section">
      <div className="container">
        <h1 className="title" > React con Typescript </h1>
        <p>${balance}</p>

        <input type="text" placeholder="Cantidad" onChange={(event) => {
          setAmount(Number(event.target.value));
        }}/>

        <button className="button is-success" onClick={ () => {
          setBalance(balance + amount);
          setTransactions([...transactions, {
            amount: amount,
            date: new Date(),
            type: 'DEPOSIT',
          }]);
        }}>
          Depositar
        </button>
        <button role="withdraw" className="button is-danger" onClick={ () => {
          setBalance(balance - amount)
          setTransactions([...transactions, {
            amount: amount,
            date: new Date(),
            type: 'WITHDRAW',
          }]);
        }}>
          Retirar
        </button>
        <TransactionTable transactions={transactions} />
      </div>
    </section>
  );
}

export default App;
