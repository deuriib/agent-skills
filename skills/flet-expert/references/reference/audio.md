# Audio
URL: https://flet.dev/docs/services/audio/

ReferenceServicesAudio
Audio

Allows playing audio in Flet apps.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅	✅	✅	✅
Usage​

To use Audio control add flet-audio package to your project dependencies:

uv
pip
uv add flet-audio

LINUX REQUIREMENTS

To play audio on Linux (or WSL) you need to install GStreamer library.

To install the minimal set of GStreamer libs on Ubuntu/Debian, run:

sudo apt install libgtk-3-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev


To install the full set:

sudo apt install \

  libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgstreamer-plugins-bad1.0-dev \

  gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad \

  gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools \

  gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 \

  gstreamer1.0-qt5 gstreamer1.0-pulseaudio


If you receive error while loading shared libraries: libgstapp-1.0.so.0, it means GStreamer is not installed in your WSL environment. Install the full set of GStreamer libs, as shown above.

See this guide for installing on other Linux distributions.

Examples​
Basic example​
import flet as ft

import flet_audio as fta





def main(page: ft.Page):

    url = "viper.mp3"



    async def play():

        await audio.play()



    async def pause():

        await audio.pause()



    async def resume():

        await audio.resume()



    async def release():

        await audio.release()



    def set_volume(value: float):

        audio.volume += value



    def set_balance(value: float):

        audio.balance += value



    async def seek_2s():

        await audio.seek(ft.Duration(seconds=2))



    async def get_duration():

        duration = await audio.get_duration()

        print("Duration:", duration)



    async def on_get_current_position():

        position = await audio.get_current_position()

        print("Current position:", position)



    audio = fta.Audio(

        src=url,

        autoplay=False,

        volume=1,

        balance=0,

        release_mode=fta.ReleaseMode.STOP,

        on_loaded=lambda _: print("Loaded"),

        on_duration_change=lambda e: print("Duration changed:", e.duration),

        on_position_change=lambda e: print("Position changed:", e.position),

        on_state_change=lambda e: print("State changed:", e.state),

        on_seek_complete=lambda _: print("Seek complete"),

    )

    page.services.append(audio)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button("Play", on_click=play),

                    ft.Button("Pause", on_click=pause),

                    ft.Button("Resume", on_click=resume),

                    ft.Button("Release", on_click=release),

                    ft.Button("Seek 2s", on_click=seek_2s),

                    ft.Row(

                        controls=[

                            ft.Button(

                                "Volume down",

                                on_click=lambda _: set_volume(-0.1),

                            ),

                            ft.Button("Volume up", on_click=lambda _: set_volume(0.1)),

                        ]

                    ),

                    ft.Row(

                        controls=[

                            ft.Button(

                                "Balance left",

                                on_click=lambda _: set_balance(-0.1),

                            ),

                            ft.Button(

                                "Balance right",

                                on_click=lambda _: set_balance(0.1),

                            ),

                        ]

                    ),

                    ft.Button("Get duration", on_click=get_duration),

                    ft.Button(

                        "Get current position",

                        on_click=on_get_current_position,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

A control to simultaneously play multiple audio sources.

Inherits: Service

Properties
autoplay - Starts playing audio as soon as audio control is added to a page.
balance - Defines the stereo balance.
playback_rate - Defines the playback rate.
release_mode - Defines the release mode.
src - The audio source.
volume - Sets the volume (amplitude).
Events
on_duration_change - Fires as soon as audio duration is available (it might take a while to download or buffer it).
on_loaded - Fires when an audio is loaded/buffered.
on_position_change - Fires when audio position is changed.
on_seek_complete - Fires on seek completions.
on_state_change - Fires when audio player state changes.
Methods
get_current_position - Get the current position of the audio playback.
get_duration - Get audio duration of the audio playback.
pause - Pauses the audio that is currently playing.
play - Starts playing audio from the specified position.
release - Releases the resources associated with this media player.
resume - Resumes the audio that has been paused or stopped.
seek - Moves the cursor to the desired position.
Properties​
build
autoplay
class-attribute
instance-attribute
​
Copy
autoplay: bool = False

Starts playing audio as soon as audio control is added to a page.

NOTE

Autoplay works in desktop, mobile apps and Safari browser, but doesn't work in Chrome/Edge.

build
balance
class-attribute
instance-attribute
​
Copy
balance: Number = 0.0

Defines the stereo balance.

-1 - The left channel is at full volume; the right channel is silent.
1 - The right channel is at full volume; the left channel is silent.
0 - Both channels are at the same volume.
build
playback_rate
class-attribute
instance-attribute
​
Copy
playback_rate: Number = 1.0

Defines the playback rate.

Should ideally be set when creating the constructor.

NOTE
iOS and macOS have limits between 0.5x and 2x.
Android SDK version should be 23 or higher.
build
release_mode
class-attribute
instance-attribute
​
Copy
release_mode: ReleaseMode = ReleaseMode.RELEASE

Defines the release mode.

build
src
class-attribute
instance-attribute
​
Copy
src: str | bytes | None = None

The audio source.

It can be one of the following:

A URL or local asset file path;
A base64 string;
Raw bytes.
NOTE

Here is a list of supported audio formats.

build
volume
class-attribute
instance-attribute
​
Copy
volume: Number = 1.0

Sets the volume (amplitude). It's value ranges between 0.0 (mute) and 1.0 (maximum volume). Intermediate values are linearly interpolated.

Events​
bolt
on_duration_change
class-attribute
instance-attribute
​
Copy
on_duration_change: (
    EventHandler[AudioDurationChangeEvent] | None
) = None

Fires as soon as audio duration is available (it might take a while to download or buffer it).

bolt
on_loaded
class-attribute
instance-attribute
​
Copy
on_loaded: ControlEventHandler[Audio] | None = None

Fires when an audio is loaded/buffered.

bolt
on_position_change
class-attribute
instance-attribute
​
Copy
on_position_change: (
    EventHandler[AudioPositionChangeEvent] | None
) = None

Fires when audio position is changed. Will continuously update the position of the playback every 1 second if the status is playing.

Can be used for a progress bar.

bolt
on_seek_complete
class-attribute
instance-attribute
​
Copy
on_seek_complete: ControlEventHandler[Audio] | None = (
    None
)

Fires on seek completions. An event is going to be sent as soon as the audio seek is finished.

bolt
on_state_change
class-attribute
instance-attribute
​
Copy
on_state_change: (
    EventHandler[AudioStateChangeEvent] | None
) = None

Fires when audio player state changes.

Methods​
deployed_code
get_current_position
async
​
Copy
get_current_position() -> Duration | None

Get the current position of the audio playback.

Returns:

Duration | None - The current position of the audio playback.
deployed_code
get_duration
async
​
Copy
get_duration() -> Duration | None

Get audio duration of the audio playback.

It will be available as soon as the audio duration is available (it might take a while to download or buffer it if file is not local).

Returns:

Duration | None - The duration of audio playback.
deployed_code
pause
async
​
Copy
pause()

Pauses the audio that is currently playing.

If you call resume later, the audio will resume from the point that it has been paused.

deployed_code
play
async
​
Copy
play(position: DurationValue=0)

Starts playing audio from the specified position.

Parameters:

position (DurationValue, default: 0) - The position to start playback from.
deployed_code
release
async
​
Copy
release()

Releases the resources associated with this media player. These are going to be fetched or buffered again as soon as you change the source or call resume.

deployed_code
resume
async
​
Copy
resume()

Resumes the audio that has been paused or stopped.

deployed_code
seek
async
​
Copy
seek(position: DurationValue)

Moves the cursor to the desired position.

Parameters:

position (DurationValue) - The position to seek/move to.
Edit this page