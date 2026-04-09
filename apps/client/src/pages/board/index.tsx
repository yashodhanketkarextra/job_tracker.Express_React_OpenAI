import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchApps } from "@/features/application/api";
import { updateAppStatus } from "@/features/application/api";
import { Column } from "@/features/application/column";
import { type Status, statuses } from "@/types/applications";

import { CreateApplication } from "./create";

const BoardPage = () => {
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateAppStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const appId = active.id as string;
    const newStatus = over?.id as Status;
    const oldStatus = active?.data?.current?.status;
    if (oldStatus && oldStatus === newStatus) return;

    mutation.mutate({ id: appId, status: newStatus });
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
