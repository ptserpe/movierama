properties([pipelineTriggers([githubPush()])])

pipeline {
    agent any

    environment {
        SKAFFOLD_DEFAULT_REPO = "20.79.203.73:32000"
        SKAFFOLD_NAMESPACE = "default"
    }

    stages {
        
        stage("build") {
            steps {
                sh 'skaffold build --file-output=tags.json'
            }
        }

        stage("deploy") {
            steps {
                sh 'skaffold deploy --force --build-artifacts=tags.json'
            }
        }
    }
}