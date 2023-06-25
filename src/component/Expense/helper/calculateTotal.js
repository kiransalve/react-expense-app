
export const calculateTotalExpense = (expenses) => {
  const nonSalaryExpenses = Object.values(expenses).filter(
    (expense) => expense.category !== 'Salary'
  );
  const expenseAmounts = nonSalaryExpenses.map(
    (expense) => Number(expense.amount)
  );
  return expenseAmounts.reduce((total, amount) => total + amount, 0);
};

export const calculateTotalSalary = (expenses) => {
  const salaryExpenses = Object.values(expenses).filter(
    (expense) => expense.category === 'Salary'
  );
  return salaryExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );
};