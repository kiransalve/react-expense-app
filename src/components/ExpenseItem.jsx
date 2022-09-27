import React from 'react'
import "./ExpenseItem.css";
import Expensedate from './Expensedate';
import ExpenseDetails from './ExpenseDetails';

const ExpenseItem = (props) => {
    return (
        <div className='expense-item'>
            <Expensedate date={props.date} />
            <ExpenseDetails title={props.title} amount={props.amount} location={props.location} />
        </div >
    )
}

export default ExpenseItem;