const Person = require('./models/person');


const persons = [{
        name: 'Karan',
        email: 'sandhukaran2821@gmail.com',
        mobile: 62831169666,
        currentState: [{
                checkIn: true,

            },
            {
                checkIn: false,

            }
        ]
    },
    {
        name: 'John',
        email: 'john2821@gmail.com',
        mobile: 123456789,
        currentState: [{
                checkIn: true,

            },
            {
                checkIn: false,

            }
        ]
    },
    {
        name: 'Alex',
        email: 'alex2821@gmail.com',
        mobile: 1234567890,
        currentState: [{
                checkIn: true,

            },
            {
                checkIn: false,

            }
        ]
    }
]

const seedDB = async () => {

    await Person.deleteMany({});

    await Person.insertMany(persons);

    console.log('Database seeded');

}

module.exports = seedDB;