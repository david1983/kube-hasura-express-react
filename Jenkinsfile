pipeline {
    agent { docker 'node' }  
    stages {
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
    }
}