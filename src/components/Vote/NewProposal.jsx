import { Dialog, Transition } from "@headlessui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const formTypes = [
  { label: "Single-Select", value: "single" },
  { label: "Multiple-Select", value: "multiple" },
  { label: "Loss Voting", value: "loss" },
  { label: "Allocation Proposal", value: "allocation" },
];

let initialType = "single";

// add number to options
const initialValues = {
  title: "",
  content: "",
  type: initialType,
  options: [{ id: "", label: "" }],
};

const finalValues = {
  //need number of options that can be passed
};

const proposalSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  options: Yup.array().min(2, "More options needed"),
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
          onSubmit={(values, actions) => {
            console.log(JSON.stringify(values));
            actions.setSubmitting(false);
            // getProposal(web3);
            console.log("proposal data")
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              {(values.type = initialType)}
              <div className="flex flex-col text-gray-600 lg:flex-row lg:space-x-4">
                <div className="flex-col w-full">
                  <Field
                    name="title"
                    component={CustomTextInput}
                    label="Title"
                    placeholder="Question"
                  />
                  <div className="class">
                    {errors.title && touched.title ? (
                      <div>{errors.title}</div>
                    ) : null}
                  </div>
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
                      as="select"
                      name="type"
                      component={CustomButtonInput}
                    />
                    <button
                      type="submit"
                      className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-4 focus:border-4 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 focus:border-purple-200 transition-all"
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
  let [isOpen, setIsOpen] = useState(false);
  let buttonRef = useRef(formTypes.map(() => React.createRef()));

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function setType(type) {
    field.value = type.value;
    initialType = type.value;
    closeModal();
  }

  // Get the label corresponding to the value in formTypes
  function getLabel() {
    try {
      return formTypes.find((type) => type.value === field.value).label;
    } catch (error) {
      return "Select Type";
    }
  }

  function getValue() {
    return field.value;
  }

  // Get the position of the label in formTypes using value
  function getPosition() {
    console.log(field.value);
    return formTypes.findIndex((type) => type.value === field.value);
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <button
          className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all"
          onClick={openModal}
        >
          {getLabel()}
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment} autoFocus={isOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          initialFocus={buttonRef.current[getPosition()]}
        >
          <div className="min-h-screen px-4 text-center">
            {/* Allow for clicking outside to close modal*/}
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
                  className="text-lg font-medium leading-6 text-gray-900 cursor-default"
                >
                  Select Type
                </Dialog.Title>
                <div className="mt-2">
                  {formTypes.map((type, index) => (
                    <button
                      key={index}
                      value={type.value}
                      {...field}
                      {...props}
                      ref={buttonRef.current[index]}
                      className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all focus:ring-2 focus:border-transparent focus:ring-blue-400"
                      onClick={() => setType(type)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
