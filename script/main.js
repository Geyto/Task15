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
        console.log(getInfo.call(persons[0]));
        console.log(getInfoDesigner());
        console.log(firstDevReact());
        console.log(checkAgePerson());
        console.log(backendDev(persons[0]));
        console.log(highLvlDesigner());
        topTeam();
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
    const designer = specializations.find((specialization) => specialization.name.toLowerCase() === 'designer');
    const desFigma = persons.filter((person) => {
        return  person.skills.find((skill) => skill.name.toLowerCase() === 'figma' && person.personal.specializationId === designer.id);
    });
    const topDes = desFigma.sort((a, b) => {
        for (let i = 0; i < a.skills.length; i++){
            if (a.skills[i].name === 'Figma' && b.skills[i].name === 'Figma'){
                return +b.skills[i].level - a.skills[i].level;
            }
        }}
    )[0]
    console.log(topDes)
    const front = specializations.find((specialization) => specialization.name.toLowerCase() === 'frontend');
    const frontAngular = persons.filter((person) => {
        return  person.skills.find((skill) => skill.name.toLowerCase() === 'angular' && person.personal.specializationId === front.id);
    });
    const topFront = frontAngular.sort(
        (a, b) => {
            for (let i = 0; i < a.skills.length; i++){
            if (a.skills[i].name === 'Angular' && b.skills[i].name === 'Angular'){
                return +b.skills[i].level - a.skills[i].level;
            }
        }}
    )[0]
console.log(topFront)

    const back = specializations.find((specialization) => specialization.name.toLowerCase() === 'backend');
    const backGo = persons.filter((person) => {
        return  person.skills.find((skill) => skill.name.toLowerCase() === 'go' && person.personal.specializationId === back.id);
    });
    const topBack = backGo.sort(
        (a, b) => {
            for (let i = 0; i < a.skills.length; i++){
                if (a.skills[i].name === 'Go' && b.skills[i].name === 'Go'){
                    return +b.skills[i].level - a.skills[i].level;
                }
            }}
    )[0]
    console.log(topBack)
}

