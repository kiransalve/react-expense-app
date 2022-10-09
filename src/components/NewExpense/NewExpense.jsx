import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEdited, setIsEdited] = useState(false)

  const startIsEditedHandlar = () => {
    setIsEdited(true)
  }
  const stopIsEditedHandlar = () => {
    setIsEdited(false)
  }

  const saveExpenseDataHandlar = (entereData) => {
    const expenseData = {
      ...entereData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData) // send data to App component
    setIsEdited(false)
  }

  return (
    <div className='new-expense'>

      {!isEdited && <button onClick={startIsEditedHandlar}>Add New Expense</button>}
      {isEdited && <ExpenseForm onSaveExpenseData={saveExpenseDataHandlar}
        onCancal={stopIsEditedHandlar} />}
    </div>
  )
}

export default NewExpense       