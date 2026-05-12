# InteractiveViewer
URL: https://flet.dev/docs/controls/interactiveviewer

ReferenceControlsInteractiveViewer
InteractiveViewer

Allows you to pan, zoom, and rotate its content.

Inherits: LayoutControl

Properties
alignment - The alignment of the content within this viewer.
boundary_margin - A margin for the visible boundaries of the content.
clip_behavior - Defines how to clip the content.
constrained - Whether the normal size constraints at this point in the control tree are applied to the content.
content - The Control to be transformed.
interaction_end_friction_coefficient - Changes the deceleration behavior after a gesture.
interaction_update_interval - The interval (in milliseconds) at which the on_interaction_update event is fired.
max_scale - The maximum allowed scale.
min_scale - The minimum allowed scale.
pan_enabled - Whether panning is enabled.
scale_enabled - Whether scaling is enabled.
scale_factor - The amount of scale to be performed per pointer scroll.
trackpad_scroll_causes_scale - Whether scrolling up/down on a trackpad should cause scaling instead of panning.
Events
on_interaction_end - Called when the user ends a pan or scale gesture.
on_interaction_start - Called when the user begins a pan or scale gesture.
on_interaction_update - Called when the user updates a pan or scale gesture.
Methods
pan - Translates the current transform matrix.
reset - Resets the current transform matrix to identity.
restore_state - Restores the transform matrix previously captured by save_state.
save_state - Saves a snapshot of the current transform matrix.
zoom - Applies multiplicative zoom to the current transform.
Examples​

Live example

