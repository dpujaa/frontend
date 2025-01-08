import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';

const TaskForm = ({ selectedTask, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Low',
        dueDate: '',
        completed: false,
    });

    useEffect(() => {
        if (selectedTask) {
            setFormData(selectedTask); // Load the selected task into the form
        } else {
            clearForm(); // Clear the form if no task is selected
        }
    }, [selectedTask]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedTask) {
                // Update an existing task
                await updateTask(selectedTask._id, formData);
            } else {
                // Add a new task
                const newTask = await createTask(formData);
                onSave(newTask.data); // Notify parent component of the new task
            }
            clearForm(); // Clear the form after submission
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const clearForm = () => {
        setFormData({
            title: '',
            description: '',
            priority: 'Low',
            dueDate: '',
            completed: false,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedTask ? 'Edit Task' : 'Create Task'}</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
            />
            <label>
                Completed:
                <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
            {selectedTask && (
                <button type="button" onClick={clearForm}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default TaskForm;
