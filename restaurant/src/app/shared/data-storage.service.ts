import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeservice: RecipesService,
    private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeservice.getRecipes();
    this.http.put('https://my-restaurant-7c1e0-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(recipes => {
        //console.log(recipes);
      });
  }

  //ce ci est la première version de fetch et sa fonctione lorsqu'on est authentifier. sa ne devrait pas fonctionner 
  // puisque on a pa le token de l'utilisateur authentifié. c'est pourkoi on a implementé une é ème version en bas

  // fetchRecipes() {
  //   return this.http.get<Recipe[]>('https://my-restaurant-7c1e0-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  //     .pipe(map(recipes => {
  //       console.log(recipes);
  //       return recipes.map(recipe => {
  //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };    // l'opérateur ... s'appel opératteur spread: il permet de copier tous les proprietés d'un objet 
  //         // retourne un objet recipe en copiant toutes ses proprietés; si la proprieté ingredients existe dans l'objet recipe, retourne ingretiens autrement retourne tableau vide.

  //       });
  //     }),
  //       tap(recipes => {
  //       this.recipeservice.setRecipes(recipes);
  //     }) // l'opérateur tap nous permet d'exécuter le code sans modifier les données qui passent par cet observable
  //     )
  // }

  // la logique utiliser ici doit ètre repliqué da la methode storeRecipes
  // au lieu dc de repeter 2 fois la loque, nous allons utiliser un intercepteur rxjs 

  // fetchRecipes() {
  //   console.log(this.authService.userSubject.pipe(take(1)).subscribe()); // il fetch les donnée lorsq l'utilisateur est connecté
  //   return this.authService.userSubject.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this.http.get<Recipe[]>('https://my-restaurant-7c1e0-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
  //       {
  //         params: new HttpParams().set('auth', user.token)
  //       }
  //       )
  //     }),
  //     map(recipes => {
  //       console.log(recipes);
  //       return recipes.map(recipe => {
  //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };    // l'opérateur ... s'appel opératteur spread: il permet de copier tous les proprietés d'un objet 
  //         // retourne un objet recipe en copiant toutes ses proprietés; si la proprieté ingredients existe dans l'objet recipe, retourne ingretiens autrement retourne tableau vide.

  //       });
  //     }),
  //     tap(recipes => {
  //       this.recipeservice.setRecipes(recipes);
  //     })) // exhaustMap attend que la première observable, celle de l'utilisateur se termine, ce qui se produira quand ns arions pris le dernier utilisateur
  //   //.pipe( // l'opérateur tap nous permet d'exécuter le code sans modifier les données qui passent par cet observable
  //   //)
  // }

  // ici nous utilisons l'intercepteur rxjs

  fetchRecipes() {

    return this.http.get<Recipe[]>('https://my-restaurant-7c1e0-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
  
    )
      .pipe(
        map(recipes => {
          console.log(recipes);
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };    // l'opérateur ... s'appel opératteur spread: il permet de copier tous les proprietés d'un objet 
            // retourne un objet recipe en copiant toutes ses proprietés; si la proprieté ingredients existe dans l'objet recipe, retourne ingretiens autrement retourne tableau vide.

          });
        }),
        tap(recipes => {
          this.recipeservice.setRecipes(recipes);
        })) // exhaustMap attend que la première observable, celle de l'utilisateur se termine, ce qui se produira quand ns arions pris le dernier utilisateur
    //.pipe( // l'opérateur tap nous permet d'exécuter le code sans modifier les données qui passent par cet observable
    //)
  }

}
