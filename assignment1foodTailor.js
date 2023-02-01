const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    SECOND_ITEM: Symbol("2nd_item"),
    SIZE2: Symbol("size2"),
    TOPPINGS2: Symbol("toppings2"),
    UPSELL: Symbol("upsell"),
    
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "Subway";
        this.sSize2 = "";
        this.sToppings2 = "";
        this.sItem2 = "";
        this.sUpsell = "";
        this.cost = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Divya's Food Tailor.");
                aReturn.push("What size of subway would you like? 6-inch or foot long");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                this.cost += 9;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SECOND_ITEM
                this.sToppings = sInput;
                this.cost += 1;
                aReturn.push("Would you like a Falafel Bowl?");
                break;

            case OrderState.SECOND_ITEM:
                if(sInput.toLowerCase() != "no"){
                    this.sItem2 = "falafel Bowl";
                    this.stateCur = OrderState.SIZE2
                    this.cost += 11;
                    aReturn.push("What size of falafel Bowl would you like?");
                    break;
                }
                this.stateCur = OrderState.UPSELL;
                aReturn.push("Would you like cookies on the side? enter chocolate, oatmeal or NO");
            break;
            case OrderState.SIZE2:
                this.stateCur = OrderState.TOPPINGS2
                this.sSize2 = sInput;
                aReturn.push("What toppings would you like?");
            break;
            case OrderState.TOPPINGS2:
                this.stateCur = OrderState.UPSELL
                this.sToppings2 = sInput;
                aReturn.push("Would you like cookies on the side? enter chocolate, oatmeal or NO");
            break;
            case OrderState.UPSELL:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sUpsell = sInput;
                    this.cost += 4
                    
                }
                aReturn.push("Thank-you for your order of");

                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sItem2){
                    
                    aReturn.push(`${this.sSize2} ${this.sItem2} with ${this.sToppings2}`);
                }
                if(this.sUpsell) {
                    aReturn.push(`${this.sUpsell} cookies on the side.`);
                }
                if(this.cost) {
                    aReturn.push(`your total order cost is: $${this.cost}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;

        }
        return aReturn;
    }
}