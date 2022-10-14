import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

// Code for the server/backend.

// insertTask method inserts a task by its taskText
// into the MongoDB collection
const insertTask = (taskText) =>
  TasksCollection.insert({
    text: taskText,
    createdAt: new Date(),
  });

Meteor.startup(() => {
  // On startup, add some default tasks if there are none in the collection
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText));
  }
});