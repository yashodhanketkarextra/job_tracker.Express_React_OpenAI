import type { IApplication } from "@/types/applications";
import { useDraggable } from "@dnd-kit/core";

export const Card = ({ app }: { app: IApplication }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: app._id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-3 rounded shadow mb-2"
    >
      <h4 className="font-semibold">{app.company}</h4>
      <p className="text-sm">{app.role}</p>
    </div>
  );
};
