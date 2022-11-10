const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const getContact = await getContactById(id.toString());

      if (!getContact) {
        console.error(`element with id ${id} not found`);
        return;
      }
      console.log(getContact);
      break;

    case "add":
      const add = await addContact(name, email, phone);
      if (!add) {
        console.error("incorrect data");
        return;
      }
      console.log(add);
      break;

    case "remove":
      const remove = await removeContact(id.toString());
      if (!remove) {
        console.error(`element with id ${id} not found`);
        return;
      }
      console.log(remove);
      break;

    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(argv);
