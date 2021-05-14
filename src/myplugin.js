// Tricky: In src/ we need to use DLL-compatible imports (via the ckeditor5 only).
// while in the sample/sample-dev.js we use @ckeditor/ckeditor5-* because we're building from source
// and we can do that... and these packages that we use there can only be accessed this way.
import { Plugin } from 'ckeditor5/src/core';

export default class MyPlugin extends Plugin {
	init() {
		console.log( 'Hurray! MyPlugin is alive 🧟‍♀️' );
	}
}