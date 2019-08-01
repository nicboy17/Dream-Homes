module.exports = {
    env: {
        es6: true,
    },
    extends: 'react-app',
    rules : {
        indent: ['error', 4], // A custom style-related rule for example
        quotes: ['error', 'single'],
        semi: ['error', 'always']
        // More custom rules here
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
};
