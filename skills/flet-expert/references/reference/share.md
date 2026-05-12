# Share
URL: https://flet.dev/docs/services/share

ReferenceServicesShare
Share

Shares text, links, or files using the platform share sheet.

Inherits: Service

Methods
share_files - Share one or more files with optional text/metadata.
share_text - Share plain text with optional subject, title, and thumbnail.
share_uri - Share a link/URI.
Examples​
import os



import flet as ft





async def main(page: ft.Page):

    share = ft.Share()



    status = ft.Text()

    result_raw = ft.Text()



    async def do_share_text():

        result = await share.share_text(

            "Hello from Flet!",

            subject="Greeting",

            title="Share greeting",

        )

        status.value = f"Share status: {result.status}"

        result_raw.value = f"Raw: {result.raw}"



    async def do_share_uri():

        result = await share.share_uri("https://flet.dev")

        status.value = f"Share status: {result.status}"

        result_raw.value = f"Raw: {result.raw}"



    async def do_share_files_from_bytes():

        file = ft.ShareFile.from_bytes(

            b"Sample content from memory",

            mime_type="text/plain",

            name="sample.txt",

        )

        result = await share.share_files(

            [file],

            text="Sharing a file from memory",

        )

        status.value = f"Share status: {result.status}"

        result_raw.value = f"Raw: {result.raw}"



    async def do_share_files_from_paths():

        if page.web:

            status.value = "File sharing from paths is not supported on the web."

            return

        #

        temp_dir = await ft.StoragePaths().get_temporary_directory()

        file_path = os.path.join(temp_dir, "sample_from_path.txt")

        with open(file_path, "wb") as f:

            f.write(b"Sample content from file path")



        result = await share.share_files(

            [ft.ShareFile.from_path(file_path)],

            text="Sharing a file from memory",

        )

        status.value = f"Share status: {result.status}"

        result_raw.value = f"Raw: {result.raw}"



    page.add(

        ft.SafeArea(

            ft.Column(

                [

                    ft.Row(

                        [

                            ft.Button("Share text", on_click=do_share_text),

                            ft.Button("Share link", on_click=do_share_uri),

                            ft.Button(

                                "Share file from bytes",

                                on_click=do_share_files_from_bytes,

                            ),

                            ft.Button(

                                "Share file from path",

                                on_click=do_share_files_from_paths,

                            ),

                        ],

                        wrap=True,

                    ),

                    status,

                    result_raw,

                ],

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Methods​
deployed_code
share_files
async
​
Copy
share_files(
    files: list[ShareFile],
    title: str | None = None,
    text: str | None = None,
    subject: str | None = None,
    preview_thumbnail: ShareFile | None = None,
    share_position_origin: Offset | None = None,
    download_fallback_enabled: bool = True,
    mail_to_fallback_enabled: bool = True,
    excluded_cupertino_activities: Iterable[
        ShareCupertinoActivityType
    ]
    | None = None,
) -> ShareResult

Share one or more files with optional text/metadata.

Parameters:

files (list[ShareFile]) - List of ShareFile instances to share.
title (str | None, default: None) - Optional title for the share sheet.
text (str | None, default: None) - Optional text to accompany the files.
subject (str | None, default: None) - Optional subject for the shared files.
preview_thumbnail (ShareFile | None, default: None) - Optional thumbnail file to show in the share sheet.
share_position_origin (Offset | None, default: None) - Optional position origin for the share sheet.
download_fallback_enabled (bool, default: True) - Whether to enable download fallback.
mail_to_fallback_enabled (bool, default: True) - Whether to enable mailto fallback.
excluded_cupertino_activities (Iterable[ShareCupertinoActivityType] | None, default: None) - Optional list of iOS/macOS activities to exclude.
deployed_code
share_text
async
​
Copy
share_text(
    text: str,
    title: str | None = None,
    subject: str | None = None,
    preview_thumbnail: ShareFile | None = None,
    share_position_origin: Offset | None = None,
    download_fallback_enabled: bool = True,
    mail_to_fallback_enabled: bool = True,
    excluded_cupertino_activities: Iterable[
        ShareCupertinoActivityType
    ]
    | None = None,
) -> ShareResult

Share plain text with optional subject, title, and thumbnail.

Parameters:

text (str) - The text to share.
title (str | None, default: None) - Optional title for the share sheet.
subject (str | None, default: None) - Optional subject for the shared text.
preview_thumbnail (ShareFile | None, default: None) - Optional thumbnail file to show in the share sheet.
share_position_origin (Offset | None, default: None) - Optional position origin for the share sheet.
download_fallback_enabled (bool, default: True) - Whether to enable download fallback.
mail_to_fallback_enabled (bool, default: True) - Whether to enable mailto fallback.
excluded_cupertino_activities (Iterable[ShareCupertinoActivityType] | None, default: None) - Optional list of iOS/macOS activities to exclude.
deployed_code
share_uri
async
​
Copy
share_uri(
    uri: str,
    share_position_origin: Offset | None = None,
    excluded_cupertino_activities: Iterable[
        ShareCupertinoActivityType
    ]
    | None = None,
) -> ShareResult

Share a link/URI.

Parameters:

uri (str) - The URI to share.
share_position_origin (Offset | None, default: None) - Optional position origin for the share sheet.
excluded_cupertino_activities (Iterable[ShareCupertinoActivityType] | None, default: None) - Optional list of iOS/macOS activities to exclude.
Edit this page