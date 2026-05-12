# DatePickerTheme
URL: https://flet.dev/docs/types/datepickertheme

ReferenceTypesClassesThemeDatePickerTheme
DatePickerTheme

Customizes the appearance of DatePicker controls across the app.

Properties
bgcolor - Overrides the default background color of the surface in all descendant DatePicker controls.
cancel_button_style - Overrides the default style of the cancel button of a DatePicker.
confirm_button_style - Overrides the default style of the confirm (OK) button of a DatePicker.
day_bgcolor - Overrides the default color used to paint the background of the day labels in the grid of the DatePicker.
day_foreground_color - Overrides the default color used to paint the day labels in the grid of the DatePicker.
day_overlay_color - Overrides the default highlight color that's typically used to indicate that a day in the grid is focused, hovered, or pressed.
day_shape - Overrides the default shape used to paint the shape decoration of the day labels in the grid of the DatePicker.
day_text_style - Overrides the default text style used for each individual day label in the grid of the DatePicker.
divider_color - Overrides the default color used to paint the divider in all descendant DatePicker controls.
elevation - Overrides the default value of DatePicker elevation.
header_bgcolor - Overrides the header's default background fill color.
header_foreground_color - Overrides the header's default color used for text labels and icons.
header_headline_text_style - Overrides the header's default headline text style.
header_help_text_style - Overrides the header's default help text style.
range_picker_bgcolor - Overrides the default background color for DateRangePicker.
range_picker_elevation - Overrides the default elevation of the full screen DateRangePicker (TBD).
range_picker_header_bgcolor - Overrides the default background fill color for DateRangePicker.
range_picker_header_foreground_color - Overrides the default color used for text labels and icons in the header of a full screen DateRangePicker.
range_picker_header_headline_text_style - Overrides the default text style used for the headline text in the header of a full screen DateRangePicker.
range_picker_header_help_text_style - Overrides the default text style used for the help text of the header of a full screen DateRangePicker (TBD).
range_picker_shape - Overrides the default overall shape of a full screen DateRangePicker (TBD).
range_selection_bgcolor - Overrides the default background color used to paint days selected between the start and end dates in a DateRangePicker.
range_selection_overlay_color - Overrides the default highlight color that's typically used to indicate that a date in the selected range of a DateRangePicker is focused, hovered, or pressed.
shadow_color - Overrides the default shadow color in all descendant DatePicker controls.
shape - Overrides the default value of DatePicker shape.
today_bgcolor - Overrides the default color used to paint the background of the [DatePicker.current_date].[flet.DatePicker.current_date] label in the grid of the DatePicker.
today_border_side - Overrides the border used to paint the DatePicker.current_date label in the grid of the DatePicker.
today_foreground_color - Overrides the default color used to paint the DatePicker.current_date label in the grid of the dialog's CalendarDatePicker and the corresponding year in the dialog's YearPicker.
weekday_text_style - Overrides the default text style used for the row of weekday labels at the top of the DatePicker grid.
year_bgcolor - Overrides the default color used to paint the background of the year labels in the year selector of the of the DatePicker.
year_foreground_color - Overrides the default color used to paint the year labels in the year selector of the date picker.
year_overlay_color - Overrides the default highlight color that's typically used to indicate that a year in the year selector is focused, hovered, or pressed.
year_text_style - Overrides the default text style used to paint each of the year entries in the year selector of the DatePicker.
Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

Overrides the default background color of the surface in all descendant DatePicker controls.

build
cancel_button_style
class-attribute
instance-attribute
​
Copy
cancel_button_style: ButtonStyle | None = None

Overrides the default style of the cancel button of a DatePicker.

build
confirm_button_style
class-attribute
instance-attribute
​
Copy
confirm_button_style: ButtonStyle | None = None

Overrides the default style of the confirm (OK) button of a DatePicker.

build
day_bgcolor
class-attribute
instance-attribute
​
Copy
day_bgcolor: ControlStateValue[ColorValue] | None = None

