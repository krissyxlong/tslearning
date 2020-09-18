// 本文件为 5min 快速上手代码

class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person0 {
  firstName: string;
  lastName: string;
}

function greeter(person: Person0) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
console.log(111, user);

document.body.innerHTML = greeter(user);