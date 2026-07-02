FROM wordpress:latest

RUN apt-get update && apt-get install -y \
  less \
  curl \
  && rm -rf /var/lib/apt/lists/*

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
  && chmod +x wp-cli.phar \
  && mv wp-cli.phar /usr/local/bin/wp

COPY setup.sh /usr/local/bin/setup.sh
# strip Windows CRLF line endings in case the repo was checked out with
# autocrlf - a \r after the shebang breaks the script inside the container
RUN sed -i 's/\r$//' /usr/local/bin/setup.sh && chmod +x /usr/local/bin/setup.sh