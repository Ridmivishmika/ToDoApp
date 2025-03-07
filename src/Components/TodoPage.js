import { FormControl, Button, InputGroup, Row, Col, Table, Badge, Pagination, Modal, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import Navigationbar from "./Navigatiobar";

function ToDoPage() {
    const [todoList, setTodoList] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModel, setShowModel] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const itemsPerPage = 5;
    const maxPagesToShow = 5;

    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/todos";

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error");
                }
                return response.json();
            })
            .then((jsonData) => {
                setTodoList(jsonData);
                setFilteredTodos(jsonData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const TodoClick = (todo) => {
        setSelectedTodo(todo);
        setShowModel(true);
    };

    const CloseTodo = () => {
        setShowModel(false);
        setSelectedTodo(null);
    };

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentTodos = filteredTodos.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="border"  className="text-custom-purple" /></div>;
    if (error) return <div className="d-flex justify-content-center align-items-center vh-100"><p className="text-danger fs-4">Error: {error}</p></div>;

    return (
        <div className="bg-custom-pink  "style={{ padding: "5%" }}>
            <Navigationbar />
            <Row className="pt-5">
                <Col>
                    <h2 className="fw-bold text-custom-purple">To-Do Dashboard</h2>
                </Col>
            </Row>
            <Table hover responsive className="text-center custom-table">
                <thead className="text-white bg-custom-purple">
                    <tr>
                        <th className="py-3">ID</th>
                        <th className="py-3">User ID</th>
                        <th className="py-3">Title</th>
                        <th className="py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="text-white bg-custom-purple">
                    {currentTodos.map((todo) => (
                        <tr key={todo.id} className="align-middle text-white bg-custom-purple"
                            onClick={() => TodoClick(todo)}
                            style={{ cursor: "pointer" }}>
                            <td className="py-3">{todo.id}</td>
                            <td className="py-3">{todo.userId}</td>
                            <td>{todo.title}</td>
                            <td>
                                <Badge bg={todo.completed ? "success" : "danger"} className="p-2">
                                    {todo.completed ? "Completed" : "Pending"}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className="justify-content-center pb-5">
    <Pagination.Prev 
        disabled={currentPage === 1} 
        onClick={() => changePage(currentPage - 1)} 
    />

    {(() => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Pagination.Item 
                    key={i} 
                    active={i === currentPage} 
                    onClick={() => changePage(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return pageNumbers;
    })()}

    <Pagination.Next 
        disabled={currentPage === totalPages} 
        onClick={() => changePage(currentPage + 1)} 
    />
</Pagination>

<Modal show={showModel} onHide={CloseTodo} centered className="custom-modal">
    <Modal.Header className="bg-custom-model rounded-top pt-5 pe-5 ps-5" closeButton>
        <Modal.Title>To-Do Details</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-custom-model  rounded-bottom pb-5 pe-5 ps-5"> 
        {selectedTodo && (
            <>
                <p><strong>ID:</strong> {selectedTodo.id}</p>
                <p><strong>User ID:</strong> {selectedTodo.userId}</p>
                <p><strong>Title:</strong> {selectedTodo.title}</p>
                <p>
                    <strong>Status:</strong>{" "}
                    <Badge bg={selectedTodo.completed ? "success" : "danger"}>
                        {selectedTodo.completed ? "Completed" : "Pending"}
                    </Badge>
                </p>
            </>
        )}
    </Modal.Body>
</Modal>




        </div>
    );
}

export default ToDoPage;