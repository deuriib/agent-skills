# flet emulators
URL: https://flet.dev/docs/cli/flet-emulators

ReferenceCLIflet emulators
flet emulators

List, create, and launch available emulators.

Usage​
flet emulators [-h] [-v] [--cold] [--no-rich-output] [--yes]

                    [--skip-flutter-doctor]

                    [{start,create,delete}] [emulator]

Positional arguments​
action​

Action to perform: start an emulator, create a new one, or delete it.

Possible values: create, delete, start

Required: false

emulator​

Emulator ID or name (required for start, create, and delete).

Required: false

Options​
--cold​

Cold boot the emulator when starting.

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