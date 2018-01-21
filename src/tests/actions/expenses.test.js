import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('remove', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('edit', () => {
    const action = editExpense('123abc', {note: 'note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note: 'note'}
    })
})

test('should add expense with provided values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'This is my note',
        amount: 10000,
        createdAt: 2000000
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
})

test('should add expense with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})