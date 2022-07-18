import { useState } from "react";

import ExpensesFilter from "../ExpenseFilter/ExpenseFilter";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpensesChart";

function Expenses(props) {
  const [year, setYear] = useState("2020");
  const dateChangeHandler = (selectedYear) => {
    setYear(selectedYear);
  };

  const filteredExpense = props.expenses.filter((expense) => {
    return expense.date.getFullYear() === +year;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter onDateChange={dateChangeHandler} selectedYear={year} />
        <ExpenseChart expenses={filteredExpense} />
        <ExpenseList expenseList={filteredExpense} />
      </Card>
    </div>
  );
}

export default Expenses;

// import ExpenseItem from "./ExpenseItem";

// import ExpensesFilter from "../ExpenseFilter/ExpenseFilter";
// import "./Expenses.css";
// import Card from "../UI/Card";
// import { useState } from "react";

// function Expenses(props) {
//   const [year, setYear] = useState("");
//   const dateChangeHandler = (selectedYear) => {
//     setYear(selectedYear);
//   };
//   return (
//     <div>
//       <ExpensesFilter onDateChange={dateChangeHandler} />
//       <Card className="expenses">
//         <ExpenseItem
//           title={props.items[0].title}
//           amount={props.items[0].amount}
//           date={props.items[0].date}
//         />
//         <ExpenseItem
//           title={props.items[1].title}
//           amount={props.items[1].amount}
//           date={props.items[1].date}
//         />
//         <ExpenseItem
//           title={props.items[2].title}
//           amount={props.items[2].amount}
//           date={props.items[2].date}
//         />
//       </Card>
//     </div>
//   );
// }

// export default Expenses;
