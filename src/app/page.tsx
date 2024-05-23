'use client'

import DetailsModal from "@/components/DetailsModal";
import { Check, DotsThree, Info, Plus, Trash, X } from "@phosphor-icons/react/dist/ssr";
import { FormEvent, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddTask = (event: FormEvent, { title, description }: { title: string, description: string }) => {
    event.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: taskList.length + 1,
      title,
      description,
      completed: false,
    };

    setTaskTitle('');
    setTaskList([...taskList, newTask]);
  }

  const handleEditTask = (id: number, { title, description }: { title: string, description: string }) => {
    setTaskList(taskList.map((task) => {
      if (task.id === id) {
        task.title = title;
        task.description = description;
      }
      return task;
    }));
  }

  const toggleTaskStatus = (id: number) => {
    setTaskList(taskList.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    }));
  }

  const handleDeleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    setIsModalOpen(false);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-start gap-2 p-4 dark:border-gray-900 min-h-80 min-w-[32rem]">
        <h1 className="text-2xl font-medium text-center text-slate-900 dark:text-cyan-500">grand to do</h1>

        <form
          className="flex flex-row items-center justify-center w-full p-4 gap-2"
          onSubmit={(event: FormEvent) => handleAddTask(event, { title: taskTitle, description: '' })}
        >
          <input
            type="text"
            className="bg-slate-100 dark:bg-zinc-800 border dark:border-t-zinc-600 dark:border-r-zinc-700 dark:border-l-zinc-700 dark:border-b-zinc-700 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-gray-600 rounded-md py-2 px-3 w-full transition-all"
            placeholder="New task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button
            className="bg-cyan-500 dark:bg-cyan-800 hover:bg-cyan-600 dark:hover:bg-cyan-900 border dark:border-t-cyan-600 dark:border-r-cyan-700 dark:border-l-cyan-600 dark:border-b-cyan-700 outline-none rounded-full p-2 active:brightness-90 transition-all"
            type="submit"
          >
            <Plus className="w-6 h-6 text-slate-900 dark:text-zinc-200" weight="regular" />
          </button>
        </form>

        <ul className="flex flex-col items-center justify-start w-full p-4 gap-2">
          {taskList.map((task) => (
            <>
              <DetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                id={task.id}
                title={task.title}
                description={task.description}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <li className="flex flex-row items-center justify-between w-full px-4 py-3 bg-slate-100 dark:bg-zinc-800 border dark:border-t-zinc-600 dark:border-r-zinc-700 dark:border-l-zinc-700 dark:border-b-zinc-700 rounded-md">
                <div className="flex flex-row items-center justify-start gap-3">
                  <button
                    className={`${task.completed ? "bg-emerald-500 dark:bg-emerald-800 hover:bg-emerald-600 dark:hover:bg-emerald-900 text-slate-900 dark:text-zinc-200" : "text-emerald-700 dark:text-emerald-500"} border-2 dark:border-t-emerald-600 dark:border-r-emerald-700 dark:border-l-emerald-600 dark:border-b-emerald-700 outline-none rounded-full p-1 active:brightness-90 transition-all`}
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    <Check className="w-4 h-4" weight="bold" />
                  </button>
                  <div className="flex flex-col items-start justify-start gap-0">
                    <h4 className={`text-lg font-normal text-slate-900 dark:text-gray-100 ${task.completed && "opacity-50 line-through"}`}>{task.title}</h4>
                    <span className={`text-sm font-normal text-slate-500 dark:text-gray-400 ${task.completed && "opacity-50 line-through"}`}>{task.description}</span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-1">
                  <button
                    className="text-slate-900 dark:text-zinc-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 active:brightness-90 transition-all"
                    onClick={handleOpenModal}
                  >
                    <DotsThree className="w-6 h-6 text-slate-900 dark:text-zinc-200" weight="regular" />
                  </button>
                  <button
                    className="text-slate-900 dark:text-zinc-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 active:brightness-90 transition-all"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash className="w-6 h-6 text-slate-900 dark:text-zinc-200" weight="regular" />
                  </button>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </main>
  );
}
