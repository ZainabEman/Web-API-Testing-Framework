const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Users Nested Routes API Testing', () => {
    // Test for GET /users/{id}/posts - Retrieve all posts by a specific user
    it('GET /users/1/posts - should return a list of posts by user 1 and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/users/1/posts')
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                userId: Joi.number().required().valid(1),
                id: Joi.number().required(),
                title: Joi.string().required(),
                body: Joi.string().required()
            });
    });

    // Test for GET /users/{id}/albums - Retrieve all albums by a specific user
    it('GET /users/1/albums - should return a list of albums by user 1 and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/users/1/albums')
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                userId: Joi.number().required().valid(1),
                id: Joi.number().required(),
                title: Joi.string().required()
            });
    });

    // Test for GET /users/{id}/todos - Retrieve all todos by a specific user
    it('GET /users/1/todos - should return a list of todos by user 1 and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/users/1/todos')
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                userId: Joi.number().required().valid(1),
                id: Joi.number().required(),
                title: Joi.string().required(),
                completed: Joi.boolean().required()
            });
    });
});

