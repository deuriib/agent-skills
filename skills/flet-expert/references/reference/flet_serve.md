# flet serve
URL: https://flet.dev/docs/cli/flet-serve

ReferenceCLIflet serve
flet serve

Serve static files from a directory with a lightweight web server, optionally adding WebAssembly-related headers for Flet web apps.

Usage​
flet serve [-h] [-v] [-p PORT] [web_root]

Positional arguments​
web_root​

Directory to serve.

Default: ./build/web

Options​
--help​

Show this help message and exit.

Aliases: -h

--port​

Port number to serve the files on. Use this to customize the port if the default is already in use or needs to be changed.

Value: PORT <int>

Default: 8000

Aliases: -p

--verbose​

Enable verbose output. Use -v for standard verbose logging and -vv for more detailed output.

Aliases: -v

Edit this page