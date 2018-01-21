import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
    const action = {
        type: 'SET_TEXT',
        text: 'e',
    }
    const state = filtersReducer(undefined, action)
    expect(state.text).toBe('e')
})

test('should set start date', () => {
    const action = {
        type: 'SET_START_DATE',
        date: 1000
    }
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toBe(1000)
})

test('should set endDate filter', () => {
    const action = {
        type: 'SET_END_DATE',
        date: moment(0)
    }
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(moment(0))
})