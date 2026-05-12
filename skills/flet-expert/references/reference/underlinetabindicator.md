# UnderlineTabIndicator
URL: https://flet.dev/docs/types/underlinetabindicator

ReferenceTypesClassesUnderlineTabIndicator
UnderlineTabIndicator
Properties
border_radius - The radius of the indicator's corners.
border_side - The color and weight of the horizontal line drawn below the selected tab.
insets - Locates the selected tab's underline relative to the tab's boundary.
Properties​
build
border_radius
class-attribute
instance-attribute
​
Copy
border_radius: BorderRadiusValue | None = None

The radius of the indicator's corners.

If this value is not None, a rounded rectangular tab indicator is drawn, otherwise rectangular tab indicator is drawn.

build
border_side
class-attribute
instance-attribute
​
Copy
border_side: BorderSide = field(
    default_factory=lambda: BorderSide(
        width=2.0, color=Colors.WHITE
    )
)

The color and weight of the horizontal line drawn below the selected tab.

build
insets
class-attribute
instance-attribute
​
Copy
insets: PaddingValue = field(
    default_factory=lambda: Padding.zero()
)

Locates the selected tab's underline relative to the tab's boundary.

The TabBar.indicator_size property can be used to define the tab indicator's bounds in terms of its (centered) tab control with TabBarIndicatorSize.LABEL, or the entire tab with TabBarIndicatorSize.TAB.

Edit this page