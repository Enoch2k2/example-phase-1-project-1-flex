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

/** Templates **/

const mealListTemplate = () => {
  return `
  
  `
}

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

const renderMealListPage = () => {
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
  mealListLink().addEventListener('click', async (e) => 
  {
    e.preventDefault();
    await loadMeals();
    renderMealListPage();
  })
}

/******************/







/** WHEN THE DOM LOADS **/

document.addEventListener('DOMContentLoaded', () => {
  renderHomePage();
  homePageLinkEvent();
  mealListLinkEvent();
})