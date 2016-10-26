(function () {
    function CartItem(name, amount){
        this.name = name;
        this.amount = amount;
    }

    function Product(name, price) {
        this.name = name;
        this.price = price;
    }

    Product.prototype.costCalculator = function calc(amount){
        return amount * this.price;
    }

    function Apiece(name, price) {
        Product.apply(this, arguments);
    }

    Apiece.prototype = Object.create(Product.prototype);
    Apiece.prototype.constructor = Product;

    Apiece.prototype.costCalculator = function calc(amount) {
        return Product.prototype.costCalculator.apply(this, arguments);
        //console.log("Apiece product was calculated " + this.name);
    }

    Apiece.prototype.message = function message(name, amount, cost){
        return name + "\tx" + amount + "\t= " + cost;
    }

    function ByWeight(name, price) {
        Product.apply(this, arguments);
    }

    ByWeight.prototype = Object.create(Product.prototype);
    ByWeight.prototype.constructor = Product;
    
    ByWeight.prototype.costCalculator = function calc(amount) {
        return Product.prototype.costCalculator.apply(this, arguments);
        //console.log("ByWeight product was calculated");
    }

    ByWeight.prototype.message = function message(name, amount, cost){
        return name + "\t" + amount + "kg " + "\t= " + cost;
    }

    function Cart() {
        this.cartList = [];
    }

    Cart.prototype.addToCartList = function add(cartItemArray) {
        this.cartList = this.cartList.concat(cartItemArray);
    }

    function Supermarket() {
        this.productList = [];
        this.cart = new Cart();

        this.cart.addToCartList(cartItemList);
    }

    Supermarket.prototype.addToList = function add(productArray) {
        this.productList = this.productList.concat(productArray);
    }
    // This method checks if our supermarket has the specific item in store and returns it's index. If there is no such item returns false;
    Supermarket.prototype.contains = function contains(name) {
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].name.toLowerCase() === name.toLowerCase()) {
                return i;
            }
        }

        return false;
    }

    Supermarket.prototype.calculateTotalCost = function calculator() {
        var total = 0;
        var temp = 0;

        //var cart = this.cart.cartList;
        var div = document.createElement('div');
        var ul = document.createElement('ul');

        for (var i = 0; i < this.cart.cartList.length; i++) {

            var index = this.contains(this.cart.cartList[i].name);
            if (index) {
                var thisProduct = this.productList[index];
                temp = thisProduct.costCalculator.call(thisProduct, this.cart.cartList[i].amount);
                total += temp;

                var li = document.createElement('li');
                var text = document.createTextNode(thisProduct.message(thisProduct.name, this.cart.cartList[i].amount, temp));
                li.appendChild(text);
                ul.appendChild(li);
            }
            div.appendChild(ul);            
        }

        document.body.appendChild(div);
    }

   
    

    var productListTest = [new Apiece("Черный чай", 25), new Apiece("Хлеб", 6), new Apiece("Шоколадка", 33), new Apiece("Чипсы", 12),
        new Apiece("Кетчуп", 16), new ByWeight("Печенье", 45), new ByWeight("Яблоко", 15), new ByWeight("Мясо", 70), new ByWeight("Колбаса", 58), new ByWeight("Рыба", 64)];

    var cartItemList = [new CartItem("Мясо", 1.5), new CartItem("яБлОкО", 2.2), new CartItem("хлеб", 1), new CartItem("Зонтик", 1),
        new CartItem("Чипсы", 3), new CartItem("РыБа", 0.8), new CartItem("Ноутбук", 2)];

    var testMarket = new Supermarket();    
    testMarket.addToList(productListTest);

    //alert(testMarket.productList.length);
    //for (var i = 0; i < testMarket.productList.length; i++) {
    //    (testMarket.productList[i]).costCalculator(2);
    //}

    //alert(testMarket.productList[1].costCalculator(this.cart.cartList[2].amount));
    testMarket.calculateTotalCost();
    //alert(testMarket.contains(testMarket.cart.cartList[2].name));
    //var bread = new Apiece('bread', 6);
    //var cookies = new ByWeight('cookies', 20);
    
    //bread.costCalculator();
    //cookies.costCalculator();
}());