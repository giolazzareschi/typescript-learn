var Bar = (function () {
    function Bar() {
        this._age = Math.random();
    }
    Object.defineProperty(Bar.prototype, "age", {
        get: function () {
            return this._age;
        },
        enumerable: true,
        configurable: true
    });
    return Bar;
})();
exports.Bar = Bar;
