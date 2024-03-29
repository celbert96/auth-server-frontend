import React, { Component } from 'react';

class FormError extends Component {
    render() {
        const message = this.props.message;
        return(
            <div className="col-12 alert alert-danger px3">
                {message}
            </div>
        );
    }
}

export default FormError;