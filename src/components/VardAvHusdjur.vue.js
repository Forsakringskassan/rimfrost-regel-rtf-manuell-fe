var _a, _b, _c, _d, _e;
import { onMounted } from "vue";
import { FStaticField, FTooltip } from "@fkui/vue";
import { useProductStore } from "../stores/VAHStore";
import { fetchUppgiftInformation } from "../utils/fetchUppgiftInformation";
import ListaDatum from "./ListaDatum.vue";
const __VLS_props = defineProps();
const { kundbehovsflodeId, regeltyp } = __VLS_props;
const store = useProductStore();
fetchUppgiftInformation(kundbehovsflodeId !== null && kundbehovsflodeId !== void 0 ? kundbehovsflodeId : "", regeltyp !== null && regeltyp !== void 0 ? regeltyp : "");
store.setRegeltyp(regeltyp !== null && regeltyp !== void 0 ? regeltyp : "");
onMounted(() => {
    console.log("VardAvHusdjur mounted with kundbehovsflodeId:", kundbehovsflodeId);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = Object.assign(Object.assign(Object.assign(Object.assign({}, {}), {}), {}), {});
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
const __VLS_0 = {}.FStaticField;
/** @type {[typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, ]} */ ;
// @ts-ignore
FStaticField;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
{
    const { label: __VLS_5 } = __VLS_3.slots;
}
{
    const { tooltip: __VLS_6 } = __VLS_3.slots;
    const __VLS_7 = {}.FTooltip;
    /** @type {[typeof __VLS_components.FTooltip, typeof __VLS_components.fTooltip, typeof __VLS_components.FTooltip, typeof __VLS_components.fTooltip, ]} */ ;
    // @ts-ignore
    FTooltip;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        screenReaderText: "Läs mer om uppgiften kontrollera frånvaro från arbete",
        headerTag: "h2",
    }));
    const __VLS_9 = __VLS_8({
        screenReaderText: "Läs mer om uppgiften kontrollera frånvaro från arbete",
        headerTag: "h2",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_11 } = __VLS_10.slots;
    {
        const { header: __VLS_12 } = __VLS_10.slots;
    }
    {
        const { body: __VLS_13 } = __VLS_10.slots;
    }
    var __VLS_10;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(Object.assign({ class: "arende-information" }));
const __VLS_14 = {}.FStaticField;
/** @type {[typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, ]} */ ;
// @ts-ignore
FStaticField;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_18 } = __VLS_17.slots;
{
    const { label: __VLS_19 } = __VLS_17.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
{
    const { default: __VLS_20 } = __VLS_17.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (`${(_a = __VLS_ctx.store.uppgift) === null || _a === void 0 ? void 0 : _a.kund.fornamn} ${(_b = __VLS_ctx.store.uppgift) === null || _b === void 0 ? void 0 : _b.kund.efternamn}`);
    // @ts-ignore
    [store, store,];
}
var __VLS_17;
const __VLS_21 = {}.FStaticField;
/** @type {[typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, ]} */ ;
// @ts-ignore
FStaticField;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
{
    const { label: __VLS_26 } = __VLS_24.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
{
    const { default: __VLS_27 } = __VLS_24.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    ((_e = (_d = (_c = __VLS_ctx.store.uppgift) === null || _c === void 0 ? void 0 : _c.kund.anstallning) === null || _d === void 0 ? void 0 : _d.organisationsnamn) !== null && _e !== void 0 ? _e : "Missing");
    // @ts-ignore
    [store,];
}
var __VLS_24;
const __VLS_28 = {}.FStaticField;
/** @type {[typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, ]} */ ;
// @ts-ignore
FStaticField;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_32 } = __VLS_31.slots;
{
    const { label: __VLS_33 } = __VLS_31.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
{
    const { default: __VLS_34 } = __VLS_31.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
var __VLS_31;
const __VLS_35 = {}.FStaticField;
/** @type {[typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, typeof __VLS_components.FStaticField, typeof __VLS_components.fStaticField, ]} */ ;
// @ts-ignore
FStaticField;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({}));
const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_39 } = __VLS_38.slots;
{
    const { label: __VLS_40 } = __VLS_38.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
{
    const { default: __VLS_41 } = __VLS_38.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
var __VLS_38;
/** @type {[typeof ListaDatum, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(ListaDatum, new ListaDatum({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['arende-information']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
