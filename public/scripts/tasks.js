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


    const filtered = tasks.filter((task) => {
      if (category === 'all') {
        return true
      }
      return task.category === category;
    });
    for (const task of filtered) {
      let dateData = task.date;
      let priorityColor = "";
      if (task.priority === 1) {
        priorityColor = "🔴";
      } else if (task.priority === 2) {
        priorityColor = "🟡";
      } else {
        priorityColor = "🟢";
      }
      ($tasksList).append(
        `<div class='tasks-list'>
          <div class='task-title'>${task.title}</div>
          <div class='task-category'>${task.category}</div>
          <div class='task-date'>${task.date}</div>
          <div class='task-date'>${task.time}</div>
          <div class='task-priority'>${priorityColor}</div>
          <button class="task-edit">Edit</button>
        </div>`
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
