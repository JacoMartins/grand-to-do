import { Check, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { FormEvent, MouseEvent, createRef, useState } from "react";

interface EditableInputProps {
  label: string;
  value: string;
  onChange: (value: string, key: string) => void;
}

function EditableInput({ label, value, onChange }: EditableInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = createRef<HTMLInputElement>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsEditing(false);

    if (inputRef.current) {
      inputRef.current.disabled = true;
    }

    onChange(inputValue, label.toLowerCase());
  };

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    setIsEditing(true);

    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }

  };

  return (
    <div className='flex flex-col items-start justify-start gap-1 w-full'>
      <span className="text-xs font-medium text-slate-500 dark:text-gray-400">{label}</span>

      <form
        className='flex flex-row items-center justify-between gap-1 w-full'
        onSubmit={handleFormSubmit}
      >
        <input
          className="text-base font-normal text-slate-900 dark:text-zinc-200 outline-none bg-transparent w-full"
          defaultValue={inputValue}
          placeholder={`No ${label.toLowerCase()} provided.`}
          onChange={handleInputChange}
          disabled
          ref={inputRef}
        />

        {
          isEditing ?
            <button
              className='text-slate-900 dark:text-zinc-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 active:brightness-90 transition-all'
              type="submit"
            >
              <Check className="w-5 h-5 text-slate-900 dark:text-zinc-200" weight="regular" />
            </button>
            :
            <button
              className='text-slate-900 dark:text-zinc-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 active:brightness-90 transition-all'
              type="button"
              onClick={handleEdit}
            >
              <PencilSimple className="w-5 h-5 text-slate-900 dark:text-zinc-200" weight="regular" />
            </button>
        }
      </form>
    </div>
  )
}

export default EditableInput;