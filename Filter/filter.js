var alleBestillinger = [];
var totalOmsetning = 0;
var bestillingNr = 0;

var stock = {
    hamburger: 100,
    polse: 100,
    liten_drikke: 100,
    stor_drikke: 100,
    pommes: 100
};

var price = {
    hamburger: 80,
    polse: 30,
    liten_drikke: 25,
    stor_drikke: 35,
    pommes: 31
};

class Bestilling{
    constructor(_rett,_drikke,_side,_nr,_price){
        this.nr = _nr;
        this.rett = _rett;
        this.drikke = _drikke;
        this.side = _side;
        this.pris = this.orderCost;
        this.updateStock();
    }

    get orderCost() {
        let costOfOrder = (price[this.rett] + price[this.drikke] + price[this.side]);
        totalOmsetning += costOfOrder;
        console.log("Bestillingen koster: "+costOfOrder);
        return costOfOrder;
    }

    updateStock() {
        stock[this.rett]+= -1;
        stock[this.drikke]+= -1;
        stock[this.side]+= -1;

        console.log(stock[this.rett]);
        console.log(stock[this.drikke]);
        console.log(stock[this.side]);
    }
}

function newOrder(rett,drikke,side) {
    bestillingNr++;
    let nyBestilling = new Bestilling(rett,drikke,side,bestillingNr);
    alleBestillinger.push(nyBestilling);

    console.log("ny: ",nyBestilling);
    console.log("alle: ",alleBestillinger);
    console.log("omsetning: ",totalOmsetning);
}

window.addEventListener('load', function fnLoad() {
    newOrder('hamburger','stor_drikke','pommes');
    newOrder('polse','liten_drikke','pommes');
});