# AudioRecorder
URL: https://flet.dev/docs/services/audiorecorder/

ReferenceServicesAudioRecorder
Audio Recorder

Allows recording audio in Flet apps.

It is based on the record Flutter package.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅	✅	✅	✅
Usage​

To use AudioRecorder service add flet-audio-recorder package to your project dependencies:

uv
pip
uv add flet-audio-recorder

Requirements​

The below sections show the required configurations for each platform.

Android​

Configuration to be made to access the microphone:

android.permission.RECORD_AUDIO: Allows audio recording.
android.permission.WRITE_EXTERNAL_STORAGE (optional): Allows saving your recordings in public folders.
android.permission.MODIFY_AUDIO_SETTINGS (optional): Allows using bluetooth telephony device like headset/earbuds.
flet build
pyproject.toml
flet build apk \

  --android-permissions android.permission.RECORD_AUDIO=true \

  --android-permissions android.permission.WRITE_EXTERNAL_STORAGE=true \

  --android-permissions android.permission.MODIFY_AUDIO_SETTINGS=true


See also:

setting Android permissions
Audio formats sample rate hints
iOS​

Configuration to be made to access the microphone:

NSMicrophoneUsageDescription: Required for recording audio.
flet build
pyproject.toml
flet build ipa \

  --info-plist NSMicrophoneUsageDescription="Some message to describe why you need this permission..."


See also:

setting iOS permissions.
macOS​

Configuration to be made to access the microphone:

NSMicrophoneUsageDescription: Allows recording audio.
com.apple.security.device.audio-input: Allows recording audio using the built-in microphone and accessing audio input using Core Audio.
flet build
pyproject.toml
flet build macos \

  --info-plist NSMicrophoneUsageDescription="Some message to describe why you need this permission..." \

  --macos-entitlements com.apple.security.device.audio-input=true


See also:

setting macOS permissions
setting macOS entitlements
Linux​

The following dependencies are required (and widely available on your system):

parecord: Used for audio input.
pactl: Used for utility methods like getting available devices.
ffmpeg: Used for encoding and output.

On Ubuntu 24.04.3 LTS, you can install them using:

sudo apt install pulseaudio-utils ffmpeg

Cross-platform​

Additionally/alternatively, you can make use of our predefined cross-platform microphone permission bundle:

flet build
pyproject.toml
flet build <target_platform> --permissions microphone

Examples​
Basic recording​
import flet as ft

