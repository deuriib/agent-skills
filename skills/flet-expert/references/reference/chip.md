# Chip
URL: https://flet.dev/docs/controls/chip

ReferenceControlsChip
Chip

Chips are compact elements that represent an attribute, text, entity, or action.

Example:

ft.Chip(

    label="Explore topics",

    leading=ft.Icon(ft.Icons.EXPLORE_OUTLINED),

)

Basic Chip

Inherits: LayoutControl

Properties
autofocus - Whether this chip will be selected as the initial focus.
bgcolor - Color to be used for the unselected, enabled chip's background.
border_side - Defines the color and weight of this chip's outline.
check_color - The color of this chip's check mark when a check mark is visible.
clip_behavior - The content will be clipped (or not) according to this option.
color - The color that fills this chip in various ControlState.
delete_drawer_animation_style - The animation style for the delete_icon's animations.
delete_icon - A Control to display to the right of this chip's label in case on_delete event is specified.
delete_icon_color - The color of the delete_icon.
delete_icon_size_constraints - The size constraints for the delete_icon control.
delete_icon_tooltip - The text to be used for this chip's delete_icon tooltip.
disabled_color - The color used for this chip's background if it is disabled.
elevation - A non-negative value which defines the size of the shadow below this chip.
elevation_on_click - The elevation to be applied on this chip relative to its parent during the press motion.
enable_animation_style - The animation style for the enable and disable animations.
label - The primary content of this chip.
label_padding - The padding around the label.
label_text_style - The style to be applied to this chip's label.
leading - A Control to display to the left of this chip's label.
leading_drawer_animation_style - The animation style for the leading control's animations.
leading_size_constraints - The size constraints for the leading control.
padding - The padding between the label and the outside shape.
select_animation_style - The animation style for the select and unselect animations.
selected - If on_select event is specified, selected property is used to determine whether this chip is selected or not.
selected_color - The color used for this chip's background when it is selected.
selected_shadow_color - The color used for this chip's background when the elevation is greater than 0 and this chip is selected.
shadow_color - The color used for this chip's background when the elevation is greater than 0 and this chip is not selected.
shape - The shape of the border around this chip.
show_checkmark - If on_select event is specified and chip is selected, show_checkmark is used to determine whether or not to show a checkmark.
visual_density - TBD
Events
on_blur - Called when this chip has lost focus.
on_click - Called when the user clicks on this chip.
on_delete - Called when the user clicks on the delete_icon.
on_focus - Called when this chip has received focus.
on_select - Called when the user clicks on this chip.
Examples​

Live example

Assist chips​

Assist chips are chips with leading icon and on_click event specified.

They represent smart or automated actions that appear dynamically and contextually in a UI.

An alternative to assist chips are buttons, which should appear persistently and consistently.

import flet as ft





