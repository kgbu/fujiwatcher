fujiwatcher
==========

MQTT gateway (Fuji in my case) watcher via Websocket

Now I'm trying to figure out how to write Electron code.

Start here
=====

```
git clone https://github.com/kgbu/fujiwatcher.git
```
Sample Configuration
-------------------

```
{
  "url": "ws://MQTTBLOKER.HOSTNAME:8888/mqtt",
  "port": 8888,
  "subscribetopic": "topicprefix/#", 
  "topic": "topicprefix/connectionchecktopic",
  "username": "USERNAMEforBROKER",
  "password": "PASSWORDforBROKER"
}
```

Setup
-----

configuration shall be stored in ```./.auth.conf``` file.

```
cd fujiwatcher
cp config.sample .auth.conf
vi .auth.conf
electron .
```

LICENSE
=======

The MIT License (MIT)

see ./LICENSE
