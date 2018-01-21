import moment from 'moment'

export default [
    {
        id: '1',
        description: 'Rice',
        note: '',
        amount: 2500,
        createdAt: 0
    },
    {
        id: '2',
        description: 'Book',
        note: '',
        amount: 500,
        createdAt: moment(0).add(4, 'days').valueOf()
    },
    {
        id: '3',
        description: 'Shoes',
        note: '',
        amount: 25000,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    }
]
