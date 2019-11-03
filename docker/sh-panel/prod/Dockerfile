FROM debian:buster

RUN mkdir -p /root/scripts
RUN mkdir -p /root/go/src/github.com/smart-evolution/shpanel/public
RUN mkdir -p /root/go/src/github.com/smart-evolution/shpanel/views

ADD ./public /root/go/src/github.com/smart-evolution/shpanel/public
ADD ./views /root/go/src/github.com/smart-evolution/shpanel/views
COPY ./shpanel /root/go/src/github.com/smart-evolution/shpanel/
COPY ./docker/prod/entrypoint.sh /root/scripts/

ENTRYPOINT /root/scripts/entrypoint.sh
