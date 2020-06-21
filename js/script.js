let arrObj = [
    {
        fullName: {
            surname: 'xxx',
            firstName: 'yyy',
            middleName: 'zzz',
            newDate: new Date(2019, 05, 15),
            choose: true,
            unemploeer: false,
            test: {testname: 'testname1',
                testname2: false
            }
        }
    },
    {
        fullName: {
            surname: 'XXX',
            firstName: 'YYY',
            middleName: 'ZZZ',
            newDate: new Date(2020, 03, 17),
            choose: false,
            unemploeer: true,
            test: {testname: 'testname5',
                testname2: false
            }
        }
    },
    {
        fullName: {
            surname: 'xX',
            firstName: 'yY',
            middleName: 'zZ',
            newDate: new Date(2015, 03, 17),
            choose: true,
            unemploeer: false,
            test: {testname: 'testname5dfgh',
                testname2: true
            }
        }
    }
]

let localization = {
    'fullName.surname': 'Прізвище',
    'fullName.middleName': 'По-батькові'
}

let checkObj = {
    fullName: {
        surname: true,
        firstName: true,
        middleName: false,
        newDate: true,
        choose: true,
        unemploeer: false,
        test: {testname: true,
                testname2: false
        }
    }
}

//Find value property with path
function findProperty(resArray, obj, path){
    if(!path){
        path = ''
    }
    if(path[0] == '.') {
        path = path.substr(1)
    }
      
    for(key in obj){
        let value = obj[key];
        newPath = path + '.' + key;
        if(value == true){
            resArray.push(newPath)
        }
        if(typeof value == 'object'){
            findProperty(resArray, value, newPath);
        }
    }
}

//Find path 
function findPath(obj, path){
    let stringToPath = path.split('.');
    let result;

    for(let i = 0; i < stringToPath.length; i++){
        result = obj[stringToPath[i]];
        obj = result;
    }
    return result;        
}

function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth();
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
}

//Create object and add fields in it
function itemFunc (itemValue, locArr, objArr) {
    let nameValue = itemValue;
    let createObj = {}

    if(locArr[nameValue]){
        nameValue = locArr[nameValue]
    } else {
        let newPath = nameValue.split('.');
        nameValue = newPath[newPath.length - 1]
    };
    createObj.name = nameValue;

    for(let j = 0; j < objArr.length; j++){
        let propertyName = 'value' + (j + 1);
        let newValue = findPath(objArr[j], itemValue);

        if(newValue == true){
            newValue = 'Так'
        }
        if(newValue == false) {
            newValue = 'Ні'
        }
        if(newValue instanceof Date) {
            newValue = formatDate(newValue);
        }
        createObj[propertyName] = newValue;
    }
    return createObj;
}

let arrOfPath = [];
findProperty(arrOfPath, checkObj)

// Iterate over pathes of array and create main array
let resultObj = [];
for(let i = 0; i < arrOfPath.length; i++) {
    let newObj = itemFunc(arrOfPath[i], localization, arrObj);
    resultObj.push(newObj);
}
console.log(resultObj)