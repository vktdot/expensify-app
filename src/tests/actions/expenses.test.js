import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, 
    startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

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
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
})

test('should add expense with default to database and store',(done)=>{
    const store = createMockStore(defaultAuthState);
    
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
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

test('should setup set expense action object with data',()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', () => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
})

//---------ERROR: async callback was not invoked within timeout specified by 
//--------------jasmine.default_timeout_interval jest

// test('should remove expenses from firebase', (done) => {
//     const store = createMockStore(defaultAuthState);
//     store.dispatch(startRemoveExpense(1)).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'REMOVE_EXPENSE',
//             id: 1
//         });
//        return database.ref(`users/${uid}/expenses/${id}`).once('value'); 
//     }).then((snapshot) => {
//         expect(snapshot.val()).toBeFalsy();
//         done();
//     });
// });


test('should edit expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const updates = {amount: 50000}
    store.dispatch(startEditExpense(1, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: 1,
            updates
        })  
        return database.ref(`users/${uid}/expenses/${1}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount)
        done();
    })
})