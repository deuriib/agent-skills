# TextSelection
URL: https://flet.dev/docs/types/textselection

ReferenceTypesClassesTextSelection
TextSelection

A range of text that represents a selection.

Properties
affinity - If the text range is collapsed and has more than one visual location (e.g., occurs at a line break), which of the two locations to use when painting the caret.
base_offset - The offset at which the selection originates.
directional - Whether this selection has disambiguated its base and extent.
end - The next index after the characters in this range.
extent_offset - The offset at which the selection terminates.
is_collapsed - Whether this range is empty (but still potentially placed inside the text).
is_normalized - Whether the start of this range precedes the end.
is_valid - Whether this range represents a valid position in the text.
start - The index of the first character in the range.
Methods
get_selected_text - Returns the selected text from the given full text.
Properties​
build
affinity
class-attribute
instance-attribute
​
Copy
affinity: TextAffinity = TextAffinity.DOWNSTREAM

If the text range is collapsed and has more than one visual location (e.g., occurs at a line break), which of the two locations to use when painting the caret.

build
base_offset
instance-attribute
​
Copy
base_offset: int

The offset at which the selection originates.

build
directional
class-attribute
instance-attribute
​
Copy
directional: bool = False

Whether this selection has disambiguated its base and extent.

build
end
property
​
Copy
end: int

The next index after the characters in this range.

NOTE

This property is read-only.

build
extent_offset
instance-attribute
​
Copy
extent_offset: int

The offset at which the selection terminates.

build
is_collapsed
property
​
Copy
is_collapsed: bool

Whether this range is empty (but still potentially placed inside the text).

NOTE

This property is read-only.

build
is_normalized
property
​
Copy
is_normalized: bool

Whether the start of this range precedes the end.

NOTE

This property is read-only.

build
is_valid
property
​
Copy
is_valid: bool

Whether this range represents a valid position in the text.

NOTE

This property is read-only.

build
start
property
​
Copy
start: int

The index of the first character in the range.

NOTE

This property is read-only.

Methods​
deployed_code
get_selected_text
​
Copy
get_selected_text(source_text: str) -> str

Returns the selected text from the given full text.

Parameters:

source_text (str) - The full text to get the selection from.

Raises:

AssertionError - If the selection is not valid, i.e. is_valid is False.
Edit this page