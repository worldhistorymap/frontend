import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class AboutButton extends Component {
    
    state = {
        show: false, 
    }

    open () {
        this.setState({show: true});
    }

    close () {
        this.setState({show: false});
    }

    render () {
        return(
            <React.Fragment>
                <Button className="btn btn-secondary navbar-btn login-btn" onClick={() => this.open()}>
                        About
                </Button>
                <Modal show={this.state.show} onHide={() => this.close() }>
                    <Modal.Header closeButton>
                        <Modal.Title>About HistoryMap </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <text>
                            Historymap is an opensource project that aims to make learning history interesting through the use of an interactive map.
                            By the simple click of a button, one can easily learn about the history of an area. We hope your enjoy the site and thanks for visiting!
                        </text>
                        <h4>
                            Plans for the Future
                        </h4>
                        <text>
                            If enough people like and use this alpha, we have multiple directions that we wish to take this project. For example, after we make sure that our
                            back-end services are safe, we will deploy user accounts to the site. This will allow users to recieve recommendations about areas
                            in history that may interest them. Users will also be able to contribute their own knowledge to the website through the creation of custom markers.
                            We are also always improving on the rasterization of the historical map tiles, and are also looking to add more maps for display. 
                            Futhermore we are always looking to make the application more scalable and fast. 
                        </text>
                        <h4>
                            Contributions
                        </h4>
                        <text>
                            We are an opensource and free project, have a lot of features we want to implement, and contributions are always welcome. If you have any ideas 
                            , experience a slow site, find bugs, 
                            or wish to contribute to the <a href = "https://github.com/worldhistorymap">
                            source code </a> please feel free to reach out through email or slack/discord/etc (coming soon).
                        </text>
                        <h4>
                            Other
                        </h4>
                        <text>
                            The programming part of this project was started by <a href="https://vaibhavjayaraman.me">Vaibhav Jayaraman</a>. The historical maps are provided 
                            by <a href = "https://www.youtube.com/channel/UC6gNjP1W4FXWExT5QpYkmhQ">Ollie Bye</a>.
                        </text>
                    </Modal.Body>
                    <Modal.Footer>
                       Email: vaibhavjayaraman is my username and gmail is the hostname
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default AboutButton