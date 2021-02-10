/* tslint:disable */
/* eslint-disable */
/**
 * NLP Sandbox Deidentifier API
 * The OpenAPI specification implemented by NLP Sandbox PHI Deidentifiers. # Overview TBA 
 *
 * The version of the OpenAPI document: 0.3.1
 * Contact: thomas.schaffter@sagebionetworks.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    DeidentificationConfigDeidentificationStrategyDateOffsetConfig,
    DeidentificationConfigDeidentificationStrategyDateOffsetConfigFromJSON,
    DeidentificationConfigDeidentificationStrategyDateOffsetConfigFromJSONTyped,
    DeidentificationConfigDeidentificationStrategyDateOffsetConfigToJSON,
    DeidentificationConfigDeidentificationStrategyMaskingCharConfig,
    DeidentificationConfigDeidentificationStrategyMaskingCharConfigFromJSON,
    DeidentificationConfigDeidentificationStrategyMaskingCharConfigFromJSONTyped,
    DeidentificationConfigDeidentificationStrategyMaskingCharConfigToJSON,
} from './';

/**
 * The strategy used to de-identify the note's text. Only one field may be set.
 * @export
 * @interface DeidentificationConfigDeidentificationStrategy
 */
export interface DeidentificationConfigDeidentificationStrategy {
    /**
     * 
     * @type {DeidentificationConfigDeidentificationStrategyMaskingCharConfig}
     * @memberof DeidentificationConfigDeidentificationStrategy
     */
    maskingCharConfig?: DeidentificationConfigDeidentificationStrategyMaskingCharConfig;
    /**
     * Configuration for the redaction strategy. E.g. "John Smith lives at 123 Main St" -> "lives at".
     * @type {object}
     * @memberof DeidentificationConfigDeidentificationStrategy
     */
    redactConfig?: object;
    /**
     * Configuration for the "annotation type" strategy. E.g. "John Smith lives at 123 Main St" -> "[PERSON_NAME] lives at [PHYSICAL_ADDRESS]".
     * @type {object}
     * @memberof DeidentificationConfigDeidentificationStrategy
     */
    annotationTypeConfig?: object;
    /**
     * 
     * @type {DeidentificationConfigDeidentificationStrategyDateOffsetConfig}
     * @memberof DeidentificationConfigDeidentificationStrategy
     */
    dateOffsetConfig?: DeidentificationConfigDeidentificationStrategyDateOffsetConfig;
}

export function DeidentificationConfigDeidentificationStrategyFromJSON(json: any): DeidentificationConfigDeidentificationStrategy {
    return DeidentificationConfigDeidentificationStrategyFromJSONTyped(json, false);
}

export function DeidentificationConfigDeidentificationStrategyFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeidentificationConfigDeidentificationStrategy {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maskingCharConfig': !exists(json, 'maskingCharConfig') ? undefined : DeidentificationConfigDeidentificationStrategyMaskingCharConfigFromJSON(json['maskingCharConfig']),
        'redactConfig': !exists(json, 'redactConfig') ? undefined : json['redactConfig'],
        'annotationTypeConfig': !exists(json, 'annotationTypeConfig') ? undefined : json['annotationTypeConfig'],
        'dateOffsetConfig': !exists(json, 'dateOffsetConfig') ? undefined : DeidentificationConfigDeidentificationStrategyDateOffsetConfigFromJSON(json['dateOffsetConfig']),
    };
}

export function DeidentificationConfigDeidentificationStrategyToJSON(value?: DeidentificationConfigDeidentificationStrategy | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maskingCharConfig': DeidentificationConfigDeidentificationStrategyMaskingCharConfigToJSON(value.maskingCharConfig),
        'redactConfig': value.redactConfig,
        'annotationTypeConfig': value.annotationTypeConfig,
        'dateOffsetConfig': DeidentificationConfigDeidentificationStrategyDateOffsetConfigToJSON(value.dateOffsetConfig),
    };
}


