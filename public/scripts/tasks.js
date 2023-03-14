// Client facing scripts here
$(() => { //this is document ready
  let tasks = [];
  const $tasksList = $('#tasks');
  let category = 'all';
  $('#category-products').on('click', ()=>{
    category = 'products';
    filterFunction();
  });
  $('#category-books').on('click', ()=>{
    category = 'books';
    filterFunction();
  });
  $('#category-food').on('click', ()=>{
    category = 'food';
    filterFunction();
  });
  $('#category-movies-tv').on('click', ()=>{
    category = 'movies_tv';
    filterFunction();
  });
  $('#category-all').on('click', ()=>{
    category = 'all';
    filterFunction();
  });

  const filterFunction = () => {
    $tasksList.empty();
    $tasksList.append(`<tr>
    <th>Id</th>
    <th>Title</th>
    <th>Categoty</th>
    <th>Completed</th>
    <th>Priority</th>
    <th>Date</th>
  </tr>`);

    const filtered = tasks.filter((task) => {
      if (category === 'all') {
        return true
      }
      return task.category === category;
    });
    for (const task of filtered) {
      if (task.is_completed !== true)
      ($tasksList).append(
        `<tr class="task-row row-${task.id}"><td>${task.id}</td>
      <td>${task.title}</td>
      <td>${task.category}</td>
      <td>${task.is_completed}</td>
      <td>${task.priority}</td>
      <td>${task.date}</td></tr>`
      );
    }
  };

  $.ajax({
    method: 'GET',
    url: '/api/tasks'
  })
    .done((response) => {
      tasks = response.tasks;
      console.log(response.tasks);
      filterFunction();
    });
});
