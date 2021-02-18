console.log("js loaded");
const tBody = document.querySelector("#tableOutput");
const output2 = document.querySelector("#output2");
var plusOne = 0;
var totalOmsetning = 0;
var totalePasseringer = 0;

var price = {
    elbil: 0,
    personbil: 27,
    lastebil: 52
};

class Bil {
    constructor(type,harBrikke,regNr,passeringer,passeringId,pris) {
        this.type = type;
        this.brikke = harBrikke;
        this.regNr = regNr;
        this.passeringer = passeringer;
        this.passeringId = passeringId = plusOne;

        totalePasseringer += Number(this.passeringer);
        output2.innerHTML = "Totale passeringer:"+totalePasseringer;
        this.pris = this.orderCost();
        this.print();
    }

    orderCost() {
        let costOfPass = (price[this.type]*this.passeringer);
        let discount = 0;

        if (this.brikke == 'true') {
            discount = costOfPass/100*15;
        }
        return costOfPass-discount;
    }

    print() {
        tBody.innerHTML += `<tr>
            <td> ${this.passeringId} </td>
            <td> ${this.regNr} </td>
            <td> ${this.type} </td>
            <td> ${this.brikke} </td>
            <td> ${this.passeringer} </td>
            <td> ${this.pris},- </td>
        </tr>\n`;
    }

}



function newOrder(_type,_brikke,_regNr,_antall) {   //lag nytt objekt med variabler som input
    plusOne += 1;
    let nyBestilling = new Bil(_type,_brikke,_regNr,_antall);
    console.log("ny: ",nyBestilling);
}

function getSelectedRadio(name) {    //finn value av én selected name="name", både radio og checkbox
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    let value = radio.value;
    return value;
}

const getRegNr = document.querySelector('#registrering');
const submit_btn = document.querySelector("#submit"); 
const getPasseringer = document.querySelector('#passeringer')
submit_btn.addEventListener('click', function() {
    let typebil = "";
    let registrering = "";
    let harbrikke = "";
    let passeringAntall = "";

    try {
        typebil = getSelectedRadio('typebil');
        
        try {
            harbrikke = getSelectedRadio('brikke');
        } catch (error) {
            harbrikke = 'false';
        }

        try {
            registrering = getRegNr.value;
        } catch (error) {
            window.alert("du må skrive inn registrering")
        }

        try {
            passeringAntall = getPasseringer.value;
        } catch (error) {
            window.alert("Velg antall passeringer for denne bilen");
        }
        console.log(typebil);
        console.log(harbrikke);
        newOrder(typebil,harbrikke,registrering,passeringAntall);
    } catch (error) {
        window.alert("Du må velge biltype");
    }
});

window.addEventListener('load', function() {    //test
    newOrder('personbil','false','EV13875','1');
    newOrder('lastebil','true','NE81006','1');
    newOrder('lastebil','true','NE81006','2');
});
