# TemplateRoute
URL: https://flet.dev/docs/types/templateroute

ReferenceTypesClassesTemplateRoute
TemplateRoute

Matches a concrete route string against parameterized route templates.

Instances keep the original route in route and expose matched template parameters as dynamic attributes after a successful call to match(). Parameter attributes captured by a previous match are reset to None before each new matching attempt, preventing stale values from leaking between checks.

Properties
route
Methods
match - Tries to match this instance route against a route template.
Properties​
build
route
instance-attribute
​
Methods​
deployed_code
match
​
Copy
match(route_template: str) -> bool

Tries to match this instance route against a route template.

The template is compiled with repath.pattern(). If matching succeeds, named parameters are stored and also assigned as attributes on this object (for example, self.user_id). If matching fails, previously captured attributes remain cleared.

Parameters:

route_template (str) - Route template in a format supported by repath.pattern().

Returns:

bool - True if the route matches the template; otherwise False.
Edit this page