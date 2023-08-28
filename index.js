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
  render() {
    todoList.innerHTML = ``;
    this.list.forEach(elem => this.renderItem(elem));
  }

  renderItem({ id, lable }) {
    const node = document.createElement('li');
    node.setAttribute('class', `child-container`);
    node.setAttribute('id', id);
    node.innerHTML = `
    <div class="child-text">${lable}</div>
    <div class="child-buttons">
      <button class="accept-button btn">!</button>
      <button class="reject-button btn">×</button>
    </div>`;
    todoList.append(node);
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
    this.render();
  }

  delete(id) {
    this.list = this.list.filter((item) => item.id !== Number(id));
    this.render();
  }
}

const todoApp = new TodoApp();

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('reject-button')) {
    const itemId = e.target.closest('.child-container').id;
    todoApp.delete(itemId)
  }
})