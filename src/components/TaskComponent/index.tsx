import { Check, DotsThree, Trash } from "@phosphor-icons/react/dist/ssr";

interface TaskProps {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    toggleTaskStatus: (id: number) => void;
    handleOpenModal: (id: number) => void;
    handleDeleteTask: (id: number) => void;
    
}

export default function TaskComponent({ id, title, description, completed, toggleTaskStatus, handleOpenModal, handleDeleteTask}: TaskProps) {
    return (
        <li key={Math.floor(Math.random() * 10000)} className="flex flex-row items-center justify-between w-full px-4 py-3 bg-slate-100 dark:bg-zinc-800 border dark:border-t-zinc-600 dark:border-r-zinc-700 dark:border-l-zinc-700 dark:border-b-zinc-700 rounded-md">
            <div className="flex flex-row items-center justify-start gap-3">
                <button
                    className={`${completed ? "bg-emerald-600 dark:bg-emerald-800 hover:bg-emerald-600 dark:hover:bg-emerald-900 text-slate-100 dark:text-zinc-200 border-emerald-600 dark:border-emerald-800" : "text-emerald-700 dark:text-emerald-500"} border-2 border-zinc-800 dark:border-zinc-300 outline-none rounded-full p-1 active:brightness-90 transition-all`}
                    onClick={() => toggleTaskStatus(id)}
                >
                    <Check className={`w-4 h-4 ${!completed && 'text-transparent'}`} weight="bold" />
                </button>
                <div className="flex flex-col items-start justify-start gap-0">
                    <h4 className={`text-lg font-normal text-slate-900 dark:text-gray-100 ${completed && "opacity-50 line-through"}`}>{title}</h4>
                    <span className={`text-sm font-normal text-slate-500 dark:text-gray-400 ${completed && "opacity-50 line-through"}`}>{description}</span>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
                <button
                    className="text-slate-900 dark:text-zinc-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 active:brightness-90 transition-all"
                    onClick={() => handleOpenModal(id)}
                >
                    <DotsThree className="w-6 h-6 text-slate-900 dark:text-zinc-200" weight="regular" />
                </button>
                <button
                    className="text-slate-900 dark:text-zinc-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 active:brightness-90 transition-all"
                    onClick={() => handleDeleteTask(id)}
                >
                    <Trash className="w-6 h-6 text-slate-900 dark:text-zinc-200" weight="regular" />
                </button>
            </div>
        </li>
    )
}