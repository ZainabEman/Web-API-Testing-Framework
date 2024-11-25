const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Updated Users API Testing', () => {
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

    it('GET /users/9999 - should handle non-existent user ID by returning a 404 status', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/users/9999')
            .expect('status', 404)  // Expecting a 404 status for non-existent resources
            .then((response) => {
                expect(response.json).toEqual({}); // Optional: Check if the body is indeed an empty object, though 404 might just return 'Not Found' or similar message.
            });
    });
    

    // Test for GET /users with query - Filter users by a query string
    it('GET /users?username=Bret - should return a user with the username Bret and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/users?username=Bret')
            .expect('status', 200)
            .expect('json', '0.username', 'Bret');
    });

    // Test for POST /users - Attempt to create a new user, regardless of data completeness
    it('POST /users - should create a user even with incomplete data and return a status of 201', function () {
        const incompleteUser = {
            name: 'John Doe'
        };

        return frisby.post('https://jsonplaceholder.typicode.com/users', incompleteUser, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 201) // JSONPlaceholder does not enforce complete data
            .expect('json', 'name', 'John Doe'); // Validate that the name is returned as expected
    });

    // Test for PUT /users/{id} - Update an existing user, assuming JSONPlaceholder accepts any data
    it('PUT /users/1 - should accept any data format and return a status of 200', function () {
        const invalidEmailUser = {
            email: 'not-an-email'
        };

        return frisby.put('https://jsonplaceholder.typicode.com/users/1', invalidEmailUser, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 200) // Expecting JSONPlaceholder to accept the update
            .expect('json', 'email', 'not-an-email'); // Checking that the "updated" email is returned
    });
});

