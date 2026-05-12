# DataColumn2
URL: https://flet.dev/docs/controls/datatable2/datacolumn2

ReferenceControlsDataTable2DataColumn2
DataColumn2

Extends DataColumn, adding the ability to set relative column size and fixed column width.

Meant to be used as an item of DataTable2.columns.

Inherits: DataColumn

Properties
fixed_width - Defines absolute width of the column in pixels (as opposed to relative size used by default).
size - Column sizes are determined based on available width by distributing it to individual columns accounting for their relative sizes.
Properties​
build
fixed_width
class-attribute
instance-attribute
​
Copy
fixed_width: Number | None = None

Defines absolute width of the column in pixels (as opposed to relative size used by default).

build
size
class-attribute
instance-attribute
​
Copy
size: DataColumnSize | None = DataColumnSize.S

Column sizes are determined based on available width by distributing it to individual columns accounting for their relative sizes.

Edit this page