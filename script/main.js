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
        processData();
    })

function processData() {
    console.log('Task 2:');
    console.log(getInfo.call(persons[0]));
    console.log('Task 3:');
    console.log(getInfoDesigner());
    console.log('Task 4:');
    console.log(firstDevReact());
    console.log('Task 5:');
    console.log(checkAgePerson());
    console.log('Task 6:');
    console.log(backendDev(persons[0]));
    console.log('Task 7:');
    console.log(highLvlDesigner());
    console.log('Task 8:');
    const bestTeam = topTeam();
    bestTeam.forEach((dev) => console.log(getInfo.call(dev)));
}
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

    const arrayTopTeam = [];
// best designer
    const figmaDes = persons.filter((person) =>{
        return isDesignerPersons(person) && hasFigmaSkill(person);
    })
    let bestDes = null
    bestDes = figmaDes.reduce((result, current) =>{
        let prev = getFigmaSkills(result);
        let curr = getFigmaSkills(current);
        return prev > curr ? result : current
    }, figmaDes[0]);
// best frontend developer
    let bestFront = null;
    const frontAngular = persons.filter((person) => {
        return isFrontDev(person) && hasAngularSkill(person)
    });

    bestFront = frontAngular.reduce((result, current) =>{
        let prev = getAngularSkill(result);
        let curr = getAngularSkill(current);
        return prev > curr ? result : current;
    }, frontAngular[0]);
// best backend developer
    let bestBack = null;
    const backGo = persons.filter((person) => {
        return isBackDev(person) && hasGoSkill(person)
    });

    bestBack = backGo.reduce((result, current) =>{
        let prev = getGoSkill(result);
        let curr = getGoSkill(current);
        return prev > curr ? result : current;
    }, backGo[0]);
    arrayTopTeam.push(bestDes, bestFront, bestBack);
    return arrayTopTeam
}

//Helpers
const isFrontDev = (person) => {
    const frontend = specializations.find((item) => item.name.toLowerCase() === 'frontend');
    return person.personal.specializationId === frontend.id
};
const hasAngularSkill = (person) => {
    return person.skills.find((item) => item.name.toLowerCase() === 'angular')
};
const getAngularSkill = (person) => {
    const angularSkill = person.skills.find((item) => item.name.toLowerCase() === 'angular');
    return angularSkill ? angularSkill.level :null
}
const isDesignerPersons = (person) => {
    const designer = specializations.find((specialization) => specialization.name.toLowerCase() === 'designer');
    return person.personal.specializationId === designer.id
}
const hasFigmaSkill = (person) => {
    return  person.skills.find((item) => item.name.toLowerCase() === 'figma')
}
const getFigmaSkills = (person) => {
    const figmaSkill = person.skills.find((item) => item.name.toLowerCase() === 'figma');
    return figmaSkill ? figmaSkill.level : null
}
const isBackDev = (person) => {
    const backend = specializations.find((item) => item.name.toLowerCase() === 'backend');
    return person.personal.specializationId === backend.id
};
const hasGoSkill = (person) => {
    return person.skills.find((item) => item.name.toLowerCase() === 'go')
};
const getGoSkill = (person) => {
    const goSkill = person.skills.find((item) => item.name.toLowerCase() === 'go');
    return goSkill ? goSkill.level :null
}
