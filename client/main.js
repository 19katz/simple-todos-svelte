import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';


Meteor.startup(() => {
  // on start, get the app and display it
  new App({
    target: document.getElementById('app')
  });
});