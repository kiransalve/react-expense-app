import { useState } from "react";
import Expenses from "./components/Expense/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
const DUMMY_EXPENSE = [
  {
    id: "k1",
    title: "Car Insurance",
    amount: 254,
    date: new Date(2022, 5, 5),
  },
  {
    id: "k2",
    title: "Glocery",
    amount: 500,
    date: new Date(2021, 6, 6),
  },
  {
    id: "k3",
    title: "Shopping",
    amount: 100,
    date: new Date(2020, 7, 7),
  },
  {
    id: "k4",
    title: "Bike Servicing",
    amount: 200,
    date: new Date(2021, 8, 8),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);

  const addExpenseHandaler = (expense) => {
    setExpenses((prevExp) => {
      return [expense, ...prevExp];
    });
    console.log(expense);
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandaler} />
      <Expenses item={expenses} />
    </div>
  );
};

export default App;
