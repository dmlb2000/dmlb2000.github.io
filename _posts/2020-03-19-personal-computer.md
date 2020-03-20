---
layout: post
title: Desktop Linux Fun!
image: 
---

# Personal Desktop Linux Fun Computing!

I need a new desktop computer for having fun with Linux and other
minor things like internet access. I'm not going to duel boot this
system, it will be exclusively Linux! So, I've got a problem with
fewer restrictions (i.e. no Windows), there are too many options!

## Thoughts on Requirements

 * Just to keep it simple the desktop gaming has moved to a VR
   station in another room and it's going to be shared with the
   family now.
 * I'd like to keep up on leading edge of technology in software
   development. To me, this means hardware that's container ready.
 * Traditional desktop container development has been working for
   a while. Docker has been the traditional technology in this
   space and works well for single systems.
 * The next generation of containers is Kubernetes. It's been taking
   over market share and open source development efforts in cloud
   for a while now.
 * Kubernetes is a clustered container solution and can be built on
   many different architectures (arm, x86).

## Solution Options

The future for me really hinges on a coming to terms with Kubernetes.
I know it's a complicated solution, but a clustered container engine
is a complicated problem. I feel like my career could go in very
different directions given the outcome of a serious effort to learn
Kubernetes.

### Virtual Local Kubernetes

No one can know for sure how the big cloud vendors implement the
hardware and virtualization within their cloud. However, most of
the cloud solutions implement Kubernetes for customers in a virtual
hardware space. So, putting Kubernetes into a virtual machine
environment on the desktop isn't that far fetched.

The thought would be to get a big memory desktop with server grade
hardware. For roughly $3k, I could get a Xeon based desktop server
with 64Gb of memory and even buy RedHat support for 3 years. This
would be bundled and have a lot of enterprise features that are
geared for running virtual environments. I could build whatever
Kubernetes virtual cluster I wanted on that kind of system or I could
choose to not to and just develop software that requires beefy
hardware.

This solution really defines the top limit in cost as the virtual
layer does present some extra complexity that isn't required to
run Kubernetes. This solution is also an all-in-one solution where
desktop, development, and work happens in a single system. Hardware
and cloud solutions are available for Kubernetes and I'll go over
those solutions next.

### Development and Management

If we have any Kubernetes cluster at home or virtual,
a login desktop will be required to interface with the cluster.
The login node can be the control node for the cluster or simply
provision the cluster or both. The other requirement for the login
node is that it must run a development environment of some kind to
build code.

The development IDE of choice for me is
[VSCode](https://code.visualstudio.com). VSCode is a powerful IDE
that is Open Source (Good job, Microsoft!) and has a really powerful
extension framework and community to make VSCode the most flexible
IDE available. Some features to consider in this environment are,
remote development and the Kubernetes extensions.

The requirements for the login node are to run VSCode and any
supporting language codes that I might want to build. These
requirements don't help though, the minimum hardware requirements are
still really low (1.6GHz CPU and 1Gb of ram!). Choosing an
x86 based login node is the most logical solution to get the most
diverse set of languages to develop with, so that helps.

### Cloud Kubernetes

The management and overhead of installing upgrading and administering
a Kubernetes cluster is often provided by the Cloud vendors. However,
the cloud vendors have created a system of micro-transactions that
completely cloud</pun> the total cost of the system. The complication
is intentional and frustrates small customers into just accepting the
cost and not really understanding it. Not to say the comlication is
unjustified, providing services from IaaS (Infrastructure as a
Service) all the way up to PaaS (Platform as a Service) is a
complicated problem.

So, to manage my own sanity and not write a blank check to a cloud
vendor, I'm going to put some limits on my cost and probably get back
to you. The thought is to give Google (just because I'm invested in
them in other ways) a month or two and evaluate cost at the end and
extrapolate over the life-time of a box under my desk. Then I can
compare the cost between the two and determine if a cloud Kubernetes
is comparable to have a hardware cluster.

### Hardware Kubernetes

The thought of a hardware Kubernetes cluster in my house may seem a
bit too much for most. However, with the cost of computing platforms
like [RaspberryPi](https://www.raspberrypi.org/) it really becomes
more practical than at first glance. The Raspberry Pi 4 can have 4Gb
of memory and a Quad core 1.5Ghz CPU, for around $60 US! Wow! The
extra costs of network, power supply, storage, and cluster case do
bring the cost up per Raspberry Pi but not by much. I figure I could
easily spec a 10-12 node Raspberry Pi cluster for under $3k.

This does not come with out other complications. Administration and
management of the Kubernetes cluster is mine to own 100%. This does
have some advantages learning the Kubernetes stack and would provide
a lot of insite on how to use it. However, this could take up time
administering hardware and a complicated software stack that would
slow down how to use Kubernetes and dive deeper into developing
Kubernetes. I'll have to choose where on that spectrum I want to
land.

## Conclusion

Well, at least I know what I don't know... does that help? There's
a really big unknown cost in spinning up a temporary Kubernetes
cluster in the cloud and shutting it down when I'm done. How often
would I do that? Would I run into situations where I want it to live
for a while? Could I automate my way out of cleaning up after myself?

The technology to solve these questions is available. Ansible is a
well supported tool to spin up and configure all kinds of services in
all of the cloud vendors. The presence or absence of services can be
very finely controlled by Ansible. This can really reduce costs and
keep utilization of the resources you do allocate really high when
you need them.

So, I think the answer is I'm going to try Google cloud and come back
to you in a couple of months with some cost projections. Then I might
buy a Raspberry Pi cluster or not.