import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadTag } from "../../services/tag";
import Modal from "./Modal";
import { state } from "../../data/state";
import { successAlert } from "../../enum/toast";

const schema = yup.object().shape({
  term: yup.string().required("Term is required"),
});

const CreateTag = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createTagData = async (data) => {
    try {
      let res = await uploadTag(data);
      if (res?.status === 200) {
        successAlert("Tag Created Succesfully");
        state.createTag = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.createTag = false;
  };

  return (
    <Modal closeModalHandler={closeModalHandler} modalName={"Create Tag"}>
      <form onSubmit={handleSubmit(createTagData)}>
        <div className="w-full flex flex-col ">
          <label
            htmlFor="price"
            className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
          >
            Term
          </label>
          <input
            type="text"
            className="border border-secoundary rounded-md lg:text-base h-10 px-2 focus:outline-none text-sm flex items-center focus:ring-0 w-full placeholder:text-secoundary"
            placeholder="Term"
            {...register("term")}
          />
          <p className="text-red-500 text-xs">{errors?.term?.message}</p>
        </div>
        <div className="flex items-center justify-end w-full my-3">
          <button
            type="submit"
            className="bg-secoundary py-1.5 px-3 rounded-md text-white text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTag;
