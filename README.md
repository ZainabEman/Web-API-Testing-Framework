 README.md**:
```markdown
## Running the Framework with Docker

1. Build the Docker image:
   ```bash
   docker build -t api-testing-framework .
   ```

2. Run the tests inside the container:
   ```bash
   docker run --rm api-testing-framework
   ```

3. Alternatively, use Docker Compose:
   - Build and run the tests:
     ```bash
     docker-compose up
     ```

   - Stop the container:
     ```bash
     docker-compose down
     ```
```
