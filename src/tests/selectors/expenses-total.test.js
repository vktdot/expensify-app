import React from 'react'
import { shallow } from 'enzyme'
import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return zero if no expenses', () => {
    const action = selectExpensesTotal([])
    expect(action).toBe(0);
})

test('should correctly add up a single expense', () => {
    const action = selectExpensesTotal([expenses[2]]);
    expect(action).toBe(25000)
})

test('should correctly add up multiple expenses', () => {
    const action = selectExpensesTotal(expenses);
    expect(action).toBe(28000)
})