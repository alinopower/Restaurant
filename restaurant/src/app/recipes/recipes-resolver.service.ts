
// ce service éxécute un programme avant le chargement d'une route pour s'assurer que certaines données
// dont dépend la route sont bien présentes
// ce service implemente l'interface générique "Resolve"
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    throw new Error('Method not implemented.');
  }
}
