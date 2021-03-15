import {
    isOwnProperty
} from './utils';

export function isProperty(node) {
    return node !== null && typeof node === 'object' && isOwnProperty(node, 'componentOptions');
}