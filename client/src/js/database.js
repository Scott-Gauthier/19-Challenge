import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const result = await openDB('jate', 1)
    .transaction('jate', 'readwrite')
    .objectStore('jate')
    .put({ id: 1, value: content });
  await result
    ? console.log('getDb implemented', await result.value)
    : console.log('putDb not implemented', await result.value);
  return result?.value;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const result = await openDB('jate', 1)
    .transaction('jate', 'readonly')
    .objectStore('jate')
    .get(1);
  await result
    ? console.log('getDb implemented', await result.value)
    : console.log('getDb not implemented');
  return result?.value;
};

initdb();
