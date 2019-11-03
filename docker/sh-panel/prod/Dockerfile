FROM debian:buster

# Set env variables
ENV SH_PANEL_MONGO_URI=mongodb://172.18.0.2:27017 \
SH_PANEL_MONGO_DB=shpanel \
SH_PANEL_PORT=3223

RUN mkdir -p /root/scripts
RUN mkdir -p /root/go/src/github.com/smart-evolution/shpanel/public
RUN mkdir -p /root/go/src/github.com/smart-evolution/shpanel/views

ADD ./public /root/go/src/github.com/smart-evolution/shpanel/public
ADD ./views /root/go/src/github.com/smart-evolution/shpanel/views
COPY ./shpanel /root/go/src/github.com/smart-evolution/shpanel/
COPY ./docker/sh-panel/prod/entrypoint.sh /root/scripts/

ENTRYPOINT /root/scripts/entrypoint.sh
