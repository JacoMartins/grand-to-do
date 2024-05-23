import { Pencil } from '@phosphor-icons/react';
import { PencilSimple, X } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';
import ReactModal from 'react-modal';
import EditableInput from './EditableInput';

interface DetailsModalProps {
  isOpen: boolean;
  id: number;
  title: string;
  description: string;
  onClose: () => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, { title, description }: { title: string, description: string }) => void;
}

function DetailsModal({ isOpen, id, title, description, onClose, onDeleteTask, onEditTask}: DetailsModalProps) {
  const [titleValue, setTitleValue] = useState<string>(title);
  const [descriptionValue, setDescriptionValue] = useState<string>(description);

  const handleEditChange = (value: string, key: string) => {
    if (key === 'title') {
      setTitleValue(value);
      onEditTask(id, { title: value, description: descriptionValue });
    } else {
      setDescriptionValue(value);
      onEditTask(id, { title: titleValue, description: value });
    }
  }

  ReactModal.setAppElement('body');

  return (
    <ReactModal
      isOpen={isOpen}
      className="flex flex-col bg-slate-200 dark:bg-zinc-800 dark:border-gray-900 lg:w-[32rem] rounded-md"
      overlayClassName="fixed flex flex-col items-center justify-center gap-2 inset-0 z-50 bg-black/50"
      onRequestClose={onClose}
    >
      <div className="flex flex-row items-center justify-between p-2">
        <div className="flex flex-col items-center justify-center gap-1 pl-2">
          <h3 className="text-lg font-normal text-center text-slate-900 dark:text-zinc-200">Task Details</h3>
        </div>
        <button className="text-slate-900 dark:text-zinc-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 active:brightness-90 transition-all" onClick={onClose}>
          <X className="w-5 h-5 text-slate-900 dark:text-zinc-200" weight="bold" />
        </button>
      </div>
      <div className="flex flex-col items-start justify-center gap-8 p-4">
        <div className='flex flex-col items-start justify-start gap-2 w-full'>
          <EditableInput
            label="Title"
            value={titleValue}
            onChange={handleEditChange}
          />
          <EditableInput
            label="Description"
            value={descriptionValue}
            onChange={handleEditChange}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <button
            className="bg-cyan-500 dark:bg-cyan-800 hover:bg-cyan-600 dark:hover:bg-cyan-900 border dark:border-t-cyan-600 dark:border-r-cyan-700 dark:border-l-cyan-600 dark:border-b-cyan-700 outline-none rounded-md py-2 px-2.5 active:brightness-90 transition-all w-full"
            onClick={() => onDeleteTask(id)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default DetailsModal;