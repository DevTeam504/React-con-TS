import React from 'react';


type transactionTypes = 'WITHDRAW' | 'DEPOSIT'

export interface Transaction {
  date: Date
  amount: number,
  type: transactionTypes
  description?: string
}

type TransactionTableProps = {
    transactions: Transaction[]
}

export default function TransactionTable(props: TransactionTableProps) {
    const { transactions } = props;
    const transactionElements = transactions.map(({ amount, date, type, description }, idx) => {
        return <tr key={idx}>
          <td>{date.toLocaleString()}</td>
          <td>{amount}</td>
          <td>{type === 'DEPOSIT' ? 'Deposito': 'Retiro'}</td>
          <td>{description}</td>
        </tr>
      })
    return <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>
          Fecha
        </th>
        <th>
          Cantidad
        </th>
        <th>
          Tipo
        </th>
      </tr>
    </thead>
    <tbody>
      {transactionElements.length > 0 ?
        transactionElements :
        <tr>
          <td className="align-center" colSpan={3}>
            No hay datos.
          </td>
        </tr>
      }
      
    </tbody>
  </table>
}
