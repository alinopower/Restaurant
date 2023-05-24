import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  subscription : Subscription;
  recipes: Recipe[];

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipesService.recipeschanged
        .subscribe(
          (recipes: Recipe[]) =>{
            this.recipes = recipes;
        })
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // pour des test futur,supprimer onDestroy et trouver l'impact que sa peut avoir dans l'application
    //throw new Error('Method not implemented.');
  }


  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route }); 
  }

}
