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

onClick('new-team', () => {
    teams.push(new Team(teamId++, getValue('new-team-name')))
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element
}

function getValue(id) {
    return document.getElementById(id).value
}

//Code to Display the Data and Update the Display
function drawDOM() {
    let teamDiv = document.getElementById('teams')
    clearElement(teamDiv)
    for (team of teams) {
        let table = createTeamTable(team);
        let title = document.createElement('h2')
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team))
        teamDiv.appendChild(title)
        teamDiv.appendChild(table)
        for (member of team.members) {
            createMemberRow(team, table, member)
        }
    }
}

function createMemberRow(team, table, member) {
    let row = table.insertRow(3)
    row.insertCell(0).innerHTML = member.name
    row.insertCell(1).innerHTML = member.position
    row.insertCell(2).innerHTML = member.role
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton)
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
        team.member.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`), getValue(`role-input-${team.id}`)));
        drawDOM();
    }
    return btn;
}

//Table Data is Compiled Here
function createTeamTable(team) {
    let table = docuement.createElement('table')
    table.setAttribute('class', 'table table-dark table-striped');
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
    //Table Contents Code
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let postionTh = document.createElement('th');
    let roleTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input-${team.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    let roleInput = document.createElement('input');
    roleInput.setAttribute('id', `role-input-${team.id}`);
    roleInput.setAttribute('type', 'text');
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