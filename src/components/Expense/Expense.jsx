import React, { useCallback, useEffect, useState } from "react";
import "./Expense.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../store/ExpenseReducer";
import { toggledarkMode } from "../../store/ThemeReducer";

const Expense = () => {
    const [money, setMoney] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expenses, setExpenses] = useState({});
    const [expenseId, setExpenseId] = useState("");
    const [totalExpenses, setTotalExpenses] = useState(0);

    const downloadExpensesAsCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," + [
            ["Amount", "Description", "Category"], // header row
            ...Object.values(expenses).map((expense) => [
                expense.amount,
                expense.description,
                expense.category,
            ]), // expense row
        ]
            .map((row) => row.join(",")) // convert each row array to CSV string
            .join("\n"); // join new row 

        const encodedUri = encodeURI(csvContent);

        const link = document.createElement("a"); // create a element
        link.setAttribute("href", encodedUri); // pass data to href
        link.setAttribute("download", "expenses.csv"); // sets name of file
        document.body.appendChild(link); // this appends a element as child in body
        link.click(); // automatically click the a element, to start download
        document.body.removeChild(link); // this remove a
    };

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode)
    const emailID = user.email.replace(/[@.]/g, "");

    const handleActivatePremium = () => {
        dispatch(toggledarkMode());
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Create a new expense object
        const newExpense = {
            amount: money,
            description: description,
            category: category,
        };

        if (expenseId) {
            const request = await fetch(
                `https://expensetracker-8bbb8-default-rtdb.firebaseio.com/expense${emailID}/${expenseId}.json`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newExpense),
                }
            );
            const response = await request.json();
            setExpenseId("");
            dispatch(addExpense(newExpense));
        }
        if (expenseId === "") {
            const request = await fetch(
                `https://expensetracker-8bbb8-default-rtdb.firebaseio.com/expense${emailID}.json`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newExpense),
                }
            );
            const response = await request.json();
            dispatch(addExpense(newExpense));
        }

        // Clear the input fields
        setMoney("");
        setDescription("");
        setCategory("");
    };

    const handleUpdateExpense = async (id) => {
        setExpenseId(id);
        try {
            const request = await fetch(
                `https://expensetracker-8bbb8-default-rtdb.firebaseio.com/expense${emailID}/${id}.json`,
                {
                    method: "GET",
                }
            );
            const response = await request.json();

            setMoney(response.amount);
            setDescription(response.description);
            setCategory(response.category);
        } catch (error) {
            console.error(error)
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            const request = await fetch(
                `https://expensetracker-8bbb8-default-rtdb.firebaseio.com/expense${emailID}/${id}.json`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            getExpense();
        } catch (err) {
            console.error(err);
        }
    };

    const getExpense = useCallback(async () => {
        if (emailID) {
            try {
                const response = await fetch(
                    `https://expensetracker-8bbb8-default-rtdb.firebaseio.com/expense${emailID}.json`
                );
                const data = await response.json();
                setExpenses(data || {});

            } catch (error) {
                console.error(error);
            }
            const expenseCal = Object.values(expenses).reduce(
                (total, expense) => total + Number(expense.amount),
                0
            );
            setTotalExpenses(expenseCal)
        }
    }, [expenses, emailID])


    useEffect(() => {
        getExpense();
    }, [money, description, category, getExpense]);



    useEffect(() => {
        if (isDarkMode) {
            // Apply dark theme styles
            document.body.classList.add("dark-theme");
        } else {
            // Remove dark theme styles
            document.body.classList.remove("dark-theme");
        }

    }, [isDarkMode]);



    return (
        <div className={`expense ${isDarkMode ? "dark" : ""}`}>
            <h3>Welcome to Expense Tracker App!</h3>
            <p className="expense-subtitle">Here you can track your expenses.</p>
            <div className="message-container">
                <div className="message">
                    Your profile is incomplete,
                    <Link className="userProfile-link" to="/userProfile">
                        Complete Profile
                    </Link>
                </div>
            </div>
            <div className="expense-form-container">
                <div className="expense-form">
                    <h2>Add Expense</h2>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="number"
                            id="money"
                            value={money}
                            onChange={(e) => setMoney(e.target.value)}
                            required
                            placeholder="Money:"
                        />

                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />

                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                            {/* Add more options as needed */}
                        </select>

                        <button type="submit">Add Expense</button>
                    </form>
                </div>
            </div>
            <div className="expense-list">
                <h2>Expenses List</h2>
                {expenses && Object.entries(expenses).length > 0 ? (
                    <ul>
                        {Object.entries(expenses).map(([key, expense]) => (
                            <li key={key}>
                                <div>Amount: {expense.amount}</div>
                                <div>Description: {expense.description}</div>
                                <div>Category: {expense.category}</div>
                                <button
                                    className="update"
                                    onClick={() => handleUpdateExpense(key)}
                                >
                                    Update
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => handleDeleteExpense(key)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No expenses added yet.</p>
                )}
            </div>
            {totalExpenses > 10000 && (
                <>
                    <button className="activate-premium" onClick={handleActivatePremium}>Activate Premium</button>
                    <button className="downloadCSV" onClick={downloadExpensesAsCSV}>Download Expenses</button></>
            )}
        </div>
    );
};

export default Expense;
