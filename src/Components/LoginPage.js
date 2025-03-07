import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form, FormGroup, Button, Container, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (username === "admin" && password === "admin") {
            localStorage.setItem("isAuthenticated", "true"); 
            navigate("/todopage"); 
        } else {
            setErrorMessage("Invalid username or password"); 
        }
    };

    return (
        <Container fluid className="min-vh-100 p-5 bg-custom-pink pe-5">
            <Row className="w-100">
                <Col xs={12} sm={6} className="d-flex justify-content-center align-items-center">
                    <p className="fw-bold display-3 display-md-2 display-lg-1 text-center text-custom-purple">
                        Welcome To The To-Do App!
                    </p>
                </Col>
                <Col xs={12} sm={6} className="text-black p-5 rounded-5 shadow-lg">
                    <p className="fw-bold display-5 display-md-4 display-lg-3 text-center text-custom-purple">
                        Login
                    </p>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Form.Label className="d-flex justify-content-end pt-2">User Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your user name" 
                                className="text-end" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label className="d-flex justify-content-end pt-2">Password</Form.Label>
                         
                                <Form.Control 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your password" 
                                    className="text-end" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                               
                        </FormGroup>

                        {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

                        <Container className="d-flex justify-content-center align-items-center rounded-5 pt-5">
                            <Button type="submit" className="bg-custom-purple text-white" style={{ minWidth: "100%" }}>
                                Login
                            </Button>
                        </Container>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
