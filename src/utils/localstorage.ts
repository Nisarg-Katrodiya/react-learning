import { v4 as uuid } from "uuid";

export const setDefaultData = () => {
  localStorage.setItem('users', JSON.stringify([{
    id: uuid(),
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    status: "active",
  }, {
    id: uuid(),
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    phone: "0987654321",
    status: "inactive"
  }, {
    id: uuid(),
    firstName: "Alice",
    lastName: "Johnson",
    email: "alicejohnson@example.com",
    phone: "9876543210",
    status: "active",
  }]));
}
// setDefaultData();

export const getDataFromSession = (key: string) => {
  const storageData = localStorage.getItem(key);
  return storageData ? JSON.parse(storageData) : null;
}

export const setDataToSession = (key: string, data: string) => {
  localStorage.setItem(key, data);
}