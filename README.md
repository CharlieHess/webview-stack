# webview-stack
This is a minimal repro of https://github.com/electron/electron/issues/8505.
It demonstrates the recommended workaround (not setting `visibility` while the `webview` is loading), but also shows the limitations of this approach.

It seems that:

* In some cases we can't rely on `z-index` for visibility
  * This can result in `webview` pages bleeding into one another
* `webview`s will still render blank white screens, particularly when switching between them quickly or when a switch triggers a navigation
