class Member{
    constructor(name, position, role) {
        this.name = name;
        this.position = position;
        this.role = role;
    }
}

class Team {
    constructor(id, name, colour) {
        this.id = id;
        this.name = name;
        this.colour = colour
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}

let teams = [];
let teamId = 0;

onClick('new-team-btn', () => {
    teams.push(new Team(teamId++, getValue('new-team-name'), getValue('new-team-colour')))
    drawDOM();
});

function onClick(id, action) {
    console.log("id:", id, "action:", action)
    let element = document.getElementById(id);
    console.log(element)
    element.addEventListener('click', action);
    return element
}

function getValue(id) {
    console.log(document.getElementById(id).value)
    return document.getElementById(id).value
}

//Code to Display the Data and Update the Display
function drawDOM() {
    let teamDiv = document.getElementById('teams')
    clearElement(teamDiv)
    for (let team of teams) {
        let table = createTeamTable(team);
        let title = document.createElement('h2')
        title.innerHTML = team.name;
        title.className = "d-flex justify-content-between";
        table.style.backgroundColor = team.colour;
        title.appendChild(createDeleteTeamButton(team))
        teamDiv.appendChild(title)
        teamDiv.appendChild(table)
        for (let member of team.members) {
            createMemberRow(team, table, member)
        }
    }
}

function createMemberRow(team, table, member) {
    let row = table.insertRow(2)
    row.insertCell(0).innerHTML = member.name
    row.insertCell(1).innerHTML = member.position
    row.insertCell(2).innerHTML = member.role
    let actions = row.insertCell(-1);
    actions.appendChild(createDeleteRowButton(team, member))
}

function createDeleteRowButton(team, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createDeleteTeamButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Team'
    btn.onclick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1)
        drawDOM();
    }
    return btn;
}

function createNewMemberButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        team.members.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`), getValue(`role-input-${team.id}`)));
        drawDOM();
    }
    return btn;
}

//Table Data is Compiled Here
function createTeamTable(team) {
    let table = document.createElement('table')
    table.setAttribute('class', 'table table-striped');
    //Table Header Code
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColumn = document.createElement('th');
    let roleColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    positionColumn.innerHTML = 'Position';
    roleColumn.innerHTML = 'Role';
    row.appendChild(nameColumn);
    row.appendChild(positionColumn);
    row.appendChild(roleColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let postionTh = document.createElement('th');
    let roleTh = document.createElement('th');
    let createTh = document.createElement('th');
    //Table Contents Code
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input-${team.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    //Dropdown Menu Code
    let roleInput = document.createElement('select');
    roleInput.setAttribute('id', `role-input-${team.id}`);
    roleInput.setAttribute('type', 'dropdown');
    roleInput.appendChild(new Option ("Assault", "Assault"))
    roleInput.appendChild(new Option ("Recon", "Recon"))
    roleInput.appendChild(new Option ("Defense", "Defense"))
    roleInput.appendChild(new Option ("Tank", "Tank"))
    roleInput.appendChild(new Option ("Support", "Support"))
    roleInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
    postionTh.appendChild(positionInput);
    roleTh.appendChild(roleInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh)
    formRow.appendChild(postionTh)
    formRow.appendChild(roleTh)
    formRow.appendChild(createTh)
    return table;
}



function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}