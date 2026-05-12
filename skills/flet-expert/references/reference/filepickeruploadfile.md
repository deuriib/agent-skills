# FilePickerUploadFile
URL: https://flet.dev/docs/types/filepickeruploadfile

ReferenceTypesClassesFilePickerUploadFile
FilePickerUploadFile

Upload descriptor for one file selected by FilePicker.

Instances are passed to FilePicker.upload. During upload, Flet resolves the selected file by id first and, when id is absent or not found, falls back to name.

At least one of id or name should be provided.

Properties
id - Selected file identifier returned by FilePicker.pick_files.
method - HTTP method used for the upload request, usually PUT or POST.
name - Selected file name used as fallback lookup when id is missing or does not match any currently selected file.
upload_url - Upload destination URL.
Properties​
build
id
class-attribute
instance-attribute
​
Copy
id: int | None = None

Selected file identifier returned by FilePicker.pick_files.

This is the preferred lookup key when both id and name are specified.

build
method
class-attribute
instance-attribute
​
Copy
method: str = 'PUT'

HTTP method used for the upload request, usually PUT or POST.

build
name
class-attribute
instance-attribute
​
Copy
name: str | None = None

Selected file name used as fallback lookup when id is missing or does not match any currently selected file.

build
upload_url
instance-attribute
​
Copy
upload_url: str

Upload destination URL.

Can be an absolute URL or a page-relative URL returned by Page.get_upload_url.

Edit this page