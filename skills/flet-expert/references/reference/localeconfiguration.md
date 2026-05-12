# LocaleConfiguration
URL: https://flet.dev/docs/types/localeconfiguration

ReferenceTypesClassesLocaleConfiguration
LocaleConfiguration

Represents the configuration for supported locales and the current locale.

Properties
current_locale - The current locale.
supported_locales - A list of locales that the application supports for localization.
Properties​
build
current_locale
class-attribute
instance-attribute
​
Copy
current_locale: Locale | None = None

The current locale.

NOTE
Must be an item of supported_locales to take effect.
If None or invalid/unsupported, the first supported locale in supported_locales is used.
build
supported_locales
class-attribute
instance-attribute
​
Copy
supported_locales: list[Locale] = field(
    default_factory=lambda: [Locale("en", "US")]
)

A list of locales that the application supports for localization.

NOTE
Locales unsupported/invalid are ignored.

Order matters: Locale resolution is performed by progressively relaxing specificity until a match is found. Matching is attempted in the following priority order:

language + script + country
language + script
language + country
language only
country only (only if no language-based match is found)

When multiple supported locales match at the same priority level, the first matching locale in supported_locales is selected. If no supported locale matches at any level, the first entry in supported_locales is used as the final fallback.

For languages with multiple scripts or regional variants, include locales in increasing order of specificity: language-only → language+script → language+script+country. Defining all of these variants is not strictly required, but doing so greatly improves locale resolution and reduces ambiguous matches. Omitting intermediate fallbacks can lead to incorrect script or regional selection in edge cases—for example, a Simplified Chinese user in Taiwan (zh_Hans_TW) may incorrectly resolve to Traditional Chinese if zh_Hans and zh_Hans_CN are not present.

Example: Full Chinese support for CN (Mainland China), TW (Taiwan), and HK (Hong Kong)

supported_locales = [

    # Generic Chinese (fallback for all Chinese variants)

    Locale(language_code="zh"),



    # Script-level variants

    Locale(language_code="zh", script_code="Hans"), # Simplified Chinese zh_Hans

    Locale(language_code="zh", script_code="Hant"), # Traditional Chinese

    zh_Hant



    # Region-specific variants

    Locale(language_code="zh", script_code="Hans", country_code="CN"), #

    zh_Hans_CN

    Locale(language_code="zh", script_code="Hant", country_code="TW"), #

    zh_Hant_TW

    Locale(language_code="zh", script_code="Hant", country_code="HK"), #

    zh_Hant_HK

]

Edit this page