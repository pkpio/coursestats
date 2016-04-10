# Install base environment
sudo apt-get install apache2

# Install apache access for App
sudo cp coursestats.de.conf /etc/apache2/sites-enabled/

# Enable rewrite engine for apache
sudo a2enmod rewrite && sudo service apache2 restart

