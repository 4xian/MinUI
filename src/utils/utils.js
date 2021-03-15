const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isOwnProperty(obj, key) {
    return hasOwnProperty.call(obj, key);
}