import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeservice: RecipesService) { }

  storeRecipes() {
    const recipes = this.recipeservice.getRecipes();
     this.http.put('https://my-restaurant-7c1e0-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
        .subscribe(recipes => {
          //console.log(recipes);
        });
  }

  fetchRecipes(){
    this.http.get<Recipe[]>('https://my-restaurant-7c1e0-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
        .pipe(map(recipes => {
          console.log(recipes);
          return recipes.map(recipe =>{
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}    // l'opérateur ... s'appel opératteur spread: il permet de copier tous les proprietés d'un objet 
                                                                                        // retourne un objet recipe en copiant toutes ses proprietés; si la proprieté ingredients existe dans l'objet recipe, retourne ingretiens autrement retourne tableau vide.
          });
        }))
        .subscribe(recipes=>{
          this.recipeservice.setRecipes(recipes);
          //console.log(recipes);
        });
  }

}
