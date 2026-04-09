import type { SubmitHandler } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";

import { AISection } from "@/features/ai/aiSection";
import { ResumeSuggestions } from "@/features/ai/aiSuggestion";
import { useApps } from "@/store/query";
import type { IAiParseResponse } from "@/types/ai";
import type { IApplication } from "@/types/applications";

import { InputField } from "./inputfield";

type AppData = Partial<IApplication>;

interface ApplicationModalProps {
  onClose: () => void;
  close: () => void;
  update?: boolean;
  defaultValues?: AppData;
}

export const ApplicationModal = ({
  onClose,
  close,
  update,
  defaultValues,
}: ApplicationModalProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IApplication>({
    defaultValues: {
      company: "",
      role: "",
      jdLink: "",
      notes: "",
      status: "Applied",
      skills: [],
      ...defaultValues,
    },
  });

  const { updateAppMutation, createAppMutation } = useApps();
  const role = useWatch({ control, name: "role" });
  const skills = useWatch({ control, name: "skills" }) || [];

  const handleFill = (data: IAiParseResponse) => {
    if (data.company) setValue("company", data.company);
    if (data.role) setValue("role", data.role);
    if (data.required_skills) setValue("skills", data.required_skills);
  };

  const onSubmit: SubmitHandler<IApplication> = async (data) => {
    if (update && defaultValues?._id) {
      updateAppMutation.mutate({ id: defaultValues?._id, payload: data });
      onClose();
    } else {
      createAppMutation.mutate({ payload: data });
      onClose();
    }
  };

  return (
    <div className="w-[45vw] h-[75vh]">
      <p className="p-2 font-bold text-lg">Add application</p>
      <div className="w-full p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {!update && <AISection onFill={handleFill} />}
          <InputField
            label="company"
            name="company"
            type="text"
            register={register}
            errors={errors}
            required
          />
          <InputField
            label="role"
            name="role"
            type="text"
            register={register}
            errors={errors}
            required
          />
          <ResumeSuggestions role={role} skills={skills} />
          <InputField
            label="Jd link"
            name="jdLink"
            type="text"
            register={register}
            errors={errors}
            required
          />
          <InputField
            label="Notes"
            name="notes"
            type="text"
            register={register}
            errors={errors}
          />
          <InputField
            label="Salary Range"
            name="salaryRange"
            type="text"
            register={register}
            errors={errors}
          />
          <div className="flex flex-col md:flex-row gap-2">
            <button className="w-full" type="submit">
              {update ? "Update" : "Save"}
            </button>
            <button className="w-full" type="button" onClick={close}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
