import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { ApplicationModal } from "@/components/applicationModal";
import { fetchApps } from "@/features/application/api";
import { updateAppStatus } from "@/features/application/api";
import { Column } from "@/features/application/column";
import { type Status, statuses } from "@/types/applications";

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <CreateApplication />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col xl:flex-row gap-4 p-4 justify-center">
          {statuses.map((status) => (
            <Column
              id={status}
              key={status}
              title={status}
              items={data.filter((a) => a.status === status)}
            />
          ))}
        </div>{" "}
      </DndContext>
    </>
  );
};

const CreateApplication = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isVisible) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isVisible]);

  const close = () => setIsVisible(false);
  const open = () => setIsVisible(true);

  return (
    <>
      {isVisible ? (
        <dialog
          ref={dialogRef}
          onClose={close}
          className="top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%]
          flex justify-center items-center fixed rounded-lg p-4
          shadow ring-1 ring-zinc-800/5 bg-zinc-50"
        >
          <ApplicationModal onClose={() => setIsVisible(false)} close={close} />
        </dialog>
      ) : (
        <button
          className="text-lg w-12 aspect-square fixed right-[1vw] bottom-[6vh]"
          onClick={open}
        >
          +
        </button>
      )}
    </>
  );
};

export default BoardPage;
