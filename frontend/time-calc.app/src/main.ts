// the props
import 'https://unpkg.com/open-props';

import App from "./App.svelte"

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;