import React, { useEffect, useState } from "react";
import "./Expense.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggledarkMode } from "../../store/ThemeReducer";
import {
  downloadExpensesAsCSV,
  calculateTotalExpense,
  createExpense,
  updateExpense,
  calculateTotalSalary,
} from "./helper/index";

const Expense = () => {
  const dispatch = useDispatch();

  // user input fields values
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // expense object coming from firebase
  const [expenses, setExpenses] = useState({});

  // expense id for updating existing expense
  const [expenseId, setExpenseId] = useState("");

  // user details for user email to save expense data to specific user
  const user = JSON.parse(localStorage.getItem("user"));

  // to convert kiran@gmail.com ===> kirangmailcom
  const emailID = user?.email?.replace(/[@.]/g, "");

  // coming from user profile and saved in redux
  const isEmailVerified = useSelector((state) => state.auth.emailverified);

  // if expense is more than 10000 then apply darkmode coming from redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // isDarkMode is boolean and changes true and false on each click
  const handleActivatePremium = () => {
    dispatch(toggledarkMode());
  };

  // calls when add button clicked
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Create a new expense object and updated with useState
    const newExpense = {
      amount: parseFloat(money),
      description: description,
      category: category,
    };

    // to update expense
    if (expenseId) {
      await updateExpense(expenseId, newExpense, emailID, dispatch, getExpense);
      setExpenseId("");
    }
    // to add new expense
    if (expenseId === "") {
      await createExpense(newExpense, emailID, dispatch, getExpense);
      setExpenseId("");
    }

    // getExpense fetches data that updated or created
    getExpense();

    // Clear the input fields after expense updated or created
    setMoney("");
    setDescription("");
    setCategory("");

  };

  // In expense row action to update data,
  // this sends the clicked expense id and fill input with that perticular data
  const handleUpdateExpense = async (id) => {
    // update expenseID
    setExpenseId(id);
    try {
      // send request to get clicked expense data only
      const request = await fetch(
        `https://expense-tracker-6b356-default-rtdb.firebaseio.com/expense${emailID}/${id}.json`,
        {
          method: "GET",
        }
      );

      const response = await request.json();
      // fill response data to input field to edit
      setMoney(response.amount);
      setDescription(response.description);
      setCategory(response.category);
    } catch (error) {
      console.error(error);
    }
  };

  // to delete specific expense
  const handleDeleteExpense = async (id) => {
    try {
      // send id of clicked data to delete
      const request = await fetch(
        `https://expense-tracker-6b356-default-rtdb.firebaseio.com/expense${emailID}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // get other data after deleted
      getExpense();
    } catch (err) {
      console.error(err);
    }
  };

  // to fetch data from firebase realtime database by rest api in object form like below
  // -NYazbBapRQXDiULCA4S:{amount: '190', category: 'Food', description: 'abc'}
  // -NYazdCqq68YuJcG7zId:{amount: '789', category: 'Salary', description: 'xyz'}
  const getExpense = async () => {
    if (emailID) {
      try {
        const response = await fetch(
          `https://expense-tracker-6b356-default-rtdb.firebaseio.com/expense${emailID}.json`
        );
        const data = await response.json();
        setExpenses(data || {});
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [totalExpenses, setTotalExpenses] = useState(0); // To calculate users total expense
  const [totalSalary, setTotalSalary] = useState(0); // To calculate users total salary
  const [inHandNow, setInHandNow] = useState(0); // To calculate users difference of expense and salary

  useEffect(() => {
    // function to get total expense and salary
    const myExpenses = calculateTotalExpense(expenses);
    const mySalary = calculateTotalSalary(expenses);

    // update useState values with calculated value of above two functions
    setTotalExpenses(myExpenses);
    setTotalSalary(mySalary);

    const inhand = mySalary - myExpenses; // get difference
    setInHandNow(inhand); // update net value
  }, [expenses]); // when firebase data changes then call

  useEffect(() => {
    getExpense(); // calling getExpense every time when emailID changes means user logged in
  }, [emailID]);

  useEffect(() => {
    if (isDarkMode) {
      // Apply dark theme
      document.body.classList.add("dark-theme");
    } else {
      // Remove dark theme
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);



  return (
    <div className={`expense ${isDarkMode ? "dark" : ""}`}>
      <div className="expense-title">Welcome to Expense Tracker App!</div>
      <p className="expense-subtitle">Here you can track your expenses.</p>
      <div className="message-container">
        {isEmailVerified ? (
          <div className="complete ">
            Your profile is completed,
            <Link className="userProfile-link" to="/userProfile">
              {" "}
              My Profile
            </Link>
          </div>
        ) : (
          <div className="incomplete">
            Your profile is incomplete,
            <Link className="userProfile-link" to="/userProfile">
              Complete Profile
            </Link>
          </div>
        )}
      </div>

      {/* Expense Form */}
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
            </select>
            <button type="submit">Add Expense</button>
          </form>
        </div>
      </div>

      {/* Expense List */}
      <div className="expense-list">
        <h2>Expenses List</h2>
        <div className="totalsContainer">

          <p className="totalSalary">
            Total Salary :{" "}
            <span className="green"> Rs. {totalSalary.toLocaleString()}</span>
          </p>


          <p className="inHandNow">
            Total Net :{" "}
            <span
              style={{
                color: totalExpenses > totalSalary ? "red" : "green",
              }}
            >
              Rs. {inHandNow.toLocaleString()}
            </span>
          </p>

          <p className="totalExpense">
            Total Expense:{" "}
            <span className="red">Rs. {totalExpenses.toLocaleString()}</span>
          </p>

        </div>

        {expenses && Object.entries(expenses).length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description </th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(expenses).map(([key, expense]) => (
                <tr key={key}>
                  {expense.category === "Salary" && (
                    <>
                      <td className="green">{expense.amount}</td>
                      <td className="green">{expense.description}</td>
                      <td className="green">{expense.category}</td>
                    </>
                  )}
                  {expense.category !== "Salary" && (
                    <>
                      <td className="red">{expense.amount.toLocaleString()}</td>
                      <td className="red">{expense.description}</td>
                      <td className="red">{expense.category}</td>
                    </>
                  )}
                  <td>
                    <button
                      className="updateExpense"
                      onClick={() => handleUpdateExpense(key)}
                    >
                      Update
                    </button>
                    <button
                      className="deleteExpense"
                      onClick={() => handleDeleteExpense(key)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>

      {inHandNow > 10000 && (
        <>
          <button className="activate-premium" onClick={handleActivatePremium}>
            Activate Dark/Light Mode
          </button>
          <button
            className="downloadCSV"
            onClick={() => downloadExpensesAsCSV(expenses)}
          >
            Download Expenses
          </button>
        </>
      )}
      {inHandNow <= 10000 && inHandNow > 0 && (
        <p>Premium Features activated when Total Net is above Rs. 10,000</p>
      )}
    </div>
  );
};

export default Expense;
