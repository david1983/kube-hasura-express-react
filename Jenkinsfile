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
  node("${label}-1") {
    stage('Build API ') {
      git 'https://github.com/david1983/kube-hasura-express-react.git'
      container('docker') {
        sh "ls -la"
        dir("api"){
          sh "docker build -t localhost:5000/api ."
          sh "docker push localhost:5000/api"
        }
      }
    }
  }
   node(${label}-2) {
    stage('Build SPA ') {
      git 'https://github.com/david1983/kube-hasura-express-react.git'
      container('docker') {
        sh "ls -la"
        dir("spa"){
          sh "docker build -t localhost:5000/spa ."
          sh "docker push localhost:5000/spa"
        }
      }
    }
  }

}
