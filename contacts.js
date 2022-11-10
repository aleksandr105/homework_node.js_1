const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const allContactsRead = await fs.readFile(contactsPath);

  const contacts = JSON.parse(allContactsRead);

  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  const contact = allContacts.find((el) => el.id === contactId);

  if (contact === -1) return null;

  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const idxRemoveContact = allContacts.findIndex((el) => el.id === contactId);

  if (idxRemoveContact === -1) return null;

  const [deletedContact] = allContacts.splice(idxRemoveContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return deletedContact;
};

const addContact = async (name, email, phone) => {
  if (!name && !email && !phone) return null;

  const allContacts = await listContacts();

  const addedContact = { id: v4(), name, email, phone };

  allContacts.push(addedContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return addedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
