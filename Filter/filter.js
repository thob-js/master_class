const outputSum = document.querySelector("#outputSum");
const tBody = document.querySelector("#tableOutput");

var alleBestillinger = [];
var totalOmsetning = 0;
var bestillingNr = 0;

var stock = {
    hamburger: 20,
    polse: 20,
    liten_drikke: 20,
    stor_drikke: 20,
    pommes: 20
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
        this.print();
    }

    get orderCost() {
        let costOfOrder = (price[this.rett] + price[this.drikke] + price[this.side]);
        totalOmsetning += costOfOrder;
        console.log("Bestillingen koster: "+costOfOrder);
        return costOfOrder;
    }

    updateStock() {
        stock[this.rett]--;
        stock[this.drikke]--;
        stock[this.side]--;

        if(stock[this.drikke]<10) {
            window.alert("lav stock av "+this.drikke);
        }
        if(stock[this.rett]<10) {
            window.alert("lav stock av "+this.rett);
        }
        if(stock[this.side]<10) {
            window.alert("lav stock av "+this.side);
        }

        console.log(stock[this.rett]);
        console.log(stock[this.drikke]);
        console.log(stock[this.side]);
    }

    print() {
        tBody.innerHTML += `<tr>
            <td> ${this.nr} </td>
            <td> ${this.drikke} </td>
            <td> ${this.rett} </td>
            <td> ${this.side} </td>
            <td> ${this.pris},- </td>
            <td> ${this.pris/100*15},- </td>
        </tr>\n`;
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

const outputStock = document.querySelector("#outputStock");
window.addEventListener('load', function fnLoad() {
    newOrder('hamburger','stor_drikke','pommes');
    newOrder('polse','liten_drikke','pommes');

    let stockValues = JSON.stringify(stock);
    outputStock.innerHTML = "Varelager:"+stockValues;
});