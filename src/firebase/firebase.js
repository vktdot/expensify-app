import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  export { firebase, database as default }


//   database.ref('Expenses').on('child_removed', (snapshot)=>{
//       console.log(snapshot.key, snapshot.val())
//   })

//   database.ref('Expenses').on('child_changed',(snapshot)=>{
//       console.log(snapshot.key,snapshot.val())
//   })

//   database.ref('Expenses').on('child_added',(snapshot)=>{
//     console.log(snapshot.key,snapshot.val())
// })

//   database.ref('Expenses').on('value', ((snapshot)=>{
//       const expenses = [];
//       snapshot.forEach((snapshotChild)=>{
//           expenses.push({
//               id: snapshotChild.key,
//               ...snapshotChild
//           })
//       })
//       console.log(snapshot.val())
//   }))

//   database.ref('Expenses').push({
//     description: 'Books',
//     Notes: '',
//     Amount: 400,
//     created: 3000
// })
  
//   database.ref('expenses').on('value', (snapshot)=>{
//       const expenses = [];
//       snapshot.forEach((snapshotChild) => {
//           expenses.push({id:snapshotChild.key, ...snapshotChild.val()})
//       })
//       console.log(expenses)
//   })



//   const onValueChange = database.ref().on('value', (snapshot) =>{
//     const val = snapshot.val();
//     console.log(val.name, 'is a', val.job.position, 'at', val.job.company,'.')
//   })

//   setTimeout(()=>{
//       database.ref('job/company').set('Airbnb')
//   },3000)
  

//   database.ref().set({
//       name: 'Vikas Mishra',
//       age: 25,
//       stressLevel: 6,
//       job: {
//         position: 'Software developer',
//         company: 'Google'
//       },
//       location: {
//           city: 'Toronto',
//           country: 'Canada'
//       }
//   }).then(()=>{
//       console.log("Data is saved!!")
//   }).catch((e)=>{
//       console.log("This failed!!",e)
//   })

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Calgary'
// }).then(()=>{
//     console.log('Successfully updated')
// }).catch((e)=>{
//     console.log('Error!!',e)
// })