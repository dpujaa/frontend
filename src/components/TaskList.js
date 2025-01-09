import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onEdit }) => {
    return (
        <div>
            <h2>Task List</h2>
            {tasks.length > 0 ? (
                tasks.map((task) => (
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
