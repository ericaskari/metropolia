echo "reading environment variables..."
source ~/.bash_profile
echo "deploying..."
mrsync -a --progress --delete web-one/dist/src/ mohamas@edunix.metropolia.fi:~/public_html/web-teknologiat
mrsync -a --progress --delete .htpasswd mohamas@edunix.metropolia.fi:~/.htpasswd
mrsync -a --progress --delete .htaccess mohamas@edunix.metropolia.fi:~/public_html/web-teknologiat/homework-8/.htaccess
echo "deployed :)"
