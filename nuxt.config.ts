// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: 'AniShip',
			htmlAttrs: {
				lang: 'ru',
			},
			link: [
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins' },
			],
		},
	},
	modules: [
		"@nuxtjs/tailwindcss",
		// pinia
		[
			"@pinia/nuxt",
			{
				autoImports: [
					"defineStore", "acceptHMRUpdate"
				],
			}
		],
		"@pinia-plugin-persistedstate/nuxt",
		// icons
		"nuxt-icon",
	],
	plugins: [
		"@/plugins/scrollbarPlugin.js",
		"@/plugins/gsapPlugin.js"
	],
	imports: {
		dirs: ["store"]
	},
	css: [
		'@/assets/css/main.css',
		'@/assets/css/bgAnimations/squares1.css'
	],
	ssr: false,
})
