(function () {
    class CartItem {
        constructor(name, amount) {
            this.name = name;
            this.amount = amount;
        }
    }

    class Product {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }

        costCalculator(amount) {
            return this.price * amount;
        }
    }

    class Apiece extends Product {
        constructor(name, price){
            super(name, price);
        }
        // this is method is only using its parent version. It is left to emphasize that we can change the logic
        // of calculation for products of different types
        costCalculator(amount) {
            return super.costCalculator(amount);
        }

        message(name, amount, cost) {
            return name + "\tx" + amount + "\t= " + cost;
        }
    }

    class ByWeight extends Product{
        constructor(name, price) {
            super(name, price);
        }
        // this is method is only using its parent version. It is left to emphasize that we can change the logic
        // of calculation for products of different types
        costCalculator(amount) {
            return super.costCalculator(amount);
        }

        message(name, amount, cost) {
            return name + "\t" + amount + "kg " + "\t= " + cost;
        }
    }

    class Cart {
        constructor() {
            this.cartList = [];
        }

        addToCartList(cartItemArray) {
            this.cartList = this.cartList.concat(cartItemArray);
        }
    }

    class Supermarket {
        constructor() {
            this.productList = [];
            this.cart = new Cart();

            this.cart.addToCartList(cartItemList);
        }

        addToList(productArray) {
            this.productList = this.productList.concat(productArray);
        }

        contains(name) {
            for (var i = 0; i < this.productList.length; i++) {
                if (this.productList[i].name.toLowerCase() === name.toLowerCase()) {
                    return i;
                }
            }

            return false;
        }

        calculateTotalCost() {
            var total = 0;
            var temp = 0;

            //var cart = this.cart.cartList;
            var div = document.createElement('div');
            var ul = document.createElement('ul');

            for (var i = 0; i < this.cart.cartList.length; i++) {

                var index = this.contains(this.cart.cartList[i].name);
                if (index) {
                    let thisProduct = this.productList[index];
                    let temp = thisProduct.costCalculator(this.cart.cartList[i].amount);
                    total += temp;

                    var li = document.createElement('li');
                    var text = document.createTextNode(thisProduct.message(thisProduct.name, this.cart.cartList[i].amount, temp));
                    li.appendChild(text);
                    ul.appendChild(li);
                }

                div.appendChild(ul);                
            }

            document.body.appendChild(div);

            alert(total);
        }
    }

    //??

    var productListTest = [new Apiece("Черный чай", 25), new Apiece("Хлеб", 6), new Apiece("Шоколадка", 33), new Apiece("Чипсы", 12),
        new Apiece("Кетчуп", 16), new ByWeight("Печенье", 45), new ByWeight("Яблоко", 15), new ByWeight("Мясо", 70), new ByWeight("Колбаса", 58), new ByWeight("Рыба", 64)];

    var cartItemList = [new CartItem("Мясо", 1.5), new CartItem("яБлОкО", 2.2), new CartItem("хлеб", 1), new CartItem("Зонтик", 1),
        new CartItem("Чипсы", 3), new CartItem("РыБа", 0.8), new CartItem("Ноутбук", 2)];

    var testMarket = new Supermarket();
    testMarket.addToList(productListTest);
    testMarket.calculateTotalCost();
}());