import React from 'react'
import ReactDOM from 'react-dom'
import { request } from 'https';

const Info = (props) => (
    <div>
        <p>The info is: {props.info}</p>
    </div>
)

const admin = (WrappedComponent) => {
    return(props)=> (
        <div>
            {props.isAdmin && <p>This is a private info. Please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const AdminInfo = admin(Info);


const requireAuthentication = (WrappedComponent) => {
    return(props) => (
        <div>
            {props.isAuth ? <WrappedComponent {...props}/>: <p>Sorry you're not authenticated</p>}
        </div>
    )
}

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuth = {true} info = 'These are the details'/>, document.getElementById('app'))