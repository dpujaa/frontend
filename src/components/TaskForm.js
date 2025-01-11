import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';
import '../App.css';

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
            setFormData(selectedTask); //fill the form to edit
        } else {
            clearForm(); //clear the form for a new task
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
            await onSave(formData); //call onSave callback with form data
            clearForm();
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
            <h2 className='createtaskhead'>{selectedTask ? 'Edit Task' : 'Create Task'}</h2>
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
            <div className='checkbox-container'>
            <label>
                Completed:
                <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                />
            </label>
            </div>
            <div className='taskform-buttons'>
                <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
                {selectedTask && (
                    <button type="button" onClick={clearForm}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
