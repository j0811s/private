#!/bin/sh

subDomain=$1
domain=${subDomain}.localdev.com
subDir=$2

# hostsに追記
sudo sh -c "echo '# Added by localdev \n127.0.0.1 ${domain} \n# End of section' >> /etc/hosts"

# 'resources/nginx/conf.d/nginx.conf'に追記
if [ $# != 2 ] ; then
    echo "'/etc/host' write completed"
    exit 1
else
server_str="
server {
    listen 80;
    listen [::]:80;
    server_name ${domain};

    root /var/www/html;
    index index.php index.html;

    location / {
        try_files \$uri \$uri/ ${subDir}/index.php\$is_args\$args;
    }

    location ~ \.php$ {
        try_files \$uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php7.4:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        fastcgi_param PATH_INFO \$fastcgi_path_info;
    }
}

server {
    listen 443 ssl;
    server_name ${domain};

    root /var/www/html;
    index index.php index.html;

    ssl_certificate /etc/certs/localhost.pem;
    ssl_certificate_key /etc/certs/localhost-key.pem;

    location / {
        try_files \$uri \$uri/ ${subDir}/index.php\$is_args\$args;
    }

    location ~ \.php$ {
        try_files \$uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php7.4:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        fastcgi_param PATH_INFO \$fastcgi_path_info;
    }
}
"

  sudo sh -c "echo '${server_str}' >> ./resources/nginx/conf.d/nginx.conf"

  echo "'/etc/host' & 'resources/nginx/conf.d/nginx.conf' write completed"
  exit 1
fi