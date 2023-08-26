const input = document.querySelector('.to-do-input');
const form = document.querySelector('.app-header');
const todoList = document.querySelector('.to-do-list');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  todoApp.add(input.value);
  input.value = '';
})

class TodoApp {
  list = [];
  id = 0;
  renderItems() {
    const todoList = document.querySelector('.to-do-list');
    todoList.innerHTML = ``;
    this.list.forEach(elem => {
      const { id, lable } = elem;
      const node = document.createElement('div');
      node.setAttribute('class', `child-container`);
      node.setAttribute('id', `${id}`);
      node.innerHTML = `
      <div class="child-text">${lable}</div>
      <div class="child-buttons">
        <button class="accept-button btn">!</button>
        <button class="reject-button btn">×</button>
      </div>`;
      todoList.append(node);
    });
  }

  initItem(lable) {
    return {
      lable: lable,
      id: this.id++
    }
  }

  add(item) {
    const node = this.initItem(item);
    this.list.push(node);
    this.renderItems();
  }

  delete() {
    const todoList = document.querySelector('.to-do-list');
    todoList.addEventListener('click', (e) => {
      console.log(e);
    })
  }

}

const todoApp = new TodoApp();
todoApp.delete();
