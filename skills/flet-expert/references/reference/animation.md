# Animation
URL: https://flet.dev/docs/types/animation

ReferenceTypesClassesAnimation
Animation

Explicit animation configuration for animatable control properties.

Properties that accept animation usually also support shorthand values via AnimationValue:

True: enables a default 1000ms LINEAR animation.
int: interpreted as animation duration in milliseconds with a linear curve.
Properties
curve - Easing curve that shapes interpolation over time.
duration - The duration of the animation.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
curve
class-attribute
instance-attribute
​
Copy
curve: AnimationCurve = AnimationCurve.LINEAR

Easing curve that shapes interpolation over time.

build
duration
class-attribute
instance-attribute
​
Copy
duration: DurationValue = field(
    default_factory=lambda: Duration()
)

The duration of the animation.

If provided as an integer, it is considered/assumed to be in milliseconds. For more control and flexibility, use Duration instead.

Methods​
deployed_code
copy
​
Copy
copy(
    duration: DurationValue | None = None,
    curve: AnimationCurve | None = None,
) -> Animation

Returns a copy of this object with the specified properties overridden.

Edit this page