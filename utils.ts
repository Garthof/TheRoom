// Based on https://stackoverflow.com/a/38416465/1679
export function deepEqual(a: any, b: any) {
    if (
        typeof a == 'object' &&
        a != null &&
        typeof b == 'object' &&
        b != null
    ) {
        const aEntries = Object.keys(a);
        const bEntries = Object.keys(b);

        if (aEntries.length != bEntries.length) {
            return false;
        }

        for (const key of aEntries) {
            if (bEntries.indexOf(key) < 0 || !deepEqual(a[key], b[key])) {
                return false;
            }
        }
        for (const key of bEntries) {
            if (aEntries.indexOf(key) < 0 || !deepEqual(b[key], a[key])) {
                return false;
            }
        }

        return true;
    } else {
        return a === b;
    }
}