def main(page: ft.Page):

    url_launcher = ft.UrlLauncher()

    page.services.append(url_launcher)



    def handle_chip1_click(e: ft.Event[ft.Chip]):

        e.control.label.value = "Saved to favorites"

        e.control.leading = ft.Icon(ft.Icons.FAVORITE_OUTLINED)

        e.control.disabled = True



    async def handle_chip2_click(e: ft.Event[ft.Chip]):

        await url_launcher.launch_url("https://maps.google.com")



    page.add(

        ft.SafeArea(

            content=ft.Row(

                controls=[

                    ft.Chip(

                        label=ft.Text("Save to favourites"),

                        leading=ft.Icon(ft.Icons.FAVORITE_BORDER_OUTLINED),

                        bgcolor=ft.Colors.GREEN_200,

                        disabled_color=ft.Colors.GREEN_100,

                        autofocus=True,

                        on_click=handle_chip1_click,

                    ),

                    ft.Chip(

                        label=ft.Text("9 min walk"),

                        leading=ft.Icon(ft.Icons.MAP_SHARP),

                        bgcolor=ft.Colors.GREEN_200,

                        on_click=handle_chip2_click,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Filter chips​

Filter chips are chips with on_select event specified.

They use tags or descriptive words provided in the label to filter content. They can be a good alternative to switches or checkboxes.

import flet as ft





def main(page: ft.Page):

    def handle_amenity_selection(e: ft.Event[ft.Chip]):

        print("Amenity selected:", e.control.label.value)



    amenities = ["Washer / Dryer", "Ramp access", "Dogs OK", "Cats OK", "Smoke-free"]



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Row(

                        controls=[

                            ft.Icon(ft.Icons.HOTEL_CLASS),

                            ft.Text("Amenities"),

                        ]

                    ),

                    ft.Row(

                        controls=[

                            ft.Chip(

                                label=ft.Text(amenity),

                                bgcolor=ft.Colors.GREEN_200,

                                disabled_color=ft.Colors.GREEN_100,

                                autofocus=True,

                                on_select=handle_amenity_selection,

                            )

                            for amenity in amenities

                        ]

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

Whether this chip will be selected as the initial focus.

If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

Color to be used for the unselected, enabled chip's background.

build
border_side
class-attribute
instance-attribute
​
Copy
border_side: BorderSide | None = None

Defines the color and weight of this chip's outline.

build
check_color
class-attribute
instance-attribute
​
Copy
check_color: ColorValue | None = None

The color of this chip's check mark when a check mark is visible.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.NONE

The content will be clipped (or not) according to this option.

build
color
class-attribute
instance-attribute
​
Copy
color: ControlStateValue[ColorValue] | None = None

The color that fills this chip in various ControlState.

build
delete_drawer_animation_style
class-attribute
instance-attribute
​
Copy
delete_drawer_animation_style: AnimationStyle | None = None

The animation style for the delete_icon's animations.

build
delete_icon
class-attribute
instance-attribute
​
Copy
delete_icon: Control | None = None

A Control to display to the right of this chip's label in case on_delete event is specified.

build
delete_icon_color
class-attribute
instance-attribute
​
Copy
delete_icon_color: ColorValue | None = None

The color of the delete_icon.

build
delete_icon_size_constraints
class-attribute
instance-attribute
​
Copy
delete_icon_size_constraints: BoxConstraints | None = None

The size constraints for the delete_icon control.

If None, it defaults to a minimum size of chip height or label height (whichever is greater) and a padding of 8.0 pixels on all sides.

build
delete_icon_tooltip
class-attribute
instance-attribute
​
Copy
delete_icon_tooltip: str | None = None

The text to be used for this chip's delete_icon tooltip. If not provided or provided with an empty string, the tooltip of the delete icon will not be displayed.

build
disabled_color
class-attribute
instance-attribute
​
Copy
disabled_color: ColorValue | None = None

The color used for this chip's background if it is disabled.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

A non-negative value which defines the size of the shadow below this chip.

Defaults to 0.

Raises:

ValueError - If elevation is negative.
build
elevation_on_click
class-attribute
instance-attribute
​
Copy
elevation_on_click: Number | None = None

The elevation to be applied on this chip relative to its parent during the press motion. This controls the size of the shadow below this chip.

Defaults to 8.0.

Raises:

ValueError - If it is not greater than or equal to 0.0.
build
enable_animation_style
class-attribute
instance-attribute
​
Copy
enable_animation_style: AnimationStyle | None = None

The animation style for the enable and disable animations.

build
label
instance-attribute
​
Copy
label: StrOrControl

The primary content of this chip.

Typically a Text control.

build
label_padding
class-attribute
instance-attribute
​
Copy
label_padding: PaddingValue | None = None

The padding around the label.

By default, this is 4 logical pixels at the beginning and the end of the label, and zero on top and bottom.

build
label_text_style
class-attribute
instance-attribute
​
Copy
label_text_style: TextStyle | None = None

The style to be applied to this chip's label.

build
leading
class-attribute
instance-attribute
​
Copy
leading: Control | None = None

A Control to display to the left of this chip's label.

Typically the leading control is an Icon or a CircleAvatar.

build
leading_drawer_animation_style
class-attribute
instance-attribute
​
Copy
leading_drawer_animation_style: AnimationStyle | None = None

The animation style for the leading control's animations.

build
leading_size_constraints
class-attribute
instance-attribute
​
Copy
leading_size_constraints: BoxConstraints | None = None

The size constraints for the leading control.

If None, it defaults to a minimum size of chip height or label height (whichever is greater) and a padding of 8.0 pixels on all sides.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The padding between the label and the outside shape.

Defaults to 8 logical pixels on all sides.

build
select_animation_style
class-attribute
instance-attribute
​
Copy
select_animation_style: AnimationStyle | None = None

The animation style for the select and unselect animations.

build
selected
class-attribute
instance-attribute
​
Copy
selected: bool = False

If on_select event is specified, selected property is used to determine whether this chip is selected or not.

build
selected_color
class-attribute
instance-attribute
​
Copy
selected_color: ColorValue | None = None

The color used for this chip's background when it is selected.

build
selected_shadow_color
class-attribute
instance-attribute
​
Copy
selected_shadow_color: ColorValue | None = None

The color used for this chip's background when the elevation is greater than 0 and this chip is selected.

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ColorValue | None = None

The color used for this chip's background when the elevation is greater than 0 and this chip is not selected.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The shape of the border around this chip.

Defaults to ChipTheme.shape, or if that is resolves to None, falls back to RoundedRectangleBorder(radius=8).

build
show_checkmark
class-attribute
instance-attribute
​
Copy
show_checkmark: bool = True

If on_select event is specified and chip is selected, show_checkmark is used to determine whether or not to show a checkmark.

build
visual_density
class-attribute
instance-attribute
​
Copy
visual_density: VisualDensity | None = None

TBD

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[Chip] | None = None

Called when this chip has lost focus.

bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[Chip] | None = None

Called when the user clicks on this chip.

Raises:

ValueError - If specified together with on_select.
bolt
on_delete
class-attribute
instance-attribute
​
Copy
on_delete: ControlEventHandler[Chip] | None = None

Called when the user clicks on the delete_icon.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[Chip] | None = None

Called when this chip has received focus.

bolt
on_select
class-attribute
instance-attribute
​
Copy
on_select: ControlEventHandler[Chip] | None = None

Called when the user clicks on this chip.

It internally changes selected property to the opposite value.

Raises:

ValueError - If specified together with on_click.
Edit this page