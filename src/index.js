import { createApp } from "vue";
import { ValidationPlugin } from "@fkui/vue";
import { createPinia } from "pinia";
import "./style.css";
import AppComponent from "./App.vue";
// createApp(App).mount('#app')
export function init(mount, params) {
    var _a, _b;
    const container = typeof mount === "string" ? document.querySelector(mount) : mount;
    if (!container) {
        throw new Error(`Container element not found: ${typeof mount === "string" ? mount : "[Element]"}`);
    }
    container.addEventListener("component-validity", (event) => {
        event.stopPropagation();
    });
    container.addEventListener("component-unmount", (event) => {
        event.stopPropagation();
    });
    const app = createApp(AppComponent, {
        kundbehovsflodeId: (_a = params === null || params === void 0 ? void 0 : params.kundbehovsflodeId) !== null && _a !== void 0 ? _a : null,
        regeltyp: (_b = params === null || params === void 0 ? void 0 : params.regeltyp) !== null && _b !== void 0 ? _b : null,
    });
    app.use(ValidationPlugin);
    app.use(createPinia());
    // Mount to the *element* if provided, otherwise selector
    app.mount(container);
    return app;
}
