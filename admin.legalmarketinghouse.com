# Expires map
map $sent_http_content_type $expires {
  default                    off;
  text/html                  epoch;
  text/css                   max;
  application/javascript     max;
  ~image/                    max;
}

# Default server configuration
#
server {
	listen 80;
	listen [::]:80;

	root /var/www/scarincihollenbeck.cc/admin;

	index index.php index.html index.htm index.nginx-debian.html;

	server_name admin.legalmarketinghouse.com;

  location = /favicon.ico { log_not_found off; access_log off; }
  location = /robots.txt { log_not_found off; access_log off; allow all; }
  location ~* \.(css|gif|ico|jpeg|jpg|js|png)$ {
    expires max;
    log_not_found off;
  }

  location / {
     try_files $uri $uri/ /index.php?q=$uri&$args;
     add_header  X-Robots-Tag "noindex, nofollow, nosnippet, noarchive";
     add_header X-Frame-Options SAMEORIGIN;
     add_header X-Content-Type-Options nosniff;
     add_header X-XSS-Protection "1; mode=block";   
  }

  location /robots.txt { 
    return 200 "User-agent: YandexDisallow: /\nUser-agent: *\nDisallow: /";
  }


  location ~ \.php$ {
   include snippets/fastcgi-php.conf;
   fastcgi_pass unix:/run/php/php7.2-fpm.sock;
  }

   location ~ /\.ht {
        deny all;
    }

  # enable gzip compression
  gzip on;
  gzip_comp_level    5;
  gzip_min_length    256;
  gzip_proxied       any;
  gzip_vary          on;

  gzip_types
  application/atom+xml
  application/javascript
  application/json
  application/ld+json
  application/manifest+json
  application/rss+xml
  application/vnd.geo+json
  application/vnd.ms-fontobject
  application/x-font-ttf
  application/x-web-app-manifest+json
  application/xhtml+xml
  application/xml
  font/opentype
  image/bmp
  image/svg+xml
  image/x-icon
  text/cache-manifest
  text/css
  text/plain
  text/vcard
  text/vnd.rim.location.xloc
  text/vtt
  text/x-component
  text/x-cross-domain-policy;
  # text/html is always compressed by gzip module 
  
  expires $expires;

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/admin.legalmarketinghouse.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/admin.legalmarketinghouse.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
