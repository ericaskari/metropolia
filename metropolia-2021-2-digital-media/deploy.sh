echo "reading environment variables..."
source ~/.bash_profile
echo "deploying..."
sshpass -p "${MP}" ssh -o StrictHostKeyChecking=no mohamas@edunix.metropolia.fi "mkdir -p ~/public_html/mediakurssin-palautukset"
mrsync -a --progress --delete ./dist/ mohamas@edunix.metropolia.fi:~/public_html/mediakurssin-palautukset
echo "deployed :)"
