import { Product } from "./Product";

export class SimpleDataSource{
    private products:Array<Product>;

    constructor(){
        this.products = new Array<Product>(
            new Product(1,'Iphone4','phone',1000),
            new Product(2,'Iphone5','phone',2000),
            new Product(3,'Iphone6','phone',3000),
            new Product(4,'Iphone7','phone',4000)
        );
    }
    getProducts(): Product[]{
        return this.products;
    }

}

let p1 =new SimpleDataSource();

