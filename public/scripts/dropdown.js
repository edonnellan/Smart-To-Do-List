
$(document).ready(function (){

  $('#new-task').click(function(){
    $('.new_task_dropdown').slideToggle();
  });

  $('#new_task_form').submit((function(event){
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/tasks",
      data: $(this).serialize(),
      success: (response) => {
        console.log(response.newTask);
        loadTasks();
      }
    })

    $('input[name=task_name]').val('');
    $('#task_category').val('uncategorized');
    $('#task_priority').val('1');
  }))
});
