import { useDroppable } from "@dnd-kit/core";

import type { IApplication } from "@/types/applications";

import { Card } from "./card";

interface ColumnProps {
  id: string;
  title: string;
  items: IApplication[];
}

export const Column = ({ id, title, items }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: id });

  return (
    <div
      ref={setNodeRef}
      className="w-full xl:w-64 bg-zinc-200 p-3 rounded flex-col flex gap-2"
    >
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="flex flex-row xl:flex-col gap-2 flex-wrap">
        {items.map((item) => (
          <Card key={item._id} app={item} />
        ))}
      </div>
    </div>
  );
};
