import type { IApplication } from "@/types/applications";
import { Card } from "./card";
import { useDroppable } from "@dnd-kit/core";

export const Column = ({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: IApplication[];
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="w-64 bg-gray-100 p-3 rounded">
      <h3 className="font-bold mb-2">{title}</h3>

      {items.map((item) => (
        <Card key={item._id} app={item} />
      ))}
    </div>
  );
};
