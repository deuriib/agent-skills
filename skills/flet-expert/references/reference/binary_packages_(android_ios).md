# Binary Packages (Android/iOS)
URL: https://flet.dev/docs/reference/binary-packages-android-ios

ReferencePython packages built in Flet
Built-in binary Python packages for Android and iOS

Binary Python packages (as opposed to "pure" Python packages written entirely in Python) contain components written in C, Rust, or other languages that produce native code. Common examples include numpy, cryptography, and pydantic.

Flet provides an alternative package index, pypi.flet.dev, which hosts prebuilt Python binary wheels (.whl files used by pip) for iOS and Android platforms.

WORK IN PROGRESS

New packages are created by adding a recipe to the Mobile Forge project. Currently, we author these recipes for you; once the build process is fully automated, you'll be able to submit a PR and test the compiled package immediately.

If a package is not available on pypi.flet.dev, you can request it in Flet discussions - Packages. Please do not request "pure" Python packages. Check out this guide for more details on the difference between pure and binary packages.

Below is the list of packages hosted on pypi.flet.dev and the specific wheel versions currently built and supported:

Package	Versions
aiohttp	3.9.5
argon2-cffi-bindings	21.2.0
bcrypt	4.2.0
bitarray	3.6.1, 2.9.2
blis	1.0.0
Brotli	1.1.0
cffi	1.17.1
contourpy	1.3.1
cryptography	43.0.1
dart-bridge	0.4.2, 0.4.1, 0.4.0, 0.3.2, 0.3.1
fiona	1.10.1
flet-libcpp-shared (Android only)	27.3.13750724, 27.2.12479018
flet-libcrc32c	1.1.2
flet-libcurl	8.11
flet-libfreetype	2.13.3
flet-libgdal	3.10
flet-libgeos	3.13
flet-libjpeg	3.0.90
flet-libjq	1.7.1
flet-libopaque	0.99.8
flet-liboprf	0.5
flet-libpng	1.6.43
flet-libproj	9.5
flet-libpsl	0.21.5
flet-libpyjni (Android only)	1.0.1
flet-libsodium	1.0.20
flet-libtiff	4.7
flet-libxml2	2.15.3, 2.9.8
flet-libxslt	1.1.45, 1.1.32
GDAL	3.10.0
google-crc32c	1.6.0
greenlet	3.1.1
grpcio	1.67.1
jiter	0.8.2
jq	1.8.0
kiwisolver	1.4.7
lru-dict	1.3.0
lxml	6.1.0, 5.3.0
MarkupSafe	2.1.5
matplotlib	3.10.0
mpdecimal (iOS only)	4.0.0
msgpack	1.1.0
msgspec	0.18.6
numpy	2.2.2, 1.26.4
opaque	0.2.0
opencv-python	4.10.0.84
pandas	2.2.3, 2.0.3
pendulum	3.0.0
pillow	11.1.0, 10.4.0
protobuf	5.28.3
pycryptodome	3.21.0
pycryptodomex	3.21.0
pydantic_core	2.46.3, 2.33.2, 2.29.0, 2.23.3
pyjnius (Android only)	1.6.1
pymongo	4.10.1
PyNaCl	1.5.0
pyobjus (iOS only)	1.2.3
pyogrio	0.10.0
pyproj	3.7.0
pysodium	0.7.18
PyYAML	6.0.2
regex	2024.11.6
rpds-py	0.23.1
ruamel.yaml.clib	0.2.12
shapely	2.0.6
SQLAlchemy	2.0.36
sqlite (Android only)	3.45.3
tiktoken	0.9.0
time-machine	2.16.0
tokenizers	0.21.0
websockets	13.0.1
yarl	1.11.1
zope.interface	7.2
zstandard	0.23.0
Edit this page