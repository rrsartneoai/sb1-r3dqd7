import React from 'react';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={() =>
                  onTaskUpdate({
                    ...task,
                    status: task.status === 'completed' ? 'todo' : 'completed',
                  })
                }
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <h3
                  className={`text-lg font-medium ${
                    task.status === 'completed' ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AlertCircle
                className={`h-5 w-5 ${getPriorityColor(task.priority)}`}
              />
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}