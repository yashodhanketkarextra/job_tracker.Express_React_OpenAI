import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { Column } from "@/features/application/column";
import { useApps } from "@/store/query";
import { type Status, statuses } from "@/types/applications";

import { CreateApplication } from "./create";

const BoardPage = () => {
  const { getAppsQuery, updateStatusMutation } = useApps();
  const { data = [], isLoading } = getAppsQuery;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const appId = active.id as string;
    const newStatus = over?.id as Status;
    const oldStatus = active?.data?.current?.status;
    if (oldStatus && oldStatus === newStatus) return;

    updateStatusMutation.mutate({ id: appId, status: newStatus });
  };

  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <CreateApplication />
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensor}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col xl:flex-row gap-4 p-4 justify-center">
          {statuses.map((status) => (
            <Column
              id={status}
              key={status}
              title={status}
              items={data.filter((a) => a.status === status)}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default BoardPage;
