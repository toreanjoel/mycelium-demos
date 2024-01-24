# mycelium-demos

### What is this?
This is a general repo that will be used to host different of applications that has a sole purpose of implementation around the mycelium project. 

Link: [mycelium](https://github.com/toreanjoel/mycelium)

The different implementations will change and the projects are very basic as their goal is to test the server types and the projects could stretch across all platforms.

## Projects

### socket-chat
The goal here was to test the implementation of the `:accumulative_state` servers channels. These are channels that have state accumulated relative to the user connected to the socket.

Note: Because the mycelium project doesnt allow creating channels from a client side, the rooms need to be made by who ever made the server for them to be visible on the client.

### socket-draw (WIP)
This will be testing the implementaiton of the `:collaborative_state` &  `:shared_state` - these are generally states on the room that will keep user data updated per user data changes along with a global state that can be initalized and updated by the connected agents. 

## Notes
Nothing here is meant to be production ready and as mentioned before is more of a way to test and guide the implementation of the `mycelium` project in itself and fixing issues along the way or adding the missing pieces in order to get the example project WIP working.