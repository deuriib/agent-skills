# Camera
URL: https://flet.dev/docs/controls/camera/

ReferenceControlsCamera
Camera

Display a live camera preview, capture photos and videos, and stream camera frames directly in your Flet apps.

Powered by the camera Flutter package.

Platform Support​
Platform	iOS	Android	Web	Windows	macOS	Linux
Supported	✅	✅	✅	❌	❌	❌
Usage​

Add the flet-camera package to your project dependencies:

uv
pip
uv add flet-camera

PERMISSIONS

Request camera (and microphone if recording video with audio) permissions on mobile platforms before initializing the control. You can use PermissionHandler to prompt the user. You can also use predefined cross-platform permission bundles for camera and microphone permissions.

Requirements​

The below sections show the required configurations for each platform.

Android​

Configuration to be made to access the camera and optionally the microphone:

android.permission.CAMERA: Allows camera usage.
android.permission.RECORD_AUDIO (optional): Allows video recording with audio.
flet build
pyproject.toml
flet build apk \

  --android-permissions android.permission.CAMERA=true \

  --android-permissions android.permission.RECORD_AUDIO=true


See also:

setting Android permissions
iOS​

Configuration to be made to access the camera and optionally the microphone:

NSCameraUsageDescription: Required for camera usage.
NSMicrophoneUsageDescription (optional): Required only for video recording with audio. For example, when enable_audio parameter of Camera.initialize is set to True (default).
flet build
pyproject.toml
flet build ipa \

  --info-plist NSCameraUsageDescription="Some message to describe why you need this permission..." \

  --info-plist NSMicrophoneUsageDescription="Some message to describe why you need this permission..."


See also:

setting iOS permissions
Cross-platform​

Additionally/alternatively, you can make use of our predefined cross-platform camera (and optionally microphone) permission bundles:

flet build
pyproject.toml
flet build <target_platform> --permissions camera microphone

Example​
import base64

import logging

from dataclasses import dataclass, field

from datetime import datetime

from math import cos, pi, sin



import flet as ft

import flet_camera as fc





@dataclass

class State:

    cameras: list[fc.CameraDescription] = field(default_factory=list)

    selected_camera: fc.CameraDescription | None = None

    camera_labels: dict[str, str] = field(default_factory=dict)

    is_streaming: bool = False

    is_streaming_supported: bool = False

    is_initialized: bool = False

    is_preview_paused: bool = False

    is_recording: bool = False

    is_recording_paused: bool = False

    device_orientation: ft.DeviceOrientation | None = None

    last_frame_width: int | None = None

    last_frame_height: int | None = None





