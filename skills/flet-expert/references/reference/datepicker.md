# DatePicker
URL: https://flet.dev/docs/controls/datepicker

ReferenceControlsDatePicker
DatePicker

A Material-style date picker dialog.

It can be opened by calling Page.show_dialog method.

Depending on the entry_mode, it will show either a Calendar or an Input (TextField) for picking a date.

picker = ft.DatePicker()



ft.Button(

    "Pick date",

    icon=ft.Icons.CALENDAR_MONTH,

    on_click=lambda _: page.show_dialog(picker),

)

Date picker

Inherits: DialogControl

Properties
barrier_color - The color of the modal barrier that darkens everything below this picker's dialog.
cancel_text - The text that is displayed on the cancel button.
confirm_text - The text that is displayed on the confirm button.
current_date - The date representing today.
date_picker_mode - Initial display mode of this picker.
entry_mode - The initial mode of date entry method for the date picker dialog.
error_format_text - The error message displayed below the text field if the entered date is not in the correct format.
error_invalid_text - The error message displayed below the text field if the date is earlier than first_date or later than last_date.
field_hint_text - The hint text displayed in the text field.
field_label_text - The label text displayed in the TextField.
first_date - The earliest allowable date that the user can select.
help_text - The text that is displayed at the top of the header.
inset_padding - The amount of padding added to view_insets of the Page.media on the outside of this picker's dialog.
keyboard_type - The type of keyboard to use for editing the text.
last_date - The latest allowable date that the user can select.
locale - The locale for this date picker dialog.
modal - Whether this date picker cannot be dismissed by clicking the area outside of it.
switch_to_calendar_icon - The icon displayed in the corner of this picker's dialog when entry_mode is DatePickerEntryMode.INPUT.
switch_to_input_icon - The icon displayed in the corner of this picker's dialog when entry_mode is DatePickerEntryMode.CALENDAR.
value - The selected date that the picker should display.
Events
on_change - Called when user clicks confirm button.
on_entry_mode_change - Called when the entry_mode is changed from the user interface.
Examples​

Live example

