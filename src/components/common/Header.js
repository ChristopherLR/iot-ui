import React from 'react';
import { FormControl, Button, Nav, Navbar, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import "../../styles/app.scss"

function Header(props) {
    const { user } = props;
    const history = useHistory();
    return (
        <Navbar bg="dark" variant="dark" className="header">
            <Nav className="mr-auto">
                <Nav.Link onClick={() => history.push("/user/home")}>{user.username }</Nav.Link>
                <Nav.Link onClick={() => history.push("/user/devices")}>Update Devices</Nav.Link>
                <Nav.Link onClick={() => history.push("/user/account")}>Update Account</Nav.Link>
                <Nav.Link onClick={() => history.push("/user/about")}>About</Nav.Link>
                <Nav.Link onClick={() => history.push("/graphs")}>Graphs</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export { Header };