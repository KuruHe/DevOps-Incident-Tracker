pipeline {
    agent any
    stages {
        stage('Build') { steps { echo 'Building...' } }
        stage('Test') { steps { echo 'Testing...' } }
        stage('Security Scan') { steps { echo 'Scanning...' } }
        stage('Docker Build & Push') { steps { echo 'Pushing to registry...' } }
        stage('Update GitOps Repo') { steps { echo 'Updating ArgoCD manifest...' } }
    }
}