Basic Example​
import datetime



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    messages = ft.Column(tight=True)



    def handle_change(e: ft.Event[ft.DatePicker]):

        messages.controls.append(

            ft.Text(f"Date changed: {e.control.value.strftime('%m/%d/%Y')}")

        )



    def handle_dismissal(_: ft.Event[ft.DialogControl]):

        messages.controls.append(ft.Text("DatePicker dismissed"))



    today = datetime.datetime(year=2025, month=4, day=15)



    picker = ft.DatePicker(

        first_date=datetime.datetime(year=today.year - 1, month=1, day=1),

        last_date=datetime.datetime(year=today.year + 1, month=today.month, day=20),

        current_date=today,

        on_change=handle_change,

        on_dismiss=handle_dismissal,

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.Button(

                        icon=ft.Icons.CALENDAR_MONTH,

                        on_click=lambda _: page.show_dialog(picker),

                        content="Pick date",

                    ),

                    messages,

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Custom locale​
import datetime



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    current_date = datetime.datetime(year=2025, month=4, day=15)



    page.add(

        ft.SafeArea(

            content=ft.Button(

                icon=ft.Icons.CALENDAR_MONTH,

                on_click=lambda _: page.show_dialog(

                    ft.DatePicker(

                        locale=ft.Locale("zh", "Hans"),

                        first_date=datetime.datetime(year=2024, month=1, day=1),

                        last_date=datetime.datetime(year=2026, month=12, day=31),

                        current_date=current_date,

                    )

                ),

                content="Pick date (zh_Hans locale)",

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

Defaults to "Cancel".

build
confirm_text
class-attribute
instance-attribute
​
Copy
confirm_text: str | None = None

The text that is displayed on the confirm button.

Defaults to "OK".

build
current_date
class-attribute
instance-attribute
​
Copy
current_date: DateTimeValue = field(
    default_factory=lambda: datetime.now()
)

The date representing today. It will be highlighted in the day grid.

build
date_picker_mode
class-attribute
instance-attribute
​
Copy
date_picker_mode: DatePickerMode = DatePickerMode.DAY

Initial display mode of this picker.

build
entry_mode
class-attribute
instance-attribute
​
Copy
entry_mode: DatePickerEntryMode = (
    DatePickerEntryMode.CALENDAR
)

The initial mode of date entry method for the date picker dialog.

build
error_format_text
class-attribute
instance-attribute
​
Copy
error_format_text: str | None = None

The error message displayed below the text field if the entered date is not in the correct format.

Defaults to "Invalid format".

build
error_invalid_text
class-attribute
instance-attribute
​
Copy
error_invalid_text: str | None = None

The error message displayed below the text field if the date is earlier than first_date or later than last_date.

Defaults to "Out of range".

build
field_hint_text
class-attribute
instance-attribute
​
Copy
field_hint_text: str | None = None

The hint text displayed in the text field.

The default value is the date format string that depends on your locale. For example, 'mm/dd/yyyy' for en_US.

build
field_label_text
class-attribute
instance-attribute
​
Copy
field_label_text: str | None = None

The label text displayed in the TextField.

If None, defaults to the words representing the date format string. For example, 'Month, Day, Year' for en_US.

Defaults to "Enter Date".

build
first_date
class-attribute
instance-attribute
​
Copy
first_date: DateTimeValue = field(
    default_factory=lambda: datetime(
        year=1900, month=1, day=1
    )
)

The earliest allowable date that the user can select.

Defaults to January 1, 1900.

build
help_text
class-attribute
instance-attribute
​
Copy
help_text: str | None = None

The text that is displayed at the top of the header.

This is used to indicate to the user what they are selecting a date for.

Defaults to "Select date".

build
inset_padding
class-attribute
instance-attribute
​
Copy
inset_padding: PaddingValue = field(
    default_factory=lambda: Padding.symmetric(
        horizontal=16.0, vertical=24.0
    )
)

The amount of padding added to view_insets of the Page.media on the outside of this picker's dialog.

This defines the minimum space between the screen's edges and the dialog.

build
keyboard_type
class-attribute
instance-attribute
​
Copy
keyboard_type: KeyboardType = KeyboardType.DATETIME

The type of keyboard to use for editing the text.

build
last_date
class-attribute
instance-attribute
​
Copy
last_date: DateTimeValue = field(
    default_factory=lambda: datetime(
        year=2050, month=1, day=1
    )
)

The latest allowable date that the user can select.

Defaults to January 1, 2050.

build
locale
class-attribute
instance-attribute
​
Copy
locale: Locale | None = None

The locale for this date picker dialog. It is intended for (rare) cases where this dialog should be localized differently from the rest of the page.

It overrides the locale used by the page (see Page.locale_configuration), but does not participate in page-level locale resolution.

If set to None (the default) or an inexistent/unsupported locale, the current_locale of the Page.locale_configuration is used as fallback.

build
modal
class-attribute
instance-attribute
​
Copy
modal: bool = False

Whether this date picker cannot be dismissed by clicking the area outside of it.

build
switch_to_calendar_icon
class-attribute
instance-attribute
​
Copy
switch_to_calendar_icon: IconData | None = None

The icon displayed in the corner of this picker's dialog when entry_mode is DatePickerEntryMode.INPUT.

Clicking on this icon changes the entry_mode to DatePickerEntryMode.CALENDAR.

If None, defaults to Icons.CALENDAR_TODAY.

build
switch_to_input_icon
class-attribute
instance-attribute
​
Copy
switch_to_input_icon: IconData | None = None

The icon displayed in the corner of this picker's dialog when entry_mode is DatePickerEntryMode.CALENDAR.

Clicking on icon changes the entry_mode to DatePickerEntryMode.INPUT.

If None, defaults to Icons.EDIT_OUTLINED.

build
value
class-attribute
instance-attribute
​
Copy
value: DateTimeValue | None = None

The selected date that the picker should display.

Defaults to current_date.

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[DatePicker] | None = None

Called when user clicks confirm button. value is updated with selected date.

The data property of the event handler argument contains the selected date.

bolt
on_entry_mode_change
class-attribute
instance-attribute
​
Copy
on_entry_mode_change: (
    EventHandler[DatePickerEntryModeChangeEvent] | None
) = None

Called when the entry_mode is changed from the user interface.

Edit this page