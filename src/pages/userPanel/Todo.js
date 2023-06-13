import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { Badge, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Todo = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    //craeteTodo
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');

    const createTodo = (e) => {
        e.preventDefault();
        let url = 'http://127.0.0.1:8000/api/todos';
        setStartDate(new Date(startDate).toISOString().slice(0, 10));
        setEndDate(new Date(endDate).toISOString().slice(0, 10));

        let formData = new FormData();
        formData.append('title', title);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('description', description);
        for (const item of file) {
            formData.append('file[]', item);
        }

        fetch(url, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user-token')).access_token

            },
            body: formData
        }).then((result) => {
            result.json().then((resp) => {
                console.warn("resp", resp);
                setShow(false);
                setTitle('');
                setStartDate('');
                setEndDate('');
                setFile('');
                setDescription('');
                todosData();
                navigate("/dashboard/todo");
                
            })
        }
        )
    }

    const [todoList,setTodoList]= useState([]);
    const [todoListAllData,setTodoListAllData]= useState([]);

    useEffect(() => {
        todosData();
    }, [])

    const todosData = () =>{
        let url = 'http://127.0.0.1:8000/api/todos';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user-token')).access_token
            }
        }).then((result) => {
            result.json().then((resp) => {
                setTodoList(resp.data);
                setTodoListAllData(resp);
                console.log(resp);
            })
        }
        )

    }

    const paginationData = (item) => {
        let url = item.url;
        if(url != null){
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user-token')).access_token
                }
            }).then((result) => {
                result.json().then((resp) => {
                    setTodoList(resp.data);
                    setTodoListAllData(resp);
                    console.log(resp);
                })
            }
            )
        }
    }



    const titleData = (e) => {
        setTitle(e.target.value);
    }

    const startDateData = (e) => {
        setStartDate(e.target.value);
    }

    const endDateData = (e) => {
        setEndDate(e.target.value);
    }

    const fileData = (e) => {
        let files = e.target.files;
        setFile(files);
    }

    const descriptionData = (e) => {
        setDescription(e.target.value);
    }


    return (
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <div className="mb-3 d-flex">
                                    <h5>Todo List</h5>
                                    <Button className="ms-auto btn-sm" variant="primary" onClick={handleShow}>
                                        Add Task
                                    </Button>
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <Table striped bordered hover className='p-0 m-0'>
                                    <thead>
                                        <tr>
                                            <th width="10%">#</th>
                                            <th>Task</th>
                                            <th width="15%" className='text-center'>Start Date</th>
                                            <th width="15%" className='text-center'>End Date</th>
                                            <th width="10%" className='text-center'>Status</th>
                                            <th width="30%">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            todoList?.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{((todoListAllData.current_page - 1) * todoListAllData.per_page)+ (index + 1)}</td>
                                                    <td>{item.title}</td>
                                                    <td className='text-center'>{item.start_date}</td>
                                                    <td className='text-center'>{item.end_date}</td>
                                                    <td className='text-center'>{
                                                        item.status === 1 ? <Badge bg="success">Active</Badge> : <Badge bg="danger">InActive</Badge>
                                                    }</td>
                                                    <td>
                                                        {
                                                            item.status === 1 ? <Button variant="danger" className='btn-sm'>InActive</Button> : <Button variant="primary" className='btn-sm'>Active</Button>
                                                        }{' '}
                                                        <Button variant="primary" className='btn-sm'>Edit</Button>{' '}
                                                        <Button variant="danger" className='btn-sm'>Delete</Button>{' '}
                                                    </td>
                                                </tr>
                                            )

                                        }
                                    </tbody>
                                    <Pagination className='pt-4'>
                                        {
                                            todoListAllData?.links?.map((item, index) =>{
                                                if(item.url != null){
                                                    return(
                                                        <Pagination.Item 
                                                            active={item.active}
                                                        onClick={()=>paginationData(item)}
                                                        key={index}>{item.label === 'Next &raquo;' ? <span aria-hidden="true">&raquo;</span> : item.label === '&laquo; Previous' ? <span aria-hidden="true">&laquo;</span> : item.label}
                                                        </Pagination.Item>
                                                    )
                                                }else{
                                                    return null;
                                                }
                                            })
                                        }
                                    </Pagination>
                                </Table>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Form onSubmit={createTodo} encType="multipart/form-data">
                        <Modal.Header closeButton>
                        <Modal.Title>Add task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" onChange={titleData}  placeholder="Enter Title" />
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" onChange={startDateData}  placeholder="Enter start date" />
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" onChange={endDateData}  placeholder="Enter start date" />
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task File</Form.Label>
                            <Form.Control type="file" multiple  accept="image/*" onChange={fileData}  placeholder="Select task file." />
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={descriptionData} as="textarea" rows={2} placeholder="Enter task description" style={{ height: '100px' }} />
                        </Form.Group>  

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary">Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Row>
    );
};

export default Todo;