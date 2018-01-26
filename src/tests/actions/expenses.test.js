import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store',(done)=>{
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This is a better mouse',
        createdAt: 1000
    }
    
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
})

test('should add expense with default to database and store',(done)=>{
    const store = createMockStore({});
    
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description : '',
                note : '',
                amount : 0,
                createdAt : 0
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            description : '',
            note : '',
            amount : 0,
            createdAt : 0
        });
        done();
    })
})

// test('should add expense with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     })
// })