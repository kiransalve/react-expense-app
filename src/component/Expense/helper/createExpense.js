import { addExpense } from "../../../store/ExpenseReducer";

export const createExpense = async (
  newExpense,
  emailID,
  dispatch,
  getExpense
) => {
  const request = await fetch(
    `https://expense-tracker-6b356-default-rtdb.firebaseio.com/expense${emailID}.json`,
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
  getExpense();
};

// this will save data like below
// expensekirangmailcom
//    -NYazbBapRQXDiULCA4S
//        amount:"190"
//        category:"Food"
//        description:"n"
