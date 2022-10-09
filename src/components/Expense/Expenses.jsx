import React, { useState } from 'react';
import Card from "../UI/Card";
import "./Expenses.css"
import ExpensesFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2020')
    const filterChangeHandlar = (selectedYear) => {
        setFilteredYear(selectedYear)
    }

    const filteredExpense = props.item.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear;
    })

    return (
        
            <Card className="expenses">
                <ExpensesFilter onChangeFilter={filterChangeHandlar} selected={filteredYear} />
                <ExpenseList item={filteredExpense} />
            </Card>
        
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