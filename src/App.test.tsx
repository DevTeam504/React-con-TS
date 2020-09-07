import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const dateFormat = /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{2}:\d{2}/;

beforeEach(() => {
  render(<App />);
})

test('should render initial balance $0', () => {
  screen.getByText('$0');
});

test('should deposit $amount on deposit', () => {
  deposit(1000);
  screen.getByText('$1000');
  userEvent.click(screen.getByText('Depositar'));
  screen.getByText('$2000');
});

test('should withdraw after deposit', () => {
  deposit(1000);
  deposit(5000);
  withdraw(100);
  withdraw(1);
  screen.getByText('$5899')
});

describe('Transactions', () => {
  test('render table without transactions', () => {
    screen.getByRole('table');
    const header = screen.getAllByRole('columnheader');
    
    expect(header).toHaveLength(3);
    const [ date, amount, type ] = header;
    expect(date).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
    expect(type).toBeInTheDocument();

    const data = screen.getByRole('cell');
    expect(data).toHaveTextContent('No hay datos');
  });

  test('show transaction on deposit', () => {
    deposit(100);
    const data = screen.getAllByRole('cell');
    expect(data).toHaveLength(3);
    const [ date, amount, type ] = data;
    expect(date).toHaveTextContent(dateFormat);
    expect(amount).toHaveTextContent('100');
    expect(type).toHaveTextContent('Deposito');
    userEvent.click(screen.getByText('Depositar'));
    expect(screen.getAllByRole('cell')).toHaveLength(6);
  });
  
  test('show transaction on withdraw', () => {
    const withdrawButton = screen.getByRole('withdraw');
    deposit(100);
    deposit(100);
    withdraw(33);
    const withdrawData = screen.getAllByRole('cell').slice(6);
    expect(withdrawData).toHaveLength(3);
    const [ date, amount, type ] = withdrawData;
    expect(date).toHaveTextContent(dateFormat);
    expect(amount).toHaveTextContent('33');
    expect(type).toHaveTextContent('Retiro');
  });
});
function deposit(amount: number) {
  const button = screen.getByText('Depositar');
  const amountInput = screen.getByPlaceholderText('Cantidad');
  userEvent.type(amountInput, amount.toString());
  userEvent.click(button);
}

function withdraw(amount: number) {
  const button = screen.getByRole('withdraw');
  const amountInput = screen.getByPlaceholderText('Cantidad');
  userEvent.type(amountInput, amount.toString());
  userEvent.click(button);
}

