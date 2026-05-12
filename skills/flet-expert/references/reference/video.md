# Video
URL: https://flet.dev/docs/controls/video/

ReferenceControlsVideo
Video

Embed a full-featured video player in your Flet app with playlist support, hardware acceleration controls, and subtitle configuration.

It is powered by the media_kit Flutter package.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅	✅	✅	✅
Usage​

Add the flet-video package to your project dependencies:

uv
pip
uv add flet-video

Requirements​

The below sections show the required configurations for each platform.

Android​

You may need to declare and request file-system/storage permissions, depending on your use case:

android.permission.READ_MEDIA_AUDIO (optional): Allows to read audio files from external storage. Android 13 or higher.
android.permission.READ_MEDIA_VIDEO (optional): Allows to read video files from external storage. Android 13 or higher.
android.permission.READ_EXTERNAL_STORAGE (optional): Allows reading from external storage. Android 12 or lower.
android.permission.WRITE_EXTERNAL_STORAGE (optional): Allows writing to external storage. Android 12 or lower.
flet build
pyproject.toml
flet build apk \

  --android-permissions android.permission.READ_MEDIA_AUDIO=true \

  --android-permissions android.permission.READ_MEDIA_VIDEO=true \

  --android-permissions android.permission.READ_EXTERNAL_STORAGE=true \

  --android-permissions android.permission.WRITE_EXTERNAL_STORAGE=true


Use PermissionHandler to request permissions at runtime.

See also:

setting Android permissions
Linux​

libmpv libraries must be installed and present on the machine running the app.

On Ubuntu/Debian, this can be done with:

sudo apt install libmpv-dev mpv


If you encounter libmpv.so.1 load errors, run:

sudo apt update

sudo apt install libmpv-dev libmpv2

sudo ln -s /usr/lib/x86_64-linux-gnu/libmpv.so /usr/lib/libmpv.so.1

Examples​
Basic​
import flet as ft

