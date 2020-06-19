/**
 * This pipeline will run a Docker image build
 */

def label = "docker-${UUID.randomUUID().toString()}"

podTemplate(label: label, yaml: """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: docker:1.11
    command: ['cat']
    tty: true
    volumeMounts:
    - name: dockersock
      mountPath: /var/run/docker.sock
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
"""
  ) {
 node(label) {
    stage('Build Docker image') {
      git 'https://github.com/david1983/kube-hasura-express-react.git'
      container('docker') {
        sh "ls -la"
        sh "cd kube-hasura-express-react/api && ./build.sh"
      }
    }
  }
}
