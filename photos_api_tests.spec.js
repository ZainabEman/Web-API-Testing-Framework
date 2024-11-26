const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Photos API Testing', () => {
    // Test for GET /photos - Retrieve all photos
    it('GET /photos - should return a list of photos and a status of 200', function () {
        return frisby.get('https://jsonplaceholder.typicode.com/photos')
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                albumId: Joi.number().required(),
                id: Joi.number().required(),
                title: Joi.string().required(),
                url: Joi.string().uri().required(),
                thumbnailUrl: Joi.string().uri().required()
            });
    });

    // Test for POST /photos - Create a new photo
    it('POST /photos - should create a new photo and return it with a status of 201', function () {
        const newPhoto = {
            albumId: 1,
            title: 'My New Photo',
            url: 'https://via.placeholder.com/600/92c952',
            thumbnailUrl: 'https://via.placeholder.com/150/92c952'
        };

        return frisby.post('https://jsonplaceholder.typicode.com/photos', newPhoto, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 201)
            .expect('json', 'albumId', newPhoto.albumId)
            .expect('json', 'title', newPhoto.title)
            .expect('json', 'url', newPhoto.url)
            .expect('json', 'thumbnailUrl', newPhoto.thumbnailUrl);
    });

    // Test for PUT /photos/{id} - Update an existing photo
    it('PUT /photos/1 - should update an existing photo and return it with a status of 200', function () {
        const updatedPhoto = {
            title: 'Updated Photo Title'
        };

        return frisby.put('https://jsonplaceholder.typicode.com/photos/1', updatedPhoto, {
                headers: {'Content-Type': 'application/json'}
            })
            .expect('status', 200)
            .expect('json', 'title', updatedPhoto.title);
    });

    // Test for DELETE /photos/{id} - Delete a photo
    it('DELETE /photos/1 - should delete a photo and return a status of 200', function () {
        return frisby.del('https://jsonplaceholder.typicode.com/photos/1')
            .expect('status', 200);
    });
});
