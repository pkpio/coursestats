# Install base environment
sudo apt-get install apache2 php5 mysql-server php5-mysql

# Install deps for composer
sudo apt-get install curl php5-cli git

# Install composer
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

# Install database
clear
echo 'Installing coursestats database. Enter root password for SQL database...'
mysql -h localhost -u root -p < coursestats.sql

# Install apache access for API
sudo cp api.coursestats.de.conf /etc/apache2/sites-enabled/

# Enable rewrite engine for apache
sudo a2enmod rewrite && sudo service apache2 restart

