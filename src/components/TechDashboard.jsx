import React, { useState } from 'react';
import { Form, Button, Table, Container, Navbar, Nav, NavDropdown, Row, Col } from 'react-bootstrap';

const TechDashboard = () => {
  const [issue, setIssue] = useState({
    name: '',
    title: '',
    dateReported: '',
    department: '',
    priorityLevel: '',
    
  });

  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('All'); // Add state for filtering

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIssues([...issues, issue]);
    setIssue({
      name: '',
      title: '',
      dateReported: '',
      department: '',
      priorityLevel: '',
    });
  };

  const handleDeleteIssue = (index) => {
    setIssues(issues.filter((_, i) => i !== index));
  };

  const handleViewIssue = (index) => {
    alert(`Viewing issue at index ${index}`);
  };

  const handleStatusIssue = (index) => {
    alert(`Updating status of issue at index ${index}`);
  };

  const filteredIssues = issues.filter(issue => 
    filter === 'All' || issue.priorityLevel === filter
  );

  return (
    <Container>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="#">ALL ISSUES</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Filters" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setFilter('All')}>All</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilter('High')}>High</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilter('Medium')}>Medium</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setFilter('Low')}>Low</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Issue Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="align-items-end">
          <Col md={2}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                name="name"
                value={issue.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formTitle">
              <Form.Control
                type="text"
                name="title"
                value={issue.title}
                onChange={handleChange}
                placeholder="Issue Title"
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formDateReported">
              <Form.Control
                type="date"
                name="dateReported"
                value={issue.dateReported}
                onChange={handleChange}
                placeholder="Date Reported"
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formDepartment">
              <Form.Control
                type="text"
                name="department"
                value={issue.department}
                onChange={handleChange}
                placeholder="Department"
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formPriorityLevel">
              <Form.Control
                type="text"
                name="priorityLevel"
                value={issue.priorityLevel}
                onChange={handleChange}
                placeholder="Priority Level"
                required
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="primary" type="submit" className="w-100">
              Add Issue
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Issue Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Issue Title</th>
            <th>Date Reported</th>
            <th>Department</th>
            <th>Priority Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue, index) => (
            <tr key={index}>
              <td>{issue.name}</td>
              <td>{issue.title}</td>
              <td>{new Date(issue.dateReported).toLocaleDateString()}</td>
              <td>{issue.department}</td>
              <td>{issue.priorityLevel}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewIssue(index)}
                  className="me-2"
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleStatusIssue(index)}
                  className="me-2"
                >
                  Status
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteIssue(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TechDashboard;
