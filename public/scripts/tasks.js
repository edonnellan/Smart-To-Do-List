// Client facing scripts here
$(() => {
    $.ajax({
      method: 'GET',
      url: '/api/tasks'
    })
    .done((response) => {
      const $tasksList = $('#tasks');
      $tasksList.empty();
      $tasksList.append(`<tr>
      <th>Id</th>
      <th>Title</th>
      <th>Categoty</th>
      <th>Completed</th>
      <th>Priority</th>
      <th>Date</th>
    </tr>`);
    console.log(response.tasks);
      for(const task of response.tasks) {
        // $(`<li class="task">`).text(task).appendTo($tasksList);
        ($tasksList).append(
          `<tr><td>${task.id}</td>
          <td>${task.title}</td>
          <td>${task.category}</td>
          <td>${task.is_completed}</td>
          <td>${task.priority}</td>
          <td>${task.date}</td></tr>`
          );
      }
    });
});