async def main(page: ft.Page):

    image_frame_width = 280

    image_frame_height = 200

    page.title = "Camera control"

    page.padding = 16

    page.scroll = ft.ScrollMode.AUTO

    page.horizontal_alignment = ft.CrossAxisAlignment.STRETCH



    state = State()



    preview = fc.Camera(

        expand=True,

        preview_enabled=True,

        content=ft.Container(

            alignment=ft.Alignment.CENTER,

            content=ft.Icon(

                ft.Icons.CENTER_FOCUS_STRONG,

                color=ft.Colors.WHITE_70,

                size=48,

            ),

        ),

    )



    status = ft.Text(value="Select a camera", size=12)

    last_photo_label = ft.Text("Last photo", visible=False)

    last_image = ft.Image(

        src=base64.b64decode(

            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBAp0YVwAAAABJRU5ErkJggg=="

        ),

        width=image_frame_width,

        height=image_frame_height,

        fit=ft.BoxFit.CONTAIN,

        gapless_playback=True,

    )

    last_image_frame = ft.Container(

        width=image_frame_width,

        height=image_frame_height,

        alignment=ft.Alignment.CENTER,

        content=last_image,

        visible=False,

    )

    selector = ft.Dropdown(label="Camera", options=[])

    recorded_video_path = ft.Text(value="Recorded video: not saved yet", size=12)

    take_photo_btn = ft.FilledIconButton(

        icon=ft.Icons.PHOTO_CAMERA,

        tooltip="Take photo",

        disabled=True,

    )

    record_btn = ft.FilledTonalIconButton(

        icon=ft.Icons.VIDEOCAM,

        selected_icon=ft.Icons.STOP,

        selected=False,

        tooltip="Start / stop recording",

        disabled=True,

    )

    pause_recording_btn = ft.OutlinedIconButton(

        icon=ft.Icons.PAUSE,

        selected_icon=ft.Icons.PLAY_ARROW,

        selected=False,

        tooltip="Pause / resume recording",

        disabled=True,

    )

    stream_btn = ft.OutlinedIconButton(

        icon=ft.Icons.PLAY_ARROW,

        selected_icon=ft.Icons.STOP,

        selected=False,

        tooltip="Start / stop image stream",

        disabled=True,

    )

    preview_btn = ft.OutlinedIconButton(

        icon=ft.Icons.VISIBILITY_OFF,

        selected_icon=ft.Icons.VISIBILITY,

        selected=True,

        tooltip="Pause / resume preview",

        disabled=True,

    )



    def has_human_readable_name(camera: fc.CameraDescription) -> bool:

        name = camera.name.strip()

        if not name:

            return False

        if name.startswith("com.apple.avfoundation."):

            return False

        return not (":" in name and "." in name)



    def camera_label(camera: fc.CameraDescription) -> str:

        if has_human_readable_name(camera):

            return camera.name



        direction = camera.lens_direction.value.capitalize()

        lens_map = {

            "wide": "Wide",

            "telephoto": "Telephoto",

            "ultraWide": "Ultra Wide",

            "unknown": "Unknown",

        }

        lens_type = lens_map.get(camera.lens_type.value, camera.lens_type.value)

        return f"{direction} ({lens_type})"



    def device_orientation_degrees(orientation: ft.DeviceOrientation | None) -> int:

        if orientation == ft.DeviceOrientation.PORTRAIT_UP:

            return 0

        if orientation == ft.DeviceOrientation.LANDSCAPE_RIGHT:

            return 90

        if orientation == ft.DeviceOrientation.PORTRAIT_DOWN:

            return 180

        if orientation == ft.DeviceOrientation.LANDSCAPE_LEFT:

            return 270

        return 0



    def image_rotation_radians() -> float:

        camera = state.selected_camera

        if camera is None:

            return 0.0

        sensor_orientation = camera.sensor_orientation

        device_degrees = device_orientation_degrees(state.device_orientation)

        if camera.lens_direction == fc.CameraLensDirection.FRONT:

            rotation_degrees = (sensor_orientation + device_degrees) % 360

        else:

            rotation_degrees = (sensor_orientation - device_degrees + 360) % 360

        return rotation_degrees * pi / 180



    def apply_last_image_transform(src_width: int | None, src_height: int | None):

        _ = (src_width, src_height)

        last_image.width = image_frame_width

        last_image.height = image_frame_height



        if page.platform != ft.PagePlatform.ANDROID:

            last_image.offset = None

            last_image.rotate = None

            return



        angle = image_rotation_radians()

        width = float(image_frame_width)

        height = float(image_frame_height)

        calc_angle = -angle



        # Flet uses clockwise radians for Rotate.angle.

        def rotate_point(x: float, y: float) -> tuple[float, float]:

            return (

                x * cos(calc_angle) + y * sin(calc_angle),

                -x * sin(calc_angle) + y * cos(calc_angle),

            )



        corners = [

            rotate_point(0.0, 0.0),

            rotate_point(width, 0.0),

            rotate_point(0.0, height),

            rotate_point(width, height),

        ]

        min_x = min(p[0] for p in corners)

        min_y = min(p[1] for p in corners)



        # Control.offset is normalized by control width/height.

        last_image.offset = ft.Offset(

            x=(-min_x / width) if width else 0.0,

            y=(-min_y / height) if height else 0.0,

        )

        last_image.rotate = ft.Rotate(angle=angle, alignment=ft.Alignment.TOP_LEFT)



    async def get_cameras():

        state.cameras = await preview.get_available_cameras()

        state.camera_labels.clear()

        seen_labels: dict[str, int] = {}

        for camera in state.cameras:

            label = camera_label(camera)

            seen_labels[label] = seen_labels.get(label, 0) + 1

            if seen_labels[label] > 1:

                label = f"{label} {seen_labels[label]}"

            state.camera_labels[camera.name] = label



        selector.options = [

            ft.DropdownOption(key=c.name, text=state.camera_labels[c.name])

            for c in state.cameras

        ]

        if selector.value and selector.value not in state.camera_labels:

            selector.value = None

        state.selected_camera = None

        state.is_initialized = False

        state.is_streaming = False

        state.is_recording = False

        state.is_recording_paused = False

        state.is_preview_paused = False

        state.is_streaming_supported = False

        state.device_orientation = None

        sync_action_buttons()

        status.value = "Select a camera"

        page.update()



    def sync_action_buttons():

        take_photo_btn.disabled = not state.is_initialized

        record_btn.disabled = not state.is_initialized

        record_btn.selected = state.is_recording

        pause_recording_btn.selected = state.is_recording_paused

        pause_recording_btn.disabled = not state.is_recording

        stream_btn.selected = state.is_streaming

        stream_btn.disabled = not (

            state.is_initialized and state.is_streaming_supported

        )

        preview_btn.selected = not state.is_preview_paused

        preview_btn.disabled = not state.is_initialized



    async def init_camera(e=None):

        state.selected_camera = next(

            (c for c in state.cameras if c.name == selector.value),

            None,

        )

        if not state.selected_camera:

            status.value = "No camera selected"

            return



        selected_label = state.camera_labels.get(

            state.selected_camera.name, state.selected_camera.name

        )

        status.value = f"Initializing {selected_label}"

        status.update()

        await preview.initialize(

            description=state.selected_camera,

            resolution_preset=fc.ResolutionPreset.MEDIUM,

            enable_audio=True,

            image_format_group=fc.ImageFormatGroup.JPEG,

        )

        if not page.web:

            try:

                await preview.lock_capture_orientation()

            except RuntimeError as ex:

                logging.warning("Could not lock capture orientation: %s", ex)

        state.is_initialized = True

        state.is_streaming = False

        state.is_streaming_supported = await preview.supports_image_streaming()

        sync_action_buttons()

        page.update()



    async def take_photo():

        if not state.is_initialized:

            status.value = "Initialize camera first"

            page.update()

            return

        data = await preview.take_picture()

        last_image.src = data

        apply_last_image_transform(state.last_frame_width, state.last_frame_height)

        last_photo_label.visible = True

        last_image_frame.visible = True

        page.update()



    async def start_recording():

        if not state.is_initialized:

            status.value = "Initialize camera first"

            page.update()

            return

        await preview.prepare_for_video_recording()

        await preview.start_video_recording()

        state.is_recording = True

        state.is_recording_paused = False

        sync_action_buttons()

        status.value = "Recording video..."

        page.update()



    async def pause_recording():

        if not state.is_initialized or not state.is_recording:

            return

        await preview.pause_video_recording()

        state.is_recording_paused = True

        sync_action_buttons()

        status.value = "Recording paused"

        page.update()



    async def resume_recording():

        if not state.is_initialized or not state.is_recording:

            return

        await preview.resume_video_recording()

        state.is_recording_paused = False

        sync_action_buttons()

        status.value = "Recording resumed"

        page.update()



    async def stop_recording():

        if not state.is_initialized or not state.is_recording:

            return

        data = await preview.stop_video_recording()

        state.is_recording = False

        state.is_recording_paused = False

        sync_action_buttons()

        if not data:

            status.value = "No video data returned"

            page.update()

            return



        ext = fc.detect_video_extension(data)

        filename = f"recording_{datetime.now().strftime('%Y%m%d_%H%M%S')}.{ext}"

        saved_path = await ft.FilePicker().save_file(

            file_name=filename,

            src_bytes=data,

        )



        kb_size = len(data) / 1024

        status.value = f"Video recorded: {kb_size:.1f} KB"

        if saved_path:

            recorded_video_path.value = f"Recorded video: {saved_path}"

        else:

            recorded_video_path.value = "Recorded video save canceled"

        page.update()



    async def on_state_change(e: fc.CameraStateEvent):

        if e.description == state.selected_camera:

            state.device_orientation = e.device_orientation

            state.is_recording = e.is_recording_video

            state.is_recording_paused = e.is_recording_paused

            state.is_streaming = e.is_streaming_images

            state.is_preview_paused = e.is_preview_paused

            sync_action_buttons()

            if e.has_error:

                status.value = f"Camera error: {e.error_description}"

            elif e.is_taking_picture:

                status.value = "Taking picture..."

            elif e.is_recording_paused:

                status.value = "Recording paused"

            elif e.is_recording_video:

                status.value = "Recording video..."

            elif e.is_streaming_images:

                status.value = "Streaming images..."

            elif e.is_preview_paused:

                status.value = "Preview paused"

            else:

                status.value = "Camera ready"

            page.update()



    preview.on_state_change = on_state_change

    selector.on_select = init_camera



    async def start_streaming():

        if not state.is_initialized:

            status.value = "Initialize camera first"

            page.update()

            return

        if not state.is_streaming_supported:

            status.value = "Image streaming is not supported by this camera"

            page.update()

            return

        await preview.start_image_stream()

        state.is_streaming = True

        sync_action_buttons()

        page.update()



    async def stop_streaming():

        if not state.is_initialized:

            return

        await preview.stop_image_stream()

        state.is_streaming = False

        sync_action_buttons()

        page.update()



    def on_stream_image(e: fc.CameraImageEvent):

        try:

            state.last_frame_width = e.width

            state.last_frame_height = e.height

            last_image.src = e.bytes

            apply_last_image_transform(e.width, e.height)

            last_photo_label.visible = True

            last_image_frame.visible = True

            page.update()

        except Exception as ex:

            logging.exception("Failed to render stream frame: %s", ex)



    preview.on_stream_image = on_stream_image



    async def pause_preview():

        if not state.is_initialized:

            return

        await preview.pause_preview()

        state.is_preview_paused = True

        sync_action_buttons()

        page.update()



    async def resume_preview():

        if not state.is_initialized:

            return

        await preview.resume_preview()

        state.is_preview_paused = False

        sync_action_buttons()

        page.update()



    async def toggle_recording():

        if state.is_recording:

            await stop_recording()

        else:

            await start_recording()



    async def toggle_recording_pause():

        if state.is_recording_paused:

            await resume_recording()

        else:

            await pause_recording()



    async def toggle_streaming():

        if state.is_streaming:

            await stop_streaming()

        else:

            await start_streaming()



    async def toggle_preview():

        if state.is_preview_paused:

            await resume_preview()

        else:

            await pause_preview()



    take_photo_btn.on_click = take_photo

    record_btn.on_click = toggle_recording

    pause_recording_btn.on_click = toggle_recording_pause

    stream_btn.on_click = toggle_streaming

    preview_btn.on_click = toggle_preview



    page.on_connect = get_cameras



    page.add(

        ft.SafeArea(

            content=ft.Column(

                [

                    ft.Row(

                        [

                            selector,

                            ft.IconButton(ft.Icons.REFRESH, on_click=get_cameras),

                        ],

                        wrap=True,

                    ),

                    ft.Container(

                        height=320,

                        bgcolor=ft.Colors.BLACK,

                        border_radius=3,

                        content=preview,

                    ),

                    status,

                    ft.Row(

                        [

                            take_photo_btn,

                            record_btn,

                            pause_recording_btn,

                            stream_btn,

                            preview_btn,

                        ],

                        wrap=True,

                    ),

                    recorded_video_path,

                    last_photo_label,

                    last_image_frame,

                ]

            )

        )

    )



    await get_cameras()





