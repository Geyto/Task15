let cities = [];
let person = [];
let specializations = [];

Promise.all(
    [
        fetch('cities.json'),
        fetch('person.json'),
        fetch('specializations.json'),
    ]
).then(async ([citiesResponse, personResponse, specializationsResponse]) => {
    const citiesJson = await citiesResponse.json();
    const personJson = await personResponse.json();
    const specializationsJson = await specializationsResponse.json();
    return [citiesJson, personJson, specializationsJson];
})
    .then(response => {
        cities = response[0];
        person = response[1];
        specializations = response[2];
        // getInfo.call(person);
        // getInfoDesigner();
        // firstDevReact();
        // checkAgePerson();
        // backendDev();
        highLvlDesigner();
    })


// function getInfo() {
//
//     let newArrayWithCity = person.map(item => {
//         let city = cities.find( function (cityItem) {
//             return  cityItem.id === item.personal.locationId;
//         });
//         if (city && city.name) {
//             item.city = city.name
//         }
//         return item;
//     })
//     newArrayWithCity.forEach(arrayWithPersonalInfo =>{
//         let infoAboutPerson = arrayWithPersonalInfo.personal.firstName + ' ' + arrayWithPersonalInfo.personal.lastName + ', ' + arrayWithPersonalInfo.city;
//         console.log(infoAboutPerson);
//     })
//
// }
function getInfo() {
    let newArrayWithCity = person.map(item => {
        let city = cities.find(function (cityItem) {
            return cityItem.id === item.personal.locationId;
        });
        if (city && city.name) {
            item.city = city.name;
        }
        return item;
    })
    newArrayWithCity.forEach(item => {
        item.getInfoPersonal = getInfoPersonalConsole;
    })

    function getInfoPersonalConsole() {
        return this.personal.firstName + ' ' + this.personal.lastName + ', ' + this.city;
    }

    for (let i = 0; i < newArrayWithCity.length; i++) {
        console.log(newArrayWithCity[i].getInfoPersonal());
    }
}
function getInfoDesigner() {
    let addedNewKeyForDesigner = person.map(item => {
        let specialization = specializations.find(function (specializationItem) {
            return specializationItem.id === item.personal.specializationId;
        });
        if (specialization && specialization.name) {
            item.specialization = specialization.name;
        }
            return item
    })
    let onlyDesigner = addedNewKeyForDesigner.filter(item =>{
        for (let i = 0; i < item.skills.length; i ++){
            if (item.specialization === 'designer' && item.skills[i].name === 'Figma'){
                return item
            }
        }
    })
    console.log(onlyDesigner)

}
function firstDevReact() {
    let DevReact = person.find(item => {
        for (i = 0; i < item.skills.length; i++){
            if (item.skills[i].name === 'React'){
                return item
            }
        }
    })
    console.log(DevReact);
}
function checkAgePerson() {
    let checkAge = person.every(item => {
        person.forEach(item =>{
            let dateParts = item.personal.birthday.split('.');
            let birthday = new Date( dateParts[2] , dateParts[1] , dateParts[0]);
            let today = new Date();
            let birthdayNewYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
            let age = today.getFullYear() - birthday.getFullYear();
            if (today < birthdayNewYear){
                age -= 1;
            }
            return  item.personal.age = age;
        })
        return  item.personal.age > 18;
    })
    console.log(checkAge)
}
function backendDev() {
    let arrayBackend = person.map(item => {
        let specialization = specializations.find(function (specializationItem) {
            return specializationItem.id === item.personal.specializationId;
        });
        let city = cities.find(function (cityItem) {
            return cityItem.id === item.personal.locationId;
        });
        if (specialization && specialization.name && city && city.name) {
            item.specialization = specialization.name;
            item.city = city.name
            for(let i = 0; i < item.request.length; i++){
                if(item.request[i].name === 'Зарплата'){
                    let wantCash = item.request[i].value;
                    item.price = wantCash;
                }
            }
        }
        return item
    })
    let onlyBackend = arrayBackend.filter(item =>{
        for (let i = 0; i < item.request.length; i ++){
            if (item.specialization === 'backend' && item.city === "Москва" && item.request[i].value === "Полная"){
                return item
            }
        }
    })
    let backendDevWantCash = onlyBackend.sort(function (a, b) {
        if (a.price > b.price) {
            return 1; }
        if (a.price < b.price) {
            return -1; }
        return 0;
    })
    console.log(backendDevWantCash)
}
function highLvlDesigner() {
    let arrayDesigner = person.map(item => {
        let specialization = specializations.find(function (specializationItem) {
            return specializationItem.id === item.personal.specializationId;
        });
        if (specialization && specialization.name) {
            item.specialization = specialization.name;
            for(let i = 0; i < item.skills.length; i++){
                if(item.skills[i].name === 'Figma'){
                    let lvlSkillFigma = item.skills[i].level;
                    item.levelFigma = lvlSkillFigma;
                }
                if (item.skills[i].name === 'Photoshop'){
                    let lvlSkillPhotoshop = item.skills[i].level;
                    item.levelPhotoshop = lvlSkillPhotoshop;
                }
            }
        }
        return item
    })
    let onlyHighLvlDes = arrayDesigner.filter(item =>{
        if (item.specialization === 'designer' && item.levelFigma >= 6 && item.levelPhotoshop >= 6){
            return item
        }
    })
    console.log(onlyHighLvlDes)
}
