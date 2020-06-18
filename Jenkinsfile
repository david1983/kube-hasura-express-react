pipeline {
    agent any
    stages {
        stage('Api') {
            agent { docker 'node' }  
            steps {
                dir("api"){
                    sh "npm install"
                    sh "./build.sh"
                }
            }
        }
        stage('React') {
            agent { docker 'node' }  
            steps {
                dir("spa"){
                    sh "npm install"
                    sh "./build.sh"
                }
            }
        }
        stage("Deploy"){
            steps {
                sh "/snap/bin/microk8s.kubectl apply -f deployment"
            }
        }
    }
}
