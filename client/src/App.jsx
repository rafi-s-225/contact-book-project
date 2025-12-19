import React,{useEffect,useState} from 'react';
import API from "./api";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";  
const App = () => {
    const [contacts,setContacts]=useState([]);
    const [editContact,setEditContact]=useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //to load all contacts
    const fetchContacts = async()=>{
          try {
            setLoading(true);
            setError(null);
            const res = await API.get("/");
            setContacts(res.data);
        } catch (err) {
            setError("Failed to fetch contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchContacts();
    },[]);



    //adding new contact
    const addContact = async (data)  =>{
       try {
            await API.post("/", data);
            fetchContacts();
        } catch (err) {
            setError("Failed to add contact");
        }
    };


    //deleting new contact
    const deleteContact = async (id)=>{
         try {
            await API.delete(`/${id}`);
            fetchContacts();
        } catch (err) {
            setError("Failed to delete contact");
        }
    };


    //updating contact
    const updateContact= async (data)=>{
         try {
            await API.put(`/${editContact._id}`, data);
            fetchContacts();
            setEditContact(null);
        } catch (err) {
            setError("Failed to update contact");
        }
    };
   
  return (
    <div>
       <ContactForm onSubmit={editContact? updateContact:addContact}
        existing={editContact}/>
       <ContactList contacts={contacts} 
        onEdit={setEditContact}
       onDelete={deleteContact}
       />

    </div>
    );
};

export default App