
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
        const data = response.newTask;
        console.log(response.newTask);
        loadTasks();
      }
    })
  }))
});
