import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { PomodoroSettings } from '../types';

interface PomodoroProps {
  settings: PomodoroSettings;
}

export function Pomodoro({ settings }: PomodoroProps) {
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [session, setSession] = useState(1);

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWork) {
        if (session % settings.sessionsBeforeLongBreak === 0) {
          setTimeLeft(settings.longBreakDuration * 60);
        } else {
          setTimeLeft(settings.breakDuration * 60);
        }
        setSession((s) => s + 1);
      } else {
        setTimeLeft(settings.workDuration * 60);
      }
      setIsWork(!isWork);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWork, session, settings]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings.workDuration * 60);
    setIsWork(true);
    setSession(1);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        {isWork ? 'Work Time' : 'Break Time'}
      </h2>
      <div className="text-5xl font-mono mb-6">
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" /> Start
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" /> Reset
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Session {session} / {settings.sessionsBeforeLongBreak}
      </div>
    </div>
  );
}