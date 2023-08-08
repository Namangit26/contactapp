import React from 'react'
import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
 import { db } from "../config/firebase";
 import { useState } from 'react';
import Update from './Update';
import Use from '../hooks/Use';;
import { toast } from "react-toastify";
const Card = ({ contact }) => {
  const { onclose,onopen,ifOpen} = Use();
    const deleteContact = async (id) => {
      try {
        await deleteDoc(doc(db, "contacts", id));
        toast.success("Contact Deleted Successfully");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <div
          key={contact.id}
          className=" card flex items-center justify-between rounded-lg overflow-hidden  bg-yellow p-2 "
        >
          <div className="  left flex gap-1">
            <HiOutlineUserCircle className=" logo text-4xl text-orange" />
            <div className="">
              <h2 className="font-medium">{contact.name}</h2>
                <p className="text-sm">{contact.email}</p>
                <p className="text-sm">{contact.Phone}</p>
            </div>
          </div>
          <div className=" bottom flex text-3xl">
            
            <RiEditCircleLine  onClick={onopen} className="cursor-pointer" />
            <IoMdTrash
              onClick={() => deleteContact(contact.id)}
              className="cursor-pointer text-orange"
            />
          </div>
        </div>
        <Update
          contact={contact}
          isUpdate
          ifOpen={ifOpen}
          onclose={onclose}
        />
      </>
    );
  };
  

export default Card