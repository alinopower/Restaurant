
// ce service éxécute un programme avant le chargement d'une route pour s'assurer que certaines données
// dont dépend la route sont bien présentes
// ce service implemente l'interface générique "Resolve"
// ce Resolver charge les données avant que la page ne soit chargée
// nous devons appliquer maintenant le Resolver sur les routes du fichier app-routing
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService,
    private recipesService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
    //throw new Error('Method not implemented.');
  }
}
