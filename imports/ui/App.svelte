<script>
  import { TasksCollection } from '../db/TasksCollection';
  import { Meteor } from 'meteor/meteor';
  import Task from './Task.svelte';
  import TaskForm from './TaskForm.svelte';

  let hideCompleted = false;
  // Filter out todos that are checked
  const hideCompletedFilter = { isChecked: { $ne: true } };

  // define counter for # of incomplete tasks (displayed at the title)
  let incompleteCount;
  let pendingTasksTitle = '';
  // define list of tasks
  let tasks = [];
  let isLoading = true;

  // server sends records to the client. Records are stored in local
  // collections
  const handler = Meteor.subscribe('tasks');
  // Starts a reactive statement, which runs after other script code
  // so that changed values render
  $m: {
    isLoading = !handler.ready();

    // Define a filter for hiding completed tasks
    const pendingOnlyFilter = { ...hideCompletedFilter};
    const noFilter = {};

    // If hideCompleted is true, then use the filter to hide
    // those tasks -- otherwise, use no filter and display
    // the tasks sorted in reverse order of creation date 
    // (new tasks show up first)
    tasks = TasksCollection.find(
            hideCompleted ? pendingOnlyFilter : noFilter,
            { sort: { createdAt: -1 } }
        ).fetch();

    // Update the incomplete count by counting the number of tasks
    // that are pending
    incompleteCount = TasksCollection.find(pendingOnlyFilter).count();

    // If the count is > 0, then display it
    pendingTasksTitle = `${
      incompleteCount ? ` (${incompleteCount})` : ''
    }`;
  }

  // Based on the toggled value, determine whether
  // to hide the completed todos or not.
  const setHideCompleted = value => {
    hideCompleted = value;
  };
</script>

<!--HTML code for the app, which is displayed in main.html-->
<div class="app">
    <header>
        <div class="app-bar">
            <div class="app-header">
                <!--From above, display # of pending tasks if > 0-->
                <h1>📝️ To Do List {pendingTasksTitle}</h1>
            </div>
        </div>
    </header>

    <div class="main">
      <!--First, display the task form for inputting tasks-->
      <TaskForm />

      <!--Filter to toggle the hideCompleted variable, which then determines
      whether only pending tasks are shown-->
      <div class="filter">
          <button on:click={() => setHideCompleted(!hideCompleted)}>
              {hideCompleted ? 'Show All' : 'Hide Completed'}
          </button>
      </div>

      <!--Display a loading screen if still loading-->
      {#if isLoading}
          <div class="loading">loading...</div>
      {/if}

      <!--Display each of the tasks (along with their associated buttons,
      which are defined in Task).-->
      <ul class="tasks">
        {#each tasks as task (task._id)}
            <Task task={task} />
        {/each}
      </ul>
    </div>
</div>
