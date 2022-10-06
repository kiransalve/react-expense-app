import Expenses from "./components/Expense/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const App = () => {
  const addExpenseHandaler = (expense) => {
    console.log(expense);
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandaler} />
      <Expenses />
    </div>
  );
};

export default App;
