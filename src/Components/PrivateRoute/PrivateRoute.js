import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedIn, setLoggedIn] = useContext(userContext);
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                (loggedIn.email || sessionStorage.getItem('token')) ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
        </div>
    );
};

export default PrivateRoute;