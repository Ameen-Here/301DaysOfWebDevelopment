import "./ExpenseList.css";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props) => {
  if (props.expenseList.length === 0) {
    return <h2 className="expenses-list__fallback">Expense doesn't found</h2>;
  }
  return (
    <ul className="expenses-list">
      {props.expenseList.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};
export default ExpenseList;
