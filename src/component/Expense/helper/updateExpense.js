import { addExpense } from "../../../store/ExpenseReducer";

export const updateExpense = async (
  id,
  newExpense,
  emailID,
  dispatch,
  getExpense
) => {
  const request = await fetch(
    `https://expense-tracker-6b356-default-rtdb.firebaseio.com/expense${emailID}/${id}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    }
  );
  const response = await request.json();
  dispatch(addExpense(newExpense));
  console.log(response, "expense updated");
  getExpense();
};