if __name__ == "__main__":

    ft.run(main)

Description​

A control that provides camera preview and capture capabilities.

Inherits: LayoutControl

Properties
content - Optional child to overlay on top of the camera preview.
preview_enabled - Whether the preview surface is shown.
Events
on_state_change - Fires when the camera controller state changes.
on_stream_image - Fires when an image frame is available while streaming.
Methods
get_available_cameras - Lists the available camera devices on the current platform.
get_exposure_offset_step_size - Returns the smallest increment supported for exposure offset changes.
get_max_exposure_offset - Maximum exposure offset supported by the current camera.
get_max_zoom_level - Maximum zoom level supported by the current camera.
get_min_exposure_offset - Minimum exposure offset supported by the current camera.
get_min_zoom_level - Minimum zoom level supported by the current camera.
initialize - Initializes a new camera controller for the given description.
lock_capture_orientation - Locks capture orientation to the specified device orientation.
pause_preview - Pauses the camera preview.
pause_video_recording - Pauses an active video recording.
prepare_for_video_recording - Prepares the capture session for video recording.
resume_preview - Resumes the camera preview.
resume_video_recording - Resumes a paused video recording.
set_description - Switches to another camera description.
set_exposure_mode - Changes the exposure mode.
set_exposure_offset - Sets exposure offset in EV units.
set_exposure_point - Sets the exposure metering point.
set_flash_mode - Changes the flash mode.
set_focus_mode - Changes the focus mode.
set_focus_point - Sets the focus metering point.
set_zoom_level - Applies the provided zoom level.
start_image_stream - Begins streaming camera image frames.
start_video_recording - Starts capturing video.
stop_image_stream - Stops streaming camera image frames.
stop_video_recording - Stops video recording and returns the recorded bytes.
supports_image_streaming - Indicates whether image streaming is supported on the current platform.
take_picture - Captures a still image and returns the encoded bytes.
unlock_capture_orientation - Unlocks the capture orientation.
Properties​
build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

