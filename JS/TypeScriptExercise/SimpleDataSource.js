"use strict";
exports.__esModule = true;
exports.SimpleDataSource = void 0;
var Product_1 = require("./Product");
var SimpleDataSource = /** @class */ (function () {
    function SimpleDataSource() {
        this.products = new Array(new Product_1.Product(1, 'Iphone4', 'phone', 1000), new Product_1.Product(2, 'Iphone5', 'phone', 2000), new Product_1.Product(3, 'Iphone6', 'phone', 3000), new Product_1.Product(4, 'Iphone7', 'phone', 4000));
    }
    SimpleDataSource.prototype.getProducts = function () {
        return this.products;
    };
    return SimpleDataSource;
}());
exports.SimpleDataSource = SimpleDataSource;
var p1 = new SimpleDataSource();
