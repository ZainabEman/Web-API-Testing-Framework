const frisby = require('frisby');
const Joi = frisby.Joi;

describe('User Todos API Testing with JSONPlaceholder', () => {
    const userId = 1; // Known user ID for testing
    const knownTodoId = 1; // Assumed known todo ID for existing user

    // Test for GET /users/{id}/todos - Retrieve all todos for a specific user
    it('GET /users/{userId}/todos - should return todos for user and a status of 200', function () {
        return frisby.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                userId: Joi.number().required().valid(userId),
                id: Joi.number().required(),
                title: Joi.string().required(),
                completed: Joi.boolean().required()
            });
    });

    // Test for POST /users/{id}/todos - Confirm the mock API returns a simulated successful response
    it('POST /users/{userId}/todos - should simulate creating a new todo and return it with a status of 201', function () {
        const newTodo = {
            userId: userId,
            title: 'Complete API testing',
            completed: false
        };

        return frisby.post(`https://jsonplaceholder.typicode.com/users/${userId}/todos`, newTodo, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 201)
            .expect('json', 'userId', userId)
            .expect('json', 'title', newTodo.title)
            .expect('json', 'completed', newTodo.completed);
    });
});
