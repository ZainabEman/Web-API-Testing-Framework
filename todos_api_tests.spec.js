const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Todos API Testing', () => {
    // Test for GET /todos - Retrieve all todos
    it('GET /todos - should return a list of todos and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/todos')
            .expect('status', 200)
            .expect('jsonTypes', '*', { // Validates the format of each todo
                userId: Joi.number().required(),
                id: Joi.number().required(),
                title: Joi.string().required(),
                completed: Joi.boolean().required()
            });
    });

    // Test for GET /todos/{id} - Retrieve a single todo by ID
    it('GET /todos/1 - should return a single todo and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/todos/1')
            .expect('status', 200)
            .expect('jsonTypes', {
                userId: Joi.number().required(),
                id: Joi.number().required(),
                title: Joi.string().required(),
                completed: Joi.boolean().required()
            });
    });

    // Test for POST /todos - Create a new todo
    it('POST /todos - should create a new todo and return it with a status of 201', function () {
        const newTodo = {
            userId: 1,
            title: 'Finish testing documentation',
            completed: false
        };

        return frisby.post('https://jsonplaceholder.typicode.com/todos', newTodo, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 201)
            .expect('json', 'userId', newTodo.userId)
            .expect('json', 'title', newTodo.title)
            .expect('json', 'completed', newTodo.completed);
    });

    // Test for PUT /todos/{id} - Update an existing todo
    it('PUT /todos/1 - should update an existing todo and return it with a status of 200', function () {
        const updatedTodo = {
            userId: 1,
            title: 'Updated testing documentation',
            completed: true
        };

        return frisby.put('https://jsonplaceholder.typicode.com/todos/1', updatedTodo, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 200)
            .expect('json', 'userId', updatedTodo.userId)
            .expect('json', 'title', updatedTodo.title)
            .expect('json', 'completed', updatedTodo.completed);
    });

    // Test for DELETE /todos/{id} - Delete a todo
    it('DELETE /todos/1 - should delete a todo and return a status of 200', function () {
        return frisby.del('https://jsonplaceholder.typicode.com/todos/1')
            .expect('status', 200);
    });
});

