import { Mongo } from 'meteor/mongo';
 
// create MongoDB collection for the tasks
export const TasksCollection = new Mongo.Collection('tasks');