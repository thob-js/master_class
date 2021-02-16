const outputSum = document.querySelector("#outputSum");
const outputStock = document.querySelector("#outputStock");
const tBody = document.querySelector("#tableOutput");

function round(thisNumber) {
    let rounded = Math.round((thisNumber + Number.EPSILON) * 100) / 100;
    return rounded;
}

var totalOmsetning = 0;
var nettoTotalOmsetning = 0;
var bestillingNr = 0;

var stock = {
    hamburger: 20,
    polse: 20,
    liten_drikke: 20,
    stor_drikke: 20,
    pommes: 20,
    ost: 20,
    bacon: 20
};

var price = {
    hamburger: 80,
    polse: 30,
    liten_drikke: 25,
    stor_drikke: 35,
    pommes: 31,
    ost: 5,
    bacon: 10,
    'ost,bacon': 15,
};

class Bestilling{
    constructor(_rett,_drikke,_side,_nr,_ekstra,_price){
        this.nr = _nr;
        this.rett = _rett;
        this.drikke = _drikke;
        this.side = _side;
        this.ekstra = _ekstra;

        this.pris = this.orderCost;

        this.updateStock();
        this.print();
        this.printStock();
        this.printRevenue();
    }

    get orderCost() {
        let costOfOrder = (price[this.rett] + price[this.drikke]);
        if(this.side != 'ingen') {
            costOfOrder += (price[this.side]);
        }
        if(this.ekstra != 'ingen') {
            costOfOrder += (price[this.ekstra]);
        }
        totalOmsetning += costOfOrder;
        return costOfOrder;
    }

    updateStock() {
        stock[this.rett]--;
        stock[this.drikke]--;
        if (this.side != 'ingen') {
            stock[this.side]--;
            this.stockCheckAndAlert(this.side);
        }
        this.stockCheckAndAlert(this.rett);
        this.stockCheckAndAlert(this.drikke);
    }

    stockCheckAndAlert(item) {
        if (stock[item] < 10) {
            window.alert("lav stock av "+item);
        }
    }

    print() {
        let mva = this.pris / 100*15;
        tBody.innerHTML += `<tr>
            <td> ${this.nr} </td>
            <td> ${this.drikke} </td>
            <td> ${this.rett} </td>
            <td> ${this.side} </td>
            <td> ${this.pris},- </td>
            <td> ${round(mva)},- </td>
            <td> ${this.ekstra},- </td>
        </tr>\n`;
    }

    printStock() {
        let stockValues = JSON.stringify(stock);    // gjør om et objekt til string og sender til html
        outputStock.innerHTML = stockValues;
    }

    printRevenue() {
        let mva = totalOmsetning / 100*15;
        let netto = totalOmsetning - mva;
        outputSum.innerHTML = (
            "Brutto omsetning = "+totalOmsetning+"kr."
            +"<br> Hvorav mva. på 15% = ~"+round(mva)+"kr"
            +"<br> Netto omsetning = "+netto+"kr"
        );
        nettoTotalOmsetning += netto;
    }
}

const submit_btn = document.querySelector("#submit"); 
submit_btn.addEventListener('click', function() {    //onclick get values fra brukervalg
    let mat = "";
    let drikke = "";
    let side = "";
    let ekstra = "";

    try {
        mat = getSelectedRadio('mat');
        drikke = getSelectedRadio('drikke');

        try {
            side = getSelectedRadio('side');
        } catch (error) {
            side = "ingen";
        }

        try {
            ekstra = getSelectedCheckboxValues('ekstra');
        } catch (error) {
            ekstra = "ingen";
        }

        newOrder(mat,drikke,side,ekstra);
    } catch (error) {
        window.alert("du må minimum velge drikke og mat for å bestille en meny");
    }
});

function getSelectedRadio(name) {    //finn value av én selected name="name", både radio og checkbox
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    let value = radio.value;
    return value;
}

function getSelectedCheckboxValues(name) {   //alle checkbox values av name="name"
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function newOrder(rett,drikke,side,ekstra) {   //lag nytt objekt med variabler som input
    bestillingNr++;
    let nyBestilling = new Bestilling(rett,drikke,side,bestillingNr,ekstra);
    console.log("ny: ",nyBestilling);
}

window.addEventListener('load', function() {    //testbestillinger
    newOrder('hamburger','stor_drikke','pommes','ingen');
    newOrder('polse','liten_drikke','pommes','ost,bacon');
    newOrder('polse','liten_drikke','ingen','ost');
});