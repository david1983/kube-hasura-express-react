pipeline {
    agent any
    stages {
        stage('Api test') {
            agent { docker 'node' }  
            steps {
                dir("api"){
                    sh "npm install"
                }
            }
        }
        stage("Api build"){
            steps{
                dir("api"){
                    sh "./build.sh"
                }   
            }
        }
        stage('React test') {
            agent { docker 'node' }  
            steps {
                dir("spa"){
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }
        
        stage("React build"){
            steps{
                dir("spa"){
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
