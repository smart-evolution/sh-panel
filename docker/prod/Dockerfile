FROM debian:buster

RUN mkdir -p /root/scripts
RUN mkdir -p /root/go/src/github.com/smart-evolution/shpanel/public
RUN mkdir -p /root/go/src/github.com/smart-evolution/shpanel/views

ADD ./bin/public /root/go/src/github.com/smart-evolution/shpanel/public
ADD ./bin/views /root/go/src/github.com/smart-evolution/shpanel/views
COPY ./bin/shpanel /root/go/src/github.com/smart-evolution/shpanel/
COPY ./entrypoint.sh /root/scripts/

ENTRYPOINT /root/scripts/entrypoint.sh
