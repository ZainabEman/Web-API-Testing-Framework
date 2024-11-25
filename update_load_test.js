import http from 'k6/http';
import { check, sleep, group, randomSeed } from 'k6';

// Set a random seed for reproducible randomness in generated data
randomSeed(123456);

export let options = {
    stages: [
        { duration: '1m', target: 30 }, // Ramp up to 30 users over 1 minute
        { duration: '2m', target: 30 }, // Hold at 30 users for 2 minutes
        { duration: '1m', target: 0 }   // Ramp down to 0 users over 1 minute
    ]
};

function updatePost() {
    const id = Math.floor(Math.random() * 100) + 1; // Randomly choose a post id to update
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const payload = JSON.stringify({
        id: id,
        title: `Updated Post Title ${id}`,
        body: `This is updated post content for post ${id}.`,
        userId: id % 10 + 1 // Random user id for the post from 1 to 10
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let response = http.put(url, payload, params);
    check(response, {
        'updated post successfully': (r) => r.status === 200,
        'received correct post id': (r) => JSON.parse(r.body).id === id
    });
}

export default function () {
    group('User Behavior Simulation - Update Posts', function() {
        updatePost();
    });

    sleep(1); // Pause for 1 second between each user action to simulate think time
}
