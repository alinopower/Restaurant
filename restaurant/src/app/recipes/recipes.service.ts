import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Emincé', 'le plus beaux plats des émincé', './assets/OIP.jpg', [new Ingredient('Persil', 5), new Ingredient('Poivron', 10),new Ingredient('Ketcup', 5)]),
    new Recipe('hamburgger Food', 'Le meilleurs des hamburgers', './assets/photo1.jpg', [new Ingredient('Poivron', 10), new Ingredient('Persil', 5)]),
    new Recipe('Dolais Food', 'La nourriture de chez nous', './assets/photo2.jpg', [new Ingredient('Ketcup', 5), new Ingredient('Persil', 5)]),

  ];

  constructor(private shoppingListService: ShoppingListService,) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]){
this.shoppingListService.addIngredientsToShoppingList(ingredient);
  }

}
