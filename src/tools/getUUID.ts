export function getUUID(string: string = '') {

    let matches = string.match(/\b(uuid:){0,1}\s*([a-f0-9\\-]*){1}\s*/g)

    if (matches && matches.length === 0) {
        return string;
    }

    let gtOfArrayAllString = matches?.sort(
        function (a, b) {
            return b.length - a.length;
        }
    )[0];

    return gtOfArrayAllString;
}