import flet_audio_recorder as far





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.appbar = ft.AppBar(title=ft.Text("Audio Recorder"), center_title=True)



    path = "test-audio-file.wav"



    def show_snackbar(message):

        page.show_dialog(ft.SnackBar(ft.Text(message)))



    async def handle_recording_start(e: ft.Event[ft.Button]):

        show_snackbar("Starting recording...")

        await recorder.start_recording(output_path=path)



    async def handle_recording_stop(e: ft.Event[ft.Button]):

        output_path = await recorder.stop_recording()

        show_snackbar(f"Stopped recording. Output Path: {output_path}")

        if page.web and output_path is not None:

            await page.launch_url(output_path)



    async def handle_list_devices(e: ft.Event[ft.Button]):

        o = await recorder.get_input_devices()

        show_snackbar(f"Input Devices: {', '.join([f'{d.id}:{d.label}' for d in o])}")



    async def handle_has_permission(e: ft.Event[ft.Button]):

        try:

            status = await recorder.has_permission()

            show_snackbar(f"Audio Recording Permission status: {status}")

        except Exception as e:

            show_snackbar(f"Error checking permission: {e}")



    async def handle_pause(e: ft.Event[ft.Button]):

        print(f"isRecording: {await recorder.is_recording()}")

        if await recorder.is_recording():

            await recorder.pause_recording()



    async def handle_resume(e: ft.Event[ft.Button]):

        print(f"isPaused: {await recorder.is_paused()}")

        if await recorder.is_paused():

            await recorder.resume_recording()



    async def handle_audio_encoder_test(e: ft.Event[ft.Button]):

        print(await recorder.is_supported_encoder(far.AudioEncoder.WAV))



    recorder = far.AudioRecorder(

        configuration=far.AudioRecorderConfiguration(encoder=far.AudioEncoder.WAV),

        on_state_change=lambda e: print(f"State Changed: {e.data}"),

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(

                        content="Start Audio Recorder", on_click=handle_recording_start

                    ),

                    ft.Button(

                        content="Stop Audio Recorder", on_click=handle_recording_stop

                    ),

                    ft.Button(content="List Devices", on_click=handle_list_devices),

                    ft.Button(content="Pause Recording", on_click=handle_pause),

                    ft.Button(content="Resume Recording", on_click=handle_resume),

                    ft.Button(

                        content="WAV Encoder Support",

                        on_click=handle_audio_encoder_test,

                    ),

                    ft.Button(

                        content="Get Audio Recording Permission Status",

                        on_click=handle_has_permission,

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Stream chunks and save/download​

On web, AudioRecorder.stop_recording() returns a browser-local Blob URL. Use streaming when your app needs access to the recorded bytes.

Set AudioRecorderConfiguration.encoder to AudioEncoder.PCM16BITS and handle AudioRecorder.on_stream to receive AudioRecorderStreamEvent.chunk bytes in Python.

AudioEncoder.PCM16BITS encoded streams are supported on all platforms. Stream chunks are raw PCM16 bytes and are not directly playable as an audio file. Wrap the bytes in a container such as WAV in Python when the destination needs a directly playable recording.

The example below collects the streamed chunks, wraps the PCM16 bytes in a WAV container, and passes the resulting bytes to FilePicker.save_file() so users can save or download the recording.

import io

import time

import wave



import flet as ft

import flet_audio_recorder as far



SAMPLE_RATE = 44100

CHANNELS = 1

BYTES_PER_SAMPLE = 2





def pcm_to_wav_bytes(pcm_data: bytes) -> bytes:

    wav_buffer = io.BytesIO()

    with wave.open(wav_buffer, "wb") as wav:

        wav.setnchannels(CHANNELS)

        wav.setsampwidth(BYTES_PER_SAMPLE)

        wav.setframerate(SAMPLE_RATE)

        wav.writeframes(pcm_data)

    return wav_buffer.getvalue()





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    buffer = bytearray()



    def show_snackbar(message: str):

        page.show_dialog(ft.SnackBar(content=message, duration=ft.Duration(seconds=5)))



    def handle_stream(e: far.AudioRecorderStreamEvent):

        buffer.extend(e.chunk)

        status.value = (

            f"Streaming chunk {e.sequence}; {e.bytes_streamed} bytes collected."

        )



    async def handle_recording_start(e: ft.Event[ft.Button]):

        if not await recorder.has_permission():

            show_snackbar("Microphone permission is required.")

            return



        buffer.clear()

        status.value = "Recording..."

        await recorder.start_recording(

            configuration=far.AudioRecorderConfiguration(

                encoder=far.AudioEncoder.PCM16BITS,

                sample_rate=SAMPLE_RATE,

                channels=CHANNELS,

            ),

        )



    async def handle_recording_stop(e: ft.Event[ft.Button]):

        await recorder.stop_recording()

        if not buffer:

            show_snackbar("Nothing was recorded.")

            return



        wav_bytes = pcm_to_wav_bytes(bytes(buffer))

        file_name = f"recording-{int(time.time())}.wav"

        file_path = await ft.FilePicker().save_file(

            file_name=file_name,

            file_type=ft.FilePickerFileType.CUSTOM,

            allowed_extensions=["wav"],

            src_bytes=wav_bytes,

        )



        if file_path and not (page.web or page.platform.is_mobile()):

            with open(file_path, "wb") as output:

                output.write(wav_bytes)



        if page.web:

            status.value = f"Downloaded {file_name} ({len(wav_bytes)} bytes)."

        else:

            status.value = f"Saved to: {file_path}" if file_path else "Save cancelled."

        show_snackbar(status.value)



    recorder = far.AudioRecorder(on_stream=handle_stream)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.Text(

                        "Stream PCM16 audio chunks and save or download "

                        "them as a WAV file."

                    ),

                    ft.Button("Start recording", on_click=handle_recording_start),

                    ft.Button("Stop and save", on_click=handle_recording_stop),

                    status := ft.Text(),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Streaming upload​

Pass AudioRecorderUploadSettings to AudioRecorder.start_recording() to upload AudioEncoder.PCM16BITS recording bytes directly while recording.

The uploaded file contains raw PCM16 bytes, so a .pcm extension is intentional. See the stream chunks and save/download example for inspiration, if you need to create a playable WAV file.

NOTE

Built-in upload URLs from Page.get_upload_url() require upload storage and a signing key. Run with upload_dir and set FLET_SECRET_KEY.

import time



import flet as ft

import flet_audio_recorder as far





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def show_snackbar(message: str):

        page.show_dialog(ft.SnackBar(content=message, duration=ft.Duration(seconds=5)))



    def handle_upload(e: far.AudioRecorderUploadEvent):

        if e.error:

            status.value = f"Upload error: {e.error}"

        elif e.progress == 1:

            status.value = f"Upload complete: {e.bytes_uploaded or 0} bytes."

        else:

            status.value = f"Uploading: {e.bytes_uploaded or 0} bytes sent."



    async def handle_recording_start(e: ft.Event[ft.Button]):

        if not await recorder.has_permission():

            show_snackbar("Microphone permission is required.")

            return



        file_name = f"recordings/rec-{int(time.time())}.pcm"

        try:

            upload_url = page.get_upload_url(file_name=file_name, expires=600)

        except RuntimeError as ex:

            if "FLET_SECRET_KEY" not in str(ex):

                raise

            status.value = (

                "Uploads require a secret key. "

                "Set FLET_SECRET_KEY before running this app."

            )

            show_snackbar(status.value)

            return



        status.value = "Recording..."

        await recorder.start_recording(

            upload=far.AudioRecorderUploadSettings(

                upload_url=upload_url,

                file_name=file_name,

            ),

            configuration=far.AudioRecorderConfiguration(

                encoder=far.AudioEncoder.PCM16BITS,

                channels=1,

            ),

        )



    async def handle_recording_stop(e: ft.Event[ft.Button]):

        await recorder.stop_recording()

        show_snackbar(

            "Recording stopped. See 'uploads/recordings' folder for the recorded file."

        )



    recorder = far.AudioRecorder(on_upload=handle_upload)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.Text("Record PCM16 audio and upload it as it streams."),

                    ft.Button("Start upload", on_click=handle_recording_start),

                    ft.Button("Stop recording", on_click=handle_recording_stop),

                    status := ft.Text(),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(

        main,

        upload_dir="uploads",

    )

Description​

A control that allows you to record audio from your device.

This control can record audio using different audio encoders and also allows configuration of various audio recording parameters such as noise suppression, echo cancellation, and more.

Inherits: Service

Properties
configuration - The default configuration of the audio recorder.
Events
on_state_change - Called when recording state changes.
on_stream - Called when a raw PCM16BITS recording chunk is available.
on_upload - Called when streaming upload progress or errors are available.
Methods
cancel_recording - Cancels the current audio recording.
get_input_devices - Retrieves the available input devices for recording.
has_permission - Checks if the app has permission to record audio, requesting it if needed.
is_paused - Checks whether the audio recorder is currently paused.
is_recording - Checks whether the audio recorder is currently recording.
is_supported_encoder - Checks if the given audio encoder is supported by the recorder.
pause_recording - Pauses the ongoing audio recording.
resume_recording - Resumes a paused audio recording.
start_recording - Starts recording audio and saves it to a file or streams it.
stop_recording - Stops the audio recording and optionally returns the recording location.
Properties​
build
configuration
class-attribute
instance-attribute
​
Copy
configuration: AudioRecorderConfiguration = field(
    default_factory=lambda: AudioRecorderConfiguration()
)

The default configuration of the audio recorder.

Events​
bolt
on_state_change
class-attribute
instance-attribute
​
Copy
on_state_change: (
    EventHandler[AudioRecorderStateChangeEvent] | None
) = None

Called when recording state changes.

bolt
on_stream
class-attribute
instance-attribute
​
Copy
on_stream: (
    EventHandler[AudioRecorderStreamEvent] | None
) = None

Called when a raw PCM16BITS recording chunk is available.

bolt
on_upload
class-attribute
instance-attribute
​
Copy
on_upload: (
    EventHandler[AudioRecorderUploadEvent] | None
) = None

Called when streaming upload progress or errors are available.

Methods​
deployed_code
cancel_recording
async
​
Copy
cancel_recording()

Cancels the current audio recording.

deployed_code
get_input_devices
async
​
Copy
get_input_devices() -> list[InputDevice]

Retrieves the available input devices for recording.

Returns:

list[InputDevice] - A list of available input devices.
deployed_code
has_permission
async
​
Copy
has_permission() -> bool

Checks if the app has permission to record audio, requesting it if needed.

Returns:

bool - True if permission is already granted or granted after the request; False otherwise.
deployed_code
is_paused
async
​
Copy
is_paused() -> bool

Checks whether the audio recorder is currently paused.

Returns:

bool - True if the recorder is paused, False otherwise.
deployed_code
is_recording
async
​
Copy
is_recording() -> bool

Checks whether the audio recorder is currently recording.

Returns:

bool - True if the recorder is currently recording, False otherwise.
deployed_code
is_supported_encoder
async
​
Copy
is_supported_encoder(encoder: AudioEncoder) -> bool

Checks if the given audio encoder is supported by the recorder.

Parameters:

encoder (AudioEncoder) - The audio encoder to check.

Returns:

bool - True if the encoder is supported, False otherwise.
deployed_code
pause_recording
async
​
Copy
pause_recording()

Pauses the ongoing audio recording.

deployed_code
resume_recording
async
​
Copy
resume_recording()

Resumes a paused audio recording.

deployed_code
start_recording
async
​
Copy
start_recording(
    output_path: str | None = None,
    configuration: AudioRecorderConfiguration | None = None,
    upload: AudioRecorderUploadSettings | None = None,
) -> bool

Starts recording audio and saves it to a file or streams it.

If neither upload nor on_stream is used, output_path must be provided on platforms other than web.

When streaming, use PCM16BITS as the encoder. In that case, emitted or uploaded chunks contain raw PCM16 data. In some use cases, these chunks can be wrapped in a container such as WAV if the output must be directly playable as an audio file.

Parameters:

output_path (str | None, default: None) - The file path where the audio will be saved. It must be specified if not on web.
configuration (AudioRecorderConfiguration | None, default: None) - The configuration for the audio recorder. If None, the AudioRecorder.configuration will be used.
upload (AudioRecorderUploadSettings | None, default: None) - Upload settings to stream recording bytes directly to a destination, for example a URL returned by Page.get_upload_url.

Returns:

bool - True if recording was successfully started, False otherwise.

Raises:

ValueError - If output_path is not provided on platforms other than web when neither streaming nor uploads are requested.
ValueError - If streaming is requested with an encoder other than PCM16BITS.
deployed_code
stop_recording
async
​
Copy
stop_recording() -> str | None

Stops the audio recording and optionally returns the recording location.

Returns:

str | None - The local file path where the audio was saved, a Blob URL on web, or None when streaming (i.e. when upload or on_stream is set).
Edit this page