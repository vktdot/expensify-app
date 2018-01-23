export default (props) => {
        return props.expenses.map((expense) => expense.amount)
        .reduce((acc,current) => acc + current, 0);
}       