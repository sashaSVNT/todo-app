const input = document.querySelector('.to-do-item');
const button = document.querySelector('.to-do-button');
const todoList = document.querySelector('.to-do-list');


button.addEventListener('click', (e) => {
  todoApp.add(input.value);
  input.value = '';
})

class TodoApp {
  list = [];
  id = 0;
  createLayout(value, id) {
    return `<div class="child-container" id="${id}">
      <div class="child-text">${value}</div>
      <div class="child-buttons">
        <button class="accept-button btn">
          !
        </button>
        <button class="reject-button btn">
          ×
        </button>
      </div>
    </div>`
  }

  initItem(lable) {
    return {
      lable: lable,
      id: this.id++
    }
  }

  add(item) {
    this.list.push(this.initItem(item));
    this.render();
  }
  render() {
    todoList.innerHTML = '';
    this.list.forEach((item) => todoList.innerHTML += this.createLayout(item.lable, item.id));

  }
  delete() {

  }
}

const todoApp = new TodoApp();
