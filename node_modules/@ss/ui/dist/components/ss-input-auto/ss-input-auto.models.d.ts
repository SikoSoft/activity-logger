import { PropConfigMap, PropTypes } from '../../models/Prop';
export declare enum SSInputAutoProp {
    INPUT = "input",
    MAX_MATCHES = "maxMatches",
    MIN_INPUT = "minInput",
    SUGGESTIONS = "suggestions"
}
export interface SSInputAutoProps extends PropTypes {
    [SSInputAutoProp.INPUT]: string;
    [SSInputAutoProp.MAX_MATCHES]: number;
    [SSInputAutoProp.MIN_INPUT]: number;
    [SSInputAutoProp.SUGGESTIONS]: string[];
}
export declare const ssInputAutoProps: PropConfigMap<SSInputAutoProps>;
