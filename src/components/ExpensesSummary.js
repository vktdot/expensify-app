import React from 'react'
import { connect } from 'react-redux'
import ExpensesTotal from '../selectors/expenses-total'
import  getVisibleExpenses from '../selectors/expenses'

export const ExpensesSummary = (props) => {
     if(props.expenses.length === 1){
        return <h3>Viewing 1 expense totalling <ExpensesTotal
          expenses = {props.expenses}/></h3>
    } else {
        return <h3>Viewing {props.expenses.length} expenses totalling <ExpensesTotal
          expenses = {props.expenses}/></h3>
    }
}

const MapStateToProps = (state) => (
    {expenses: getVisibleExpenses(state.expenses, state.filters)}
)
    
export default connect(MapStateToProps)(ExpensesSummary)