Optional child to overlay on top of the camera preview.

build
preview_enabled
class-attribute
instance-attribute
​
Copy
preview_enabled: bool = True

Whether the preview surface is shown.

Events​
bolt
on_state_change
class-attribute
instance-attribute
​
Copy
on_state_change: (
    EventHandler[CameraStateEvent] | None
) = None

Fires when the camera controller state changes.

bolt
on_stream_image
class-attribute
instance-attribute
​
Copy
on_stream_image: (
    EventHandler[CameraImageEvent] | None
) = None

Fires when an image frame is available while streaming.

Methods​
deployed_code
get_available_cameras
async
​
Copy
get_available_cameras() -> list[CameraDescription]

Lists the available camera devices on the current platform.

Returns:

list[CameraDescription] - A list of available camera descriptions.
deployed_code
get_exposure_offset_step_size
async
​
Copy
get_exposure_offset_step_size() -> float

Returns the smallest increment supported for exposure offset changes.

deployed_code
get_max_exposure_offset
async
​
Copy
get_max_exposure_offset() -> float

Maximum exposure offset supported by the current camera.

deployed_code
get_max_zoom_level
async
​
Copy
get_max_zoom_level() -> float

Maximum zoom level supported by the current camera.

deployed_code
get_min_exposure_offset
async
​
Copy
get_min_exposure_offset() -> float

