# DataRow2
URL: https://flet.dev/docs/controls/datatable2/datarow2

ReferenceControlsDataTable2DataRow2
DataRow2

Extends DataRow, adding row-level tap events.

There are also on_secondary_tap and on_secondary_tap_down, which are not available in DataCells and can be useful in desktop settings to handle right-click actions.

Inherits: DataRow

Properties
decoration - Decoration to be applied to this row.
specific_row_height - Specific row height.
Events
on_double_tap - Fires when the row is double-tapped.
on_secondary_tap - Fires when the row is right-clicked (secondary tap).
on_secondary_tap_down - Fires when the row is right-clicked (secondary tap down).
on_tap - Fires when the row is tapped.
Properties​
build
decoration
class-attribute
instance-attribute
​
Copy
decoration: BoxDecoration | None = None

Decoration to be applied to this row.

NOTE

If provided, DataTable.divider_thickness has no effect.

build
specific_row_height
class-attribute
instance-attribute
​
Copy
specific_row_height: Number | None = None

Specific row height.

Falls back to DataTable2.data_row_height if not set.

Events​
bolt
on_double_tap
class-attribute
instance-attribute
​
Copy
on_double_tap: ControlEventHandler[DataRow2] | None = (
    None
)

Fires when the row is double-tapped.

NOTE

Won't be called if tapped cell has any tap event handlers (on_tap, on_double_tap, on_long_press, on_tap_cancel, on_tap_down) set.

bolt
on_secondary_tap
class-attribute
instance-attribute
​
Copy
on_secondary_tap: (
    ControlEventHandler[DataRow2] | None
) = None

Fires when the row is right-clicked (secondary tap).

NOTE

Won't be called if tapped cell has any tap event handlers (on_tap, on_double_tap, on_long_press, on_tap_cancel, on_tap_down) set.

bolt
on_secondary_tap_down
class-attribute
instance-attribute
​
Copy
on_secondary_tap_down: (
    ControlEventHandler[DataRow2] | None
) = None

Fires when the row is right-clicked (secondary tap down).

NOTE

Won't be called if tapped cell has any tap event handlers (on_tap, on_double_tap, on_long_press, on_tap_cancel, on_tap_down) set.

bolt
on_tap
class-attribute
instance-attribute
​
Copy
on_tap: EventHandler[TapEvent[DataRow2]] | None = None

Fires when the row is tapped.

NOTE

Won't be called if tapped cell has any tap event handlers (on_tap, on_double_tap, on_long_press, on_tap_cancel, on_tap_down) set.

Edit this page