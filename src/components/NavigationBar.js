import React, {Component} from 'react';
import {FaMoon, FaUsers} from "react-icons/fa";
import { Link } from "@reach/router";

class NavigationBar extends Component {
    render() {
        const {user, logoutUser} = this.props;

        return (
            <nav className="site-nav family-sans navbar navbar-expand navbar-dark bg-secondary higher">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <FaMoon className="mr-1"/> CVE Browser
                    </Link>
                    <div className="navbar-nav ml-auto">
                        {user && (
                            <>
                                <Link className="nav-item nav-link" to="/meetings">
                                    Meetings
                                </Link>
                                <Link className="nav-item nav-link" to="/login" onClick={e => logoutUser(e)}>
                                    Log out
                                </Link>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link className="nav-item nav-link" to="/login">
                                    Log In
                                </Link>
                                <Link className="nav-item nav-link" to="/register">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        );
    }

}
export default NavigationBar;