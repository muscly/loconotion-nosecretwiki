node {

    def executableName

    def buildExecutableLogName = 'buildExecutable.log'
    def buildAssetBundleLogName = 'buildAssetBundle.log'

    try {
        stage('Update') {
            withCredentials([gitUsernamePassword(credentialsId: 'muscly_github', gitToolName: 'git-tool')]) {
                bat 'git clean -f -d'
                bat 'git reset'
                bat 'git pull --recurse-submodules'
            }
        }

/*

        stage('Update') {
            dir("Client/BuildScript") {
                if ( new File(buildExecutableLogName).exists() ) new File(buildExecutableLogName).delete()
                if ( new File(buildAssetBundleLogName).exists() ) new File(buildAssetBundleLogName).delete()
            }

            bat 'svn cleanup --remove-unversioned Client'
            bat 'svn revert -R Client'
            bat 'svn update Client'
        }

        stage('Build Excutable') {
            dir("Client/BuildScript") {
                // Read Lastline
                executableName = bat (script:'dotnet-script AresBuild.csx getExecutableName --useAssetBundle true --assetBundleEnv "Dev" --buildPlatform "Android" --appVersion "0.2.0"'
                                    , returnStdout: true).trim().readLines()[0]

                def intermediatePath = "c:\\BuildIntermediate\\Android\\" + executableName
                echo '[Jenkins] intermediatePath = ' + intermediatePath

                try {
                    bat 'dotnet-script AresBuild.csx buildExecutable --useAssetBundle true --assetBundleEnv "Dev" --assetBundleOutputDir "../../AssetBundles" --outputPath ' + intermediatePath + ' --unityPath "c:\\Program Files\\Unity\\Hub\\Editor\\2021.2.17f1\\Editor\\Unity.exe" --appVersion "0.2.0" --logPath "' + buildExecutableLogName + '"'
                } finally {
                    archiveArtifacts artifacts: buildExecutableLogName, onlyIfSuccessful: false
                }
                
                def outputDir = "c:\\BuildOutput\\Android\\";
                bat 'move ' + intermediatePath + ' ' + outputDir
            }
        }
        
        stage('Build AssetBundles') {
            dir("Client/BuildScript") {
                try {
                    bat 'dotnet-script AresBuild.csx buildAssetBundle --assetBundleEnv "Dev" --outputDir "../../AssetBundles" --unityPath "c:\\Program Files\\Unity\\Hub\\Editor\\2021.2.17f1\\Editor\\Unity.exe" --logPath "' + buildAssetBundleLogName + '"'
                } finally {
                    archiveArtifacts artifacts: buildAssetBundleLogName, onlyIfSuccessful: false
                }
            }
        }
        
        stage('Upload AssetBundles') {
            dir("Client/BuildScript") {
                bat 'dotnet-script AresBuild.csx uploadAssetBundle --assetBundleEnv "Dev" --outputDir "../../AssetBundles" --assetBundlePlatform "Android" --appVersion "0.2.0"'
            }
        }
        */

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