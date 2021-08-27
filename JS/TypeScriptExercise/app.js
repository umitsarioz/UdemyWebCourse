"use strict";
exports.__esModule = true;
var Product_1 = require("./Product");
var ProductService_1 = require("./ProductService");
var _productService = new ProductService_1.ProductService();
var products = _productService.getProducts();
var product_withId2 = _productService.getById(2);
var _a = ['Samsung', 5000, 'phone'], p_name = _a[0], p_fiyat = _a[1], p_category = _a[2];
var p = new Product_1.Product();
p.name = p_name;
p.fiyat = p_fiyat;
p.category = p_category;
console.log("Beginning..\n");
console.log("Products:", products);
console.log("Product with Id2:", product_withId2);
// After Add New Product
console.log("*****\nAfter Add New Product");
_productService.saveProduct(p);
console.log("Products:", products);
// Delete Product Id 2
console.log("*******\nDelete ID=2");
_productService.deleteProduct(product_withId2);
console.log("Products:", products);
