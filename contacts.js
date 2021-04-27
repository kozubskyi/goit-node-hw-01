const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const contactsPath = path.join(__dirname, "db/contacts.json") // D:\projects\goit-node-hw-01\db\contacts.json
// console.log("contactsPath:", contactsPath)

async function listContacts() {
  try {
    const jsonData = await fs.promises.readFile(contactsPath, "utf-8")
    const data = JSON.parse(jsonData)
    // console.log("listContacts:", data)
    return data
  } catch (err) {
    console.log(err)
  }
}
// listContacts()

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find((contact) => contact.id.toString() === contactId.toString())
    // console.log("contact:", contact)
    return contact
  } catch (err) {
    console.log(err)
  }
}
// getContactById("14")

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const newContacts = contacts.filter((contact) => contact.id.toString() !== contactId.toString())
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err
      // console.log("newContacts:", newContacts)
      console.log("✅ File writting finished successfully")
    })
    return newContacts
  } catch (err) {
    console.log(err)
  }
}
// removeContact("14")

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts()
    const newContacts = [...contacts, { id: uniqid(), name, email, phone }]
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err
      // console.log("newContacts:", newContacts)
      console.log("✅ File writting finished successfully")
    })
    return newContacts
  } catch (err) {
    console.log(err)
  }
}
// addContact("den", "den@mail", "0991050088")

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
