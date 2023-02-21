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

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element
}