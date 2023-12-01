const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('connected');
	// Delete the collections if they exist
	let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
	if (usersCheck.length) {
		await connection.dropCollection('users');
	}

	let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
	if (thoughtsCheck.length) {
		await connection.dropCollection('thoughts');
	}

	const users = [
	
        {
            username: "john_doe",
            email: "john@example.com",
            thoughts: [],
            friends: [],
        },
        {
            "username": "emily_white",
            "email": "emily@example.com",
            "password": "hashedpassword123",
            "createdAt": ISODate("2023-01-04T15:20:00.000Z"),
            "thoughts": [],
            "friends": []
          },
          {
            "username": "alice_smith",
            "email": "alice@example.com",
            "password": "hashedpassword456",
            "createdAt": ISODate("2023-01-02T08:30:00.000Z"),
            "thoughts": [],
            "friends": []
          },
          {
            "username": "bob_jackson",
            "email": "bob@example.com",
            "password": "hashedpassword789",
            "createdAt": ISODate("2023-01-03T12:45:00.000Z"),
            "thoughts": [],
            "friends": []
          },
          {
            "username": "laura_jones",
            "email": "laura@example.com",
            "password": "hashedpassword789",
            "createdAt": ISODate("2023-01-06T22:05:00.000Z"),
            "thoughts": [],
            "friends": []
          }
            
	];

	await User.collection.insertMany(users);
	
	console.log('seeding complete');
	process.exit(0);
});