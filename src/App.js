
// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleSave = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm selectedTask={selectedTask} onSave={handleSave} onClear={() => setSelectedTask(null)} />
      <TaskList onEdit={handleEdit} />
    </div>
  );
};

export default App;
