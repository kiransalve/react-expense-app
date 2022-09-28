import React from 'react';
import Card from "../UI/Card";
import ExpenseItem from '../Expense/ExpenseItem';
import "./Expenses.css"

const expense = [
    {
        title: "Car Insurance",
        amount: 254,
        date: new Date(2022, 5, 5),
        location: "Thane",
    },
    {
        title: "Glocery",
        amount: 500,
        date: new Date(2022, 6, 6),
        location: "Kalyan",
    },
    {
        title: "Shopping",
        amount: 100,
        date: new Date(2022, 7, 7),
        location: "Ghatkopar",
    },
    {
        title: "Bike Servicing",
        amount: 200,
        date: new Date(2022, 8, 8),
        location: "Thane",
    },
];

const Expenses = () => {
    return (
        <Card className="expenses">
            {
                expense.map((e) => {
                    return (
                        <ExpenseItem
                            title={e.title}
                            amount={e.amount}
                            date={e.date}
                            location={e.location}
                        />
                    );
                })
            }
        </Card>
    )
}

export default Expenses
