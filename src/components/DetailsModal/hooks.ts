import { useState } from "react"

interface EditableInputOuterHooksArgs {
  title: string;
  description: string;
}

export const EditableInputOuterHooks = ({ title, description }: EditableInputOuterHooksArgs) => {
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);

  return {
    titleValue,
    setTitleValue,
    descriptionValue,
    setDescriptionValue,
  }
}