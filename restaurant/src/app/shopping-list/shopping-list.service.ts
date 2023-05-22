import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  @Output() ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10),
    new Ingredient('Apples', 5),
  ];

  constructor() { }

  getIngredient() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
// for (let ingredient of ingredients){
//   this.addIngredients(ingredient);
// }
this.ingredients.push(...ingredients);
this.ingredientChanged.emit(this.ingredients.slice());
}

}
