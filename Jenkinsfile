pipeline
{
    agent{
        label 'docker-agent-todo'
    }
    
    environment {
        DOCKERHUB_CRED_ID = "dockerhub-creds"
        IMAGE_NAME        = "jayaanmol/angular-app"
        IMAGE_TAG         = "${BUILD_NUMBER}"
        GIT_CRED_ID       = "git-ssh-key"
        GIT_REPO          = "git@github.com:JayaanmolShah/learning.git"
        GIT_BRANCH        = "main"
    }

    
     triggers {
        pollSCM('* * * * *')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages{
        stage('checkout') {
            steps{
                echo "Cloning ${GIT_BRANCH} from ${GIT_REPO}..."
                git branch: "${GIT_BRANCH}",
                    credentialsId: "${GIT_CRED_ID}",
                    url: "${GIT_REPO}"
            }
        }
        stage('Build Angular') {
            steps {
                echo "Building Angular app — if this passes, code is good..."
                sh 'npm ci'
                sh 'ng build --configuration production'
                echo "Build successful — no errors found"

            }
        }

        stage('Build Docker') {
            steps {
                echo "Building Docker image ${IMAGE_NAME}:${IMAGE_TAG}..."
                sh """
                    docker build \
                        -t ${IMAGE_NAME}:${IMAGE_TAG} \
                        -t ${IMAGE_NAME}:latest \
                        .
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing to Docker Hub..."
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKERHUB_CRED_ID}",
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh """
                        echo \$PASS | docker login -u \$USER --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${IMAGE_NAME}:latest
                        docker logout
                    """
                }
            }
        }
        stage('Cleanup') {
            steps {
                echo "Removing local Docker images..."
                sh """
                    docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true
                    docker rmi ${IMAGE_NAME}:latest || true
                """
            }
        }
        
    }
    post {
            success {
                echo """
                ✅ SUCCESS
                ─────────────────────────────────────
                Build   : #${BUILD_NUMBER}
                Image   : ${IMAGE_NAME}:${IMAGE_TAG}
                Also    : ${IMAGE_NAME}:latest
                ─────────────────────────────────────
                """
            }
            failure {
                echo """
                ❌ FAILED
                ─────────────────────────────────────
                Build   : #${BUILD_NUMBER}
                Pipeline stopped — check logs above
                ─────────────────────────────────────
                """
            }
            always {
                cleanWs()
            }
    }
}
