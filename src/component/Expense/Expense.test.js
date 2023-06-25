import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Expense from "./Expense";

const mockStore = configureStore([]);

describe("Expense Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        emailverified: true,
      },
      theme: {
        isDarkMode: false,
      },
    });
  });

  test("renders the expense form", () => {
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    const expenseForm = screen.getByRole("heading", { name: /add expense/i });
    expect(expenseForm).toBeInTheDocument();
  });

  test("displays expenses list", () => {
    const expenses = {
      expense1: {
        amount: 100,
        description: "Groceries",
        category: "Food",
      },
      expense2: {
        amount: 50,
        description: "Fuel",
        category: "Petrol",
      },
    };
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    store.dispatch({ type: "FETCH_EXPENSE_SUCCESS", expenses });

    const expenseList = screen.getByRole("heading", { name: /expenses list/i });
    expect(expenseList).toBeInTheDocument();

    const expenseRows = screen.getAllByRole("row");
    expect(expenseRows).toHaveLength(3); // Including the table header row
  });

  test("adds new expense", () => {
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    const moneyInput = screen.getByLabelText(/money/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const categoryInput = screen.getByLabelText(/category/i);
    const addButton = screen.getByRole("button", { name: /add expense/i });

    fireEvent.change(moneyInput, { target: { value: "100" } });
    fireEvent.change(descriptionInput, { target: { value: "Groceries" } });
    fireEvent.change(categoryInput, { target: { value: "Food" } });
    fireEvent.click(addButton);

    // Assert the newly added expense is displayed in the list
    const addedExpenseRow = screen.getByText(/groceries/i);
    expect(addedExpenseRow).toBeInTheDocument();
  });

  test("updates existing expense", () => {
    const expenseId = "expense1";
    const initialExpense = {
      amount: 100,
      description: "Groceries",
      category: "Food",
    };
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    store.dispatch({ type: "FETCH_EXPENSE_SUCCESS", expenses: { [expenseId]: initialExpense } });

    const updateButton = screen.getByRole("button", { name: /update/i });
    fireEvent.click(updateButton);

    // Assert the expense form is populated with the existing expense details
    const moneyInput = screen.getByLabelText(/money/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const categoryInput = screen.getByLabelText(/category/i);

    expect(moneyInput.value).toBe(initialExpense.amount.toString());
    expect(descriptionInput.value).toBe(initialExpense.description);
    expect(categoryInput.value).toBe(initialExpense.category);

    // Update the expense details
    fireEvent.change(moneyInput, { target: { value: "200" } });
    fireEvent.change(descriptionInput, { target: { value: "Updated Groceries" } });
    fireEvent.change(categoryInput, { target: { value: "Food" } });
    fireEvent.click(updateButton);

    // Assert the expense details are updated in the list
    const updatedExpenseRow = screen.getByText(/updated groceries/i);
    expect(updatedExpenseRow).toBeInTheDocument();
  });

  test("deletes expense", () => {
    const expenseId = "expense1";
    const expense = {
      amount: 100,
      description: "Groceries",
      category: "Food",
    };
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    store.dispatch({ type: "FETCH_EXPENSE_SUCCESS", expenses: { [expenseId]: expense } });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // Assert the expense is removed from the list
    const deletedExpenseRow = screen.queryByText(/groceries/i);
    expect(deletedExpenseRow).not.toBeInTheDocument();
  });

  test("displays total salary, total expense, and net amount", () => {
    const expenses = {
      expense1: {
        amount: 100,
        description: "Groceries",
        category: "Food",
      },
      expense2: {
        amount: 50,
        description: "Fuel",
        category: "Petrol",
      },
    };
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    store.dispatch({ type: "FETCH_EXPENSE_SUCCESS", expenses });

    const totalSalary = screen.getByText(/total salary/i);
    expect(totalSalary).toBeInTheDocument();

    const totalExpense = screen.getByText(/total expense/i);
    expect(totalExpense).toBeInTheDocument();

    const inHandNow = screen.getByText(/total net/i);
    expect(inHandNow).toBeInTheDocument();
  });

  test("activates premium features when net amount is above Rs. 10,000", () => {
    const inHandNow = 15000;
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    const activatePremiumButton = screen.getByRole("button", { name: /activate dark\/light mode/i });
    expect(activatePremiumButton).toBeInTheDocument();

    const downloadCSVButton = screen.getByRole("button", { name: /download expenses/i });
    expect(downloadCSVButton).toBeInTheDocument();
  });

  test("does not activate premium features when net amount is below or equal to Rs. 10,000", () => {
    const inHandNow = 5000;
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );

    const activatePremiumButton = screen.queryByRole("button", { name: /activate dark\/light mode/i });
    expect(activatePremiumButton).not.toBeInTheDocument();

    const downloadCSVButton = screen.queryByRole("button", { name: /download expenses/i });
    expect(downloadCSVButton).not.toBeInTheDocument();

    const premiumFeaturesMessage = screen.getByText(/premium features activated/i);
    expect(premiumFeaturesMessage).toBeInTheDocument();
  });
});
