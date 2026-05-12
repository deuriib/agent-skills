# AnimationStyle
URL: https://flet.dev/docs/types/animationstyle

ReferenceTypesClassesAnimationStyle
AnimationStyle

Used to override the default parameters of an animation.

NOTE

If duration and reverse_duration are set to Duration, the corresponding animation will be disabled. See no_animation method for a convenient way to create such an instance.

Properties
curve - The curve to use for the animation.
duration - The duration of the animation.
reverse_curve - The curve to use for the reverse animation.
reverse_duration - The duration of the reverse animation.
Methods
copy - Returns a copy of this object with the specified properties overridden.
no_animation - Creates an instance of AnimationStyle with no animation.
Properties​
build
curve
class-attribute
instance-attribute
​
Copy
curve: AnimationCurve | None = None

The curve to use for the animation.

build
duration
class-attribute
instance-attribute
​
Copy
duration: DurationValue | None = None

The duration of the animation.

build
reverse_curve
class-attribute
instance-attribute
​
Copy
reverse_curve: AnimationCurve | None = None

The curve to use for the reverse animation.

build
reverse_duration
class-attribute
instance-attribute
​
Copy
reverse_duration: DurationValue | None = None

The duration of the reverse animation.

Methods​
deployed_code
copy
​
Copy
copy(
    duration: DurationValue | None = None,
    reverse_duration: DurationValue | None = None,
    curve: AnimationCurve | None = None,
    reverse_curve: AnimationCurve | None = None,
) -> AnimationStyle

Returns a copy of this object with the specified properties overridden.

deployed_code
no_animation
staticmethod
​
Copy
no_animation() -> AnimationStyle

Creates an instance of AnimationStyle with no animation.

Edit this page