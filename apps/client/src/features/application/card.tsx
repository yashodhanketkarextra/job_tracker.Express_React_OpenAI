import { useDraggable } from "@dnd-kit/core";

import type { IApplication } from "@/types/applications";

interface CardProps {
  app: IApplication;
}

export const Card = ({ app }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: app._id,
    data: { status: app.status },
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
      className="bg-white p-3 rounded shadow mb-2 w-60 h-24 xl:w-auto flex-grow max-w-1/2 lg:max-w-1/3 xl:max-w-none"
    >
      <h4 className="font-semibold">{app.company}</h4>
      <p className="text-sm">{app.role}</p>
      <span className="text-xs">
        {app.dateApplied ? new Date(app.dateApplied).toLocaleDateString() : ""}
      </span>
    </div>
  );
};
