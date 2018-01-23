export default (expenses) => {
        return expenses.map((expense) => expense.amount)
        .reduce((acc,current) => acc + current, 0);
}       