CREATE USER 'houseofpets'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON * . * TO 'houseofpets'@'localhost';

# Changing authentication plugin to mysql_native_password from caching_sha2_password
ALTER USER 'houseofpets'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';