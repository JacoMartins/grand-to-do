import { createRef, useState } from "react"

interface InputHooksProps {
    value: string
}

export const InputHooks = ({ value }: InputHooksProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(value)
    const inputRef = createRef<HTMLInputElement>()

    return {
        isEditing,
        inputValue,
        inputRef,
        setIsEditing,
        setInputValue
    }
}