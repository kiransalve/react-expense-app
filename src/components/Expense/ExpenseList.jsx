import React from 'react'
import ExpenseItem from './ExpenseItem';
import "./ExpenseList.css"

const ExpenseList = (props) => {
    if (props.item.length === 0) {
        return <h2 className='expense_list_fallback'>
            Found No expense.
        </h2>
    }
    return (
        <ul className="expense_list">
            {props.item.map((expense) => {
               return <ExpenseItem
                    key={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date} />
            })}
        </ul>
    )
}

export default ExpenseList

