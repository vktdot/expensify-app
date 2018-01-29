import React from 'react';
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, startRemoveExpense, startEditExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit= (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }
    onRemove = () =>{
        this.props.startRemoveExpense(this.props.expense.id);
        this.props.history.push('/')
    } 
    render(){
        return(
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                    onSubmit = {this.onSubmit}
                    expense = {this.props.expense}
                    />
                    <button className = "button button--secondary" onClick = {this.onRemove}>
                        Remove Expense
                     </button>
                </div>
            </div>
        )
    }
}

// const EditExpensePage = (props) => {
//         return(
//             <div>
//                 <ExpenseForm 
//                   expense = {props.expense}
//                   onSubmit={(expense) => {
//                       props.dispatch(editExpense(expense.id, expense));
//                       props.history.push('/');
//                   }}
//                 />
//                 <button onClick = {() =>{
//                     props.dispatch(removeExpense(props.expense.id));
//                     props.history.push('/')}}  >
//                   Remove
//                 </button>
//             </div>
//         )
// }

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})
    
const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);