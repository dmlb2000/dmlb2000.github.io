---
layout: post
title: Media Server Update
image: 
---

# Media Server Update!

I've been running my media/backup/minecraft (lions and tigers and
bears, oh my!) server with Docker, ZFS and Plex for years now.
Every once and a while it's a good practice to look at what you are
doing and validate it's still a good thing to do. Reflection is a
good thing and I'm doing that today!

So, with my infinite technical skill and less than 30 seconds I'm
going to convert my server from Docker to Podman and from Plex to
Jellyfin!

Ha! Well, not really 30 seconds, but it wasn't a difficult task
with a bunch of unknowns. Each problem I encountered had lots of
documentation out there to help me resolve the issues.

## From Docker to Podman

The conversion here was not completely one-to-one. Podman really
takes on the task of container management. Docker can manage many
aspects of running containers on a single server; network, storage,
containers, firewall, etc. The latest versions of Podman (v2.0+)
get closer to managing all those things.

### Things that worked

The volumes, container configurations and firewalls translated
really well. I've been using [ansible](https://www.ansible.com/) to
manage my server for some time and that really helped translate. The
conversion from Docker tasks to podman tasks were one-to-one and
thanks to the
[podman ansible collection](https://github.com/containers/ansible-podman-collections)
maintained by the same folks who develop podman.

There was a minor issues with SeLinux contexts when mounting my
previously Docker volumes as Podman volumes. These volumes were still
backed by ZFS as to not loose my data! However, once I figured
out the right SeLinux context for my volume data the conversion went
smoothly after that.

### Things that didn't work

Network didn't go so well, I get the issues with network management
through Docker and the argument about overstepping bounds that Linux
already was capable of managing these things. However, Docker did
well defining what networking should look like from the container
perspective. I don't think Podman has gotten there yet.

So much of the network stack management (if at all complex) goes
straight to Kubernetes. If you want to manage VLAN configurations
with your containers on a server Kubernetes is the answer I hear most
often.

However, I have a single server machine! Why should I put a software
designed for scalable cluster management on a single machine just
because I can? I want a better reason than that!

Podman's own [documentation](https://podman.io/getting-started/network.html)
for networking completely ignores VLAN configurations!

I did eventually figure out what podman is looking for. However,
it was all about Kubernetes internals and specifically
[CNI](https://github.com/containernetworking/cni) configuration.
I first had to use traditional bridge-utils, NetworkManager style
configurations to create the VLAN interfaces and bridges. Next, there
is a simple CNI configuration JSON file to tell Podman about the
network defined.

```
{
    "cniVersion": "0.4.0",
    "name": "vlan1001",
    "plugins": [
        {
            "name": "net1001",
            "type": "macvlan",
            "master": "vnet1001",
            "ipam": {
                "type": "host-local",
                "ranges": [
                    [
                        {
                            "subnet": "10.0.0.0/24",
                            "rangeStart": "10.0.0.128",
                            "rangeEnd": "10.0.0.254",
                            "gateway": "10.0.0.1"
                        }
                    ]
                ]
            }
        },
        {
            "type": "portmap",
            "capabilities": {
                "portMappings": true
            }
        },
        {
            "type": "firewall"
        },
        {
            "type": "tuning"
        }
    ]
}
```

This configuration allowed me to run a container using Podman on the
`vlan1001` network.

```
podman run -it --rm --name=alpine --network=vlan1001 alpine:latest /bin/bash -l
```

## Media Software

So, I've been thinking of alternatives to Plex for a while now. The
things I've not liked about it have been well documented by the
community.

 * Freemium services are lame!
 * They collect info from my usage!
 * Disconnected from the internet the software becomes useless!

There are a lot of alternatives out there. However, many of them are
clones of Plex but less popular. So, I've been really reluctant to
jump ship because I'm not getting a different ecosystem.

Until I came across [Jellyfin](https://jellyfin.org/)!

### Jellyfin!

Jellyfin is a GPL'd C# code that is gaining a lot of ground. They've
got plugins for the backend and customizable themes framework they
are supporting. I also wanted to thank
[Gardiner Bryant](https://twitter.com/thelinuxgamer) for a thorough
[video](https://www.youtube.com/watch?v=QuNLbAtMFsk) comparing both
Plex and Jellyfin. 

The conversion was really quick for three reasons.

 1. I initially deployed Plex using Docker
 2. The deployment of Jellyfin and Plex are identical with respect to Containers.
 3. Ansible captured the definition of the deployment and replacing was string replacement.

### Conclusion

So, I've just installed it replacing Plex. As I've not lived with it
for a while I'll have to get back to folks on how it lasts. However,
the conversion was a snap with the configuration I have. So, that was
good!