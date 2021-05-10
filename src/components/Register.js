import React, {Component} from 'react';
import FormError from './FormError';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordVerify: '',
            errorMessage: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({[itemName]: itemValue}, () => {
            if(this.state.password !== this.state.passwordVerify) {
                this.setState({errorMessage: "Passwords don't match"});
            }
            else {
                this.setState({errorMessage: null});
            }
        });
    } 

    handleSubmit(e) {
      var registrationInfo = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }

      e.preventDefault();

      fetch('http://localhost:8080/users', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(registrationInfo)
      })
      .then(response => response.json())
      .then(data => {
        if(data.httpStatus !== 201) {
          this.setState({errorMessage: data.description});
        }
      });
    }

    render() {
        return(
        <form className="mt-3" onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h3 className="font-weight-light mb-3">Register</h3>
                      <div className="form-row">
                          {this.state.errorMessage !== null ? (
                              <FormError message={this.state.errorMessage}/>
                          ) : null}
                        <section className="col-sm-12 form-group">
                          <label
                            className="form-control-label visually-hidden"
                            htmlFor="username"
                          >
                                User Name
                              </label>
                          <input
                            className="form-control mb-3"
                            type="text"
                            id="username"
                            placeholder="Username"
                            name="username"
                            required
                            value={this.state.username}
                            onChange={this.handleChange}
                          />
                        </section>
                      </div>
                      <section className="form-group col-sm-12">
                        <label
                          className="form-control-label visually-hidden"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="form-control mb-3"
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          required
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </section>
                      <div className="form-row">
                        <section className="col-sm-12 form-group mb-3">
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                          />
                        </section>
                        <section className="col-sm-12 form-group mb-3">
                          <input
                            className="form-control"
                            type="password"
                            required
                            name="passwordVerify"
                            placeholder="Repeat Password"
                            value={this.state.passwordVerify}
                            onChange={this.handleChange}
                          />
                        </section>
                      </div>
                      <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                          Register
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

export default Register;