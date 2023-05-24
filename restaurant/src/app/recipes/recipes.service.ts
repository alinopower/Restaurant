import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

recipeschanged = new Subject<Recipe[]>();
private recipes: Recipe[] = [];


// nous pouvons commenter notre tableau de recette puisque nous pouvons les stoker et récupérer sur fireBase

  // private recipes: Recipe[] = [
  //   new Recipe('Emincé', 'le plus beaux plats des émincé', './assets/OIP.jpg', [new Ingredient('Persil', 5), new Ingredient('Poivron', 10), new Ingredient('Ketcup', 5)]),
  //   new Recipe('hamburgger Food', 'Le meilleurs des hamburgers', './assets/photo1.jpg', [new Ingredient('Poivron', 10), new Ingredient('Persil', 5)]),
  //   new Recipe('Dolais Food', 'La nourriture de chez nous', './assets/photo2.jpg', [new Ingredient('Ketcup', 5), new Ingredient('Persil', 5)]),

  // ];


  constructor(private shoppingListService: ShoppingListService,) { }


  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeschanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeschanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeschanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
this.recipes.splice(index, 1);
this.recipeschanged.next(this.recipes.slice());
  }

}
