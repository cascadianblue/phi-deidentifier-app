/* tslint:disable */
/* eslint-disable */
/**
 * NLP Sandbox PHI Deidentifier API
 * # Introduction This NLP tool takes as input a clinical note and returned a de-identified version of the note. This design of this API is a work in progress. # Examples - [NLP Sandbox PHI Deidentifier](https://github.com/nlpsandbox/phi-deidentifier) 
 *
 * The version of the OpenAPI document: 1.0.1
 * Contact: thomas.schaffter@sagebionetworks.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TextPhysicalAddressAnnotationAllOf
 */
export interface TextPhysicalAddressAnnotationAllOf {
    /**
     * Type of address information
     * @type {string}
     * @memberof TextPhysicalAddressAnnotationAllOf
     */
    addressType?: TextPhysicalAddressAnnotationAllOfAddressTypeEnum;
}

/**
* @export
* @enum {string}
*/
export enum TextPhysicalAddressAnnotationAllOfAddressTypeEnum {
    City = 'city',
    Country = 'country',
    Department = 'department',
    Hospital = 'hospital',
    Organization = 'organization',
    Other = 'other',
    Room = 'room',
    State = 'state',
    Street = 'street',
    Zip = 'zip'
}

export function TextPhysicalAddressAnnotationAllOfFromJSON(json: any): TextPhysicalAddressAnnotationAllOf {
    return TextPhysicalAddressAnnotationAllOfFromJSONTyped(json, false);
}

export function TextPhysicalAddressAnnotationAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): TextPhysicalAddressAnnotationAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'addressType': !exists(json, 'addressType') ? undefined : json['addressType'],
    };
}

export function TextPhysicalAddressAnnotationAllOfToJSON(value?: TextPhysicalAddressAnnotationAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'addressType': value.addressType,
    };
}


