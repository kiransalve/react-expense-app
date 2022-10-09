import React from 'react';
import ExpenseForm from './ExpenseForm';
import "./NewExpense.css";

const NewExpense = (props) => {
  const saveExpenseDataHandlar = (entereData) => {
    const expenseData = {
      ...entereData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData) // send data to App component
    //console.log(expenseData)
  }
  return (
    <div className='new-expense'>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandlar} />
    </div>
  )
}

export default NewExpense       