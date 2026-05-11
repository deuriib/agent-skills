# Session Storage
URL: https://flet.dev/docs/cookbook/session-storage

CookbookSession Storage
Session Storage

Flet provides an API for storing key-value data in user's session on a server side.

CAUTION

In the current Flet implementation the data stored in a session store is transient and is not preserved between app restarts.

Write data​
# strings

page.session.store.set("key", "value")



# numbers

page.session.store.set("number.setting", 12345)



# booleans

page.session.store.set("bool_setting", True)



# lists

page.session.store.set("favorite_colors", ["red", "green", "blue"])

Read data​
# The value is automatically converted back to the original type

value = page.session.store.get("key")



colors = page.session.store.get("favorite_colors")

# colors = ["red", "green", "blue"]

Check key existence​
page.session.store.contains_key("key") # True if the key exists

Get all keys​
page.session.store.get_keys()

Remove data by key​
page.session.store.remove("key")

Clear all data​
page.session.store.clear()

Edit this page