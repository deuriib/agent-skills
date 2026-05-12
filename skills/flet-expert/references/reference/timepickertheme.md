# TimePickerTheme
URL: https://flet.dev/docs/types/timepickertheme

ReferenceTypesClassesThemeTimePickerTheme
TimePickerTheme

Customizes the appearance of TimePicker controls across the app.

Properties
bgcolor - The background color of a TimePicker.
cancel_button_style - The style of the cancel button of a TimePicker.
confirm_button_style - The style of the confirm (OK) button of a TimePicker.
day_period_border_side - The color and weight of the day period's outline.
day_period_button_style - The style of the AM/PM toggle control of a TimePicker.
day_period_color - The background color of the AM/PM toggle.
day_period_shape - The shape of the day period that the TimePicker uses.
day_period_text_color - The color of the day period text that represents AM/PM.
day_period_text_style - Used to configure the TextStyle for the AM/PM toggle control.
dial_bgcolor - The background color of the time picker dial when the entry mode is TimePickerEntryMode.DIAL or TimePickerEntryMode.DIAL_ONLY.
dial_hand_color - The color of the time picker dial's hand when the entry mode is TimePickerEntryMode.DIAL or TimePickerEntryMode.DIAL_ONLY.
dial_text_color - The color of the dial text that represents specific hours and minutes.
dial_text_style - The TextStyle for the numbers on the time selection dial.
elevation - The Material elevation for the time picker dialog.
entry_mode_icon_color - The color of the entry mode IconButton.
help_text_style - Used to configure the TextStyle for the helper text in the header.
hour_minute_color - The background color of the hour and minute header segments.
hour_minute_shape - The shape of the hour and minute controls that the TimePicker uses.
hour_minute_text_color - The color of the header text that represents hours and minutes.
hour_minute_text_style - Used to configure the TextStyle for the hour/minute controls.
padding - The padding around the time picker dialog when the entry mode is TimePickerEntryMode.DIAL or TimePickerEntryMode.DIAL_ONLY.
shape - The shape of the Dialog that the time picker is presented in.
time_selector_separator_color - The color of the time selector separator between the hour and minute controls.
time_selector_separator_text_style - Used to configure the text style for the time selector separator between the hour and minute controls.
Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of a TimePicker.

If this is null, the time picker defaults to the overall theme's ColorScheme.surface_container_high.

build
cancel_button_style
class-attribute
instance-attribute
​
Copy
cancel_button_style: ButtonStyle | None = None

The style of the cancel button of a TimePicker.

build
confirm_button_style
class-attribute
instance-attribute
​
Copy
confirm_button_style: ButtonStyle | None = None

The style of the confirm (OK) button of a TimePicker.

build
day_period_border_side
class-attribute
instance-attribute
​
Copy
day_period_border_side: BorderSide | None = None

The color and weight of the day period's outline.

build
day_period_button_style
class-attribute
instance-attribute
​
Copy
day_period_button_style: ButtonStyle | None = None

The style of the AM/PM toggle control of a TimePicker.

build
day_period_color
class-attribute
instance-attribute
​
Copy
day_period_color: ColorValue | None = None

The background color of the AM/PM toggle.

build
day_period_shape
class-attribute
instance-attribute
​
Copy
day_period_shape: OutlinedBorder | None = None

The shape of the day period that the TimePicker uses.

build
day_period_text_color
class-attribute
instance-attribute
​
Copy
day_period_text_color: ColorValue | None = None

The color of the day period text that represents AM/PM.

build
day_period_text_style
class-attribute
instance-attribute
​
Copy
day_period_text_style: TextStyle | None = None

Used to configure the TextStyle for the AM/PM toggle control.

If this is null, the time picker defaults to the overall theme's TextTheme.title_medium.

build
dial_bgcolor
class-attribute
instance-attribute
​
Copy
dial_bgcolor: ColorValue | None = None

The background color of the time picker dial when the entry mode is TimePickerEntryMode.DIAL or TimePickerEntryMode.DIAL_ONLY.

build
dial_hand_color
class-attribute
instance-attribute
​
Copy
dial_hand_color: ColorValue | None = None

The color of the time picker dial's hand when the entry mode is TimePickerEntryMode.DIAL or TimePickerEntryMode.DIAL_ONLY.

build
dial_text_color
class-attribute
instance-attribute
​
Copy
dial_text_color: ColorValue | None = None

The color of the dial text that represents specific hours and minutes.

build
dial_text_style
class-attribute
instance-attribute
​
Copy
dial_text_style: TextStyle | None = None

The TextStyle for the numbers on the time selection dial.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The Material elevation for the time picker dialog.

build
entry_mode_icon_color
class-attribute
instance-attribute
​
Copy
entry_mode_icon_color: ColorValue | None = None

The color of the entry mode IconButton.

build
help_text_style
class-attribute
instance-attribute
​
Copy
help_text_style: TextStyle | None = None

Used to configure the TextStyle for the helper text in the header.

build
hour_minute_color
class-attribute
instance-attribute
​
Copy
hour_minute_color: ColorValue | None = None

The background color of the hour and minute header segments.

build
hour_minute_shape
class-attribute
instance-attribute
​
Copy
hour_minute_shape: OutlinedBorder | None = None

The shape of the hour and minute controls that the TimePicker uses.

build
hour_minute_text_color
class-attribute
instance-attribute
​
Copy
hour_minute_text_color: ColorValue | None = None

The color of the header text that represents hours and minutes.

build
hour_minute_text_style
class-attribute
instance-attribute
​
Copy
hour_minute_text_style: TextStyle | None = None

Used to configure the TextStyle for the hour/minute controls.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The padding around the time picker dialog when the entry mode is TimePickerEntryMode.DIAL or TimePickerEntryMode.DIAL_ONLY.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The shape of the Dialog that the time picker is presented in.

build
time_selector_separator_color
class-attribute
instance-attribute
​
Copy
time_selector_separator_color: (
    ControlStateValue[ColorValue] | None
) = None

The color of the time selector separator between the hour and minute controls.

build
time_selector_separator_text_style
class-attribute
instance-attribute
​
Copy
time_selector_separator_text_style: (
    ControlStateValue[TextStyle] | None
) = None

Used to configure the text style for the time selector separator between the hour and minute controls.

Edit this page