# TimePicker
URL: https://flet.dev/docs/controls/timepicker

ReferenceControlsTimePicker
TimePicker

A Material-style time picker dialog.

Can be opened by calling the Page.show_dialog method.

Depending on the entry_mode, it will show either a Dial or an Input (hour and minute text fields) for picking a time.

Example:

ft.TimePicker(

    open=True,

    value=time(1, 2),

    entry_mode=ft.TimePickerEntryMode.INPUT_ONLY,

)

Time picker

Inherits: DialogControl

Properties
barrier_color - The color of the modal barrier that darkens everything below this picker's dialog.
cancel_text - The text that is displayed on the cancel button.
confirm_text - The text that is displayed on the confirm button.
entry_mode - The initial mode of time entry method for this picker.
error_invalid_text - The error message displayed below the input text field if the input is not a valid hour/minute.
help_text - The text that is displayed at the top of the header.
hour_format - Defines the hour format of this time picker.
hour_label_text - The text that is displayed below the hour input text field.
locale - The locale for this time picker dialog.
minute_label_text - The text that is displayed below the minute input text field.
modal - Whether this picker cannot be dismissed by clicking the area outside of it.
orientation - The orientation of the dialog when displayed.
switch_to_input_icon - The icon displayed in the corner of this picker's dialog when entry_mode is TimePickerEntryMode.DIAL.
switch_to_timer_icon - The icon displayed in the corner of this picker's dialog when entry_mode is TimePickerEntryMode.INPUT.
value - The selected time that this picker should display.
Events
on_change - Called when user clicks confirm button.
on_entry_mode_change - Called when the entry_mode is changed through the time picker dialog.
Examples​

Live example

