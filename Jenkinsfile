pipeline {
    agent none
    stages {
        agent { docker 'node' }  
        stage('Api') {
            // when {
            //     changeset "api/**"
            // }
            steps {
                dir("api"){
                    sh "npm install"
                    sh "./build.sh"
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