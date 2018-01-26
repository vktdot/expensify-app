import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual([])
})

test('should remove expense with an id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '11'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
})

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        id: '3',
        description: 'phone bill',
        note: '',
        amount: 400,
        createdAt: 4000
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0],expenses[1],expenses[2],expenses[3]])
})

test('should edit an expense', () =>{
    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates: {
            note: 'this is my note'
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[0].note).toBe('this is my note')
})

test('should not edit when id not found', ()=> {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '11',
        updates: {
            note: 'note!!!'
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
})

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses:[expenses[2]]
        
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[2]])
})

















