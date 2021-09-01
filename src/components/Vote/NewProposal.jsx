import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const formTypes = [
  { label: "Single-Select", value: "single" },
  { label: "Multiple-Select", value: "multiple" },
];

// add number to options
const initialValues = {
  title: "",
  content: "",
  type: "",
  options: [{ id: "", label: "" }],
};

const finalValues = {
  //need number of options that can be passed
};

const proposalSchema = Yup.object({
  title: Yup.string().required(""),
  content: Yup.string().required(""),
  type: Yup.string().required(""),
  options: Yup.array().required(""),
});

export default function NewProposal() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col max-w-7xl mx-auto p-2">
        <div className="flex flex-row items-center justify-between px-4 ">
          <div className="text-4xl text-gray-700 my-4">New Proposal</div>
          <Link to={`/vote`}>
            <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Back to vote
            </div>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl x-auto px-8 py-2">
        <Formik
          initialValues={initialValues}
          validationSchema={proposalSchema}
          onSubmit={(values) => {
            console.log(JSON.stringify(values));
          }}
        >
          {({ values }) => (
            <Form>
              <div className="flex flex-col text-gray-600 lg:flex-row lg:space-x-4">
                <div className="flex-col w-full">
                  <Field
                    name="title"
                    component={CustomTextInput}
                    label="Title"
                    placeholder="Question"
                  />
                  <Field
                    name="content"
                    component={CustomLongTextInput}
                    label="Content"
                    placeholder="What is your proposal?"
                  />
                  <div className="flex-col w-full border-2 border-gray-200 rounded-xl my-6">
                    <div className="bg-indigo-100 p-4 text-2xl font-semibold rounded-t-lg">
                      Choices
                    </div>
                    <FieldArray name="options">
                      {({ insert, remove, push }) => (
                        <div className="flex flex-col w-full px-4 my-2 space-y-2">
                          {values.options.length > 0 &&
                            values.options.map((friend, index) => (
                              <div
                                className="flex flex-row space-x-2 border-2 border-gray-200 rounded-full items-center px-8 font-bold"
                                key={index}
                              >
                                <div className="flex-shrink-0">{index + 1}</div>
                                <Field
                                  name={`options.${index}.label`}
                                  placeholder="option"
                                  component={CustomOptionInput}
                                />
                                <button
                                  type="button"
                                  className="flex-shrink-0 font-bold"
                                  onClick={() => remove(index)}
                                >
                                  <div className="w-4">X</div>
                                </button>
                              </div>
                            ))}
                          <button
                            type="button"
                            className="p-2 border-2 border-gray-200 rounded-full items-center px-8 font-bold w-full text-center justify-center"
                            onClick={() => push({ id: "", label: "" })}
                          >
                            Add option
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                <div className="flex-col lg:w-96 bg-white rounded-xl border border-gray-200">
                  <div className="border-b border-gray-200 bg-indigo-100 px-8 py-4 rounded-t-lg font-bold text-xl">
                    Actions
                  </div>
                  <div className="p-4">
                    <Field
                      name="type"
                      component={CustomButtonInput}
                      label="type"
                      options={formTypes}
                    />
                    <button
                      type="submit"
                      className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-4 focus:border-4 hover:border-indigo-800 hover:text-indigo-800 focus:border-purple-200 active:border-grey-900 active:text-grey-900 transition-all"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const CustomTextInput = ({ field, ...props }) => (
  <div className="flex flex-col my-2 space-y-1 w-full">
    <div className="text-gray-500 font-semibold text-2xl">{props.label}</div>
    <input
      type="text"
      {...field}
      {...props}
      className="border border-gray-200 rounded-lg p-2 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-medium"
    />
  </div>
);

const CustomLongTextInput = ({ field, ...props }) => (
  <div className="flex flex-col my-2 space-y-1">
    <div className="text-gray-500 font-semibold text-2xl">{props.label}</div>
    <textarea
      type="text"
      rows={6}
      {...field}
      {...props}
      className="border border-gray-200 rounded-lg p-2 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-medium"
    />
  </div>
);

const CustomOptionInput = ({ field, ...props }) => (
  <div className="flex flex-col w-full">
    <input
      type="text"
      {...field}
      {...props}
      className="p-2 shadow-sm text-base focus:outline-none focus:border-transparent font-bold text-center"
    />
  </div>
);

function CustomButtonInput({ field, ...props }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <button
          type="radio"
          {...field}
          {...props}
          className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-4 focus:border-4 hover:border-indigo-800 hover:text-indigo-800 focus:border-purple-200 active:border-grey-900 active:text-grey-900 transition-all"
          onClick={openModal}
        >
          Type
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Select Type
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Type 1</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Exit
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
