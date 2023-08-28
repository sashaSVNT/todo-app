const input = document.querySelector('.to-do-input');
const form = document.querySelector('.app-header');
const todoList = document.querySelector('.to-do-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  todoApp.add(input.value);
  input.value = '';
})

class TodoApp {
  constructor() {
    let loadedData = {};
    if (localStorage.getItem("class")) {
      loadedData = JSON.parse(localStorage.getItem("class"));
    }
    Object.assign(this, {
      list: [],
      id: 0
    }, loadedData);
  }
  render() {
    todoList.innerHTML = ``;
    this.list.forEach(elem => this.renderItem(elem));
    localStorage.class = JSON.stringify(todoApp);
  }

  renderItem({ id, lable, important }) {
    const node = document.createElement('li');
    node.classList.add('child-container');
    node.setAttribute('id', id);
    if (important) {
      node.classList.add('important');
    }
    const childText = document.createElement('div');
    childText.classList.add('child-text');
    childText.innerText = lable;
    const childButtons = document.createElement('div');
    childButtons.classList.add('child-buttons');
    const impButton = document.createElement('button');
    impButton.classList.add('imp-button', 'btn');
    impButton.textContent = '!';
    const rejectButton = document.createElement('button');
    rejectButton.classList.add('reject-button', 'btn');
    rejectButton.textContent = '×';
    childButtons.append(impButton, rejectButton);
    node.append(childText, childButtons);
    todoList.append(node);
  }

  initItem(lable) {
    return {
      lable: lable,
      id: this.id++,
      important: false
    }
  }

  add(item) {
    const node = this.initItem(item);
    this.list.push(node);
    this.render();
  }

  delete(id) {
    this.list = this.list.filter((item) => item.id !== Number(id));
    this.render();
  }

  toImportant(id) {
    const index = this.list.findIndex(el => el.id === Number(id));
    this.list[index].important = !this.list[index].important;
    this.render();
  }
}

const todoApp = new TodoApp();
todoApp.render();

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('reject-button')) {
    const itemId = e.target.closest('.child-container').id;
    todoApp.delete(itemId)
  }
  if (e.target.classList.contains('imp-button')) {
    const itemId = e.target.closest('.child-container').id;
    todoApp.toImportant(itemId)
  }
})


