const path = require('path');

module.exports = {
    webpack: {
        alias: {
            "@jelements": path.resolve(__dirname, 'src/elements/'),
            "@history": path.resolve(__dirname, 'src/customHistory.ts')
        }
    }
};