export const setDefaultData = () => {
  localStorage.setItem('user-type', JSON.stringify(['admin', 'professor', 'student']));
  localStorage.setItem('users', JSON.stringify([
    {id: 1, name: 'test admin user1', email: 'user.admin@gmail.com', parentUser: 0, number: '9876343210', password: 'User@1234', role: 'admin', status: 'active'},
    {id: 2, name: 'test professor user2', email: 'user.professor@gmail.com', parentUser: 1, number: '9476543210', password: 'User@1234', role: 'professor', status: 'active'},
    {id: 3, name: 'test student user3', email: 'user.student@gmail.com', parentUser: 2, number: '9877543210', password: 'User@1234', role: 'student', status: 'active'},
    {id: 4, name: 'tike myson', email: 'tikemison@gmail.com', parentUser: 2, number: '9876544210', password: 'User@1234', role: 'professor', status: 'active'},
    {id: 5, name: 'donut drum', email: 'donut.drum@mail.com', parentUser: 1, number: '6543218909', password: 'User@1234', role: 'student', status: 'disable'},
  ]));
  // localStorage.setItem('currentUser', JSON.stringify({id: 2, name: 'test user2', email: 'user.professor@gmail.com', number: '9476543210', password: 'User@1234', role: 'professor', status: 'active'}));
}
// setDefaultData();

export const getDataFromSession = (key: string) => {
  const storageData = localStorage.getItem(key);
  return storageData ? JSON.parse(storageData) : null;
}

export const setDataToSession = (key: string, data: string) => {
  localStorage.setItem(key, data);
}