import React, { useState } from 'react';
import Card from "../UI/Card";
import ExpenseItem from '../Expense/ExpenseItem';
import "./Expenses.css"
import ExpensesFilter from './ExpenseFilter';

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2020')
    const filterChangeHandlar = (selectedYear) => {
        setFilteredYear(selectedYear)
    }
    const filteredExpense = props.item.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear;
    })
    let filterData = <p>No Expense Here...</p>
    if (props.item.length === 1) {
        filterData = <p>Only single Expense here. Please add more...</p>
    }

    if (filteredExpense.length > 0) {
        filterData = filteredExpense.map((expense) =>
            <ExpenseItem
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={expense.date} />
        )
    }
    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter onChangeFilter={filterChangeHandlar} selected={filteredYear} />
                {filterData}
            </Card>
        </div>
    )
}

export default Expenses


// Using Javascript Ternary operator //
// {
//     filteredExpense.length === 0 ? <p>No Expense for this Year</p> : filteredExpense.map((expense) =>
//         <ExpenseItem
//             key={expense.id}
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date} />
//     )
// }


// Using &&
// { filteredExpense.length === 0 && <p>No Expense for this Year</p> }
// {
//     filteredExpense.length > 0 && filteredExpense.map((expense) =>
//         <ExpenseItem
//             key={expense.id}
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date} />
//     )
// }