import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 10 }, // Ramp up to 10 users over 30 seconds
        { duration: '1m', target: 10 },  // Hold at 10 users for 1 minute
        { duration: '30s', target: 0 },  // Ramp down to 0 users over 30 seconds
    ]
};

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const payload = JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response = http.post(url, payload, params);

    check(response, {
        'is status 201': (r) => r.status === 201,
        'is id present': (r) => JSON.parse(r.body).id !== undefined,
    });

    sleep(1); // Sleep for 1 second between iterations
}
