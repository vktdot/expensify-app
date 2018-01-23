import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpensesTotal from '../selectors/expenses-total'
import  getVisibleExpenses from '../selectors/expenses'

export const ExpensesSummary = (props) => {
    const expenseWord = props.expenseCount === 1? 'expense': 'expenses';
    const formattedTotal = numeral(props.expensesTotal/100).format('$0,0.00')
    return(<h3>Viewing {props.expenseCount} {expenseWord} totalling {formattedTotal}
    </h3>)
    
}

const MapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}
    
    
export default connect(MapStateToProps)(ExpensesSummary)