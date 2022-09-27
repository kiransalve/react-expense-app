import ExpenseItem from "./components/ExpenseItem";

function App() {
  const expense = [
    {
      title: "Car Insurance",
      amount: 254,
      date: new Date(29, 5, 2022),
      location: "Thane",
    },
    {
      title: "Glocery",
      amount: 500,
      date: new Date(22, 3, 2022),
      location: "Kalyan",
    },
    {
      title: "Shopping",
      amount: 100,
      date: new Date(22, 6, 2022),
      location: "Ghatkopar",
    },
    {
      title: "Bike Servicing",
      amount: 200,
      date: new Date(12, 1, 2022),
      location: "Thane",
    },
  ];
  return (
    <div className="App">
      <ExpenseItem
        title={expense[0].title}
        amount={expense[0].amount}
        date={expense[0].date.toISOString()}
        location={expense[0].location}
      />
      <ExpenseItem
        title={expense[1].title}
        amount={expense[1].amount}
        date={expense[1].date.toISOString()}
        location={expense[1].location}
      />
      <ExpenseItem
        title={expense[2].title}
        amount={expense[2].amount}
        date={expense[2].date.toISOString()}
        location={expense[2].location}
      />
      <ExpenseItem
        title={expense[3].title}
        amount={expense[3].amount}
        date={expense[3].date.toISOString()}
        location={expense[3].location}
      />
    </div>
  );
}

export default App;
