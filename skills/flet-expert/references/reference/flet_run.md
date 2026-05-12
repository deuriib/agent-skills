# flet run
URL: https://flet.dev/docs/cli/flet-run

ReferenceCLIflet run
flet run

Run a Flet application in hot reload mode.

Usage​
flet run [-h] [-v] [-p PORT] [--host HOST] [--name APP_NAME] [-m] [-d]

              [-r] [-n] [-w] [--ios] [--android] [-a ASSETS_DIR]

              [--ignore-dirs IGNORE_DIRS]

              [script]

Positional arguments​
script​

Path to the Python script that starts your Flet app.

Default: .

Options​
--android​

Launch the app on an Android device.

--assets​

Path to a directory containing static assets used by the app (e.g. images, fonts).

Default: assets

Aliases: -a

--directory​

Watch the directory of the script for changes and hot reload the app accordingly.

Aliases: -d

--help​

Show this help message and exit.

Aliases: -h

--hidden​

Start the application with the window hidden.

Aliases: -n

--host​

The host to run Flet web app on. Use "*" to listen on all IPs.

--ignore-dirs​

Comma-separated list of directory names to ignore when watching for file changes.

--ios​

Launch the app on an iOS device.

--module​

Treat the script as a python module path instead of a file path. Example: flet run -m my_app.main.

Aliases: -m

--name​

A unique name for your app. Useful when running multiple apps on the same port.

--port​

Custom TCP or HTTP (if --web option is used) port to run the Flet app on. If not specified, a random port will be chosen.

Value: PORT <int>

Aliases: -p

--recursive​

Watch script directory and all its sub-directories recursively for file changes.

Aliases: -r

--verbose​

Enable verbose output. Use -v for standard verbose logging and -vv for more detailed output.

Aliases: -v

--web​

Launch the Flet app as a dynamic website and automatically open it in your web browser after startup.

Aliases: -w

Edit this page