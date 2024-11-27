## Deployment**Docker** or **Kubernetes**:

-   **Docker**: A `docker-compose.yml` file is provided in the repository, an NGINX service will function as the API gateway for the application. Please adjust the values in the file to match your requirements before running the application.
-   **Kubernetes (K8s)**: For guidance on running the application in a Kubernetes cluster, refer to the following [link](https://github.com/masterj3y/asam-task/blob/main/k8s/user/README.md), all services will be placed behind an Ingress controller, acting as an API gateway.

Additionally, the process of building Docker images and pushing them to Docker Hub is automated using GitHub Actions. This ensures that a Docker image in sync with the current source code is always available. You can easily pull the latest version of the Docker image from Docker Hub and deploy it in your environment.
