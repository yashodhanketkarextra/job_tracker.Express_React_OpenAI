import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "@/features/application/api";
import { Column } from "@/features/application/column";
import { statuses } from "@/types/applications";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppStatus } from "@/features/application/api";
import { Header } from "@/components/header";

const BoardPage = () => {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: any) => updateAppStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const appId = active.id as string;
    const newStatus = over?.id as string;

    mutation.mutate({ id: appId, status: newStatus });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-4">
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
