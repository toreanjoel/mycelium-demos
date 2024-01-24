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
This will be testing the implementaiton of the `:shared_state` - This uses two cases of shared where one will be updates to the canvas and the other is taking the data of the cavas to store in another state that is updated.

## Notes
Nothing here is meant to be production ready and as mentioned before is more of a way to test and guide the implementation of the `mycelium` project in itself and fixing issues along the way or adding the missing pieces in order to get the example project WIP working.