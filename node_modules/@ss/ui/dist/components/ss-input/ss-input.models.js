import { InputType } from '../../models/Input';
export var SSInputProp;
(function (SSInputProp) {
    SSInputProp["TYPE"] = "type";
    SSInputProp["VALUE"] = "value";
    SSInputProp["AUTO_COMPLETE"] = "autoComplete";
    SSInputProp["PLACEHOLDER"] = "placeholder";
    SSInputProp["SUGGESTIONS"] = "suggestions";
    SSInputProp["MIN"] = "min";
    SSInputProp["MAX"] = "max";
    SSInputProp["STEP"] = "step";
})(SSInputProp || (SSInputProp = {}));
export const ssInputProps = {
    [SSInputProp.TYPE]: {
        default: InputType.TEXT,
        description: 'What form element type the input behaves as',
        control: 'text',
    },
    [SSInputProp.VALUE]: {
        default: '',
        description: 'The value as set from the data model',
        control: 'text',
    },
    [SSInputProp.AUTO_COMPLETE]: {
        default: false,
        description: 'Should the field provide auto-completion suggestions',
        control: 'boolean',
    },
    [SSInputProp.PLACEHOLDER]: {
        default: '',
        description: 'Text to display in the field when no value is present',
        control: 'text',
    },
    [SSInputProp.SUGGESTIONS]: {
        default: [],
        description: 'An array of suggestions used for auto-completion',
        control: 'text',
    },
    [SSInputProp.MIN]: {
        default: 0,
        description: 'The minimum value for a number input',
        control: 'number',
    },
    [SSInputProp.MAX]: {
        default: 100,
        description: 'The maximum value for a number input',
        control: 'number',
    },
    [SSInputProp.STEP]: {
        default: 1,
        description: 'The step value for a number input',
        control: 'number',
    },
};
//# sourceMappingURL=ss-input.models.js.map