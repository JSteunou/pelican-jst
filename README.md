# Pelican JST

This is the theme I made for my blog with Pelican. It comes with a full integration of [Comimoc Front](https://github.com/JSteunou/comimoc-front-angularjs) so you can have your comments handled by [Comimoc Back](https://github.com/JSteunou/comimoc-front-angularjs).

I am not good at picking fancy name so I just named it Pelican JST because it is the http://www.jeromesteunou.net theme.

# Using this theme

Like any Pelican theme, follow [the guide](http://docs.getpelican.com/en/latest/settings.html#themes) or use the [pelican-theme](http://docs.getpelican.com/en/latest/pelican-themes.html) tool.

# THEME OPTIONS

* *USE_COMIMOC* Boolean. Set it to True if you want to use Comimoc for your comments. It will be on by default for articles, but off for pages. If you want to turn off for an article, just add `comimocoff` (no value needed) to the metadata. If you want to turn on for a page, just add `comimocon` (no value needed) to the metadata.

All Comimoc settings are available from here, prefixed by `COMIMOC_` see [Comimoc Front doc](https://github.com/JSteunou/comimoc-front-angularjs) for more details:

* *COMIMOC_RESOURCES_LOCATION*
* *COMIMOC_WEBSITE*
* *COMIMOC_HASH*
* *COMIMOC_ARGS*

Only the `LOCALE` setting is fetching from article|page lang or Pelican `DEFAULT_LANG` if not defined.