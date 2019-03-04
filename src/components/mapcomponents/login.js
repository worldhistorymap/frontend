import React, {Component} from "react";

import {Modal, Button} from "react-bootstrap";

class Login extends Component {
    state = {
        show: false
    }

    open() {
        this.setState({ show: true });
    }

    close() {
        this.setState({ show: false });
    }

    render () {
        return (
            <React.Fragment>   
                <Button className="btn btn-primary navbar-btn login-btn" onClick={() => this.open()}>
                            Login and Signup
                </Button>
                <Modal show={this.state.show} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> We will soon have user accounts, which will allow users to receive recommendations and contribute their own knowledge. </Modal.Body>
                    <Modal.Footer>
                        <Button variant="Primary" onClick={this.closeLogin}>
                            Login
                        </Button>
                        <Button variant="secondary" onClick={this.closeLogin}>
                            SignUp
                        </Button>
                    </Modal.Footer>
                </Modal> 
            </React.Fragment>
        )
    }
}

export default Login;