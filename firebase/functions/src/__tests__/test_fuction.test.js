
const testEnv = require('firebase-functions-test')({
  databaseURL: 'https://eatin-d731f.firebaseio.com',
  storageBucket: "eatin-d731f.appspot.com",
  projectId: 'eatin-d731f',
}, 'eatin-d731f-cc2b9aa468e3.json');
const admin = require('firebase-admin')


// Provide 3rd party API keys
testEnv.mockConfig({ someapi: { key: 'abc123' }});


const { addMessage } = require('../../index');


/// FIRESTORE

describe('downcaseBio', () => {
  let wrapped;
  // Applies only to tests in this describe block
  beforeAll(() => {
    wrapped = testEnv.wrap(addMessage);
  });

  test('it converts the bio to lowercase', async () => {
    const path = 'animals/meerkat'
    const data = { text: 'SUPER COOL' };

    // // Create a Firestore snapshot
    // const snap = testEnv.firestore.makeDataSnapshot(data, path);

    // Execute it
    
    const result = await wrapped(data, {
      auth: {
        uid: 'jckS2Q0'
      },
      authType: 'USER'
    });
    
    console.log(result)
    const after = await admin.firestore().doc(path).get()

    // expect(after.data().bio).toBe('super cool')

  });
});


// describe('createUserRecord', () => {
//   let wrapped;
//   // Applies only to tests in this describe block
//   beforeAll(() => {
//     wrapped = testEnv.wrap(createUserRecord);
//   });

//   afterAll( () => {
//     admin.firestore().doc(`users/dummyUser`).delete()
//     testEnv.cleanup();
//   });

//   test('it creates a user record in Firestore', async () => {
//     const user = testEnv.auth.makeUserRecord({ uid: 'dummyUser' })
//     await wrapped(user);

//     const doc = await admin.firestore().doc(`users/${user.uid}`).get();

//     expect(doc.data().ranking).toBe('noob');
//   });
// });