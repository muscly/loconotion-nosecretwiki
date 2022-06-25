#!/bin/bash
eval "$(conda shell.bash hook)"
conda activate loconotion
python loconotion config.toml --timeout 50

cd dist/NoSecretWiki
git add -A
git commit -m "By Script"
git push -u origin main
cd ../..

conda deactivate
