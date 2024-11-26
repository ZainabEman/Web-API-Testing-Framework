// Import necessary modules from the k6 library.
import http from 'k6/http';
import { check, sleep, group } from 'k6';

// Define the test options, specifically the load pattern through virtual users (VUs).
export let options = {
    stages: [
        { duration: '30s', target: 20 }, // Ramp up to 20 users over 30 seconds: This gradually increases the number of virtual users to 20 over a period of 30 seconds.
        { duration: '1m', target: 20 },  // Hold at 20 users for 1 minute: This sustains the load of 20 users, keeping it constant for one minute.
        { duration: '30s', target: 0 }   // Ramp down to 0 users over 30 seconds: This gradually reduces the number of users to 0, effectively ending the test.
    ]
};

// Function to create a new post using the POST HTTP method.
function createPost() {
    const url = 'https://jsonplaceholder.typicode.com/posts'; // API endpoint for creating posts.
    const payload = JSON.stringify({ // Data to be sent in the request body, converted to a JSON string.
        title: 'New Entry',
        body: 'This is a new post.',
        userId: 1
    });

    const params = { // Additional parameters for the HTTP request.
        headers: {
            'Content-Type': 'application/json' // Set the content type header to inform the server that JSON data is being sent.
        }
    };

    let response = http.post(url, payload, params); // Execute the POST request.
    check(response, { 'created post successfully': (r) => r.status === 201 }); // Check if the response status code is 201, indicating successful creation.
}

// Function to fetch posts using the GET HTTP method.
function getPosts() {
    let response = http.get('https://jsonplaceholder.typicode.com/posts'); // Execute the GET request to retrieve posts.
    check(response, { 'fetched posts successfully': (r) => r.status === 200 }); // Check if the response status code is 200, indicating successful retrieval.
}

// Function to delete a post using the DELETE HTTP method.
function deletePost() {
    let response = http.del('https://jsonplaceholder.typicode.com/posts/1'); // Execute the DELETE request to remove a specific post.
    check(response, { 'deleted post successfully': (r) => r.status === 200 || r.status === 404 }); // Check if the response is 200 (OK) or 404 (Not Found), both are considered successful outcomes in this context.
}

// The default function that defines the sequence of actions to be performed during the test.
export default function () {
    group('API User Simulation', function() {
        createPost();  // Call to simulate creating a new post.
        getPosts();    // Call to simulate fetching posts.
        deletePost();  // Call to simulate deleting a post.
    });

    sleep(1); // Pause the execution for 1 second between iterations to mimic think time of a real user.
}
