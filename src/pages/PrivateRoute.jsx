import React from 'react'

function PrivateRoute({user, children}) {

    if (!user) {
        return (
            <div>
                <h1>PrivateRoute</h1>
                <h2>user is not defined</h2>
            </div>
        )
    }

    return children
}

export default PrivateRoute