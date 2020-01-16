---
layout: post
title: Minecraft and Related Thoughts!
image: 
---

# Minecraft!

Minecraft is a fun game to play, if you aren't familiar with
Minecraft then you've been under a rock for a very long time. You
should ask someone about it and get your head out of the sand.

I have a computing family, my wife and I enjoy computing both
personally and professionally. We've also tried to instil this love
of computing in your two girls. At this point our entire family has
their own computers and we play Minecraft with each other on a regular
basis.

## The Setup

I run a [Fedora](https://getfedora.org) server with
[Docker](https://www.docker.com) to manage the Minecraft servers. The
storage I use for the servers is [ZFS](https://zfsonlinux.org). The
combination of these three technologies support the services I use
at home including Minecraft.

The Minecraft server bundle I end up downloading through the
[Twitch Client](https://www.twitch.tv) on Windows. They've been really
good at providing server packs. They usually come as a ZIP file and I
create a docker volume backed by a ZFS mounted file system. These are
both manual processes though.

```
docker volume create ftb-vanilla
zfs create zpool/ftb-vanilla
zfs set mountpoint=/var/lib/docker/volumes/ftb-vanilla/_data zpool/ftb-vanilla
```

Then I can unpack the server bundle into the docker volume and start
it using a standard java container.

```
docker run -d --name mc-ftb-vanilla -p 25565:25565 -v ftb-vanilla:/data:Z -w /data openjdk:8 /bin/bash LaunchServer.sh
```

There is plenty more you can do when running your own DNS and multiple
Minecraft servers on one host.

 * https://www.namecheap.com/support/knowledgebase/article.aspx/9765/2208/how-can-i-link-my-domain-name-to-a-minecraft-server
 * https://www.noip.com/support/knowledgebase/how-to-add-a-srv-record-to-your-minecraft-server-remove-the-port-on-the-end-of-the-url/

This gives you the option of running Minecraft on different ports but
allowing the clients to just use a standard name
(i.e. `ftb-vanilla.example.com`). This is easier for kids to type
into the Minecraft launcher.