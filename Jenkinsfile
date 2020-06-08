pipeline {
    agent { docker 'node' }  
    stages {
        stage('Api') {
            when {
                changeset "api/**"
            }
            steps {
                sh "cd api"
                sh "npm install"
                sh "./build.sh"
            }
        }
        stage('React') {
            when {
                changeset "spa/**"
            } 
            steps {
                sh "cd api"
                sh "npm install"
                sh "./build.sh"
            }
        }
    }
}