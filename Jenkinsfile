pipeline {
    agent none 
    stages {
        stage('Api') {
            when {
                changeset "api/**"
            }
            agent { docker 'node' } 
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
            agent { docker 'node' } 
            steps {
                sh "cd api"
                sh "npm install"
                sh "./build.sh"
            }
        }
    }
}