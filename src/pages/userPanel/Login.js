import React from 'react'
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = (e) => {
    e.preventDefault();
    let url = 'http://127.0.0.1:8000/api/login';
    let data = {email, password};
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
        localStorage.setItem('user-info', JSON.stringify(resp));
      })
    }
    )
  }

  const emailData = (e) => {
    setEmail(e.target.value);
  }

  const passwordData = (e) => {
    setPassword(e.target.value);
  }


  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className='mt-5'>
        <Card className='p-3'>
        <h1 className='text-center'>LOGIN</h1>
        <Form onSubmit={userLogin}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" onKeyUp={emailData} placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onKeyUp={passwordData} placeholder="Enter your password" />
          </Form.Group>
          <Button type='submit' variant="primary">Sign In</Button>
        </Form>
        </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}
