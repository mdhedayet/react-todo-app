import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Register = () => {

  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();


  const userRegister = (e) => {
    e.preventDefault();
    let url = 'http://127.0.0.1:8000/api/register';
    let data = {name, email, password, password_confirmation: confirmPassword };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

      },
      body: JSON.stringify(data)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("resp", resp);
        localStorage.setItem('user-token', JSON.stringify(resp));
        navigate("/dashboard/todo");
      })
    }
    )
  }


  const nameData = (e) => {
    setName(e.target.value);
  }

  const emailData = (e) => {
    setEmail(e.target.value);
  }

  const passwordData = (e) => {
    setPassword(e.target.value);
  }

  const passwordConfirmationData = (e) => {
    setConfirmPassword(e.target.value);
  }

  
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className='mt-5'>
        <Card className='p-3'>
        <h1 className='text-center'>Register</h1>
        <Form onSubmit={userRegister}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={nameData} placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" onChange={emailData} placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={passwordData} placeholder="Enter your password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" onChange={passwordConfirmationData} placeholder="Enter your confirm password" />
          </Form.Group>

          <div className="mb-3 d-flex">
          <Button type='submit' variant="primary">Sign Up</Button>
          <Link to="/" className='ms-auto'>Sign In</Link>
          </div>


        </Form>
        </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Register;
