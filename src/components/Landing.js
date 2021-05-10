import React, {Component} from 'react';
import { Link } from "@reach/router";

class Landing extends Component {
    render() {
        return(
        <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-10 col-md-10 col-lg-8 col-xl-7">
                <div className="display-4 text-primary mt-3 mb-2">
                  Auth Test
                </div>
                <p className="lead">
                  This is a sample front end for a REST API which provides authentication services
                </p>
                <p className="text-secondary">
                    Authetnication Server GitHub: <a href="https://github.com/celbert96/TSAuthServer">https://github.com/celbert96/TSAuthServer</a>
                </p>

                <Link to="/register" className="btn btn-outline-primary mr-2">
                    Register
                </Link>

                <Link to="/login" className="btn btn-outline-primary mr-2">
                    Log In
                </Link>
              </div>
            </div>
          </div>
        )
    }
}

export default Landing;