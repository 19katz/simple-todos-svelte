import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

// Publish method publishes records to the client
Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find();
});