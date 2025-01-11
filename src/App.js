import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './App.css';


const App = () => {
    const [tasks, setTasks] = useState([]); //state to store all tasks
    const [selectedTask, setSelectedTask] = useState(null); //track task being edited

    useEffect(() => {
        loadTasks();
    }, []);

    //fetch all tasks from the API
    const loadTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data); //update the tasks state
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    //handle adding a new task
    const handleTaskAdded = async (formData) => {
        try {
            const newTask = await createTask(formData);
            setTasks((prevTasks) => [...prevTasks, newTask.data]); //add new task to state
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    //handle updating an existing task
    const handleTaskUpdated = async (formData) => {
        try {
            const updatedTask = await updateTask(selectedTask._id, formData);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask.data._id ? updatedTask.data : task
                )
            );
            setSelectedTask(null); //clear the selected task after updating
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    //handle deleting a task
    const handleDelete = async (id) => {
        try {
            await deleteTask(id); //call API to delete the task
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); //remove from state
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    //handle selecting a task for editing
    const handleEdit = (task) => {
        setSelectedTask(task); //set the task to be edited
    };

    return (
        <div className='FullPage'>
          <header className="title">
            <h1>task manager</h1>
          </header>

            {/*TaskForm section */}
            <TaskForm
                selectedTask={selectedTask}
                onSave={selectedTask ? handleTaskUpdated : handleTaskAdded}
            />
            {/*TaskList section*/}
            <TaskList
                tasks={tasks}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
};

export default App;
