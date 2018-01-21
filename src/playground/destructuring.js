// const book = {
//     name: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

const item = [, '$2.00', , '$2.75']

const [name = 'coffee(cold)',,medium='$3.00'] = item;

console.log(`A medium ${name} costs ${medium}`)