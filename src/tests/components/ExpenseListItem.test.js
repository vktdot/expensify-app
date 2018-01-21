import React from 'react'
import { shallow } from 'enzyme'
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses'

test('should generate expenses list item', () => {
    const wrapper = shallow(<ExpenseListItem expense={expenses[2]}/>)
    expect(wrapper).toMatchSnapshot();
})