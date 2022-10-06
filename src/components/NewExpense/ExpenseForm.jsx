import React, { useState } from 'react'
import "./ExpenseForm.css"

const ExpenseForm = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredamount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState("");
    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     amount: '',
    //     date: ''
    // })

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        // setUserInput({ ...userInput, enteredTitle: event.target.value })
        // // if state is depend on previous state then use function form
        // setUserInput((prevState) => {
        //     return { ...prevState, enteredTitle: event.target.value }
        // })
    }

    const amountHandaler = (event) => {
        setEnteredAmount(event.target.value)
        // setUserInput({ ...userInput, amount: event.target.value })

    }
    const dateHandaler = (event) => {
        setEnteredDate(event.target.value)
        // setUserInput({ ...userInput, date: event.target.value })
    }
    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredamount,
            date: new Date(enteredDate)
        }
        console.log(expenseData);
    }
    return (
        <>
            <form onSubmit={submitHandler}>
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
                        <input type="date" min="2019-01-1=01" max="2022-12-31"
                            onChange={dateHandaler} />
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