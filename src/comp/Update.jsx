import React from 'react'
import Modal from './Model'
import { ErrorMessage, Field, Form, Formik } from "formik";
 import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
 import { db } from "../config/firebase";
import { toast } from "react-toastify";
 import * as Yup from "yup";
 const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  Phone: Yup.number().required("Phone number  is Required"),
});
const Update = ({ifOpen,onclose,isUpdate,contact}) => {
    const addContact = async (contact) => {
        try {
          const contactRef = collection(db, "contacts");
          await addDoc(contactRef, contact);
          toast.success("Contact Added Successfully");
        } catch (error) {
          console.log(error);
        }
      };
      const updateContact = async (contact, id) => {
        try {
          const contactRef = doc(db, "contacts", id);
          await updateDoc(contactRef, contact);
          onclose();
          toast.success("Contact Updated Successfully");
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
     <Modal isOpen={ifOpen} onClose={onclose}>
     <Formik
           validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                  Phone:contact.Phone
                }
              : 
              {
                  name: "",
                  email: "",
                  Phone: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="Phone">Phone_No</label>
              <Field name="Phone" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="Phone" />
              </div>
            </div>

            <button className="self-end border bg-orange px-3 py-1.5">
              {isUpdate ? "update" : "add"} 
              Contact
            </button>
          </Form>
        </Formik>
     </Modal>

    </>
  )
}

export default Update