# flet devices
URL: https://flet.dev/docs/cli/flet-devices

ReferenceCLIflet devices
flet devices

List all connected iOS and Android devices.

Usage​
flet devices [-h] [-v] [--device-timeout DEVICE_TIMEOUT]

                  [--device-connection {both,attached,wireless}]

                  [--no-rich-output] [--yes] [--skip-flutter-doctor]

                  [{ios,android}]

Positional arguments​
platform​

The target platform to list devices for. If not specified, lists all platforms.

Possible values: android, ios

Required: false

Options​
--device-connection​

Filter devices by connection type: attached (USB) or wireless.

Possible values: attached, both, wireless

Default: both

--device-timeout​

Time (in seconds) to wait for devices to attach.

Value: DEVICE_TIMEOUT <int>

Default: 10

--help​

Show this help message and exit.

Aliases: -h

--no-rich-output​

Disable rich output and prefer plain text. Useful on Windows builds.

Environment variable: FLET_CLI_NO_RICH_OUTPUT

--skip-flutter-doctor​

Skip running Flutter doctor upon failed builds.

Environment variable: FLET_CLI_SKIP_FLUTTER_DOCTOR

--verbose​

Enable verbose output. Use -v for standard verbose logging and -vv for more detailed output.

Aliases: -v

--yes​

Answer yes to all prompts (install dependencies without confirmation).

Edit this page