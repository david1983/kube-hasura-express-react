pipeline {
    agent any
    stages {
        stage('Api') {
            agent { docker 'node' }  
        
            // when {
            //     changeset "api/**"
            // }
            steps {
                container('docker') {
                      sh """
                         cd api && npm install && ./build.sh
                      """
                }
            }
        }
        stage('React') {
            agent { docker 'node' }  
            // when {
            //     changeset "spa/**"
            // } 
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
