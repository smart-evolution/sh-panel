FROM debian:buster

# Install generictools
RUN apt-get update && apt-get upgrade && apt-get install -y \
wget \
python \
vim \
git \
build-essential

# Install nodejs
RUN curl -o node-v9.9.0-linux-armv6l.tar.gz https://nodejs.org/dist/v9.9.0/node-v9.9.0-linux-armv6l.tar.gz && \
tar -xzf node-v9.9.0-linux-armv6l.tar.gz && \
sudo cp -r node-v9.9.0-linux-armv6l/* /usr/local/

# Install golang
RUN wget https://dl.google.com/go/go1.12.5.linux-armv6l.tar.gz && \
sudo tar -C /usr/local -xzf go1.12.5.linux-armv6l.tar.gz && \
rm go1.12.5.linux-armv6l.tar.gz
ENV PATH="${PATH}:/usr/local/go/bin"

# Set env variables
ENV GOPATH=/root/go \
GO111MODULE=on \
PATH="${PATH}:${GOPATH}/bin"