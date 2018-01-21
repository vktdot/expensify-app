import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
        const endDateMatch = endDate? endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = typeof text!== 'string' || expense.description.toLowerCase().includes(text.toLowerCase())  ;
        return startDateMatch && endDateMatch && textMatch;
    }).sort(function(a,b){
        if(sortBy === 'date'){
            return b.createdAt - a.createdAt
        }
        else{
            return b.amount - a.amount
        }
    })
}