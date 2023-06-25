export const downloadExpensesAsCSV = (expenses) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
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

