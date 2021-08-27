import { Product } from "./Product";
import { ProductService } from "./ProductService";

let _productService = new ProductService();
let products = _productService.getProducts();
let product_withId2 = _productService.getById(2);

let [p_name,p_fiyat,p_category] = ['Samsung',5000,'phone'];


let p = new Product();

p.name = p_name;
p.fiyat = p_fiyat;
p.category = p_category;

console.log("Beginning..\n");
console.log("Products:",products);
console.log("Product with Id2:",product_withId2);

// After Add New Product
console.log("*****\nAfter Add New Product");
_productService.saveProduct(p);
console.log("Products:",products);

// Delete Product Id 2
console.log("*******\nDelete ID=2");
_productService.deleteProduct(product_withId2);
console.log("Products:",products)

