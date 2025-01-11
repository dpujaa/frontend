import React, { useState } from 'react';
import TaskItem from './TaskItem';
import '../App.css';

const TaskList = ({ tasks, onDelete, onEdit }) => {
    const [sortOption, setSortOption] = useState('priority'); //default is sorting by priority

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortOption === 'priority') {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortOption === 'dueDate') {
            const dateA = new Date(a.dueDate || '9999-12-31'); //handle tasks with no due date
            const dateB = new Date(b.dueDate || '9999-12-31');
            return dateA - dateB;
        }
        return 0; //default
    });

    return (
        <div>
            <h2 className='tasklisthead'>Task List</h2>

            {/* Dropdown for Sorting Options */}
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
            </select>

            {sortedTasks.length > 0 ? (
                sortedTasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
};

export default TaskList;
