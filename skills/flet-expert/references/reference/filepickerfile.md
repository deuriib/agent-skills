# FilePickerFile
URL: https://flet.dev/docs/types/filepickerfile

ReferenceTypesClassesFilePickerFile
FilePickerFile

Metadata for a file selected via FilePicker.pick_files.

Returned by FilePicker.pick_files and used as input context for FilePickerUploadFile when uploading selected files.

Properties
bytes - File contents.
id - Selection-scoped file identifier assigned by Flet.
name - File name (basename), without directory path.
path - Absolute path to the selected file, when available.
size - File size in bytes.
Properties​
build
bytes
class-attribute
instance-attribute
​
Copy
bytes: bytes | None = None

File contents.

Returned only when pick_files is called with with_data=True. Otherwise this value is None.

build
id
instance-attribute
​
Copy
id: int

Selection-scoped file identifier assigned by Flet.

This value is stable for the current picker selection and is preferred for upload matching in FilePickerUploadFile.

build
name
instance-attribute
​
Copy
name: str

File name (basename), without directory path.

build
path
class-attribute
instance-attribute
​
Copy
path: str | None = None

Absolute path to the selected file, when available.

NOTE
Web mode always returns None.
On native platforms, this can still be None if the platform picker does not expose a filesystem path.
build
size
instance-attribute
​
Copy
size: int

File size in bytes.

Edit this page