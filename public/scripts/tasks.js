// Client facing scripts here
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/tasks",
  }).done((response) => {
    console.log(response.tasks);

    $tasksList = $("#task-body");
    $tasksList.empty();
    for (const task of response.tasks) {
      $tasksList.append(
        `<tr><td>${task.id}</td>
          <td>${task.title}</td>
          <td>${task.category}</td>
          <td>${task.is_completed}</td>
          <td>${task.priority}</td>
          <td>${task.date}</td></tr>`
      );
    }
  });

  $("form").submit(function(event) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/tasks",
      success: (response) => {
        event.target.reset();

      }
    })
  })
});