Minimum exposure offset supported by the current camera.

deployed_code
get_min_zoom_level
async
​
Copy
get_min_zoom_level() -> float

Minimum zoom level supported by the current camera.

deployed_code
initialize
async
​
Copy
initialize(
    description: CameraDescription,
    resolution_preset: ResolutionPreset,
    enable_audio: bool = True,
    fps: int | None = None,
    video_bitrate: int | None = None,
    audio_bitrate: int | None = None,
    image_format_group: ImageFormatGroup | None = None,
)

Initializes a new camera controller for the given description.

Parameters:

description (CameraDescription) - Camera device to bind to.
resolution_preset (ResolutionPreset) - Desired resolution preset.
enable_audio (bool, default: True) - Whether audio is enabled for recordings.
fps (int | None, default: None) - Optional target frames per second.
video_bitrate (int | None, default: None) - Optional video bitrate.
audio_bitrate (int | None, default: None) - Optional audio bitrate.
image_format_group (ImageFormatGroup | None, default: None) - Optional image format group override.
deployed_code
lock_capture_orientation
async
​
Copy
lock_capture_orientation(
    orientation: DeviceOrientation | None = None,
)

Locks capture orientation to the specified device orientation.

Parameters:

orientation (DeviceOrientation | None, default: None) - Specific orientation to lock, or current device orientation if None.
deployed_code
pause_preview
async
​
Copy
pause_preview()

