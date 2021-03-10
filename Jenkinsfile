pipeline {
    agent any

    environment {
        JOB_NAME = 'frontend-trillioncoin'
    }

    stages {

        stage('Build') {

            steps {
                script {
                    echo "开始构建"

                    sh "echo 当前分支 : ${env.BRANCH_NAME}"
                    sh "echo 当前环境 : ${env.env}"
                    sh "echo 当前提交 : ${env.commit}"
                    sh "echo WORKSPACE : ${env.WORKSPACE}"
                    sh "echo GIT_BRANCH : ${env.GIT_BRANCH}"
                    sh "echo BUILD_NUMBER : ${env.BUILD_NUMBER}"
                    sh "echo JOB_NAME : ${env.JOB_NAME}"
                    sh "cd $WORKSPACE; rm -rf node_modules ; rm -f package-lock.json"
                    sh 'npm cache clear --force'

                    echo 'NPM Install...'

                    sh 'npm i --legacy-peer-deps'
                    sh 'npm run build'
                }
            }
        }

        //stage('Test'){
          //  steps{
            //}
        //}

        stage('Deliver'){
            steps{
                sh 'sudo cp -r ./dist /usr/share/nginx/html'
                //sh 'tar -czf dist.tar.gz ./dist'
                //stash 'dist.tar.gz'
                //archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true
            }
        }
    }
}