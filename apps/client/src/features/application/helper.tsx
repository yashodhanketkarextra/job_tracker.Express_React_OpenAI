import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { api } from "@/api/client";
import { ApplicationModal } from "@/components/applicationModal";
import type { IApplication } from "@/types/applications";

interface UpdateApplicationProps {
  id: string;
  data: Partial<IApplication>;
}

export const UpdateApplication = ({ id, data }: UpdateApplicationProps) => {
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
  const defaultValues = { _id: id, ...data };

  return (
    <>
      {isVisible ? (
        <dialog
          ref={dialogRef}
          onClose={close}
          onKeyDown={(e) => {
            if (isVisible) {
              e.stopPropagation();
            }
          }}
          className="top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%]
          flex justify-center items-center fixed rounded-lg p-4
          shadow ring-1 ring-zinc-800/5 bg-zinc-50"
        >
          <ApplicationModal
            onClose={close}
            close={close}
            defaultValues={defaultValues}
            update
          />
        </dialog>
      ) : (
        <button
          className="text-sm w-4! aspect-square absolute right-1 bottom-1 p-0! z-10"
          onClick={async (e) => {
            e.stopPropagation();
            open();
          }}
        >
          +
        </button>
      )}
    </>
  );
};

export const DeleteApplication = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    await api.delete(`/apps/${id}`);
    queryClient.invalidateQueries({ queryKey: ["apps"] });
  };

  return (
    <button
      className="text-sm w-4! aspect-square absolute right-1 top-1 p-0! z-10 bg-red-500! hover:bg-red-600!"
      onClick={async (e) => {
        e.stopPropagation();
        await handleDelete();
      }}
    >
      -
    </button>
  );
};
