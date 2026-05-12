# InputFilter
URL: https://flet.dev/docs/types/inputfilter

ReferenceTypesClassesInputFilter
InputFilter

An input filter that uses a regular expression to allow or deny/block certain patterns in the input.

Properties
allow - A boolean value indicating whether to allow or deny/block the matched patterns.
case_sensitive - Whether this regular expression is case sensitive.
dot_all - Whether "." in this regular expression matches line terminators.
multiline - Whether this regular expression matches multiple lines.
regex_string - A regular expression pattern for the filter.
replacement_string - A string used to replace banned/denied patterns.
unicode - Whether this regular expression uses Unicode mode.
Properties​
build
allow
class-attribute
instance-attribute
​
Copy
allow: bool = True

A boolean value indicating whether to allow or deny/block the matched patterns.

build
case_sensitive
class-attribute
instance-attribute
​
Copy
case_sensitive: bool = True

Whether this regular expression is case sensitive.

If the regular expression is not case sensitive, it will match an input letter with a pattern letter even if the two letters are different case versions of the same letter.

build
dot_all
class-attribute
instance-attribute
​
Copy
dot_all: bool = False

Whether "." in this regular expression matches line terminators.

When false, the "." character matches a single character, unless that character terminates a line. When true, then the "." character will match any single character including line terminators.

This feature is distinct from multiline. They affect the behavior of different pattern characters, so they can be used together or separately.

build
multiline
class-attribute
instance-attribute
​
Copy
multiline: bool = False

Whether this regular expression matches multiple lines.

If the regexp does match multiple lines, the "^" and "$" characters match the beginning and end of lines. If not, the characters match the beginning and end of the input.

build
regex_string
instance-attribute
​
Copy
regex_string: str

A regular expression pattern for the filter.

It is recommended to use raw strings (prefix your string with r) for the pattern, ex: r"pattern".

build
replacement_string
class-attribute
instance-attribute
​
Copy
replacement_string: str = ''

A string used to replace banned/denied patterns.

Defaults to an empty string.

build
unicode
class-attribute
instance-attribute
​
Copy
unicode: bool = False

Whether this regular expression uses Unicode mode.

Predefined filters​
NumbersOnlyInputFilter​

Allows only numbers.

Inherits: InputFilter

TextOnlyInputFilter​

Allows only text.

Inherits: InputFilter

Usage example​
ft.CupertinoTextField(

    placeholder_text="Only numbers are allowed",

    input_filter=ft.InputFilter(allow=True, regex_string=r"^[0-9]*$", replacement_string="")

)

ft.TextField(

    label="Only letters are allowed",

    input_filter=ft.TextOnlyInputFilter()

)

Edit this page