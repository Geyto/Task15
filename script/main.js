let cities = [];
let person = [];
let specializations = [];

Promise.all([fetch('cities.json'), fetch('person.json'), fetch('specializations.json'),]).then(async ([citiesResponse, personResponse, specializationsResponse]) => {
    const [citiesJson, personJson, specializationsJson] = await  Promise.all(
        [
            citiesResponse.json(),
            personResponse.json(),
            specializationsResponse.json(),
        ]
    );
    return [citiesJson, personJson, specializationsJson];
})
    .then(([citiesJson, personJson, specializationsJson]) => {
        cities = citiesJson;
        person = personJson;
        specializations = specializationsJson;
        console.log(getInfo.call(person[0]));
        // getInfoDesigner();
        // firstDevReact();
        // checkAgePerson();
        // backendDev();
        // highLvlDesigner();
        // topTeam();
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
    const city = cities.find((city) => city.id === this.personal.locationId);
    return `${this.personal.firstName} ${this.personal.lastName}, ${city.name}`;
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
    let onlyDesigner = addedNewKeyForDesigner.filter(item => {
        for (let i = 0; i < item.skills.length; i++) {
            if (item.specialization === 'designer' && item.skills[i].name === 'Figma') {
                return item
            }
        }
    })
    console.log(onlyDesigner);

}

function firstDevReact() {
    let DevReact = person.find(item => {
        for (i = 0; i < item.skills.length; i++) {
            if (item.skills[i].name === 'React') {
                return item
            }
        }
    })
    console.log(DevReact);
}

function checkAgePerson() {
    let checkAge = person.every(item => {
        person.forEach(item => {
            let dateParts = item.personal.birthday.split('.');
            let birthday = new Date(dateParts[2], dateParts[1], dateParts[0]);
            let today = new Date();
            let birthdayNewYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
            let age = today.getFullYear() - birthday.getFullYear();
            if (today < birthdayNewYear) {
                age -= 1;
            }
            return item.personal.age = age;
        })
        return item.personal.age > 18;
    })
    console.log(checkAge);
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
            for (let i = 0; i < item.request.length; i++) {
                if (item.request[i].name === 'Зарплата') {
                    let wantCash = item.request[i].value;
                    item.price = wantCash;
                }
            }
        }
        return item
    })
    let onlyBackend = arrayBackend.filter(item => {
        for (let i = 0; i < item.request.length; i++) {
            if (item.specialization === 'backend' && item.city === "Москва" && item.request[i].value === "Полная") {
                return item
            }
        }
    })
    let backendDevWantCash = onlyBackend.sort(function (a, b) {

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
            for (let i = 0; i < item.skills.length; i++) {
                if (item.skills[i].name === 'Figma') {
                    let lvlSkillFigma = item.skills[i].level;
                    item.levelFigma = lvlSkillFigma;
                }
                if (item.skills[i].name === 'Photoshop') {
                    let lvlSkillPhotoshop = item.skills[i].level;
                    item.levelPhotoshop = lvlSkillPhotoshop;
                }
            }
        }
        return item
    })
    let onlyHighLvlDes = arrayDesigner.filter(item => {
        if (item.specialization === 'designer' && item.levelFigma >= 6 && item.levelPhotoshop >= 6) {
            return item
        }
    })
    console.log(onlyHighLvlDes)
}

function topTeam() {
    let arrayPerson = person.map(item => {
        let specialization = specializations.find(function (specializationItem) {
            return specializationItem.id === item.personal.specializationId;
        });
        if (specialization && specialization.name) {
            item.specialization = specialization.name;
            for (let i = 0; i < item.skills.length; i++) {
                if (item.specialization === 'designer' && item.skills[i].name === 'Figma') {
                    let lvlSkillFigma = item.skills[i].level;
                    item.levelFigma = lvlSkillFigma;
                }
                if (item.specialization === 'frontend' && item.skills[i].name === 'Angular') {
                    let lvlSkillAngular = item.skills[i].level;
                    item.levelAngular = lvlSkillAngular;
                }
                if (item.specialization === 'backend' && item.skills[i].name === 'Go') {
                    let lvlSkillGo = item.skills[i].level;
                    item.levelGo = lvlSkillGo;
                }
            }
        }
        return item
    })
    let onlyDes = arrayPerson.filter(item => {
        if (item.specialization === 'designer' && item.levelFigma) {
            return item
        }
    });
    let onlyFront = arrayPerson.filter(item => {
        if (item.specialization === 'frontend' && item.levelAngular) {
            return item
        }
    });
    let onlyBack = arrayPerson.filter(item => {
        if (item.specialization === 'backend' && item.levelGo) {
            return item
        }
    });
    let onlyHighLvlDes = onlyDes.sort((a, b) => {
        return b.levelFigma - a.levelFigma
    })[0];
    let onlyHighLvlFront = onlyFront.sort((a, b) => {
        return b.levelAngular - a.levelAngular
    })[0];
    let onlyHighLvlBack = onlyBack.sort((a, b) => {
        return b.levelGo - a.levelGo
    })[0];

    console.log(onlyHighLvlDes);
    console.log(onlyHighLvlFront);
    console.log(onlyHighLvlBack);
}

