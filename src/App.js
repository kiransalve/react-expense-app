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
      {expense.map((e) => {
        return (
          <ExpenseItem
            title={e.title}
            amount={e.amount}
            date={e.date.toISOString()}
            location={e.location}
          />
        );
      })}
    </div>
  );
}

export default App;
