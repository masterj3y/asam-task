This project serves as an assessment to evaluate programming proficiency for ASAM
## Features

1. **Authentication:**
   - JWT-based authentication for secure access.
   - Users must authenticate to access protected routes.

2. **User Management:**
   - Users can register and log in.
   - Authenticated users can retrieve a list of all registered users.

3. **API Documentation:**
   - Comprehensive API documentation is generated using Swagger.
   - Access the documentation at `/docs`.

4. **Testing:**
   - Unit and integration tests are written and stored in the `test` folder.
   - Ensures code quality and reliability.

5. **Rate Limiting:**
   - NGINX is configured for rate limiting to prevent abuse.
   - Configuration files are located in the `nginx` folder.

6. **GitHub Workflow:**
   - A GitHub workflow automates the CI/CD process:
     - Runs tests on the codebase.
     - Builds a Docker image if tests pass.
     - Pushes the Docker image to the repository.

## Deployment **Docker** or **Kubernetes**:

-   **Docker**: A `docker-compose.yml` file is provided in the repository, an NGINX service will function as the API gateway for the application. Please adjust the values in the file to match your requirements before running the application.
-   **Kubernetes (K8s)**: For guidance on running the application in a Kubernetes cluster, refer to the following [link](https://github.com/masterj3y/asam-task/blob/main/k8s/user/README.md), all services will be placed behind an Ingress controller, acting as an API gateway.

Additionally, the process of building Docker images and pushing them to Docker Hub is automated using GitHub Actions. This ensures that a Docker image in sync with the current source code is always available. You can easily pull the latest version of the Docker image from Docker Hub and deploy it in your environment.
