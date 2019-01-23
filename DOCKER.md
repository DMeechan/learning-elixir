# Learning Docker

> What's your primary source of knowledge for this?

Stephen Grider's Udemy course: [Docker & Kubernetes: The Complete Guide](https://www.udemy.com/docker-and-kubernetes-the-complete-guide/)

## The Core

> What actually is a container?

First, let's think about normal applications. They all run on the same operating system and share resources. So what do you do if Chrome requires Node v8, while Slack requires Node v11? You can't have them both installed simultaneously, so what do you do?

One solution: you isolate those processes. You make them run inside their own little isolated environement

So how do we isolate a process? I guess we need to give its own dedicated an area on the hard drive for doing its thing, along with a set amount of resources like memory and processing speed.

What would happen if we isolated one of those applications to a specific area of the hard drive? In Linux, that's called creating a namespace. **Namespaces** allow you to isolate resources (like part of your hard drive or networking capabilities). Meanwhile, control groups (often called **cgroups**) let you apply resource limits to a process: for example, you can limit the memory or amount of processing power available to a process.

Read [this short article](https://jvns.ca/blog/2016/10/10/what-even-is-a-container/) for a more in-depth explanation of the two.

Docker is basically just a bunch of scripts which isolate processes by applying namespace and cgroup limits to them. Simple. Imagine we're just sticking the process in a little container :D

(_apparently Docker now does much more than that, but nonetheless that's the core concept_)

> Okay... so a container is just an isolated environment for a process. Where do images come into play?

Images are snapshots of the file system for a container.

When we're creating the container, we need to specify what files it needs to do its job. We package those files up (along with some other stuff) and stick them in an immutable file: an image.

Then we spin up as many containers as we want from that one image.

> Oooh I see. So images are just an immutable snapshot of the filesystem for a container?

Yep. So the next question is: how does this run on Mac & Windows?

I mentioned that namespaces and cgroups only exist on Linux. Therefore, Docker Desktop has to do some magic to get it to work on Mac & Windows: it actually spins up a Linux virutal machine.

So when you're running up a container using Docker Desktop, you're actually running an isolated process (container) inside a Linux virtual machine, inside your host operating system.

Smooth.

Docker doesn't do that whole virtual machine thing on Linux because it can just use namespaces and cgroups directly. No need for an intermediary

## Basic commands

> How do you view the containers you have running?

```bash
docker ps
# I think of ps as meaning 'processes' so I can remember it:
# we're effectively getting a list of running Docker processes (kinda)

# If you want to view all containers you've ever run:
docker ps --all
```

> How do you create containers?

```bash
# start simple:
docker run hello-world

# make a container run your own command
docker run busybox echo hello everyone # outputs: hello everyone

# but this doesn't work if you try to run:
docker run hello-world echo hello everyone
# why? Because the hello-world image only contains
# one single application: output 'hello world'
# meanwhile, busybox is an image of a full-blown Debian OS
# so we can run any Linux commands in there
```

> What does `docker run NAME` actually _do_?

```bash
# docker run is an alias of two commands:
docker create NAME # this will create a container and give you an ID for it
docker start ID # you need the ID to tell Docker which container to start up
```

- That command will output sup bois into console. But adding echo xxx onto the end of the hello world container doesn't work. Why?
- Because the hello-world container literally contains one command. Meanwhile busybox has all of the Linux commands in there
- docker create => container ID
- docker start - a container ID => start the container and show us the output from running it
- If you don't use -a, it won't watch for the console output of the container
- What do you do if docker is eating up disk space and you don't rly need all those old containers and image caches? Prune it!
- docker system prune
- What if we didn't include -a when starting our container? Do we have to start it again but with the right flag, or can we access all of the events the container has emitted?
- docker logs containerId
-
