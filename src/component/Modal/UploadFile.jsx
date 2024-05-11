/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "./Modal";
import { state } from "../../data/state";
import { successAlert } from "../../enum/toast";
import Resizer from "../../services/Resizer";
import { uploadFileData } from "../../services/uploadFile";

const reqMsg = "This field is required";

const schema = yup.object().shape({
  major_head: yup.string().required(reqMsg),
  minor_head: yup.string().required(reqMsg),
  document_date: yup.string().required(reqMsg),
  document_remarks: yup.string().required(reqMsg),
  tags: yup.string().required(reqMsg),
  // file: yup
  //   .mixed()
  //   .test(
  //     "fileSize",
  //     "File size is too large",
  //     (value) => value && value[0] && value[0].size <= 1024 * 1024 * 10 // 10MB
  //   )
  //   .test(
  //     "fileFormat",
  //     "Unsupported file format",
  //     (value) =>
  //       value &&
  //       value[0] &&
  //       ["image/jpeg", "image/png", "image/webp"].includes(value[0].type)
  //   )
  //   .required(reqMsg),
});

const UploadFile = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "WEBP",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const resizeLogo = async (e) => {
    try {
      const file1 = e.target.files[0];
      const image = await resizeFile(file1);
      setFile(image);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileApi = async (data) => {
    console.log("hii");
    const tagsArray = data.tags.split(",").map((tag) => tag.trim());
    const updatedData = { ...data, tags: tagsArray };
    try {
      let res = await uploadFileData({
        file: file,
        data: { user_id: snap.userInfo?.user_id, tags: [updatedData], ...data },
      });
      if (res?.status === 200) {
        successAlert("File Updated Successfully");
        state.uploadFile = false;
        state.refressMemberDetaill = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.uploadFile = false;
  };

  return (
    <Modal closeModalHandler={closeModalHandler} modalName={"Upload Your File"}>
      <div className="mb-2 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className=" ">
          <div className="space-y-4">
            <form
              onSubmit={handleSubmit(uploadFileApi)}
              className="flex flex-col items-center gap-2 w-full"
            >
              <div className="relative w-full px-1">
                <label
                  htmlFor="dropzone-file-2"
                  className="flex flex-col justify-center items-center w-full h-24 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    id="dropzone-file-2"
                    onChange={resizeLogo}
                    className="hidden"
                  />

                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    {file ? (
                      <>
                        <img
                          className="w-36 h-20 object-contain  rounded-t-lg md:rounded-none md:rounded-l-lg"
                          src={URL.createObjectURL(file)}
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <svg
                          aria-hidden="true"
                          className="mb-1 w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-xs text-gray-500 ">
                          <span className="font-semibold">Click to upload</span>
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
              <div className="flex w-full gap-3 my-3">
                <div className="w-full flex flex-col ">
                  <label
                    htmlFor="price"
                    className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
                  >
                    Major Head
                  </label>
                  <input
                    type="text"
                    className="border border-secoundary rounded-md lg:text-base h-10 px-2 focus:outline-none text-sm flex items-center focus:ring-0 w-full placeholder:text-secoundary"
                    placeholder="Major Head"
                    {...register("major_head")}
                  />
                  <p className="text-red-500 text-xs  ">
                    {errors.major_head?.message}
                  </p>
                </div>
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="price"
                    className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
                  >
                    Minor Head
                  </label>
                  <input
                    type="text"
                    className="border border-secoundary rounded-md lg:text-base h-10 px-2 focus:outline-none text-sm flex items-center focus:ring-0 w-full placeholder:text-secoundary"
                    placeholder="Minor Head"
                    {...register("minor_head")}
                  />
                  <p className="text-red-500 text-xs ">
                    {errors.minor_head?.message}
                  </p>
                </div>
              </div>
              <div className="flex w-full gap-3 my-3">
                <div className="w-full flex flex-col ">
                  <label
                    htmlFor="price"
                    className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
                  >
                    Document Date
                  </label>
                  <input
                    type="date"
                    className="border border-secoundary rounded-md lg:text-base h-10 px-2 focus:outline-none text-sm flex items-center focus:ring-0 w-full placeholder:text-secoundary"
                    placeholder="Document Date"
                    {...register("document_date")}
                  />
                  <p className="text-red-500 text-xs  ">
                    {errors.document_date?.message}
                  </p>
                </div>
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="price"
                    className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
                  >
                    Document Remark
                  </label>
                  <input
                    type="text"
                    className="border border-secoundary rounded-md lg:text-base h-10 px-2 focus:outline-none text-sm flex items-center focus:ring-0 w-full placeholder:text-secoundary"
                    placeholder="Docuent Remark"
                    {...register("document_remarks")}
                  />
                  <p className="text-red-500 text-xs ">
                    {errors.document_remarks?.message}
                  </p>
                </div>
                <div className="w-full flex flex-col ">
                  <label
                    htmlFor="price"
                    className="block text-xs font-medium leading-2 mb-1.5 text-gray-500"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="border border-secoundary rounded-md lg:text-base h-10 px-2 focus:outline-none text-sm flex items-center focus:ring-0 w-full placeholder:text-secoundary"
                    placeholder="Tag"
                    {...register("tags")}
                  />
                  <p className="text-red-500 text-xs  ">
                    {errors.tags?.message}
                  </p>
                </div>
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadFile;
