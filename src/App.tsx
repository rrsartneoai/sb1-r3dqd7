import React, { useState } from 'react';
import { Clock, ListTodo, BarChart3 } from 'lucide-react';
import { TaskList } from './components/TaskList';
import { Pomodoro } from './components/Pomodoro';
import type { Task, PomodoroSettings } from './types';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and review the Q2 project proposal',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-03-25',
    timeSpent: 120,
  },
  {
    id: '2',
    title: 'Team meeting',
    description: 'Weekly sync with development team',
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-03-22',
    timeSpent: 0,
  },
];

const pomodoroSettings: PomodoroSettings = {
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Bold New</h1>
            </div>
            <nav className="flex space-x-4">
              <a
                href="#tasks"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <ListTodo className="h-4 w-4 mr-1" />
                Tasks
              </a>
              <a
                href="#analytics"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Analytics
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>
              <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
            </div>
          </div>
          <div>
            <Pomodoro settings={pomodoroSettings} />
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Tasks</span>
                  <span className="font-semibold">{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold">
                    {tasks.filter((t) => t.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-semibold">
                    {tasks.filter((t) => t.status === 'in-progress').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;