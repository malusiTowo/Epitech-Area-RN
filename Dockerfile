FROM ubuntu:14.04

RUN apt-get install --yes curl && \
  curl --silent --location https://deb.nodesource.com/setup_10.x | sudo bash - && \
  apt-get install --yes nodejs && \
  sudo apt-get install --yes g++ build-essential && \
  sudo apt-get install --yes git && \
  sudo npm install -g --unsafe-perm grpcli grpc && \
  sudo apt-get install -y software-properties-common && \
  npm install -g --unsafe-perm turtle-cli && \
  sudo add-apt-repository ppa:openjdk-r/ppa

RUN apt-get update && \
  apt-get install -y openjdk-8-jdk && \
  apt-get install -y ant && \
  apt-get install -y ca-certificates-java && \
  apt-get clean && \
  update-ca-certificates -f && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk8-installer;

ENV EXPO_USERNAME=epictureepitech

ENV EXPO_PASSWORD=epictureEpitech

ENV EXPO_ANDROID_KEYSTORE_PASSWORD=c4c3eca89cef4796a5f13c7cf9cfc4b9

ENV EXPO_ANDROID_KEY_PASSWORD=2a05cd3d903a4a02bd34e92974c0f55f

WORKDIR /usr/app

COPY . .

RUN npm install


ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/

RUN sudo apt-get -y update && \
  turtle setup:android

RUN turtle build:android --type apk --keystore-path ./area.jks --keystore-alias QGVwaWN0dXJlZXBpdGVjaC9hcmVh --output client.apk

CMD sh