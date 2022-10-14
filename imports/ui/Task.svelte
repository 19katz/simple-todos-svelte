<script>
    export let task;

    // Meteor.call invokes a remote function (in this case, setIsChecked,
    // which is part of the tasksMethods methods defined in Meteor)
    // and sets the task's checked status to its opposite
    const toggleChecked = () =>
      Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);
  
    // Uses Meteor.call to remove a task
    const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<li>
    <!--Determines the appearance of the list item -- checkbox and then text.
    When the checkbox is checked, call the method toggleChecked from scripts -->
    <input
            type="checkbox"
            readonly
            checked={!!task.isChecked}
            on:click={toggleChecked}
    />
    <span>{ task.text }</span>
    <!--When the button for deletion is clicked, call the deleteThisTask method
    from scripts-->
    <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>