import React from 'react';

const TaskItem = ({ task, onDelete, onEdit }) => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
            <div className='task-buttons'>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task._id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;
