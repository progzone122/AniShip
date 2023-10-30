import PerfectScrollbar from "vue3-perfect-scrollbar"
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PerfectScrollbar)
})