Overrides the default color used to paint the background of the day labels in the grid of the DatePicker.

build
day_foreground_color
class-attribute
instance-attribute
​
Copy
day_foreground_color: (
    ControlStateValue[ColorValue] | None
) = None

Overrides the default color used to paint the day labels in the grid of the DatePicker.

This will be used instead of the color provided in DatePickerTheme.day_text_style.

build
day_overlay_color
class-attribute
instance-attribute
​
Copy
day_overlay_color: ControlStateValue[ColorValue] | None = (
    None
)

Overrides the default highlight color that's typically used to indicate that a day in the grid is focused, hovered, or pressed.

build
day_shape
class-attribute
instance-attribute
​
Copy
day_shape: ControlStateValue[OutlinedBorder] | None = None

Overrides the default shape used to paint the shape decoration of the day labels in the grid of the DatePicker.

If the selected day is the current day, the provided shape with the value of DatePickerTheme.today_bgcolor is used to paint the shape decoration of the day label and the value of DatePickerTheme.today_border_side and DatePickerTheme.today_foreground_color is used to paint the border.

If the selected day is not the current day, the provided shape with the value of DatePickerTheme.day_bgcolor is used to paint the shape decoration of the day label.

build
day_text_style
class-attribute
instance-attribute
​
Copy
day_text_style: TextStyle | None = None

Overrides the default text style used for each individual day label in the grid of the DatePicker.

The color in DatePickerTheme.day_text_style is not used, DatePickerTheme.day_foreground_color is used instead.

build
divider_color
class-attribute
instance-attribute
​
Copy
divider_color: ColorValue | None = None

Overrides the default color used to paint the divider in all descendant DatePicker controls.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

Overrides the default value of DatePicker elevation.

build
header_bgcolor
class-attribute
instance-attribute
​
Copy
header_bgcolor: ColorValue | None = None

Overrides the header's default background fill color.

The DatePicker's header displays the currently selected date.

build
header_foreground_color
class-attribute
instance-attribute
​
Copy
header_foreground_color: ColorValue | None = None

Overrides the header's default color used for text labels and icons.

The dialog's header displays the currently selected date.

This is used instead of the color property of DatePickerTheme.header_headline_text_style and DatePickerTheme.header_help_text_style.

build
header_headline_text_style
class-attribute
instance-attribute
​
Copy
header_headline_text_style: TextStyle | None = None

Overrides the header's default headline text style.

The dialog's header displays the currently selected date.

The color of the DatePickerTheme.header_headline_text_style is not used, DatePickerTheme.header_foreground_color is used instead.

build
header_help_text_style
class-attribute
instance-attribute
​
Copy
header_help_text_style: TextStyle | None = None

Overrides the header's default help text style.

The help text (also referred to as "supporting text" in the Material spec) is usually a prompt to the user at the top of the header (i.e. 'Select date').

The color of the header_help_style is not used, DatePickerTheme.header_foreground_color is used instead.

build
range_picker_bgcolor
class-attribute
instance-attribute
​
Copy
range_picker_bgcolor: ColorValue | None = None

Overrides the default background color for DateRangePicker.

build
range_picker_elevation
class-attribute
instance-attribute
​
Copy
range_picker_elevation: Number | None = None

Overrides the default elevation of the full screen DateRangePicker (TBD).

build
range_picker_header_bgcolor
class-attribute
instance-attribute
​
Copy
range_picker_header_bgcolor: ColorValue | None = None

Overrides the default background fill color for DateRangePicker.

The dialog's header displays the currently selected date range.

build
range_picker_header_foreground_color
class-attribute
instance-attribute
​
Copy
range_picker_header_foreground_color: ColorValue | None = (
    None
)

Overrides the default color used for text labels and icons in the header of a full screen DateRangePicker.

The dialog's header displays the currently selected date range.

This is used instead of any colors provided by range_picker_header_headline_text_style or range_picker_header_help_text_style.

build
range_picker_header_headline_text_style
class-attribute
instance-attribute
​
Copy
range_picker_header_headline_text_style: (
    TextStyle | None
) = None

