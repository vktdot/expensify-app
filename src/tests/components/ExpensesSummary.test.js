import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'
import expenses from '../fixtures/expenses'

test('should generate summary for 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenses = {expenses[1]}/>)
    expect(wrapper).toMatchSnapshot()
})

test('Should generate summary for 0 or multiple expenses', ()=>{
    const wrapper = shallow(<ExpensesSummary expenses = {expenses}/>)
    expect(wrapper).toMatchSnapshot()
})