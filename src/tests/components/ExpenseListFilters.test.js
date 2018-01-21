import React from 'react'
import {shallow} from 'enzyme'
import moment from 'moment'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import {filters, altFilters} from '../fixtures/filters'


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters = {filters}
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
        />)
})

test('should render expenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render expenseListFilters with alt data correctly', () => {
    wrapper.setProps({filters: altFilters})
    expect(wrapper).toMatchSnapshot();
})

test('should handle text change', () => {
    const value = 'a'
    wrapper.find('input').simulate('change', {
        target: {value}
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
    wrapper.find('select').simulate('change', {
        target: {value: 'date'}
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: {value: 'amount'}
    })
    expect(sortByAmount).toHaveBeenLastCalledWith()
})

test('should handle date changes', () => {
    const startDate = moment(0).subtract(3,'day')
    const endDate = moment(0).add(2,'day')
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate})
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus changes', () => {
    wrapper.find('DateRangePicker').prop('onFocusChange')(true)
    expect(wrapper.state('calendarFocused')).toBe(true)
})