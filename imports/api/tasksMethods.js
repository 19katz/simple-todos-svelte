import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

// Defines the insert, remove, and toggle methods for tasks in the todo list
Meteor.methods({
  'tasks.insert'(text) {
    // check that the text is a string
    check(text, String);
    // insert task into MongoDB collection with its text and date
    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });
  },

  // Use taskId to remove the task
  'tasks.remove'(taskId) {
    // check the task ID is a string
    check(taskId, String);

    // find the task from its ID
    const task = TasksCollection.findOne({ _id: taskId});

    // If the task isn't found, then throw an error
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // Otherwise, remove the task
    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    // Check that the task ID is a string and that
    // isChecked is a boolean
    check(taskId, String);
    check(isChecked, Boolean);

    // Get the task by ID
    const task = TasksCollection.findOne({ _id: taskId});

    // If it does not exist, throw an error.
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // Otherwise, use the collection's update method
    // and reactive statements to set isChecked
    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});