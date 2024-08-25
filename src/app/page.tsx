'use client'

import DetailsModal from "@/components/DetailsModal";
import TaskComponent from "@/components/TaskComponent";
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
  const [currentItem, setCurrentItem] = useState<Task>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddTask = (event: FormEvent, { title, description }: { title: string, description: string }) => {
    event.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title,
      description,
      completed: false,
    };

    setTaskTitle('');
    setTaskList(list => [...list, newTask])
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

  const handleOpenModal = (id: number) => {
    const foundCurrentItem = taskList.find(item => item.id === id)

    if (foundCurrentItem) {
      setCurrentItem(foundCurrentItem)
    }

    setIsModalOpen(true);
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 dark:bg-zinc-900">
      {(isModalOpen && currentItem) && (
        <DetailsModal
          isOpen={isModalOpen}
          id={currentItem.id}
          title={currentItem.title}
          description={currentItem.description}
          onClose={() => setIsModalOpen(false)}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      )}

      <div className="flex flex-col items-center justify-start gap-2 p-4 dark:border-gray-900 min-h-80 lg:min-w-[32rem]">
        <h1 className="text-2xl font-medium text-center text-slate-900 dark:text-cyan-500">grand to do</h1>

        <form
          className="flex flex-row items-center justify-center w-full p-4 gap-2"
          onSubmit={(event: FormEvent) => handleAddTask(event, { title: taskTitle, description: '' })}
        >
          <input
            type="text"
            className="bg-slate-100 dark:bg-zinc-800 border dark:border-t-zinc-600 dark:border-r-zinc-700 dark:border-l-zinc-700 dark:border-b-zinc-700 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 focus:ring-cyan-600 dark:focus:ring-2 dark:focus:ring-offset-2 dark:focus:ring-offset-zinc-800 dark:focus:ring-gray-600 rounded-md py-2 px-3 w-full transition-all"
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

        <ul className="flex flex-col items-center justify-start w-full p-4 gap-2 overflow-y-auto h-max lg:max-h-[18rem] md:max-h-[16rem] sm:max-h-[14rem] dark:border-gray-900">
          {taskList.map((task) => (
            <TaskComponent
              key={Math.floor(Math.random() * 10000)}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              toggleTaskStatus={toggleTaskStatus}
              handleOpenModal={handleOpenModal}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
