import React ,{useState , useMemo, FormEvent } from 'react';

export interface contact{
  id:number;
  name: string;
  email: string;
  number: string;
}

type NewContact = Omit<contact ,'id'>;

interface AddContactFormProps{
  onAddContact: (contact:NewContact)=>void;
}

const AddContactForm:
React.FC<AddContactFormProps> = ({ onAddContact}) => {
  const[name , setname] = useState('');
  const[email , setemail] = useState('');
  const[number , setnumber] = useState('');

  const handleSubmit = (e:FormEvent) => {e.preventDefault();
  if( !name || !email || !number){
    alert('Please Fill in all Feilds.');
    return;
  }
  onAddContact({name , email ,number});
  setname('');
  setemail('');
  setnumber('');
};


return(
  <form onSubmit = {handleSubmit} className = "Add-Contact-Form">
    <h3>Add New contact</h3>
    <label htmlFor = "name-input">Name</label>
    <input id = "name-input"
    type = "text"
    placeholder="Vinay"
    value = {name} onChange = {(e) => setname(e.target.value)}/>

    <label htmlFor = "email-input">Email</label>
    <input id = "email-input"
    type = "email"
    placeholder="Vinay@gmail.com"
    value = {email} onChange = {(e) => setemail(e.target.value)}/>

    <label htmlFor = "number-input">Number</label>
    <input id = "Number-input"
    type = "tel"
    placeholder=" 9999999"
    value = {number} onChange = {(e) => setnumber(e.target.value)}/>

    <button type = "submit">Add Contact</button>
  </form>
);
};
interface ContactDataRendererProps{
  contacts: contact[];
}

const ContactDataRenderer :
React.FC<ContactDataRendererProps> = ({contacts}) => {
  const[searchTerm , setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => {
    if(!searchTerm){
      return contacts;
    }
    return contacts.filter(
      (contact) => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        || contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [contacts , searchTerm]);
 return (
 <div className="contact-container">
  <label htmlFor="search-input">Search Contacts</label>
  <input
  id = "search_input"
  type = "text"
  className="filter-input"
  placeholder="Search by name or email .."
  value = {searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)} />
  <ul className="contact-list">
    {filteredContacts.length >0 ? (
     filteredContacts.map((contact) => (
      <li key = {contact.id} className= "contact-item">
        <h3>{contact.name}</h3>
        <p>{contact.email}</p>
        <p>{contact.number}</p>
      </li>
     ))
    ) : (
      <p className="No-results">No Contacts Found</p>
    )}
  </ul>
 </div>
 );
};

function App(){
  const initialContacts: contact[]=[
    {id : 1, name: 'Vinay' , email : 'vinay@gmail.com' , number: '123456789'},
    {id : 2, name: 'Vijay' , email : 'vijay@gmail.com' , number: '123456789'},
    {id : 3, name: 'Vikas' , email : 'vikas@gmail.com' , number: '123456789'},
  ];
  const[contacts , setcontacts] = useState<contact[]>(initialContacts);
  const handleAddContact = (newcontact : NewContact) => {
    setcontacts((prevContacts) => [
      ... prevContacts , {...newcontact , id: Date.now()},
    ]);
  };
  const cssStyles = `
    body {
    font-family : sans-serif;
    margin: 20px;
    background-color = #f8f9fa;
    }
    .App{
    max-width: 700px
    margin: 0 auto;
    }
    h1, h3{
    color : #343a40;
    }
    .add-contact-form, .contact-container{
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #dee2e6;
    background-color: #ffffff;
    border-radius: 8px;
    }
    label{
    display : block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #495057;
    }
    input{
    width: 100%;
    padding : 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius:4px;
    }
    button{
    width: 100%;
    padding: 12px;
    border: none;
    border-radius : 4px;
    background_color : #007bff;
    color: white;
    font-size : 16px;
    cursor: pointer;
    }
    .contact-list{
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap : 15px;
    grid-template-columns: 1fr;
    }
    .contact-item{
    padding:15px
    border: 1px solid #dee2e6;
    border-radius: 4px;
    }
    .contact-item p{
    margin: 4px 0;
    color : #6c757d;
    }
    @media (min-width: 600px){
    .contact_list{
    grid-template-columns: 1fr 1fr;
    }}
  `;
  return (
    <>
    <style>{cssStyles}</style>
    <div className="App">
      <h1>contact list</h1>
      <AddContactForm onAddContact={handleAddContact} />
      <ContactDataRenderer contacts = {contacts} />
    </div>
    </>
  );
}

export default App;

