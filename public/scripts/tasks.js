// Client facing scripts here
let loadTasks;

$(() => {
  //this is document ready
  let tasks = [];
  const $tasksList = $("#tasks");
  let category = "all";
  $("#category-Shopping").on("click", () => {
    category = "Shopping";
    $("html,body").scrollTop(0);
    $('.current_page').html(`<i class="fa-solid fa-cart-shopping"></i> Shopping`);
    filterFunction();
  });
  $("#category-Books").on("click", () => {
    category = "Books";
    $("html,body").scrollTop(0);
    $('.current_page').html(`<i class="fa-solid fa-book"></i> Books`);
    filterFunction();
  });
  $("#category-Restaurants").on("click", () => {
    category = "Restaurants";
    $("html,body").scrollTop(0);
    $('.current_page').html(`<i class="fa-solid fa-utensils"></i> Restaurants`);
    filterFunction();
  });
  $("#category-Movies-TV").on("click", () => {
    category = "Movies/TV";
    $("html,body").scrollTop(0);
    $('.current_page').html(`<i class="fa-solid fa-film"></i> Movies/TV`);
    filterFunction();
  });
  $("#category-all").on("click", () => {
    category = "all";
    $("html,body").scrollTop(0);
    $('.current_page').text('Smart-To-Do-List');
    filterFunction();
  });
  $("#category-completed").on("click", () => {
    category = "completed";
    filterFunction();
    $('.tasks-list').css({'background-color': 'lightgray', 'border': 'gray'});
    $('.task-complete').css('display', 'none');
    $('.task-uncomplete').css('display', 'block');
    $('.task-edit').css('border', '1.5px solid darkgray');
    $('.task-edit').attr('disabled','disabled');
    $('.current_page').html(`<i class="fa-solid fa-list-check"></i> Completed Tasks`);
  });

  $(".task-uncomplete").on("submit", (event) => {
    // category = "completed"
    event.stopPropagation()
    console.log("string", $(this));
    // filterFunction();
  })

  const filterFunction = () => {
    // category filter
    $tasksList.empty();
    const filtered = tasks.filter((task) => {
      if (
        category === "all" &&
        task.is_completed === false &&
        task.is_deleted === false
      ) {
        return true;
      } else if (category === "completed") {
        return (task.is_completed === true && task.is_deleted === false)
      }
      return (
        task.category === category &&
        task.is_completed === false &&
        task.is_deleted === false
      );
    });
    console.log("filtered:", filtered);
    // tasks list
    for (const task of filtered) {
      let important = "";
      if (task.is_important) {
        important = `<i class="fa-solid fa-star"></i>`;
      }
      $tasksList.append(
        `<div class='tasks-list'>
          <div class='task-title'>${task.title}</div>
          <div class='task-category'>${task.category}</div>
          <div class='task-date'>${moment(task.date).format("MMM Do YY")}</div>
          <div class='task-date'>${moment(task.date).fromNow()}</div>
          <div class='task-priority'>${important}</div>
          <button class="task-edit">Edit</button>
          <form action="/tasks/${task.id}/complete" method="POST" class='task-complete'>
           <button type="submit" formaction="/tasks/${task.id}/complete" class="my-checkbox" name="my-checkbox">
           <i class="fa-solid fa-check"></i>
           </button>
           </form>
           <form action="/tasks/${task.id}/uncomplete" method="POST" class='task-uncomplete'>
           <button type="submit" formaction="/tasks/${task.id}/uncomplete" class="my-checkbox" name="my-checkbox">
           <i class="fa-solid fa-arrow-rotate-left" id="fa-arrow-rotate-left"></i>
           </button>
           </form>
         </div>

        <div class="edit-task">
          <form action="/tasks/${task.id}" method="POST" class="edit_task_form">
            <input type="hidden" name="task_id" value="${task.id}">
            <div class="inputs">
              <div class="input_item">
                <label for="task_name">Task Name:</label>
                <input type="text" name="task_name" value="${task.title}" required>
              </div>
              <div class="input_item">
                <label for="task_category">Task Category:</label>
                <select name="task_category">
                  <option value="Uncategorized" ${
                    task.category === "Uncategorized" ? "selected" : ""
                  }>Uncategorized</option>
                  <option value="Restaurants" ${
                    task.category === "Restaurants" ? "selected" : ""
                  }>Restaurants</option>
                  <option value="Shopping" ${
                    task.category === "Shopping" ? "selected" : ""
                  }>Shopping</option>
                  <option value="Movies/TV" ${
                    task.category === "Movies/TV" ? "selected" : ""
                  }>Movies/TV</option>
                  <option value="Books" ${
                    task.category === "Books" ? "selected" : ""
                  }>Books</option>
                </select>
              </div>
              <div class="input_item radio-btns">
                <label for="task_priority">Priority:</label>
                  <label class="container radio-yes">High
                  <input type="radio" name="task_priority"
                  ${task.is_important ? "checked" : ""}
                  value="true">
                  <span class="checkmark"></span>
                  </label>
                  <label class="container radio-no">None
                  <input type="radio" name="task_priority"
                  ${task.is_important ? "" : "checked"}
                   value="false">
                  <span class="checkmark"></span>
                  </label>
              </div>
            </div>
            <div class="btns">
              <button type="submit" formaction="/tasks/${
                task.id
              }" id="save-btn">Save</button>
              <button type="submit" formaction="/tasks/${
                task.id
              }/delete" id="del-btn">Delete</button>
            </div>
          </form>
        </div>`
      );
    }
  };
  loadTasks = function () {
    $.ajax({
      method: "GET",
      url: "/api/tasks",
    }).done((response) => {
      tasks = response.tasks;
      filterFunction();
    });
  };
  loadTasks();

});