Handling events​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.InteractiveViewer(

                min_scale=0.1,

                max_scale=15,

                boundary_margin=ft.Margin.all(20),

                on_interaction_start=lambda e: print(e),

                on_interaction_end=lambda e: print(e),

                on_interaction_update=lambda e: print(e),

                content=ft.Image(src="https://picsum.photos/500/500"),

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Programmatic transformations​
import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.vertical_alignment = ft.MainAxisAlignment.CENTER



    async def handle_zoom_in(e: ft.Event[ft.Button]):

        await i.zoom(1.2)



    async def handle_zoom_out(e: ft.Event[ft.Button]):

        await i.zoom(0.8)



    async def handle_pan(e: ft.Event[ft.Button]):

        await i.pan(dx=50, dy=50)



    async def handle_reset(e: ft.Event[ft.Button]):

        await i.reset()



    async def handle_reset_slow(e: ft.Event[ft.Button]):

        await i.reset(animation_duration=ft.Duration(seconds=2))



    async def handle_save_state(e: ft.Event[ft.Button]):

        await i.save_state()



    async def handle_restore_state(e: ft.Event[ft.Button]):

        await i.restore_state()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    i := ft.InteractiveViewer(

                        min_scale=0.1,

                        max_scale=5,

                        boundary_margin=ft.Margin.all(20),

                        content=ft.Image(src="https://picsum.photos/500/500"),

                    ),

                    ft.Row(

                        wrap=True,

                        controls=[

                            ft.Button("Zoom In", on_click=handle_zoom_in),

                            ft.Button("Zoom Out", on_click=handle_zoom_out),

                            ft.Button("Pan", on_click=handle_pan),

                            ft.Button("Save State", on_click=handle_save_state),

                            ft.Button("Restore State", on_click=handle_restore_state),

                            ft.Button("Reset (instant)", on_click=handle_reset),

                            ft.Button("Reset (slow)", on_click=handle_reset_slow),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = None

The alignment of the content within this viewer.

build
boundary_margin
class-attribute
instance-attribute
​
Copy
boundary_margin: MarginValue = field(
    default_factory=lambda: Margin.all(0)
)

A margin for the visible boundaries of the content.

Any transformation that results in the viewport being able to view outside of the boundaries will be stopped at the boundary. The boundaries do not rotate with the rest of the scene, so they are always aligned with the viewport.

To produce no boundaries at all, pass an infinite value.

Defaults to Margin.all(0), which results in boundaries that are the exact same size and position as the content.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.HARD_EDGE

Defines how to clip the content.

If set to ClipBehavior.NONE, the content can visually overflow the bounds of this InteractiveViewer, but gesture events (such as pan or zoom) will only be recognized within the viewer's area. Ensure this InteractiveViewer is sized appropriately when using ClipBehavior.NONE.

build
constrained
class-attribute
instance-attribute
​
Copy
constrained: bool = True

Whether the normal size constraints at this point in the control tree are applied to the content.

If set to False, then the content will be given infinite constraints. This is often useful when a content should be bigger than this InteractiveViewer.

For example, for a content which is bigger than the viewport but can be panned to reveal parts that were initially offscreen, constrained must be set to False to allow it to size itself properly. If constrained is True and the content can only size itself to the viewport, then areas initially outside of the viewport will not be able to receive user interaction events. If experiencing regions of the content that are not receptive to user gestures, make sure constrained is False and the content is sized properly.

build
content
instance-attribute
​
Copy
content: Control

The Control to be transformed.

Raises:

ValueError - If it is not visible.
build
interaction_end_friction_coefficient
class-attribute
instance-attribute
​
Copy
interaction_end_friction_coefficient: Number = 1.35e-05

Changes the deceleration behavior after a gesture.

Raises:

ValueError - If it is not strictly greater than 0.
build
interaction_update_interval
class-attribute
instance-attribute
​
Copy
interaction_update_interval: int = 200

The interval (in milliseconds) at which the on_interaction_update event is fired.

build
max_scale
class-attribute
instance-attribute
​
Copy
max_scale: Number = 2.5

The maximum allowed scale.

Raises:

ValueError - If it is not strictly greater than 0.
ValueError - If it is not greater than or equal to min_scale.
build
min_scale
class-attribute
instance-attribute
​
Copy
min_scale: Number = 0.8

The minimum allowed scale.

The effective scale is limited by the value of boundary_margin. If scaling would cause the content to be displayed outside the defined boundary, it is prevented. By default, boundary_margin is set to Margin.all(0), so scaling below 1.0 is typically not possible unless you increase the boundary_margin value.

Raises:

ValueError - If it is not strictly greater than 0.
ValueError - If it is not less than or equal to max_scale.
build
pan_enabled
class-attribute
instance-attribute
​
Copy
pan_enabled: bool = True

Whether panning is enabled.

build
scale_enabled
class-attribute
instance-attribute
​
Copy
scale_enabled: bool = True

Whether scaling is enabled.

build
scale_factor
class-attribute
instance-attribute
​
Copy
scale_factor: Number = 200

The amount of scale to be performed per pointer scroll.

Increasing this value above the default causes scaling to feel slower, while decreasing it causes scaling to feel faster.

NOTE

Has effect only on pointer device scrolling, not pinch to zoom.

build
trackpad_scroll_causes_scale
class-attribute
instance-attribute
​
Copy
trackpad_scroll_causes_scale: bool = False

Whether scrolling up/down on a trackpad should cause scaling instead of panning.

Events​
bolt
on_interaction_end
class-attribute
instance-attribute
​
Copy
on_interaction_end: (
    EventHandler[ScaleEndEvent[InteractiveViewer]] | None
) = None

Called when the user ends a pan or scale gesture.

bolt
on_interaction_start
class-attribute
instance-attribute
​
Copy
on_interaction_start: (
    EventHandler[ScaleStartEvent[InteractiveViewer]] | None
) = None

Called when the user begins a pan or scale gesture.

bolt
on_interaction_update
class-attribute
instance-attribute
​
Copy
on_interaction_update: (
    EventHandler[ScaleUpdateEvent[InteractiveViewer]] | None
) = None

Called when the user updates a pan or scale gesture.

Methods​
deployed_code
pan
async
​
Copy
pan(dx: Number, dy: Number=0, dz: Number=0)

Translates the current transform matrix.

Parameters:

dx (Number) - Horizontal translation delta in logical pixels.
dy (Number, default: 0) - Vertical translation delta in logical pixels.
dz (Number, default: 0) - Z-axis translation delta applied to the transform matrix.
NOTE

XY translation is clamped to the same interaction boundaries used for gesture-driven panning. dz is applied directly to the matrix and defaults to 0.

deployed_code
reset
async
​
Copy
reset(animation_duration: DurationValue | None = None)

Resets the current transform matrix to identity.

Parameters:

animation_duration (DurationValue | None, default: None) - Optional animation duration for the reset transition. If None, the reset is applied immediately.
NOTES

When animation_duration is provided, Flutter interpolates from the current transform to identity using a matrix tween.

deployed_code
restore_state
async
​
Copy
restore_state()

Restores the transform matrix previously captured by save_state.

If no state has been saved yet, this method has no effect.

deployed_code
save_state
async
​
Copy
save_state()

Saves a snapshot of the current transform matrix.

The saved state can later be restored using restore_state. Calling this method again overwrites the previously saved snapshot.

deployed_code
zoom
async
​
Copy
zoom(factor: Number)

Applies multiplicative zoom to the current transform.

Parameters:

factor (Number) - Scale multiplier relative to the current scale. Values greater than 1 zoom in, values between 0 and 1 zoom out.
NOTE

The resulting scale is clamped to min_scale and max_scale. Additional boundary clamping is applied so the visible viewport remains within boundary_margin limits.

Edit this page