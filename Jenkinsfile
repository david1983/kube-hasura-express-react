
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

  def image = "jenkins/jnlp-slave"
  node(label) {
    stage('Build API') {
      container('docker') {
        sh "cd api && ./build.sh"        
      }
    }
    stage('Build SPA') {
      container('docker') {
        sh "cd spa && ./build.sh"
    }
  }
}
