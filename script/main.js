let cities = [];
let persons = [];
let specializations = [];

Promise.all([fetch('cities.json'), fetch('person.json'), fetch('specializations.json'),]).then(async ([citiesResponse, personResponse, specializationsResponse]) => {
    const [citiesJson, personJson, specializationsJson] = await Promise.all([citiesResponse.json(), personResponse.json(), specializationsResponse.json(),]);
    return [citiesJson, personJson, specializationsJson];
})
    .then(([citiesJson, personJson, specializationsJson]) => {
        cities = citiesJson;
        persons = personJson;
        specializations = specializationsJson;
        // console.log(getInfo.call(persons[0]));
        // console.log(getInfoDesigner());
        // console.log(firstDevReact());
        // console.log(checkAgePerson());
        // console.log(backendDev(persons[0]));
        console.log(highLvlDesigner());
        // topTeam();
    })

function getInfo() {
    const city = cities.find((city) => city.id === this.personal.locationId);
    return `${this.personal.firstName} ${this.personal.lastName}, ${city.name}`;
}

function getInfoDesigner() {
    const designer = specializations.find((specialization) => specialization.name.toLowerCase() === 'designer');
    return persons.filter((person) => {
        return (
            person.skills.find((skill) => skill.name.toLowerCase() === 'figma' && person.personal.specializationId === designer.id));
    });
}

function firstDevReact() {
    const frontDev = specializations.find((specialization) => specialization.name.toLowerCase() === 'frontend');
    return persons.filter((person) => {
        return (
            person.skills.find((skill) => skill.name.toLowerCase() === 'react' && person.personal.specializationId === frontDev.id));
    })[0];
}

function checkAgePerson() {
    return persons.every(({personal: {birthday}}) => {
        const bd = new Date(birthday);
        const ageInMs = Date.now()-bd.getTime();
        const ageInDate = new Date(ageInMs);
        const personAge = ageInDate.getUTCFullYear() - 1970;
        return personAge > 18;
    })
}

function backendDev() {
    const backendDev = specializations.find((specialization) => specialization.name.toLowerCase() === 'backend');
    const city = cities.find((city) => city.name === 'Москва');
    const arrayBackDewMoscow = persons.filter((person) => {
        return (
            person.request.find((request) => request.value === 'Полная' && person.personal.specializationId === backendDev.id && person.personal.locationId === city.id));
    });
    return  arrayBackDewMoscow.sort(function (a,b){
        return a.request[0].value - b.request[0].value
    })
}

function highLvlDesigner() {
    const designer = specializations.find((specialization) => specialization.name.toLowerCase() === 'designer');
    const firstfilter = persons.filter((person) => {
         return  person.skills.find((skill) => skill.name.toLowerCase() === 'figma' && person.personal.specializationId === designer.id && skill.level >= 6);
    });
    return firstfilter.filter((person) => {
        return  person.skills.find((skill) => skill.name.toLowerCase() === 'photoshop' && person.personal.specializationId === designer.id && skill.level >= 6);
    });

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

