import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import * as Yup from "yup";

const formTypes = [
  { label: "Single-Select", value: "single" },
  { label: "Multiple-Select", value: "multiple" },
];

const initialValues = {
  title: "1",
  content: "1",
  type: "1",
  options: [{ id: "1", label: "1" }],
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
              <div className="flex flex-row space-y-2 text-gray-600">
                <div className="flex-col w-full">
                  <Field
                    name="title"
                    component={CustomTextInput}
                    label="Title"
                  />
                  <Field
                    name="content"
                    component={CustomTextInput}
                    label="Content"
                  />
                </div>
                <div className="flex-col w-1/3">
                  <Field name="type" />
                </div>
              </div>
              <FieldArray name="options">
                {({ insert, remove, push }) => (
                  <div>
                    {values.options.length > 0 &&
                      values.options.map((friend, index) => (
                        <div
                          className="flex flex-row space-x-2 border-2 border-indigo-200 rounded-xl"
                          key={index}
                        >
                          <div className="col">
                            <label htmlFor={`options.${index}.label`}>
                              {index + 1}
                            </label>
                            <Field
                              name={`options.${index}.label`}
                              placeholder="option"
                              type="text"
                            />
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              X (renove option)
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => push({ name: "", email: "" })}
                    >
                      Add option
                    </button>
                  </div>
                )}
              </FieldArray>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const CustomTextInput = ({ field, ...props }) => (
  <div className="flex flex-col">
    <div className="text-gray-500 font-semibold text-2xl">{props.label}</div>
    <input
      type="text"
      {...field}
      {...props}
      className="border border-gray-600 rounded-lg"
    />
  </div>
);
