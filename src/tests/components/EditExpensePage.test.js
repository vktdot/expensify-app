import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses';

test('should render edit expense page', () => {
    const editExpense = jest.fn()
    const removeExpense = jest.fn()
    const wrapper = shallow(<EditExpensePage editExpense={editExpense} 
        removeExpense = {removeExpense}
        history = {history}
        expense = {expenses[2]}
        />)
    expect(wrapper).toMatchSnapshot();
})

test('should handle edit expense', () => {
    const editExpense = jest.fn()
    const history = {push: jest.fn()}
    const wrapper = shallow(<EditExpensePage editExpense={editExpense} 
        history = {history}
        expense = {expenses[2]}
        />)
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2])
})

test('should handle remove expense', () =>{
    const removeExpense = jest.fn()
    const history = {push: jest.fn()}
    const wrapper = shallow(<EditExpensePage removeExpense = {removeExpense}
        history = {history}
        expense = {expenses[2]}
        />)
    wrapper.find('button').simulate('Click');
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[2].id)
})