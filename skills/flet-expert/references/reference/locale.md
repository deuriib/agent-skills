# Locale
URL: https://flet.dev/docs/types/locale

ReferenceTypesClassesLocale
Locale

An identifier used to select a user's language and formatting preferences.

Properties
country_code - The country code or region subtag of the locale, e.g US for the United States.
language_code - The primary language subtag/code of the locale, e.g en for English.
language_tag - Returns a syntactically valid Unicode BCP47 Locale Identifier.
script_code - The script code/subtag of the locale, e.g.
Properties​
build
country_code
class-attribute
instance-attribute
​
Copy
country_code: str | None = None

The country code or region subtag of the locale, e.g US for the United States.

Its value is case-sensitive and must be a registered subtag in the IANA Language Subtag Registry with the type "region". If you use a deprecated subtag, it will be internally modified to its “Preferred-Value”, if it has one. For example: Locale("de", "DE") and Locale("de", "DD") are equal, and both have the country_code="DE”, because DD is a deprecated region subtag which has been replaced by DE.

Locales may also be defined without this, to specify a generic fallback for a particular script.

build
language_code
class-attribute
instance-attribute
​
Copy
language_code: str = 'und'

The primary language subtag/code of the locale, e.g en for English.

Its value is case-sensitive and must be a registered subtag in the IANA Language Subtag Registry with the type "language". If you use a deprecated subtag, it will be internally modified to its “Preferred-Value”, if it has one. For example: Locale("he") and Locale("iw") are equal, and both have the language_code="he”, because iw is a deprecated language subtag which has been replaced by he.

When there is no language subtag, this parameter should be set to "und" (the default), which represents an undefined language code.

build
language_tag
property
​
Copy
language_tag: str

Returns a syntactically valid Unicode BCP47 Locale Identifier.

See this for technical details.

Examples: en, es-419, hi-Deva-IN, zh-Hans-CN

build
script_code
class-attribute
instance-attribute
​
Copy
script_code: str | None = None

The script code/subtag of the locale, e.g. Hant for Traditional Chinese or Hans for Simplified Chinese. It is especially recommended to set this property explicitly for languages with more than one script.

Its value must be a valid Unicode Language Identifier script subtag as listed in Unicode CLDR supplemental data.

Edit this page