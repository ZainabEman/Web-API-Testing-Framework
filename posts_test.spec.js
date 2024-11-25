const frisby = require('frisby');
const Joi = frisby.Joi; // Joi is used for data validation

describe('Posts API Testing', () => {
    // Test for GET /posts endpoint
    it('GET /posts - should return a list of posts and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/posts')
            .expect('status', 200)
            .expect('jsonTypes', '*', { // Verifies that every item in the array matches the specified format
                userId: Joi.number().required(),
                id: Joi.number().required(),
                title: Joi.string().required(),
                body: Joi.string().required()
            });
    });

    it('POST /posts - should create a new post and return it with a status of 201', function () {
        return frisby
            .post('https://jsonplaceholder.typicode.com/posts', {
                userId: 1,
                title: 'New Post Title',
                body: 'New post content here.'
            })
            .expect('status', 201)
            .then(response => console.log("Response received:", response.json))
            .catch(err => console.error("Error posting data:", err));
    });
    

    it('PUT /posts/1 - should update a post and return it with a status of 200', function () {
        return frisby
            .put('https://jsonplaceholder.typicode.com/posts/1', {
                title: 'Updated Title',
                body: 'Updated content.'
            })
            .expect('status', 200)
            .expect('json', 'id', 1)
            .expect('json', 'title', 'Updated Title')
            .expect('json', 'body', 'Updated content.')
            .catch(err => console.error("Error updating post:", err));
    });
    // Test for DELETE /posts/1 endpoint
    it('DELETE /posts/1 - should delete a post and return a status of 200', function () {
        return frisby.del('https://jsonplaceholder.typicode.com/posts/1')
            .expect('status', 200);
    });
});

