import { useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";

import { api } from "@/api/client";
import { AISection } from "@/features/ai/aiSection";
import { ResumeSuggestions } from "@/features/ai/aiSuggestion";
import type { IAiParseResponse } from "@/types/ai";
import type { IApplication } from "@/types/applications";

import { InputField } from "./inputfield";

interface ApplicationModalProps {
  onClose: () => void;
  close: () => void;
}

export const ApplicationModal = ({ onClose, close }: ApplicationModalProps) => {
  const queryClient = useQueryClient();
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
    },
  });

  const role = useWatch({ control, name: "role" });
  const skills = useWatch({ control, name: "skills" }) || [];

  const handleFill = (data: IAiParseResponse) => {
    if (data.company) setValue("company", data.company);
    if (data.role) setValue("role", data.role);
    if (data.required_skills) setValue("skills", data.required_skills);
  };

  const onSubmit: SubmitHandler<IApplication> = async (data) => {
    await api.post("/apps", {
      ...data,
      dateApplied: new Date(),
    });

    queryClient.invalidateQueries({ queryKey: ["apps"] });
    onClose();
  };

  return (
    <div className="w-[45vw] h-[75vh]">
      <p className="p-2 font-bold text-lg">Add application</p>
      <div className="w-full p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AISection onFill={handleFill} />
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
          <div className="flex flex-col md:flex-row gap-2">
            <button className="w-full" type="submit">
              Save
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
