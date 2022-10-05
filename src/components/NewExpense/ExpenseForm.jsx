import React, { useState } from 'react'
import "./ExpenseForm.css"

const ExpenseForm = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState("");

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }

    const amountHandaler = (event) => {
        setAmount(event.target.value)
    }
    const dateHandaler = (event) => {
        setDate(event.target.value)
    }
    return (
        <>
            <form>
                <div className='new-expense__controls'>
                    <div className="new-expense__control">
                        <label htmlFor="Title" >
                            Title
                        </label>
                        <input type="text" onChange={titleChangeHandler} />
                    </div>
                    <div className="new-expense__control">
                        <label htmlFor="Amount">
                            Amount
                        </label>
                        <input type="number" min="0.01" step="0.01" onChange={amountHandaler} />
                    </div>
                    <div className="new-expense__control">
                        <label htmlFor="Date">
                            Date
                        </label>
                        <input type="date" min="2019-01-1=01" max="2022-12-31" />
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