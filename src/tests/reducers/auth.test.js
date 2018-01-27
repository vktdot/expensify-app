import authReducer from '../../reducers/auth'

test('should set uid for login', ()=>{
    const action = {
        type: 'LOGIN',
        uid: 'id'
    }
    const state = authReducer(state, action);
    expect(state.uid).toBe('id');
})

test('should set uid for logout', ()=>{
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer(state, action);
    expect(action.uid).toBe()
})
