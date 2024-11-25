import http from 'k6/http';
import { check, sleep, group, randomSeed } from 'k6';

// Set a random seed for reproducible randomness in the comment ID selection
randomSeed(123456);

export let options = {
    stages: [
        { duration: '2m', target: 50 }, // Ramp up to 50 users over 2 minutes
        { duration: '3m', target: 50 }, // Hold at 50 users for 3 minutes
        { duration: '1m', target: 0 }   // Ramp down to 0 users over 1 minute
    ]
};

function deleteComment() {
    const id = Math.floor(Math.random() * 500) + 1; // Randomly choose a comment id to delete
    const url = `https://jsonplaceholder.typicode.com/comments/${id}`;

    let response = http.del(url);
    check(response, {
        'deleted comment successfully': (r) => r.status === 200 || r.status === 404, // 404 might be acceptable if the comment is already deleted
    });
}

export default function () {
    group('User Behavior Simulation - Delete Comments', function() {
        deleteComment();
    });

    sleep(1); // Pause for 1 second between each user action to simulate think time
}

