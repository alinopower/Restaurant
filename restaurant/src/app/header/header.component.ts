import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !user ? false : true; /// !user ? false : true equivaut encor a !!user
      console.log(!!user);
      console.log(!user);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    // throw new Error('Method not implemented.');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  OnLogOut(){
    this.authService.logout();
  }

}
