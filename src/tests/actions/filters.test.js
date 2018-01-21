import moment from 'moment'
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters'

test('should generate set test filter with provided values', () => {
    const action = setTextFilter('hello');
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: 'hello'
    })
})

test('should generate set text filter with default values', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: ''
    })
})

test('should generate sort by amount', () => {
    expect(sortByAmount()).toEqual({type: 'SORT_BY_AMOUNT'})
})

test('should generate sort by date', () => {
    expect(sortByDate()).toEqual({type: 'SORT_BY_DATE'})
})

test('should generate start date', () => {
    const action = setStartDate(moment('0'));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment('0')
    })
})

test('should generate end date', () => {
    const action = setEndDate(moment('0'));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment('0')
    })
})