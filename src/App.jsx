import React from 'react'
import './App.css'
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Update from './comp/Update';
import { db } from "./config/firebase";
import Use from './hooks/Use';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from './comp/Card'; 
import { Initial } from './comp/Initial';
import Navbar from './comp/Navbar'
import Modal from './comp/Model';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { onclose, onopen, ifOpen } = Use();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);
  console.log(contacts)
  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };
  return (
    <>
      <div className="max-auto max-w-[1370px] px-14">

        <Navbar />
        <div className=" top flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <AiFillPlusCircle
            onClick={onopen}
            className="cursor-pointer text-5xl text-white"
          />
        </div>
        <div className=" mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <Initial />
          ) : (
            contacts.map((contact) => (
              <Card key={contact.id} contact={contact} />
            ))
          )}
        </div>
        <ToastContainer position="bottom-center" />
        <Update ifOpen={ifOpen} onclose={onclose} />
      </div>

    </>
  )
}

export default App