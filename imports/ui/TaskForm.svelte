<script>
    let newTask = '';

    // Method for submitting in the task form
    const handleSubmit = () => {
      if (!newTask) return;

      // Users Meteor remote calls to call the insert method with the new task
      Meteor.call('tasks.insert', newTask);

      // Clear form
      newTask = '';
    }
</script>

<!--HTML code for the form, which calls handleSubmit on click-->
<form class="task-form" on:submit|preventDefault={handleSubmit}>
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <button type="submit">Add Task</button>
</form>