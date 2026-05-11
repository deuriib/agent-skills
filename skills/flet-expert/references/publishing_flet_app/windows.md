# Windows
URL: https://flet.dev/docs/publish/windows

Publishing Flet appWindows
Packaging app for Windows

Instructions for packaging a Flet app into a Windows application.

INFO

This guide provides detailed Windows-specific information. Complementary and more general information is available here.

Prerequisites​
Visual Studio​

Visual Studio (2022 or 2026) is required with the Desktop development with C++ workload installed.

Follow this guide for instructions on downloading and installing correct Visual Studio components for Flutter desktop development.

flet build windows​
NOTE

This command can be run on Windows only.

Builds a Windows application.

Troubleshooting​
Developer mode​

If you get the below error:

Building with plugins requires symlink support.



Please enable Developer Mode in your system settings. Run

  start ms-settings:developers

to open settings.


Then, you need to enable Developer Mode as it indicates. Follow this guide on how to do that.

Edit this page