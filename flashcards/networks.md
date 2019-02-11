What are the layers of the OSI model?

---

Application

Presentation

Session

Transport

Network

Data link

Physical

===

What kinds of data run on each layer of the OSI model?

---

Application - DATA

Presentation - DATA

Session - DATA

Transport - SEGMENTS

Network - PACKETS

Data link - FRAMES

Physical - BITS

===

What are some example protocols / things that run on each layer of the OSI model?

---

Application - HTTP or DNS or FTP or SSH

Presentation - SSL or WPA

Session - APIs or sockets

Transport - TCP or UDP

Network - IPv4 or IPv6

Data link - Wi-Fi or ethernet

Physical - cables or hubs

===

What are four properties of HTTP?

---

1. HTTP can deliver **any type of data**
2. HTTP runs on TCP/IP
3. It **does not maintain a connction** - the server drops the connection after the request / resonse cycle is complete
4. It's **stateless** - every request assumes no prior communication (so every request contains a bunch of headers, like for auth or whatever)

*Note that TCP is a connection-oriented transport protocol, whereas UDP is truly connectionless. So technically HTTP is not `connectionless`, but realistically the connection is dropped after the cycle is complete.*

*Unless we use a keep-alive so we can re-use the same TCP connection for multiple requests*

===

What is a HTTP request made up of?

---

1. Start line:  METHOD   RESOURCE_URI    HTTP_VERSION
2. Header: key-value pairs, like file type, language, auth token
3. Body: some content, like the details of a todo list task for a POST request

===

What is a HTTP response made up of?

---

1. Start line:  HTTP_VERSION    STATUS_CODE
2. Header: some key-value pairs
3. Body: the requested data, like a HTML page or JSON blob

===

What does the HTTP request / response cycle look like?

---

1. Client composes a request
2. Client sends that request to the server and initiates a TCP connection
3. Server accepts the TCP connection
4. Server processes the request
5. Server composes a response
6. Server sends the response
7. Server closes the TCP connection

*But IRL, you'd probably use a keep-alive to hold the TCP connection open so you can re-use it for multiple requests*

===

What is a TCP connection made up of?

---

A TCP connection is defined by two *endpoints*. These endpoints are called *sockets*.

What is a socket? A socket is simply a network interface (IP address) + a port (like 8080)

So can have multiple TCP connections going through one socket on a server because each connection is defined by both the client endpoint and server endpoint.

===

How does a HTTP keep-alive work?

---

In HTTP 0.9 and 1.0, clients had to include a `Connection: keep-alive` header in their request. If the server agreed, it wouldn't close the TCP connection after sending its response.

Now in HTTP 1.1, `Connection: keep-alive` is the default.

So clients must explicitily include a `Connection: close` header if they don't want the TCP connection to remain open.

===

Why is it more efficient to use `keep-alives` than creating a new TCP connection for every request?

---

Creating a TCP connection is expensive, so it's much faster to only perform it once.

Creating the TCP connection involves three steps:

1. DNS lookup - resolve hostname to an IP address
2. TCP connection - perform a three-way handshake to create a connection
3. SSL session - exchange keys to encrypt the connection and create a session
