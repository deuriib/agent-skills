# Duration
URL: https://flet.dev/docs/types/duration

ReferenceTypesClassesDuration
Duration

A span of time, such as 27 days, 4 hours, 12 minutes, and 3 seconds.

A Duration represents a difference from one point in time to another. The duration may be "negative" if the difference is from a later time to an earlier.

Properties
days - The number of days in the duration.
hours - The number of hours in the duration.
in_days - Returns total duration in days.
in_hours - Returns total duration in hours.
in_microseconds - Returns total duration in microseconds.
in_milliseconds - Returns total duration in milliseconds.
in_minutes - Returns total duration in minutes.
in_seconds - Returns total duration in seconds.
is_negative - Returns True if duration is negative.
microseconds - The number of microseconds in the duration.
milliseconds - The number of milliseconds in the duration.
minutes - The number of minutes in the duration.
seconds - The number of seconds in the duration.
Methods
abs - Returns absolute (non-negative) Duration.
copy - Returns a copy of this Duration instance with the given fields replaced with the new values.
from_unit - Creates a Duration from individual time units.
Properties​
build
days
class-attribute
instance-attribute
​
Copy
days: int = 0

The number of days in the duration.

build
hours
class-attribute
instance-attribute
​
Copy
hours: int = 0

The number of hours in the duration.

build
in_days
property
​
Copy
in_days: int

Returns total duration in days.

build
in_hours
property
​
Copy
in_hours: int

Returns total duration in hours.

build
in_microseconds
property
​
Copy
in_microseconds: int

Returns total duration in microseconds.

build
in_milliseconds
property
​
Copy
in_milliseconds: int

Returns total duration in milliseconds.

build
in_minutes
property
​
Copy
in_minutes: int

Returns total duration in minutes.

build
in_seconds
property
​
Copy
in_seconds: int

Returns total duration in seconds.

build
is_negative
property
​
Copy
is_negative: bool

Returns True if duration is negative.

build
microseconds
class-attribute
instance-attribute
​
Copy
microseconds: int = 0

The number of microseconds in the duration.

build
milliseconds
class-attribute
instance-attribute
​
Copy
milliseconds: int = 0

The number of milliseconds in the duration.

build
minutes
class-attribute
instance-attribute
​
Copy
minutes: int = 0

The number of minutes in the duration.

build
seconds
class-attribute
instance-attribute
​
Copy
seconds: int = 0

The number of seconds in the duration.

Methods​
deployed_code
abs
​
Copy
abs() -> Duration

Returns absolute (non-negative) Duration.

deployed_code
copy
​
Copy
copy(
    microseconds: int | None = None,
    milliseconds: int | None = None,
    seconds: int | None = None,
    minutes: int | None = None,
    hours: int | None = None,
    days: int | None = None,
) -> Duration

Returns a copy of this Duration instance with the given fields replaced with the new values.

deployed_code
from_unit
classmethod
​
Copy
from_unit(
    days: int = 0,
    hours: int = 0,
    minutes: int = 0,
    seconds: int = 0,
    milliseconds: int = 0,
    microseconds: int = 0,
) -> Duration

Creates a Duration from individual time units.

Edit this page