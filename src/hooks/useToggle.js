import { useState } from "react";

export default function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return { on, toggle: () => setOn(!on) };
}
