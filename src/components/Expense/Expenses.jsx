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
    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter onChangeFilter={filterChangeHandlar} selected={filteredYear} />
                {filteredExpense.map((expense) =>
                    <ExpenseItem
                        key={expense.id}
                        title={expense.title}
                        amount={expense.amount}
                        date={expense.date} />
                )}
            </Card>
        </div>
    )
}

export default Expenses
