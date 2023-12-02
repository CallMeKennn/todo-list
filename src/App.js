import { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setAllTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedToDos, setCompletedToDos] = useState([]);

    useEffect(() => {
        const saveDataTodo = JSON.parse(localStorage.getItem("todoList"))
        const saveDataTodoCompleted = JSON.parse(localStorage.getItem("todoComplete"))
        if(saveDataTodo){
            setAllTodos(saveDataTodo)
        } 
        
        if (saveDataTodoCompleted) {
            setCompletedToDos(saveDataTodoCompleted)
        }
    }, [])

    const handleChangeTitle = (event) => {
        setNewTitle(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setNewDescription(event.target.value);
    };

    const handleClick = () => {
            setAllTodos([...allTodos, { title: newTitle, description: newDescription }]);
            setNewTitle("");
            setNewDescription("");
            localStorage.setItem("todoList", JSON.stringify([...allTodos, { title: newTitle, description: newDescription }]))
        };

    const handleDelete = (index) => {
        const todoList = [...allTodos];
        todoList.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList))
        setAllTodos(todoList);
    };

    const handleComplete = (index) => {
        let time = new Date();  
        let completeOn = `Completed at: ${time.getDay()}-${time.getMonth()}-${time.getFullYear()} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        let completedToDoItem = {
            ...allTodos[index],
            completeOn: completeOn,
        };
        setCompletedToDos([...completedToDos, completedToDoItem]);
        handleDelete(index);
        localStorage.setItem("todoComplete", JSON.stringify([...completedToDos, completedToDoItem]))
    };

    const handleCompleteTodoCompleted = (index) => {
        const todoCompleteed = [...completedToDos];
        todoCompleteed.splice(index, 1);
        localStorage.setItem('todoComplete', JSON.stringify(todoCompleteed))
        setCompletedToDos(todoCompleteed)

    }

    return (
        <div className="App">
            <h1>My Todos</h1>

            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="What's the task title?"
                            value={newTitle}
                            onChange={handleChangeTitle}
                        />
                    </div>
                    <div className="todo-input-item">
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="What's the task title?"
                            value={newDescription}
                            onChange={handleChangeDescription}
                        />
                    </div>
                    <div className="todo-input-item">
                        <button type="button" className="primaryBtn" onClick={handleClick}>
                            Add
                        </button>
                    </div>
                </div>

                <div className="btn-area">
                    <button
                        className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
                        onClick={() => {
                            setIsCompleteScreen(false);
                        }}
                    >
                        Todo
                    </button>
                    <button
                        className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
                        onClick={() => {
                            setIsCompleteScreen(true);
                        }}
                    >
                        Completed
                    </button>
                </div>

                <div className="todo-list">
                    {isCompleteScreen === false && allTodos.map((todo, index) => (
                        <div className="todo-list-item">
                            <div key={index}>
                                <h3>{todo.title}</h3>
                                <p>{todo.description}</p>
                            </div>
                            <div>
                                <AiOutlineDelete
                                    className="icon"
                                    key={index}
                                    onClick={() => {
                                        handleDelete(index);
                                    }}
                                />
                                <BsCheckLg
                                    className="check-icon"
                                    key={index}
                                    onClick={() => {
                                        handleComplete(index);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="todo-list">
                    {isCompleteScreen === true && completedToDos.map((completed, index) => (
                        <div className="todo-list-item">
                            <div key={index}>
                                <h3>{completed.title}</h3>
                                <p>{completed.description}</p>
                                <p><small>{completed.completeOn}</small></p>
                            </div>
                            <div>
                                <AiOutlineDelete
                                    className="icon"
                                    key={index}
                                    onClick={() => {
                                        handleCompleteTodoCompleted(index);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
