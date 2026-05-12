# CupertinoDatePicker
URL: https://flet.dev/docs/controls/cupertinodatepicker

ReferenceControlsCupertinoDatePicker
CupertinoDatePicker

An iOS-styled date picker.

Inherits: LayoutControl

Properties
bgcolor - The background color of this date picker.
date_order - The order in which the columns inside this picker are displayed.
date_picker_mode - The mode of the date picker.
first_date - The earliest allowable date that the user can select.
item_extent - The uniform height of all children.
last_date - The latest allowable date that the user can select.
locale - The locale for this date picker.
maximum_year - Maximum year to which the picker can be scrolled when in CupertinoDatePickerMode.DATE mode.
minimum_year - Minimum year to which the picker can be scrolled when in CupertinoDatePickerMode.DATE mode.
minute_interval - The granularity of the minutes spinner, if it is shown in the current date_picker_mode.
show_day_of_week - Whether to show day of week alongside day.
use_24h_format - Whether to use the 24-hour time format.
value - The initial date and/or time of the picker.
Events
on_change - Called when the selected date and/or time changes.
Examples​

Live example

Basic Example​
from datetime import datetime



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    message = ft.Text("Chosen Time:")



    def handle_date_change(e: ft.Event[ft.CupertinoDatePicker]):

        message.value = f"Chosen Date: {e.control.value.strftime('%Y-%m-%d %H:%M %p')}"



    cupertino_date_picker = ft.CupertinoDatePicker(

        value=datetime.now(),

        date_picker_mode=ft.CupertinoDatePickerMode.DATE_AND_TIME,

        on_change=handle_date_change,

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.CupertinoFilledButton(

                        on_click=lambda _: page.show_dialog(

                            ft.CupertinoBottomSheet(

                                height=216,

                                padding=ft.Padding.only(top=6),

                                content=cupertino_date_picker,

                            )

                        ),

                        content="Open CupertinoDatePicker",

                    ),

                    message,

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of this date picker.

build
date_order
class-attribute
instance-attribute
​
Copy
date_order: CupertinoDatePickerDateOrder | None = None

The order in which the columns inside this picker are displayed.

NOTE

The final order in which the columns are displayed is also influenced by the date_picker_mode. For example, if date_picker_mode is CupertinoDatePickerMode.MONTH_YEAR both CupertinoDatePickerDateOrder.DAY_MONTH_YEAR and CupertinoDatePickerDateOrder.MONTH_DAY_YEAR will result in the month|year order.

build
date_picker_mode
class-attribute
instance-attribute
​
Copy
date_picker_mode: CupertinoDatePickerMode = (
    CupertinoDatePickerMode.DATE_AND_TIME
)

The mode of the date picker.

build
first_date
class-attribute
instance-attribute
​
Copy
first_date: DateTimeValue | None = None

The earliest allowable date that the user can select.

If set to None (the default), there is no lower date limit.
When not None, one can still scroll the picker to dates earlier than first_date, with the exception that the on_change will not be called. Once let go, the picker will scroll back to first_date.
NOTE

In CupertinoDatePickerMode.TIME mode, a time becomes unselectable if the datetime produced by combining that particular time and the date part of value is earlier than last_date. So typically, first_date needs to be set to a datetime that is on the same date as value.

build
item_extent
class-attribute
instance-attribute
​
Copy
item_extent: Number = 32.0

The uniform height of all children.

Raises:

ValueError - If it is not strictly greater than 0.
build
last_date
class-attribute
instance-attribute
​
Copy
last_date: DateTimeValue | None = None

The latest allowable date that the user can select.

If set to None (the default), there is no upper date limit.
When not None, one can still scroll the picker to dates later than last_date, with the exception that the on_change will not be called. Once let go, the picker will scroll back to last_date.
NOTE

In CupertinoDatePickerMode.TIME mode, a time becomes unselectable if the datetime produced by combining that particular time and the date part of value is later than last_date. So typically, last_date needs to be set to a datetime that is on the same date as value.

build
locale
class-attribute
instance-attribute
​
Copy
locale: Locale | None = None

The locale for this date picker. It is intended for rare cases where this control should be localized differently from the rest of the page.

NOTES
The locale must be supported by Flutter's global localization delegates; otherwise the override is ignored and the control uses the page or system locale.
If None (the default), the page or system locale is used.
build
maximum_year
class-attribute
instance-attribute
​
Copy
maximum_year: int | None = None

Maximum year to which the picker can be scrolled when in CupertinoDatePickerMode.DATE mode.

Defaults to None - no limit.

Raises:

ValueError - If it is less than value year.
build
minimum_year
class-attribute
instance-attribute
​
Copy
minimum_year: int = 1

Minimum year to which the picker can be scrolled when in CupertinoDatePickerMode.DATE mode.

Raises:

ValueError - If it is greater than value year.
build
minute_interval
class-attribute
instance-attribute
​
Copy
minute_interval: int = 1

The granularity of the minutes spinner, if it is shown in the current date_picker_mode.

Raises:

ValueError - If it is not strictly greater than 0.
ValueError - If it is not a factor of 60.
build
show_day_of_week
class-attribute
instance-attribute
​
Copy
show_day_of_week: bool = False

Whether to show day of week alongside day.

Raises:

ValueError - If it is set when date_picker_mode is not CupertinoDatePickerMode.DATE.
build
use_24h_format
class-attribute
instance-attribute
​
Copy
use_24h_format: bool = False

Whether to use the 24-hour time format.

If False, the 12-hour time format is used.

build
value
class-attribute
instance-attribute
​
Copy
value: DateTimeValue = field(
    default_factory=lambda: datetime.now()
)

The initial date and/or time of the picker.

Defaults to the present date and time.

Raises:

ValueError - If it is not greater than or equal to first_date, when first_date is set.
ValueError - If it is not less than or equal to last_date, when last_date is set.
ValueError - If its year is not greater than or equal to minimum_year, when date_picker_mode is CupertinoDatePickerMode.DATE or CupertinoDatePickerMode.MONTH_YEAR.
ValueError - If its year is not less than or equal to maximum_year, when maximum_year is set.
ValueError - If its minute is not a multiple of minute_interval.
Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: (
    ControlEventHandler[CupertinoDatePicker] | None
) = None

Called when the selected date and/or time changes.

Will not be called if the new selected value is not valid, or is not in the range of first_date and last_date.

Edit this page