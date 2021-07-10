import { Form, Button, Alert, Col, Row, Container } from 'react-bootstrap';
import { useState } from 'react';
//import react-router-dom components
import { Redirect } from 'react-router-dom';

function LoginForm(props) {
    //Define a state for the username
    const [username, setUsername] = useState('');
    //Define a state for the password
    const [password, setPassword] = useState('');
    //Define a state for the error message to show in case there are problems with the fields
    const [errorMessage, setErrorMessage] = useState('');
    const [goToHomePage, setGoToHomePage] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = { username: username, password: password };
        //Every time the user clicks on the login button I reset the error message (the one in App.js)
        props.setMessage('');
        if (username.length > 0 && password.length >= 6) {
            //if the username field is not empty and the password is at least 6 chars long, do the login
            props.login(credentials);
            //set the error message to the empty string because validation is ok
            setErrorMessage('');
        }
        else {
            //set the error message because validation failed
            setErrorMessage('Error(s) in the form, please fix it.');
        }
    };

    return (
        <>
            {goToHomePage && (<Redirect to="/" />)}
            <div className="center">
                <Row className="text-center"><h1>Meme Generator</h1></Row>
                <Row className="justify-content-center">
                    <Form>
                        <Row>
                            <Form.Group as={Col} xs="12" controlId='username'>
                                <Container className="text-center">
                                    <Form.Label>E-mail</Form.Label>
                                </Container>
                                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs="12" controlId='password'>
                                <Container className="text-center">
                                    <Form.Label>Password</Form.Label>
                                </Container>
                                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-center">
                            {errorMessage ? <Alert as={Col} xs="12" variant='danger' onClose={() => setErrorMessage('')} dismissible>{errorMessage}</Alert> : ''}
                        </Row>
                        <Row className="justify-content-center">
                            {props.message &&
                                <Alert variant={props.message.type} as={Col} xs="12" onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>}
                        </Row>
                        <Row className="justify-content-between">
                            <Button variant="secondary" as={Col} xs="5" onClick={()=>{
                                props.setGoToLogin(false);
                                setGoToHomePage(true);
                                props.setLoading(true);
                                props.setDirty(true);
                            }}>Go back</Button>
                            <Button variant="primary" as={Col} xs="5" onClick={handleSubmit}>Login</Button>
                        </Row>
                    </Form>
                </Row>
            </div>
        </>)
}

export default LoginForm;