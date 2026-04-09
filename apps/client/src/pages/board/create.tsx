import { useEffect, useRef, useState } from "react";

import { ApplicationModal } from "@/components/applicationModal";

export const CreateApplication = () => {
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
