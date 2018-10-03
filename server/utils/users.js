[{
  id: '/#123qweasdzxc',
  name: 'John',
  room: 'The First Room'
}]

// addUser (id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// CLASSES
class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    // insert the user into array
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
    // return user that was removed
    // this.users.
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    // map lets us the value we want to use instead
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// // CLASSES
// class Person {
//   // construction function
//   constructor (name, age) {
//     // 'this' refers to the instance as opposed to the class.
//     this.name = name;
//     this.age = age;
//   }
//
//   // METHODS
//   getUserDescription () {
//     return `${this.name} is ${this.age} years old.`
//   }
// }
//
// var me = new Person('John', 42);
// var description = me.getUserDescription();
// console.log(description);
