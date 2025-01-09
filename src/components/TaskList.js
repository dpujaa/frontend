import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/api';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            {tasks.map((task) => (
                <TaskItem 
                    key={task._id} 
                    task={task} 
                    onDelete={handleDelete} 
                    onEdit={onEdit} 
                />
            ))}
        </div>
    );
};

export default TaskList;
