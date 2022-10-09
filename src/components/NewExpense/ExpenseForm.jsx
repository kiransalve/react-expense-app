import React, { useState } from 'react'
import "./ExpenseForm.css"

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredamount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState("");

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    const amountHandaler = (event) => {
        setEnteredAmount(event.target.value)
    }
    const dateHandaler = (event) => {
        setEnteredDate(event.target.value)
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const expenseData = {
            title: enteredTitle,
            amount: enteredamount,
            date: new Date(enteredDate)
        }

        props.onSaveExpenseData(expenseData) // send data to NewExpense component

        //console.log(expenseData)
        setEnteredTitle('')
        setEnteredAmount('')
        setEnteredDate('')
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className='new-expense__controls'>
                    <div className="new-expense__control">
                        <label htmlFor="Title" >
                            Title
                        </label>
                        <input type="text" onChange={titleChangeHandler} value={enteredTitle} />
                    </div>
                    <div className="new-expense__control">
                        <label htmlFor="Amount">
                            Amount
                        </label>
                        <input type="number" min="0.01" step="0.01" onChange={amountHandaler} value={enteredamount} />
                    </div>
                    <div className="new-expense__control">
                        <label htmlFor="Date">
                            Date
                        </label>
                        <input type="date" min="2019-01-1=01" max="2022-12-31"
                            onChange={dateHandaler} value={enteredDate} />
                    </div>
                </div>
                <div className='new-expense__actions'>
                    <button type='submit'>Add Expense</button>
                </div>
            </form>
        </>
    )
}

export default ExpenseForm