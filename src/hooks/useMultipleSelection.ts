import { useState, useRef } from "react";

interface UseMultipleSelectionProps<TData, TId extends string | number> {
  data: TData[];
  getId: (item: TData) => TId;
}

export function useMultipleSelection<TData, TId extends string | number>({
  data,
  getId,
}: UseMultipleSelectionProps<TData, TId>) {
  const [selected, setSelected] = useState<Set<TId>>(() => new Set());
  const lastSelectedId = useRef<TId | null>(null);

  const handleToggle = (id: TId) => (event: React.MouseEvent<HTMLElement>) => {
    if (lastSelectedId.current === null) {
      lastSelectedId.current = id;
    }

    if (event.shiftKey) {
      const currentIndex = data.findIndex((item) => getId(item) === id);
      const lastSelectedIndex = data.findIndex((item) => getId(item) === lastSelectedId.current);

      if (currentIndex === -1 || lastSelectedIndex === -1) {
        return;
      }

      const startIndex = Math.min(currentIndex, lastSelectedIndex);
      const endIndex = Math.max(currentIndex, lastSelectedIndex);

      setSelected((prev) => {
        const newSelected = new Set(prev);
        const currentSelected = newSelected.has(id);

        data.slice(startIndex, endIndex + 1).forEach((item) => {
          if (currentSelected) {
            newSelected.delete(getId(item));
          } else {
            newSelected.add(getId(item));
          }
        });

        return newSelected;
      });
    } else {
      setSelected((prev) => {
        const newSelected = new Set(prev);
        newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
        return newSelected;
      });
    }

    lastSelectedId.current = id;
  };

  return {
    selected,
    handleToggle,
  };
}
