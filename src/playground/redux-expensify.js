import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'


const expensesReducerDefaultState = [];

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = (id,updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT' ,
    text
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
})

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
})

const filterReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT':
            return {...state, text: action.text};
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'};
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'}
        case 'SET_START_DATE': 
            return {...state, startDate: action.date};
        case 'SET_END_DATE':
            return {...state, endDate: action.date};
        default: 
            return state;
    }
}

const expenseReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_EXPENSE': 
            return [...state, action.expense];
        case 'REMOVE_EXPENSE': 
            return state.filter(expense => action.id !== expense.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => ({...expense, ...action.updates}));
        default: 
            return state;
    }
}

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || startDate <= expense.createdAt;
        const endDateMatch = typeof endDate !== 'number' || endDate >= expense.createdAt;
        const textMatch = typeof text!== 'string' || expense.description.toLowerCase().includes(text.toLowerCase())  ;
        return startDateMatch && endDateMatch && textMatch;
    }).sort(function(a,b){
        if(sortBy === 'date'){
            return b.createdAt - a.createdAt
        }
        else{
            return b.amount - a.amount
        }
    })
}

const store = createStore(combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
}))

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses =  getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({
    description: 'Rent', 
    amount: 1000,
    createdAt: 0
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'Coffee', 
    amount: 3000,
    createdAt: -1000
}));





// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}))

// store.dispatch(setTextFilter());

//store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));

// store.dispatch(setEndDate(2500));

const demoState = {
    expenses: [{
        id: 'fafdafaf',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: 'undefined',
        endDate: 'undefined'
    }
};
