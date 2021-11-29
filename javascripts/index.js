/** 
  * First of all, you want to explain to yourself the full feature
  * Break down feature with (3 question rule):
    * At what time can i do this event? (domcontentloaded)
    * What's going to trigger this event? (click)
    * effect (display home page)


**/

/** Globals **/
const baseUrl = 'http://localhost:3000';
let meals = [];

/** NODE Getters **/
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById('home-page-link');
const mealListLink = () => document.getElementById('meal-list-link');
const mealFormLink = () => document.getElementById('meal-form-link');
const dateInput = () => document.getElementById('date');
const mealInput = () => document.getElementById('meal');
const nameInput = () => document.getElementById('name');
const dietInput = () => document.getElementById('diet');

/** Templates **/

// const mealListTemplate = () => {
//   return `
  
//   `
// }

const mealTemplate = (meal) => {
  const tr = document.createElement('tr');
  const tdDate = document.createElement('td');
  const tdMeal = document.createElement('td');
  const tdName = document.createElement('td');
  const tdDiet = document.createElement('td');
  tdDate.innerText = meal.date;
  tdMeal.innerText = meal.meal;
  tdName.innerText = meal.name;
  tdDiet.innerText = meal.diet;
  tr.appendChild(tdDate)
  tr.appendChild(tdMeal)
  tr.appendChild(tdName)
  tr.appendChild(tdDiet);
  return tr;
}

/** Renderers **/

const renderHomePage = () => {
  mainDiv().innerHTML = ''
  const h1 = document.createElement('h1');
  h1.classList.add('center-align');
  h1.innerText = 'Welcome to our Meal Planner'
  mainDiv().appendChild(h1);
}

const renderMealListPage = async () => {
  await loadMeals();
  mainDiv().innerHTML = '';
  const h1 = document.createElement('h1');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const thDate = document.createElement('th');
  const thMeal = document.createElement('th');
  const thMealName = document.createElement('th');
  const thDiet = document.createElement('th');
  const tbody = document.createElement('tbody');
  h1.innerText = 'Meal List'
  thDate.innerText = 'Date';
  thMeal.innerText = 'Meal';
  thMealName.innerText = 'Meal Name';
  thDiet.innerText = 'Diet';
  table.classList.add('highlight');
  tr.appendChild(thDate);
  tr.appendChild(thMeal);
  tr.appendChild(thMealName);
  tr.appendChild(thDiet);
  thead.appendChild(tr);
  table.appendChild(thead);
  meals.forEach(meal => tbody.appendChild(mealTemplate(meal)))
  table.appendChild(tbody);
  mainDiv().appendChild(h1);
  mainDiv().appendChild(table);
}

const renderMealForm = () => {
  const h1 = document.createElement('h1');
  const form = document.createElement('form');
  const dateDiv = document.createElement('div');
  const dateInput = document.createElement('input');
  const dateLabel = document.createElement('label');
  const mealDiv = document.createElement('div');
  const mealInput = document.createElement('input');
  const mealLabel = document.createElement('label');
  const nameDiv = document.createElement('div');
  const nameInput = document.createElement('input');
  const nameLabel = document.createElement('label');
  const dietDiv = document.createElement('div');
  const dietInput = document.createElement('input');
  const dietLabel = document.createElement('label');
  const submitButton = document.createElement('input');

  h1.className = 'center-align';
  dateDiv.className = 'input-field';
  mealDiv.className = 'input-field';
  nameDiv.className = 'input-field';
  dietDiv.className = 'input-field';
  submitButton.className = 'waves-effect waves-light btn';

  dateInput.setAttribute('id', 'date');
  dateInput.setAttribute('type', 'text');
  dateLabel.setAttribute('for', 'date');
  mealInput.setAttribute('id', 'meal');
  mealInput.setAttribute('type', 'text');
  mealLabel.setAttribute('for', 'meal');
  nameInput.setAttribute('id', 'name');
  nameInput.setAttribute('type', 'text');
  nameLabel.setAttribute('for', 'name');
  dietInput.setAttribute('id', 'diet');
  dietInput.setAttribute('type', 'text');
  dietLabel.setAttribute('for', 'diet');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Create Meal');

  h1.innerText = 'Create Meal';
  dateLabel.innerText = 'Date'
  mealLabel.innerText = 'Meal'
  nameLabel.innerText = 'Name'
  dietLabel.innerText = 'Diet'

  dateDiv.appendChild(dateInput);
  dateDiv.appendChild(dateLabel);
  mealDiv.appendChild(mealInput);
  mealDiv.appendChild(mealLabel);
  nameDiv.appendChild(nameInput);
  nameDiv.appendChild(nameLabel);
  dietDiv.appendChild(dietInput);
  dietDiv.appendChild(dietLabel);


  form.appendChild(dateDiv);
  form.appendChild(mealDiv);
  form.appendChild(nameDiv);
  form.appendChild(dietDiv);
  form.appendChild(submitButton);

  form.addEventListener('submit', submitFormEvent);

  mainDiv().appendChild(h1);
  mainDiv().appendChild(form);

      // <form>
      //   <div class="input-field">
      //     <input id="date" type="text">
      //     <label for="date">Date</label>
      //   </div>
      //   <div class="input-field">
      //     <input id="meal" type="text">
      //     <label for="meal">Meal</label>
      //   </div>
      //   <div class="input-field">
      //     <input id="name" type="text">
      //     <label for="name">Name</label>
      //   </div>
      //   <div class="input-field">
      //     <input id="diet" type="text">
      //     <label for="diet">Diet</label>
      //   </div>
      //   <input type="submit" value="Create Meal" class="waves-effect waves-light btn">
      // </form>
}

/** Events **/

const loadMeals = async () => {
  const resp = await fetch(baseUrl + '/meals')
  const data = await resp.json();
  meals = data;
}

const homePageLinkEvent = () => {
  homePageLink().addEventListener('click', (e) => 
  {
    e.preventDefault();
    renderHomePage();
  })
}

const mealListLinkEvent = () => {
  mealListLink().addEventListener('click', (e) => 
  {
    e.preventDefault();
    
    renderMealListPage();
  })
}

const mealFormLinkEvent = () => {
  mealFormLink().addEventListener('click', (e) => {
    e.preventDefault();
    renderMealForm();
  })
}

const submitFormEvent = e => {
  e.preventDefault();
  // const [date, meal, name, diet] = e.target.children;
  console.log('date', dateInput().value)
  console.log('meal', mealInput().value)
  console.log('name', nameInput().value)
  console.log('diet', dietInput().value)
  fetch('http://localhost:3000/meals', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: dateInput().value,
      meal: mealInput().value,
      name: nameInput().value,
      diet: dietInput().value
    })
  })
  .then(resp => resp.json())
  .then(meal => {
    renderMealListPage();
  })
}

/******************/







/** WHEN THE DOM LOADS **/

document.addEventListener('DOMContentLoaded', () => {
  // renderHomePage();
  homePageLinkEvent();
  mealListLinkEvent();
  mealFormLinkEvent();
})