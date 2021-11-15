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

const homePageTemplate = () => {
  return `
    <h1 class="center-align">Welcome to our Meal Planner</h1>
  `
}

const mealListTemplate = () => {
  return `
  <h1>Meal List</h1>
  <table class="highlight">
    <thead>
      <tr>
          <th>Date</th>
          <th>Meal</th>
          <th>Meal Name</th>
          <th>Diet</th>
      </tr>
    </thead>
    <tbody>
      ${ renderMeals() }
    </tbody>
  </table>
  `
}

const mealTemplate = (meal) => {
  return `
  <tr>
    <td>${ meal.date }</td>
    <td>${ meal.meal }</td>
    <td>${ meal.name }</td>
    <td>${ meal.diet }</td>
  </tr>
  `
}

/** Renderers **/

const renderHomePage = () => {
  mainDiv().innerHTML = homePageTemplate();
}

const renderMealListPage = () => {
  mainDiv().innerHTML = mealListTemplate();
}

const renderMeals = () => {
  return meals.map(meal => mealTemplate(meal));
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
    debugger;
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