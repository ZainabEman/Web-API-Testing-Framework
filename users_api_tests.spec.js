const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Users API Testing', () => {
    // Test for GET /users - Retrieve all users
    it('GET /users - should return a list of users and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/users')
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                id: Joi.number().required(),
                name: Joi.string().required(),
                username: Joi.string().required(),
                email: Joi.string().email().required(),
                address: Joi.object().required(),
                phone: Joi.string().required(),
                website: Joi.string().required(),
                company: Joi.object().required()
            });
    });

    // Test for GET /users/{id} - Retrieve a single user by ID
    it('GET /users/1 - should return a single user and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/users/1')
            .expect('status', 200)
            .expect('json', 'id', 1)
            .expect('jsonTypes', {
                name: Joi.string().required(),
                username: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.string().required(),
                website: Joi.string().required()
            });
    });

    // Test for POST /users - Create a new user
    it('POST /users - should create a new user and return it with a status of 201', function () {
        const newUser = {
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phone: '1-770-736-8031',
            website: 'johndoe.com'
        };

        return frisby.post('https://jsonplaceholder.typicode.com/users', newUser, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 201)
            .expect('json', 'name', newUser.name)
            .expect('json', 'username', newUser.username)
            .expect('json', 'email', newUser.email)
            .expect('json', 'phone', newUser.phone)
            .expect('json', 'website', newUser.website);
    });

    // Test for PUT /users/{id} - Update an existing user
    it('PUT /users/1 - should update an existing user and return it with a status of 200', function () {
        const updatedUser = {
            id: 1,
            name: 'Jane Doe',
            username: 'janedoe',
            email: 'jane@example.com',
            phone: '1-770-736-8032',
            website: 'janedoe.com'
        };

        return frisby.put('https://jsonplaceholder.typicode.com/users/1', updatedUser, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 200)
            .expect('json', 'id', updatedUser.id)
            .expect('json', 'name', updatedUser.name)
            .expect('json', 'username', updatedUser.username)
            .expect('json', 'email', updatedUser.email)
            .expect('json', 'phone', updatedUser.phone)
            .expect('json', 'website', updatedUser.website);
    });

    // Test for DELETE /users/{id} - Delete a user
    it('DELETE /users/1 - should delete a user and return a status of 200', function () {
        return frisby.del('https://jsonplaceholder.typicode.com/users/1')
            .expect('status', 200);
    });
});