Basic Example​
from datetime import time



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def handle_change(e: ft.Event[ft.TimePicker]):

        selection.value = f"Selection: {time_picker.value}"

        page.show_dialog(ft.SnackBar(f"TimePicker change: {time_picker.value}"))



    def handle_dismissal(e: ft.Event[ft.DialogControl]):

        page.show_dialog(ft.SnackBar("TimePicker dismissed!"))



    def handle_entry_mode_change(e: ft.TimePickerEntryModeChangeEvent):

        page.show_dialog(ft.SnackBar(f"Entry mode changed: {time_picker.entry_mode}"))



    time_picker = ft.TimePicker(

        value=time(hour=19, minute=30),

        confirm_text="Confirm",

        error_invalid_text="Time out of range",

        help_text="Pick your time slot",

        entry_mode=ft.TimePickerEntryMode.DIAL,

        on_change=handle_change,

        on_dismiss=handle_dismissal,

        on_entry_mode_change=handle_entry_mode_change,

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.Button(

                        key="pick_time_button",

                        content="Pick time",

                        icon=ft.Icons.TIME_TO_LEAVE,

                        on_click=lambda: page.show_dialog(time_picker),

                    ),

                    selection := ft.Text(weight=ft.FontWeight.BOLD),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Hour Formats​
from datetime import time



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def get_system_hour_format():

        """Returns the current system's hour format."""

        return "24h" if page.media.always_use_24_hour_format else "12h"



    def format_time(value: time) -> str:

        """Returns a formatted time string based on TimePicker and system settings."""

        use_24h = time_picker.hour_format == ft.TimePickerHourFormat.H24 or (

            time_picker.hour_format == ft.TimePickerHourFormat.SYSTEM

            and page.media.always_use_24_hour_format

        )

        return value.strftime("%H:%M" if use_24h else "%I:%M %p")



    def handle_change(e: ft.Event[ft.TimePicker]):

        selection.value = f"Selection: {format_time(time_picker.value)}"



    time_picker = ft.TimePicker(

        value=time(hour=19, minute=30),

        help_text="Choose your meeting time",

        on_change=handle_change,

    )



    def open_picker(e: ft.Event[ft.Button]):

        choice = format_dropdown.value

        hour_format_map = {

            "system": ft.TimePickerHourFormat.SYSTEM,

            "12h": ft.TimePickerHourFormat.H12,

            "24h": ft.TimePickerHourFormat.H24,

        }

        time_picker.hour_format = hour_format_map[choice]

        page.show_dialog(time_picker)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.Row(

                        alignment=ft.MainAxisAlignment.CENTER,

                        controls=[

                            format_dropdown := ft.Dropdown(

                                label="Hour format",

                                value="system",

                                width=260,

                                key="dd",

                                options=[

                                    ft.DropdownOption(

                                        key="system",

                                        text=(

                                            f"System default "

                                            f"({get_system_hour_format()})"

                                        ),

                                    ),

                                    ft.DropdownOption(key="12h", text="12-hour clock"),

                                    ft.DropdownOption(key="24h", text="24-hour clock"),

                                ],

                            ),

                            ft.Button(

                                "Open TimePicker",

                                icon=ft.Icons.SCHEDULE,

                                on_click=open_picker,

                            ),

                        ],

                    ),

                    selection := ft.Text(weight=ft.FontWeight.BOLD),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Custom Locale​
from datetime import time



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    page.add(

        ft.SafeArea(

            content=ft.Button(

                key="custom_locale_button",

                content="Pick time (zh_Hans locale)",

                icon=ft.Icons.CALENDAR_MONTH,

                on_click=lambda e: page.show_dialog(

                    ft.TimePicker(

                        value=time(hour=19, minute=30),

                        locale=ft.Locale("zh", "Hans"),

                    )

                ),

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
barrier_color
class-attribute
instance-attribute
​
Copy
barrier_color: ColorValue | None = None

The color of the modal barrier that darkens everything below this picker's dialog.

If None, the DialogTheme.barrier_color is used. If it is also None, then Colors.BLACK_54 is used.

build
cancel_text
class-attribute
instance-attribute
​
Copy
cancel_text: str | None = None

The text that is displayed on the cancel button.

The default value is "Cancel".

build
confirm_text
class-attribute
instance-attribute
​
Copy
confirm_text: str | None = None

The text that is displayed on the confirm button.

The default value is "OK".

build
entry_mode
class-attribute
instance-attribute
​
Copy
entry_mode: TimePickerEntryMode = TimePickerEntryMode.DIAL

The initial mode of time entry method for this picker.

Defaults to TimePickerEntryMode.DIAL.

build
error_invalid_text
class-attribute
instance-attribute
​
Copy
error_invalid_text: str | None = None

The error message displayed below the input text field if the input is not a valid hour/minute.

The default value is "Enter a valid time".

build
help_text
class-attribute
instance-attribute
​
Copy
help_text: str | None = None

The text that is displayed at the top of the header.

This is used to indicate to the user what they are selecting a time for. The default value is "Enter time".

build
hour_format
class-attribute
instance-attribute
​
Copy
hour_format: TimePickerHourFormat = (
    TimePickerHourFormat.SYSTEM
)

Defines the hour format of this time picker.

build
hour_label_text
class-attribute
instance-attribute
​
Copy
hour_label_text: str | None = None

The text that is displayed below the hour input text field.

The default value is "Hour".

build
locale
class-attribute
instance-attribute
​
Copy
locale: Locale | None = None

The locale for this time picker dialog. It is intended for (rare) cases where this dialog should be localized differently from the rest of the page.

It overrides the locale used by the page (see Page.locale_configuration), but does not participate in page-level locale resolution.

If set to None (the default) or an inexistent/unsupported locale, the current_locale of the Page.locale_configuration is used as fallback.

build
minute_label_text
class-attribute
instance-attribute
​
Copy
minute_label_text: str | None = None

The text that is displayed below the minute input text field.

The default value is "Minute".

build
modal
class-attribute
instance-attribute
​
Copy
modal: bool = False

Whether this picker cannot be dismissed by clicking the area outside of it.

build
orientation
class-attribute
instance-attribute
​
Copy
orientation: Orientation | None = None

The orientation of the dialog when displayed.

build
switch_to_input_icon
class-attribute
instance-attribute
​
Copy
switch_to_input_icon: IconData | None = None

The icon displayed in the corner of this picker's dialog when entry_mode is TimePickerEntryMode.DIAL.

Clicking on icon changes the entry_mode to TimePickerEntryMode.INPUT.

If None, defaults to Icons.KEYBOARD_OUTLINED.

build
switch_to_timer_icon
class-attribute
instance-attribute
​
Copy
switch_to_timer_icon: IconData | None = None

The icon displayed in the corner of this picker's dialog when entry_mode is TimePickerEntryMode.INPUT.

Clicking on this icon changes the entry_mode to TimePickerEntryMode.DIAL.

If None, defaults to Icons.ACCESS_TIME.

build
value
class-attribute
instance-attribute
​
Copy
value: time | None = field(
    default_factory=lambda: datetime.now().time()
)

The selected time that this picker should display.

The default value is equal to the current time.

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[TimePicker] | None = None

Called when user clicks confirm button.

value property is updated with selected time. Additionally, the data property of the event handler argument also contains the selected time.

bolt
on_entry_mode_change
class-attribute
instance-attribute
​
Copy
on_entry_mode_change: (
    EventHandler[TimePickerEntryModeChangeEvent] | None
) = None

Called when the entry_mode is changed through the time picker dialog.

Edit this page