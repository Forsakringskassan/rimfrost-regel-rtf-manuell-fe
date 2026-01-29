var _a, _b;
import { reactive, watch } from "vue";
import { FButton, FFieldset, FRadioField, FValidationForm } from "@fkui/vue";
import { useProductStore } from "../stores/VAHStore";
import { setKlar } from "../utils/setKlar";
const store = useProductStore();
const selections = reactive({});
watch(() => { var _a; return (_a = store.uppgift) === null || _a === void 0 ? void 0 : _a.ersattning; }, (ersattning) => {
    if (ersattning) {
        ersattning.forEach((item) => {
            if (item.beslutsutfall) {
                selections[item.ersattningId] = item.beslutsutfall;
            }
        });
    }
}, { immediate: true });
function handleSubmit() {
    setKlar();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = Object.assign(Object.assign({}, {}), {});
let __VLS_components;
let __VLS_directives;
if ((_a = __VLS_ctx.store.uppgift) === null || _a === void 0 ? void 0 : _a.ersattning) {
    // @ts-ignore
    [store,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    const __VLS_0 = {}.FValidationForm;
    /** @type {[typeof __VLS_components.FValidationForm, typeof __VLS_components.fValidationForm, typeof __VLS_components.FValidationForm, typeof __VLS_components.fValidationForm, ]} */ ;
    // @ts-ignore
    FValidationForm;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ 'onSubmit': {} })));
    const __VLS_2 = __VLS_1(Object.assign({ 'onSubmit': {} }), ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = ({ submit: {} },
        { onSubmit: (__VLS_ctx.handleSubmit) });
    const { default: __VLS_7 } = __VLS_3.slots;
    // @ts-ignore
    [handleSubmit,];
    {
        const { 'error-message': __VLS_8 } = __VLS_3.slots;
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    }
    for (const [item] of __VLS_getVForSourceType(((_b = __VLS_ctx.store.uppgift) === null || _b === void 0 ? void 0 : _b.ersattning))) {
        // @ts-ignore
        [store,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(Object.assign({ key: (item.ersattningId) }, { class: "radio-container" }));
        const __VLS_9 = {}.FFieldset;
        /** @type {[typeof __VLS_components.FFieldset, typeof __VLS_components.fFieldset, typeof __VLS_components.FFieldset, typeof __VLS_components.fFieldset, ]} */ ;
        // @ts-ignore
        FFieldset;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
            name: (`arende-utfall-${String(item.ersattningId)}`),
        }));
        const __VLS_11 = __VLS_10({
            name: (`arende-utfall-${String(item.ersattningId)}`),
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        __VLS_asFunctionalDirective(__VLS_directives.vValidation)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { modifiers: { required: true, } }), null, null);
        const { default: __VLS_13 } = __VLS_12.slots;
        // @ts-ignore
        [vValidation,];
        {
            const { label: __VLS_14 } = __VLS_12.slots;
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(Object.assign({ class: "ersattning-info-container" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(Object.assign({ class: "ersattning-info-item" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (item.from);
            if (item.from != item.tom) {
                __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (item.tom);
            }
            if (item.omfattningProcent) {
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(Object.assign({ class: "ersattning-info-item" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
                __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (item.omfattningProcent);
            }
        }
        {
            const { 'error-message': __VLS_15 } = __VLS_12.slots;
            const [{ hasError, validationMessage }] = __VLS_getSlotParameters(__VLS_15);
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(Object.assign({ class: "error-list" }));
            if (hasError) {
                __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
                (validationMessage);
            }
        }
        {
            const { default: __VLS_16 } = __VLS_12.slots;
            const [{ sharedName }] = __VLS_getSlotParameters(__VLS_16);
            const __VLS_17 = {}.FRadioField;
            /** @type {[typeof __VLS_components.FRadioField, typeof __VLS_components.fRadioField, typeof __VLS_components.FRadioField, typeof __VLS_components.fRadioField, ]} */ ;
            // @ts-ignore
            FRadioField;
            // @ts-ignore
            const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
                modelValue: (__VLS_ctx.selections[String(item.ersattningId)]),
                name: (sharedName),
                value: "JA",
            }));
            const __VLS_19 = __VLS_18({
                modelValue: (__VLS_ctx.selections[String(item.ersattningId)]),
                name: (sharedName),
                value: "JA",
            }, ...__VLS_functionalComponentArgsRest(__VLS_18));
            const { default: __VLS_21 } = __VLS_20.slots;
            // @ts-ignore
            [selections,];
            var __VLS_20;
            const __VLS_22 = {}.FRadioField;
            /** @type {[typeof __VLS_components.FRadioField, typeof __VLS_components.fRadioField, typeof __VLS_components.FRadioField, typeof __VLS_components.fRadioField, ]} */ ;
            // @ts-ignore
            FRadioField;
            // @ts-ignore
            const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
                modelValue: (__VLS_ctx.selections[String(item.ersattningId)]),
                name: (sharedName),
                value: "NEJ",
            }));
            const __VLS_24 = __VLS_23({
                modelValue: (__VLS_ctx.selections[String(item.ersattningId)]),
                name: (sharedName),
                value: "NEJ",
            }, ...__VLS_functionalComponentArgsRest(__VLS_23));
            const { default: __VLS_26 } = __VLS_25.slots;
            // @ts-ignore
            [selections,];
            var __VLS_25;
        }
        var __VLS_12;
    }
    const __VLS_27 = {}.FButton;
    /** @type {[typeof __VLS_components.FButton, typeof __VLS_components.fButton, typeof __VLS_components.FButton, typeof __VLS_components.fButton, ]} */ ;
    // @ts-ignore
    FButton;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        type: "submit",
    }));
    const __VLS_29 = __VLS_28({
        type: "submit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_31 } = __VLS_30.slots;
    var __VLS_30;
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['radio-container']} */ ;
/** @type {__VLS_StyleScopedClasses['ersattning-info-container']} */ ;
/** @type {__VLS_StyleScopedClasses['ersattning-info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ersattning-info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['error-list']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