Overrides the default text style used for the headline text in the header of a full screen DateRangePicker.

The dialog's header displays the currently selected date range.

The color of range_picker_header_headline_text_style is not used, range_picker_header_foreground_color is used instead.

build
range_picker_header_help_text_style
class-attribute
instance-attribute
​
Copy
range_picker_header_help_text_style: TextStyle | None = None

Overrides the default text style used for the help text of the header of a full screen DateRangePicker (TBD).

The help text (also referred to as "supporting text" in the Material spec) is usually a prompt to the user at the top of the header (i.e. 'Select date').

The color of the range_picker_header_help_text_style is not used, range_picker_header_foreground_color is used instead.

build
range_picker_shape
class-attribute
instance-attribute
​
Copy
range_picker_shape: OutlinedBorder | None = None

Overrides the default overall shape of a full screen DateRangePicker (TBD).

If elevation is greater than zero then a shadow is shown and the shadow's shape mirrors the shape of the dialog.

build
range_selection_bgcolor
class-attribute
instance-attribute
​
Copy
range_selection_bgcolor: ColorValue | None = None

Overrides the default background color used to paint days selected between the start and end dates in a DateRangePicker.

build
range_selection_overlay_color
class-attribute
instance-attribute
​
Copy
range_selection_overlay_color: (
    ControlStateValue[ColorValue] | None
) = None

Overrides the default highlight color that's typically used to indicate that a date in the selected range of a DateRangePicker is focused, hovered, or pressed.

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ColorValue | None = None

Overrides the default shadow color in all descendant DatePicker controls.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

Overrides the default value of DatePicker shape.

If elevation is greater than zero then a shadow is shown and the shadow's shape mirrors the shape of the dialog.

build
today_bgcolor
class-attribute
instance-attribute
​
Copy
today_bgcolor: ControlStateValue[ColorValue] | None = None

Overrides the default color used to paint the background of the [DatePicker.current_date].[flet.DatePicker.current_date] label in the grid of the DatePicker.

build
today_border_side
class-attribute
instance-attribute
​
Copy
today_border_side: BorderSide | None = None

Overrides the border used to paint the DatePicker.current_date label in the grid of the DatePicker.

The border side's [BorderSide.color] is not used, DatePickerTheme.today_foreground_color is used instead.

build
today_foreground_color
class-attribute
instance-attribute
​
Copy
today_foreground_color: (
    ControlStateValue[ColorValue] | None
) = None

Overrides the default color used to paint the DatePicker.current_date label in the grid of the dialog's CalendarDatePicker and the corresponding year in the dialog's YearPicker.

This will be used instead of the color provided in DatePickerTheme.day_text_style.

build
weekday_text_style
class-attribute
instance-attribute
​
Copy
weekday_text_style: TextStyle | None = None

Overrides the default text style used for the row of weekday labels at the top of the DatePicker grid.

build
year_bgcolor
class-attribute
instance-attribute
​
Copy
year_bgcolor: ControlStateValue[ColorValue] | None = None

Overrides the default color used to paint the background of the year labels in the year selector of the of the DatePicker.

build
year_foreground_color
class-attribute
instance-attribute
​
Copy
year_foreground_color: (
    ControlStateValue[ColorValue] | None
) = None

Overrides the default color used to paint the year labels in the year selector of the date picker.

This will be used instead of the color provided in DatePickerTheme.year_text_style.

build
year_overlay_color
class-attribute
instance-attribute
​
Copy
year_overlay_color: ControlStateValue[ColorValue] | None = (
    None
)

Overrides the default highlight color that's typically used to indicate that a year in the year selector is focused, hovered, or pressed.

build
year_text_style
class-attribute
instance-attribute
​
Copy
year_text_style: TextStyle | None = None

Overrides the default text style used to paint each of the year entries in the year selector of the DatePicker.

The color of the DatePickerTheme.year_text_style is not used, DatePickerTheme.year_foreground_color is used instead.

Edit this page