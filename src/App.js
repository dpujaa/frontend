import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

const App = () => {
    const [tasks, setTasks] = useState([]); // State to store all tasks
    const [selectedTask, setSelectedTask] = useState(null); // Track task being edited

    useEffect(() => {
        loadTasks();
    }, []);

    // Fetch all tasks from the API
    const loadTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data); // Update the tasks state
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    // Handle adding a new task
    const handleTaskAdded = async (formData) => {
        try {
            const newTask = await createTask(formData);
            setTasks((prevTasks) => [...prevTasks, newTask.data]); // Add new task to state
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Handle updating an existing task
    const handleTaskUpdated = async (formData) => {
        try {
            const updatedTask = await updateTask(selectedTask._id, formData);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask.data._id ? updatedTask.data : task
                )
            );
            setSelectedTask(null); // Clear the selected task after updating
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Handle deleting a task
    const handleDelete = async (id) => {
        try {
            await deleteTask(id); // Call API to delete the task
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Remove from state
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Handle selecting a task for editing
    const handleEdit = (task) => {
        setSelectedTask(task); // Set the task to be edited
    };

    return (
        <div>
            <h1>Task Manager</h1>
            {/* Render TaskForm for adding or editing tasks */}
            <TaskForm
                selectedTask={selectedTask}
                onSave={selectedTask ? handleTaskUpdated : handleTaskAdded}
            />
            {/* Render TaskList to display all tasks */}
            <TaskList
                tasks={tasks}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
};

export default App;
