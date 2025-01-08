import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null); // Track the task being edited

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setSelectedTask(null); // Clear selection after adding/updating a task
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
        setSelectedTask(null); // Clear selection after updating
    };

    const handleEdit = (task) => {
        setSelectedTask(task); // Set the task to be edited
    };

    return (
        <div>
            <h2>Task Manager</h2>
            {/* Render TaskForm once */}
            <TaskForm selectedTask={selectedTask} onSave={handleTaskAdded} />
            
            <h2>Task List</h2>
            {tasks.map((task) => (
                <TaskItem 
                    key={task._id} 
                    task={task} 
                    onDelete={handleDelete} 
                    onEdit={handleEdit} // Pass the edit function
                />
            ))}
        </div>
    );
};

export default TaskList;