import flet_video as ftv





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=ftv.Video(

                expand=True,

                autoplay=True,

                playlist=[

                    ftv.VideoMedia(

                        "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Playback​

Drive playback programmatically with methods like play(), pause(), stop(), seek(), next(), and previous(), and inspect status with methods like is_playing(), get_current_position(), and get_duration().

import flet as ft

import flet_video as ftv





def main(page: ft.Page):

    async def handle_play(e: ft.Event[ft.Button]):

        await video.play()



    async def handle_play_or_pause(e: ft.Event[ft.Button]):

        await video.play_or_pause()



    async def handle_pause(e: ft.Event[ft.Button]):

        await video.pause()



    async def handle_stop(e: ft.Event[ft.Button]):

        await video.stop()



    async def handle_seek(e: ft.Event[ft.Button]):

        await video.seek(ft.Duration(seconds=10))



    async def handle_next(e: ft.Event[ft.Button]):

        await video.next()



    async def handle_previous(e: ft.Event[ft.Button]):

        await video.previous()



    async def handle_status(e: ft.Event[ft.Button]):

        playing = await video.is_playing()

        position = (await video.get_current_position()).in_seconds

        duration = (await video.get_duration()).in_seconds

        page.show_dialog(

            ft.SnackBar(

                f"Playing?: {playing} | Duration: {duration}s | Position: {position}s"

            )

        )



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    video := ftv.Video(

                        expand=True,

                        playlist=[

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

                            ),

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373718-86ce5e1d-d195-45d5-baa6-ef94041d0b90.mp4"

                            ),

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373716-76da0a4e-225a-44e4-9ee7-3e9006dbc3e3.mp4"

                            ),

                        ],

                    ),

                    ft.Row(

                        wrap=True,

                        alignment=ft.MainAxisAlignment.CENTER,

                        controls=[

                            ft.Button("Play", on_click=handle_play),

                            ft.Button("Play Or Pause", on_click=handle_play_or_pause),

                            ft.Button("Pause", on_click=handle_pause),

                            ft.Button("Stop", on_click=handle_stop),

                            ft.Button("Seek 10s", on_click=handle_seek),

                            ft.Button("Previous", on_click=handle_previous),

                            ft.Button("Next", on_click=handle_next),

                            ft.Button("Show Status", on_click=handle_status),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Screenshot​

Shows how to capture the current video frame with take_screenshot() and display it as an image.

import flet as ft

import flet_video as ftv





def main(page: ft.Page):

    async def handle_screenshot(e: ft.Event[ft.FloatingActionButton]):

        image = await video.take_screenshot(format="image/png")

        if image is None:

            status.value = "No video frame is available yet."

        else:

            preview.content = ft.Image(

                src=image,

                width=260,

                height=146,

                fit=ft.BoxFit.CONTAIN,

            )

            status.value = f"Captured {len(image)} bytes."

        page.update()



    page.floating_action_button = ft.FloatingActionButton(

        content="Take screenshot",

        icon=ft.Icons.CAMERA_ALT,

        on_click=handle_screenshot,

    )

    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    video := ftv.Video(

                        expand=True,

                        autoplay=True,

                        playlist=[

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

                            ),

                        ],

                    ),

                    preview := ft.Container(

                        width=260,

                        height=146,

                        alignment=ft.Alignment.CENTER,

                        bgcolor=ft.Colors.BLACK_12,

                        content=ft.Text("No screenshot yet"),

                    ),

                    status := ft.Text(),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Playlist​

Mutate playlist directly to add, remove, or replace items, and navigate between tracks.

import random



import flet as ft

import flet_video as ftv



media = [

    ftv.VideoMedia(

        "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

    ),

    ftv.VideoMedia(

        "https://user-images.githubusercontent.com/28951144/229373718-86ce5e1d-d195-45d5-baa6-ef94041d0b90.mp4"

    ),

    ftv.VideoMedia(

        "https://user-images.githubusercontent.com/28951144/229373716-76da0a4e-225a-44e4-9ee7-3e9006dbc3e3.mp4"

    ),

    ftv.VideoMedia(

        "https://user-images.githubusercontent.com/28951144/229373695-22f88f13-d18f-4288-9bf1-c3e078d83722.mp4"

    ),

]





def main(page: ft.Page):

    def handle_add(e: ft.Event[ft.Button]):

        video.playlist.append(random.choice(media))



    def handle_remove(e: ft.Event[ft.Button]):

        if video.playlist:

            video.playlist.pop(random.randint(0, len(video.playlist) - 1))



    def handle_replace(e: ft.Event[ft.Button]):

        video.playlist = random.sample(media, 3)



    async def handle_next(e: ft.Event[ft.Button]):

        await video.next()



    async def handle_previous(e: ft.Event[ft.Button]):

        await video.previous()



    async def handle_jump(e: ft.Event[ft.Button]):

        await video.jump_to(0)



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    video := ftv.Video(

                        expand=True,

                        autoplay=True,

                        playlist=media[:2],

                        playlist_mode=ftv.PlaylistMode.LOOP,

                    ),

                    ft.Row(

                        wrap=True,

                        alignment=ft.MainAxisAlignment.CENTER,

                        controls=[

                            ft.Button("Add Random", on_click=handle_add),

                            ft.Button("Remove Random", on_click=handle_remove),

                            ft.Button("Replace Playlist", on_click=handle_replace),

                            ft.Button("Next", on_click=handle_next),

                            ft.Button("Previous", on_click=handle_previous),

                            ft.Button("Jump to First", on_click=handle_jump),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Events​

Listen for player events like on_load, on_complete, on_track_change, etc.

import flet as ft

import flet_video as ftv





def main(page: ft.Page):

    def handle_load(e: ft.Event[ftv.Video]):

        print("Video loaded")



    def handle_complete(e: ft.Event[ftv.Video]):

        print(f"Track completed: {e.data}")



    def handle_track_change(e: ft.Event[ftv.Video]):

        print(f"Track changed to index {e.data}")



    def handle_position_change(e: ft.Event[ftv.Video]):

        print(f"Position: {e.data.in_milliseconds / 1000:.3f}s")



    def handle_duration_change(e: ft.Event[ftv.Video]):

        print(f"Duration changed: {e.data.in_seconds}s")



    def handle_error(e: ft.Event[ftv.Video]):

        print(f"Error: {e.data}")



    def handle_enter_fullscreen(e: ft.Event[ftv.Video]):

        print("Entered fullscreen")



    def handle_exit_fullscreen(e: ft.Event[ftv.Video]):

        print("Exited fullscreen")



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                controls=[

                    ftv.Video(

                        expand=True,

                        autoplay=True,

                        on_load=handle_load,

                        on_complete=handle_complete,

                        on_track_change=handle_track_change,

                        on_position_change=handle_position_change,

                        on_duration_change=handle_duration_change,

                        on_error=handle_error,

                        on_enter_fullscreen=handle_enter_fullscreen,

                        on_exit_fullscreen=handle_exit_fullscreen,

                        playlist=[

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

                            ),

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373718-86ce5e1d-d195-45d5-baa6-ef94041d0b90.mp4"

                            ),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Subtitles​

Attach a VideoSubtitleTrack (here, raw VTT text) and customize its appearance with VideoSubtitleConfiguration.

import flet as ft

import flet_video as ftv



SAMPLE_VTT = """WEBVTT



00:00:00.000 --> 00:00:04.000

Welcome to flet-video!



00:00:04.000 --> 00:00:08.000

Subtitles are styled via VideoSubtitleConfiguration.



00:00:08.000 --> 00:00:14.000

This track is provided as raw VTT text.

"""





def main(page: ft.Page):

    page.spacing = 20

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    subtitle_track = ftv.VideoSubtitleTrack(

        src=SAMPLE_VTT,

        title="English",

        language="en",

    )



    def handle_change(e: ft.Event[ft.Switch]):

        if e.control.value:

            video.subtitle_track = subtitle_track

        else:

            video.subtitle_track = ftv.VideoSubtitleTrack.none()



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    video := ftv.Video(

                        expand=True,

                        autoplay=False,

                        playlist=[

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

                            ),

                        ],

                        subtitle_track=subtitle_track,

                        subtitle_configuration=ftv.VideoSubtitleConfiguration(

                            text_align=ft.TextAlign.CENTER,

                            text_style=ft.TextStyle(

                                size=24,

                                color=ft.Colors.YELLOW,

                                weight=ft.FontWeight.BOLD,

                                bgcolor=ft.Colors.BLACK_54,

                            ),

                        ),

                    ),

                    ft.Switch(

                        value=True, label="Show Subtitles", on_change=handle_change

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Controls​

Switch between AdaptiveVideoControls, MaterialVideoControls, MaterialDesktopVideoControls, custom, and hidden control sets at runtime.

import flet as ft

import flet_video as ftv





def main(page: ft.Page):

    def set_controls(

        value: ftv.VideoControls | ft.Control | None,

    ):

        video.controls = value



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    video := ftv.Video(

                        expand=True,

                        playlist=[

                            ftv.VideoMedia(

                                "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

                            ),

                        ],

                        controls=ftv.MaterialDesktopVideoControls(

                            visible_on_mount=True,

                            display_seek_bar=True,

                            modify_volume_on_scroll=True,

                            toggle_fullscreen_on_double_press=True,

                            play_and_pause_on_tap=True,

                            seek_bar_position_color=ft.Colors.BLUE,

                            volume_bar_active_color=ft.Colors.YELLOW,

                            controls_hover_duration=ft.Duration(seconds=5),

                        ),

                    ),

                    ft.Row(

                        wrap=True,

                        alignment=ft.MainAxisAlignment.CENTER,

                        controls=[

                            ft.Button(

                                "Adaptive",

                                on_click=lambda _: set_controls(

                                    ftv.AdaptiveVideoControls(

                                        material=ftv.MaterialVideoControls(

                                            visible_on_mount=True,

                                            display_seek_bar=True,

                                            volume_gesture=True,

                                            brightness_gesture=True,

                                            seek_gesture=True,

                                            seek_on_double_tap=True,

                                            speed_up_on_long_press=True,

                                            seek_bar_position_color=ft.Colors.BLUE,

                                            button_bar_button_color="#E0F7FA",

                                        ),

                                        material_desktop=ftv.MaterialDesktopVideoControls(

                                            visible_on_mount=True,

                                            display_seek_bar=True,

                                            modify_volume_on_scroll=True,

                                            toggle_fullscreen_on_double_press=True,

                                            play_and_pause_on_tap=True,

                                            hide_mouse_on_controls_removal=True,

                                            seek_bar_position_color=ft.Colors.BLUE,

                                            volume_bar_active_color=ft.Colors.YELLOW,

                                        ),

                                    )

                                ),

                            ),

                            ft.Button(

                                "Material",

                                on_click=lambda _: set_controls(

                                    ftv.MaterialVideoControls(

                                        visible_on_mount=True,

                                        volume_gesture=True,

                                        brightness_gesture=True,

                                        seek_gesture=True,

                                        seek_on_double_tap=True,

                                        speed_up_on_long_press=True,

                                        speed_up_factor=2.5,

                                        controls_transition_duration=ft.Duration(

                                            milliseconds=450

                                        ),

                                        seek_bar_position_color=ft.Colors.BLUE,

                                        button_bar_button_color="#E0F7FA",

                                    )

                                ),

                            ),

                            ft.Button(

                                "Material Desktop",

                                on_click=lambda _: set_controls(

                                    ftv.MaterialDesktopVideoControls(

                                        visible_on_mount=True,

                                        display_seek_bar=True,

                                        modify_volume_on_scroll=True,

                                        toggle_fullscreen_on_double_press=True,

                                        play_and_pause_on_tap=True,

                                        hide_mouse_on_controls_removal=True,

                                        controls_hover_duration=ft.Duration(seconds=5),

                                        seek_bar_position_color=ft.Colors.BLUE,

                                        seek_bar_hover_height=8,

                                        volume_bar_active_color=ft.Colors.YELLOW,

                                    )

                                ),

                            ),

                            ft.Button(

                                "Custom Control",

                                on_click=lambda _: set_controls(

                                    ft.Container(

                                        alignment=ft.Alignment.BOTTOM_CENTER,

                                        padding=16,

                                        content=ft.Text("This is a custom control..."),

                                    )

                                ),

                            ),

                            ft.Button(

                                "No Controls",

                                on_click=lambda _: set_controls(None),

                            ),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Mode-specific Controls​

Show different controls in normal vs. fullscreen mode by mapping each VideoControlsMode to its own controls value.

import flet as ft

import flet_video as ftv





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=ftv.Video(

                expand=True,

                playlist=[

                    ftv.VideoMedia(

                        "https://user-images.githubusercontent.com/28951144/229373720-14d69157-1a56-4a78-a2f4-d7a134d7c3e9.mp4"

                    ),

                ],

                controls={

                    ftv.VideoControlsMode.NORMAL: ftv.MaterialDesktopVideoControls(

                        visible_on_mount=True,

                        bottom_button_bar=[

                            ftv.VideoPlayOrPauseButton(),

                            ftv.VideoSpacer(),

                            ft.Text("NORMAL Mode", weight=ft.FontWeight.BOLD),

                            ftv.VideoFullscreenButton(),

                        ],

                    ),

                    ftv.VideoControlsMode.FULLSCREEN: ftv.MaterialDesktopVideoControls(

                        visible_on_mount=True,

                        bottom_button_bar=[

                            ftv.VideoFullscreenButton(),

                            ftv.VideoSpacer(),

                            ft.Text("FULLSCREEN Mode", weight=ft.FontWeight.BOLD),

                            ftv.VideoPlayOrPauseButton(),

                        ],

                    ),

                },

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Button Bars​

Customize the primary_button_bar, top_button_bar, and bottom_button_bar of MaterialDesktopVideoControls with built-in and custom items.

import flet as ft

import flet_video as ftv





def main(page: ft.Page):

    label_style = ft.TextStyle(

        size=12,

        color=ft.Colors.WHITE,

        weight=ft.FontWeight.BOLD,

    )



    page.add(

        ft.SafeArea(

            expand=True,

            content=ftv.Video(

                expand=True,

                playlist=[

                    ftv.VideoMedia("video-sample.mp4"),

                ],

                controls=ftv.MaterialDesktopVideoControls(

                    visible_on_mount=True,

                    primary_button_bar=[

                        ftv.VideoSkipPreviousButton(icon_color=ft.Colors.CYAN),

                        ftv.VideoPlayOrPauseButton(

                            icon_size=40,

                            icon_color=ft.Colors.CYAN,

                        ),

                        ftv.VideoSkipNextButton(

                            icon=ft.Icon(ft.Icons.FAST_FORWARD),

                            icon_color=ft.Colors.CYAN,

                        ),

                    ],

                    top_button_bar=[

                        ft.Text("Top button bar", style=label_style),

                        ftv.VideoSpacer(),

                        ftv.VideoFullscreenButton(icon_color=ft.Colors.AMBER),

                    ],

                    bottom_button_bar=[

                        ft.Text("Bottom button bar", style=label_style),

                        ftv.VideoSpacer(),

                        ftv.VideoPositionIndicator(

                            text_style=ft.TextStyle(

                                size=13,

                                color=ft.Colors.WHITE,

                            )

                        ),

                        ftv.VideoVolumeButton(

                            slider_width=96,

                            icon_color=ft.Colors.AMBER,

                        ),

                    ],

                ),

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

A control that displays a video from a playlist.

Inherits: LayoutControl

Properties
alignment - Defines the Alignment of the viewport.
autoplay - Whether the video should start playing automatically.
configuration - Additional configuration for the video player.
controls - Controls displayed over the video.
fill_color - Defines the color used to fill the video background.
filter_quality - Filter quality of the texture used to render the video output.
fit - The box fit to use for the video.
fullscreen - Whether the video player is presented in fullscreen mode.
muted - Defines whether the video player should be started in muted state.
pause_upon_entering_background_mode - Whether to pause the video when application enters background mode.
pitch - Defines the relative pitch of the video player.
playback_rate - Defines the playback rate of the video player.
playlist - A list of VideoMedias representing the video files to be played.
playlist_mode - Represents the mode of playback for the playlist.
resume_upon_entering_foreground_mode - Whether to resume the video when application enters foreground mode.
show_controls 
deprecated
 - Whether to show the video player controls.
shuffle_playlist - Defines whether the playlist should be shuffled.
subtitle_configuration - Defines the subtitle configuration for the video player.
subtitle_track - Defines the subtitle track for the video player.
title - Defines the name of the underlying window & process for native backend.
volume - Defines the volume of the video player.
wakelock - Whether to acquire wake lock while playing the video.
Events
on_complete - Fires when a video player completes.
on_duration_change - Fires when the current media duration changes.
on_enter_fullscreen - Fires when the video player enters fullscreen.
on_error - Fires when an error occurs.
on_exit_fullscreen - Fires when the video player exits fullscreen
on_load - Fires when the video player is initialized and ready for playback.
on_position_change - Fires when the current playback position changes.
on_track_change - Fires when a video track changes.
Methods
get_current_position - Returns: The current position of the currently playing media.
get_duration - Returns: The duration of the currently playing media.
is_completed - Returns: True if video player has reached the end of the currently playing media, False otherwise.
is_playing - Returns: True if the video player is currently playing, False otherwise.
jump_to - Jumps to the VideoMedia at the specified media_index in the playlist.
next - Jumps to the next VideoMedia in the playlist.
pause - Pauses the video player.
play - Starts playing the video.
play_or_pause - Cycles between play and pause states of the video player, i.e., plays if paused and pauses if playing.
playlist_add 
deprecated
 - Appends/Adds the provided media to the playlist.
playlist_remove 
deprecated
 - Removes the provided media from the playlist.
previous - Jumps to the previous VideoMedia in the playlist.
seek - Seeks the currently playing VideoMedia from the playlist at the specified position.
stop - Stops the video player.
take_screenshot - Captures a screenshot of the current video frame.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment = field(
    default_factory=lambda: Alignment.CENTER
)

Defines the Alignment of the viewport.

build
autoplay
class-attribute
instance-attribute
​
Copy
autoplay: bool = False

Whether the video should start playing automatically.

build
configuration
class-attribute
instance-attribute
​
Copy
configuration: VideoConfiguration = field(
    default_factory=lambda: VideoConfiguration()
)

Additional configuration for the video player.

build
controls
class-attribute
instance-attribute
​
Copy
controls: (
    VideoControls
    | Control
    | dict[
        VideoControlsMode, VideoControls | Control | None
    ]
    | None
) = field(default_factory=lambda: AdaptiveVideoControls())

Controls displayed over the video.

Set to a VideoControls object to use built-in controls, a Control object to use custom Flet controls, or None to hide controls.

To use different controls outside and inside fullscreen, set this property to a dictionary keyed by VideoControlsMode. The VideoControlsMode.DEFAULT value is used when VideoControlsMode.NORMAL controls are not provided. If VideoControlsMode.FULLSCREEN controls are not provided, VideoControlsMode.NORMAL controls are reused before falling back to VideoControlsMode.DEFAULT. A mode value of None hides controls for that mode only.

NOTE

During the show_controls deprecation period, show_controls=False hides controls even when this property is set.

build
fill_color
class-attribute
instance-attribute
​
Copy
fill_color: ColorValue = Colors.BLACK

Defines the color used to fill the video background.

build
filter_quality
class-attribute
instance-attribute
​
Copy
filter_quality: FilterQuality = FilterQuality.LOW

Filter quality of the texture used to render the video output.

NOTE

Android was reported to show blurry images when using FilterQuality.HIGH. Prefer the usage of FilterQuality.MEDIUM on this platform.

build
fit
class-attribute
instance-attribute
​
Copy
fit: BoxFit = BoxFit.CONTAIN

The box fit to use for the video.

build
fullscreen
class-attribute
instance-attribute
​
Copy
fullscreen: bool = False

Whether the video player is presented in fullscreen mode.

Set to True to enter fullscreen or False to exit fullscreen programmatically.

build
muted
class-attribute
instance-attribute
​
Copy
muted: bool = False

Defines whether the video player should be started in muted state.

build
pause_upon_entering_background_mode
class-attribute
instance-attribute
​
Copy
pause_upon_entering_background_mode: bool = True

Whether to pause the video when application enters background mode.

build
pitch
class-attribute
instance-attribute
​
Copy
pitch: Number = 1.0

Defines the relative pitch of the video player.

build
playback_rate
class-attribute
instance-attribute
​
Copy
playback_rate: Number = 1.0

Defines the playback rate of the video player.

build
playlist
class-attribute
instance-attribute
​
Copy
playlist: list[VideoMedia] = field(default_factory=list)

A list of VideoMedias representing the video files to be played.

build
playlist_mode
class-attribute
instance-attribute
​
Copy
playlist_mode: PlaylistMode | None = None

Represents the mode of playback for the playlist.

build
resume_upon_entering_foreground_mode
class-attribute
instance-attribute
​
Copy
resume_upon_entering_foreground_mode: bool = False

Whether to resume the video when application enters foreground mode. Has effect only if pause_upon_entering_background_mode is also set to True.

build
show_controls
class-attribute
deprecated
instance-attribute
​
Copy
show_controls: bool | None = None
DEPRECATED

Deprecated since version 0.85.0 and scheduled for removal in 0.88.0. To hide controls, instead set controls to None.

Whether to show the video player controls.

build
shuffle_playlist
class-attribute
instance-attribute
​
Copy
shuffle_playlist: bool = False

Defines whether the playlist should be shuffled.

build
subtitle_configuration
class-attribute
instance-attribute
​
Copy
subtitle_configuration: VideoSubtitleConfiguration = field(
    default_factory=lambda: VideoSubtitleConfiguration()
)

Defines the subtitle configuration for the video player.

build
subtitle_track
class-attribute
instance-attribute
​
Copy
subtitle_track: VideoSubtitleTrack | None = None

Defines the subtitle track for the video player.

build
title
class-attribute
instance-attribute
​
Copy
title: str = 'flet-video'

Defines the name of the underlying window & process for native backend. This is visible inside the windows' volume mixer.

build
volume
class-attribute
instance-attribute
​
Copy
volume: Number = 100.0

Defines the volume of the video player.

NOTE

It's value ranges between 0.0 to 100.0 (inclusive), where 0.0 is muted and 100.0 is the maximum volume. An exception will be raised if the value is outside this range.

Raises:

ValueError - If its value is not between 0.0 and 100.0 (inclusive).
build
wakelock
class-attribute
instance-attribute
​
Copy
wakelock: bool = True

Whether to acquire wake lock while playing the video. When True, device's display will not go to standby/sleep while the video is playing.

Events​
bolt
on_complete
class-attribute
instance-attribute
​
Copy
on_complete: ControlEventHandler[Video] | None = None

Fires when a video player completes.

bolt
on_duration_change
class-attribute
instance-attribute
​
Copy
on_duration_change: ControlEventHandler[Video] | None = (
    None
)

Fires when the current media duration changes.

Event handler argument's data property contains the current duration as a Duration.

bolt
on_enter_fullscreen
class-attribute
instance-attribute
​
Copy
on_enter_fullscreen: (
    ControlEventHandler[Video] | None
) = None

Fires when the video player enters fullscreen.

bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: ControlEventHandler[Video] | None = None

Fires when an error occurs.

Event handler argument's data property contains information about the error.

bolt
on_exit_fullscreen
class-attribute
instance-attribute
​
Copy
on_exit_fullscreen: ControlEventHandler[Video] | None = (
    None
)

Fires when the video player exits fullscreen

bolt
on_load
class-attribute
instance-attribute
​
Copy
on_load: ControlEventHandler[Video] | None = None

Fires when the video player is initialized and ready for playback.

bolt
on_position_change
class-attribute
instance-attribute
​
Copy
on_position_change: ControlEventHandler[Video] | None = (
    None
)

Fires when the current playback position changes.

Event handler argument's data property contains the current position as a Duration.

bolt
on_track_change
class-attribute
instance-attribute
​
Copy
on_track_change: ControlEventHandler[Video] | None = None

Fires when a video track changes.

Event handler argument's data property contains the index of the new track.

Methods​
deployed_code
get_current_position
async
​
Copy
get_current_position() -> Duration

Returns:

Duration - The current position of the currently playing media.
deployed_code
get_duration
async
​
Copy
get_duration() -> Duration

Returns:

Duration - The duration of the currently playing media.
deployed_code
is_completed
async
​
Copy
is_completed() -> bool

Returns:

bool - True if video player has reached the end of the currently playing media, False otherwise.
deployed_code
is_playing
async
​
Copy
is_playing() -> bool

Returns:

bool - True if the video player is currently playing, False otherwise.
deployed_code
jump_to
async
​
Copy
jump_to(media_index: int)

Jumps to the VideoMedia at the specified media_index in the playlist.

deployed_code
next
async
​
Copy
next()

Jumps to the next VideoMedia in the playlist.

deployed_code
pause
async
​
Copy
pause()

Pauses the video player.

deployed_code
play
async
​
Copy
play()

Starts playing the video.

deployed_code
play_or_pause
async
​
Copy
play_or_pause()

Cycles between play and pause states of the video player, i.e., plays if paused and pauses if playing.

deployed_code
playlist_add
async
deprecated
​
Copy
playlist_add(media: VideoMedia)
DEPRECATED

Deprecated since version 0.85.0 and scheduled for removal in 0.88.0. Use playlist directly, for example video.playlist.append(media).

Appends/Adds the provided media to the playlist.

deployed_code
playlist_remove
async
deprecated
​
Copy
playlist_remove(media_index: int)
DEPRECATED

Deprecated since version 0.85.0 and scheduled for removal in 0.88.0. Use playlist directly, for example video.playlist.pop(media_index).

Removes the provided media from the playlist.

deployed_code
previous
async
​
Copy
previous()

Jumps to the previous VideoMedia in the playlist.

deployed_code
seek
async
​
Copy
seek(position: DurationValue)

Seeks the currently playing VideoMedia from the playlist at the specified position.

deployed_code
stop
async
​
Copy
stop()

Stops the video player.

deployed_code
take_screenshot
async
​
Copy
take_screenshot(
    format: str | None = "image/png",
    include_libass_subtitles: bool = False,
) -> bytes | None

Captures a screenshot of the current video frame.

Parameters:

format (str | None, default: 'image/png') - The image format to return. Supported values are "image/png" (PNG encoded image), "image/jpeg" (JPEG encoded image), and None (raw BGRA pixel buffer on native backends).
include_libass_subtitles (bool, default: False) - Whether to include libass subtitles in the screenshot on native backends. This requires libass support in the underlying player and is ignored on the web backend.

Returns:

bytes | None - Encoded image bytes, or None if the current backend cannot capture a video frame.

Raises:

ValueError - If format is not supported.
Edit this page