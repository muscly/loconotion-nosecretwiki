node {
    try {
        stage('Update') {
            withCredentials([gitUsernamePassword(credentialsId: 'muscly_github', gitToolName: 'git-tool')]) {
                bat 'git clean -f -d'
                bat 'git reset --hard'
                bat 'git pull origin master'
                dir('dist/NoSecretWiki') {
                    bat 'git clean -f -d'
                    bat 'git reset --hard'
                    bat 'git pull origin main'
                }
            }
        }

        stage('Generate') {
            bat 'conda activate loconotion'
            bat 'python loconotion config.toml --timeout=300'
        }

        stage('Upload') {
            dir('dist/NoSecretWiki') {
                bat 'git add -A'
                bat 'git commit -m "By Script'
                bat 'git push -u origin main'
            }

            bat 'git add -A'
            bat 'git commit -m "By Script'
            bat 'git push -u origin master'
        }

        echo "[muscly] Success"
        currentBuild.result = 'SUCCESS'
    } catch (e) {
        echo "[muscly] Fail. " + e
        currentBuild.result = 'FAILURE'
        throw e

    } finally {
        def body = '''${SCRIPT, template="groovy-html.template"}''' 

        emailext body: body,
            mimeType: 'text/html',
            subject: '$DEFAULT_SUBJECT',
            to: '$DEFAULT_RECIPIENTS',
            attachLog: true,
            compressLog: true,
            saveOutput: true
    }
}