module.exports = (req, res, next) => {
    const language = req.headers['accept-language'] || 'en';
    console.log('language rfgsdgdfgdfgdfgdfg :>> ', language);
    req.language = language;
    next();
};
