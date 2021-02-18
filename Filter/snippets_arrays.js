let array1 = [1,2,3,4,5];
let array2 = [2,1,9,3,4,4];


// summer array
    function sumOfArray(arr_var) {
        let sum = arr_var.reduce(function(a, b){
            return a + b;
        }, 0);
        return sum;
    }
    console.log("sumOfArray(array1):", sumOfArray(array1) );
// --


let objectArray1 = [
    {Name: "BBB", Surname: "EEE"},
    {Name: "AAA", Surname: "ZZZ"},
    {Name: "AAA", Surname: "BBB"},
    {Name: "CCC", Surname: "AAA"}
];


// sorter arrayer

 // etter verdi, fungerer for object arrays
    function dynamicSort(property) {
        let sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
            * and you may want to customize it to your needs
            */
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    console.log( objectArray1.sort(dynamicSort("Name")) );

 // sorter objectarray som er en del av en class etter FLERE argumenter
    function dynamicSortMultiple() {
        /*
        * save the arguments object as it will be overwritten
        * note that arguments object is an array-like object
        * consisting of the names of the properties to sort by
        */
        let props = arguments;
        return function (obj1, obj2) {
            let i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
            * as long as we have extra properties to compare
            */
            while(result === 0 && i < numberOfProperties) {
                result = dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    }

    class MyArray extends Array {
        sortBy(...args) {
            return this.sort(dynamicSortMultiple(...args));
        }
    }

    console.log(MyArray.from(objectArray1).sortBy("Name", "Surname"));
    console.log(MyArray.from(objectArray1).sortBy("-Name", "Surname"));