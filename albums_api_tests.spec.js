const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Albums API Testing', () => {
    // Test for GET /albums - Retrieve all albums
    it('GET /albums - should return a list of albums and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/albums')
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                userId: Joi.number().required(),
                id: Joi.number().required(),
                title: Joi.string().required()
            });
    });

    // Test for POST /albums - Create a new album
    it('POST /albums - should create a new album and return it with a status of 201', function () {
        const newAlbum = {
            userId: 1,
            title: 'My New Album'
        };

        return frisby.post('https://jsonplaceholder.typicode.com/albums', newAlbum, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 201)
            .expect('json', 'userId', newAlbum.userId)
            .expect('json', 'title', newAlbum.title);
    });

    // Test for PUT /albums/{id} - Update an existing album
    it('PUT /albums/1 - should update an existing album and return it with a status of 200', function () {
        const updatedAlbum = {
            title: 'Updated Album Title'
        };

        return frisby.put('https://jsonplaceholder.typicode.com/albums/1', updatedAlbum, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 200)
            .expect('json', 'title', updatedAlbum.title);
    });

    // Test for DELETE /albums/{id} - Delete an album
    it('DELETE /albums/1 - should delete an album and return a status of 200', function () {
        return frisby.del('https://jsonplaceholder.typicode.com/albums/1')
            .expect('status', 200);
    });
});
