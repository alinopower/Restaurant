import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10),
    new Ingredient('Apples', 5),
  ];

  constructor() { }

  getIngredient() {
    return this.ingredients.slice();
  }

  getIngredients(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());  // cette ligne permet d'ajourner le tableau
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients){
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());  // cette ligne permet d'ajourner le tableau
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());  // cette ligne permet d'ajourner le tableau
  }
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice()); // cette ligne permet d'ajourner le tableau
  }

}