Pauses the camera preview.

deployed_code
pause_video_recording
async
​
Copy
pause_video_recording()

Pauses an active video recording.

deployed_code
prepare_for_video_recording
async
​
Copy
prepare_for_video_recording()

Prepares the capture session for video recording.

deployed_code
resume_preview
async
​
Copy
resume_preview()

Resumes the camera preview.

deployed_code
resume_video_recording
async
​
Copy
resume_video_recording()

Resumes a paused video recording.

deployed_code
set_description
async
​
Copy
set_description(description: CameraDescription)

Switches to another camera description.

Parameters:

description (CameraDescription) - Camera to switch to.
deployed_code
set_exposure_mode
async
​
Copy
set_exposure_mode(mode: ExposureMode)

Changes the exposure mode.

Parameters:

mode (ExposureMode) - Exposure mode to apply.
deployed_code
set_exposure_offset
async
​
Copy
set_exposure_offset(offset: float) -> float

Sets exposure offset in EV units.

Parameters:

offset (float) - Exposure offset to apply.

Returns:

float - The offset value that was set.
deployed_code
set_exposure_point
async
​
Copy
set_exposure_point(point: OffsetValue | None)

Sets the exposure metering point.

Parameters:

point (OffsetValue | None) - Normalized offset (0..1) or None to reset.
deployed_code
set_flash_mode
async
​
Copy
set_flash_mode(mode: FlashMode)

Changes the flash mode.

Parameters:

mode (FlashMode) - Flash mode to apply.
deployed_code
set_focus_mode
async
​
Copy
set_focus_mode(mode: FocusMode)

Changes the focus mode.

Parameters:

mode (FocusMode) - Focus mode to apply.
deployed_code
set_focus_point
async
​
Copy
set_focus_point(point: OffsetValue | None)

Sets the focus metering point.

Parameters:

point (OffsetValue | None) - Normalized offset (0..1) or None to reset.
deployed_code
set_zoom_level
async
​
Copy
set_zoom_level(zoom: float)

Applies the provided zoom level.

Parameters:

zoom (float) - Zoom level to set.
deployed_code
start_image_stream
async
​
Copy
start_image_stream()

Begins streaming camera image frames.

deployed_code
start_video_recording
async
​
Copy
start_video_recording()

Starts capturing video.

deployed_code
stop_image_stream
async
​
Copy
stop_image_stream()

Stops streaming camera image frames.

deployed_code
stop_video_recording
async
​
Copy
stop_video_recording() -> bytes

Stops video recording and returns the recorded bytes.

Returns:

bytes - Encoded video file bytes.
deployed_code
supports_image_streaming
async
​
Copy
supports_image_streaming() -> bool

Indicates whether image streaming is supported on the current platform.

deployed_code
take_picture
async
​
Copy
take_picture() -> bytes

Captures a still image and returns the encoded bytes.

Returns:

bytes - Encoded image bytes.
deployed_code
unlock_capture_orientation
async
​
Copy
unlock_capture_orientation()

Unlocks the capture orientation.

Edit this page