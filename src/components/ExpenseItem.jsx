import React from 'react'
import "./ExpenseItem.css"

const ExpenseItem = () => {
    const expenseDate = new Date(2022, 9, 27)
    const expenseTitle = "Car Insurance";
    const expenseAmount = 294.67
    const locationOfExpenditure = "Kalyan"
    return (
        <div className="main_div">

            <div className='expense-item'>
                <div><h2>{expenseDate.toISOString()}</h2></div>
                <div className="expense-item-description">
                    <h2>{expenseTitle}</h2>
                    <h2>{locationOfExpenditure}</h2>
                    <div className="expense-price">$ {expenseAmount}</div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseItem;