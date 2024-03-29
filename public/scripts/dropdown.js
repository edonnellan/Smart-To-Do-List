
$(document).ready(function (){
  // new task dropdown
  $('.new-task-btn').click(function(){
    $('.new_task_dropdown').slideToggle();
  });

  // submit new task form
  $('#new_task_form').submit((function(event){
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: $(this).serialize(),
      success: (response) => {
        console.log(response.newTask);
        loadTasks();
        $('input[name=task_name]').val('');
        $('#task_category').val('Uncategorized');
        $('#task_priority').val('1');
      }
    })
  }))

  // edit task form
  $(document).on('click', '.task-edit', function() {
    console.log("btn clicked");
    $(this).closest('.tasks-list').next('.edit-task').slideToggle();
  });


});
