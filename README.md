# pull-stream-docs

pull stream ecosystem docs

## modules

here are the most useful pull stream docs

### combining pull streams

#### [pull-stream](https://github.com/dominictarr/pull-stream)

a library of simple functions that will be familiar functional programmers.

#### [pull-cat](https://github.com/dominictarr/pull-cat)

turn an array of source streams into a single stream. One stream is read, then the next, then the next.

#### [pull-defer](https://github.com/dominictarr/pull-defer)

create a place holder when you don't have the actual stream just yet.
eg.

#### [pull-many](https://github.com/dominictarr/pull-many)

read from many source streams at once. (contrast this with pull-cat)

#### [pull-merge](https://github.com/dominictarr/pull-merge)

merge ordered sources together. compares the next item of each source and outputs the lowest one.

#### [pull-paramap](https://github.com/dominictarr/pull-paramap)

run an async operation for each item in the stream, in parallel, but the output order is the same as the input was.
you can set how many concurrent operations are allowed.

#### [pull-pushable](https://github.com/dominictarr/pull-pushable)

a source stream that you can push items onto as a queue.

#### [pull-notify](https://github.com/dominictarr/pull-notify)

create many source streams and add another element to them with a notify function.
useful for creating apis with realtime streams.

#### [pull-pair](https://github.com/dominictarr/pull-pair)

create a source and sink stream that are connected. This is sometimes useful for testing duplex streams.

#### [pull-through](https://github.com/dominictarr/pull-through)

a pull stream version of [through](https://github.com/dominictarr/through).

#### [pull-traverse](https://github.com/dominictarr/pull-traverse)

traverse nested tree structures in either depth first, width first, or leaf first order.

#### [pull-window](https://github.com/dominictarr/pull-window)

process windows of data in some way. real time aggregations of time slices of realtime input etc.

### file system and databases

#### [pull-glob](https://github.com/dominictarr/pull-glob)

recursively search for files on your fs, supports your familiar globs, plus ** (recursive) and ... (recursive towards the root)

#### [pull-level](https://github.com/dominictarr/pull-level)

read and write to leveldb via pull streams, supports streams of realtime changes!

### working with text streams

#### [pull-split](https://github.com/dominictarr/pull-split)

split a incoming binary or text stream into lines (or by a given marker)

#### [pull-stringify](https://github.com/dominictarr/pull-stringify)

output a stream as valid json. line delimited json is also supported.

### working with binary streams

#### [pull-handshake](https://github.com/dominictarr/pull-handshake)

control exactly how many bytes to read and write in a binary duplex stream.

#### [pull-randomly-split](https://github.com/dominictarr/pull-randomly-split)

Transform a stream of buffers so that the incoming buffers are split into random overlapping sizes.
Useful for testing binary stream parsers that should be able to handle message boundries in different places

#### [pull-reader](https://github.com/dominictarr/pull-reader)

read a certain number of bytes ahead in a binary stream.

### working with networks

#### [pull-ws](https://github.com/DamonOehlman/pull-ws), [pull-ws-server](https://github.com/dominictarr/pull-ws-server)

pull stream wrapper for websockets.

#### [muxrpc](https://github.com/ssbc/muxrpc)

combines rpc with stream multiplexing.

### integration with node streams

#### [stream-to-pull-stream](https://github.com/dominictarr/stream-to-pull-stream), [pull-stream-to-stream](https://github.com/dominictarr/pull-stream-to-stream)

wrap a node stream in pull streams and vice versa.

### cryptography

#### [pull-box-stream](https://github.com/dominictarr/pull-box-stream)

encrypt a one way stream

#### [secret-handshake](https://github.com/dominictarr/secret-handshake)

secure and private duplex connection

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
