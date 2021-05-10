import { navigate } from '@reach/router';
import React, {Component} from 'react';
import FormError from './FormError';
// import {navigate} from '@reach/router';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.user !== null) {
            navigate('/');
        }
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue});
    }

    handleSubmit(e) {
        var loginInfo = {
            username: this.state.username,
            password: this.state.password
        };

        e.preventDefault();

        fetch('http://localhost:8080/auth/setSessionCookie', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(loginInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.httpStatus !== 200) {
                this.setState({errorMessage: data.description});
            }
            else {
                this.props.updateUserState(data.data.userData);
                navigate('/');
            }
        })
        .catch(err => {
            this.setState({errorMessage: 'Internal error'});
        }); 
    }


    render() {
        return(
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-6 text-left">
                        <div className="card bg-light">
                        <div className="card-body">
                            <h3 className="font-weight-light mb-3">Log in</h3>
                            <section className="form-group">
                                {this.state.errorMessage !== null ? (
                                    <FormError message={this.state.errorMessage} />
                                ) : null}
                            <input
                                required
                                className="form-control mb-2"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            </section>
                            <section className="form-group">
                            <input
                                required
                                className="form-control mb-3"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            </section>
                            <div className="form-group text-right justify-content-end mb-0">
                            <button className="btn btn-primary" type="submit">
                                Log in
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default Login;