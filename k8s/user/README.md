# Prerequisites
    Helm: Helm should be installed and configured.

**Installation**

Enable Ingress: If you're using Minikube, enable Ingress to ensure proper application routing:

    minikube addons enable ingress

In order for your application to function correctly and for you to be able to use the automatic scaling of the number of pods (Horizontal Pod Autoscaler or HPA), you need to enable the metrics-server in your cluster.
Enable Metrics-Server: 

    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

If you're using minikube, enable the metrics-server using the file `k8s/qter/metrics-server.yaml`

    kubectl apply -f metrics-server.yaml


- **Configure Values**: Verify that the values.yaml file contains the correct configuration for your environment.
- **Update Dependencies**: Download the required charts (MongoDB, Elasticsearch, RabbitMQ):

    helm dependency update

**Install the Application**: Install the application using Helm:

    helm install users . -n <name-space> -f values.yaml

   Replace `<name-space>` with the desired namespace for your deployment.

## Explanation:

- **Minikube and Ingress**: Minikube provides a local Kubernetes cluster, and enabling Ingress is crucial for managing external traffic to your services.
- **Values.yaml**: This file holds configuration settings tailored to your specific deployment. Ensure it's accurate to avoid issues.
- **Helm Dependency Update**: This step fetches the latest versions of any charts listed in your Chart.yaml file.
- **Helm Install**: This command deploys the application to your Kubernetes cluster using the specified values and namespace. 

## Additional Considerations:

- **Namespace**: Using a dedicated namespace helps isolate different applications and manage resources effectively.
- **Customizations**: You might need to modify the values.yaml file further based on your application's requirements.
- **Helm Charts**: Ensure that the Helm charts you're using are compatible with your Kubernetes version and meet your specific needs.

## Troubleshooting:

- **Check logs**: Use `kubectl logs` to inspect the logs of your deployed pods for any errors or warnings.
- **Verify configurations**: Double-check the values.yaml file and the Helm chart configuration for any typos or **incorrect settings.

Inspect resources**: Us `kubectl get pods`,`services`,`ingress` to verify that the resources are created correctly.

By following these steps and carefully reviewing the logs, you should be able to successfully deploy your application using Helm.
