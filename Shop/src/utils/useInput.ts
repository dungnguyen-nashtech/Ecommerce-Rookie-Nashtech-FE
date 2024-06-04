import { useState } from "react";

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: any) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}