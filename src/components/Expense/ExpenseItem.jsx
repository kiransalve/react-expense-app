import React from 'react'
import "./ExpenseItem.css";
import Expensedate from './Expensedate';
import ExpenseDetails from './ExpenseDetails';
import Card from '../UI/Card';

const ExpenseItem = (props) => {
    return (
        <Card className='expense-item'>
            <Expensedate date={props.date} />
            <ExpenseDetails title={props.title} amount={props.amount} />
        </Card>
    )
}

export default ExpenseItem;