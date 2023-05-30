import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
// import { AlertComponent } from 'src/app/shared/alert/alert.component';
// import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthService } from '../auth.service';
import { AuthResponseDataModel } from './auth-response-data-model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  //@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective; la directive placeHolder sert 
  //seulement pour le methode programmatique
  closeSub: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

// cette methode est utilisée lorsqu'on utilise la methode programmatique

  // ngOnDestroy(): void {
  //   if(this.closeSub){
  //     this.closeSub.unsubscribe();
  //   }
  // }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;

  //   this.isLoading = true;
  //   if (this.isLoginMode) {
  //     this;this.authService.login(email, password).subscribe(
  //       repsData => {
  //         console.log(repsData);
  //         this.isLoading = false;
  //       }, errorMessage => {
  //         console.log(errorMessage);
  //         this.error = errorMessage;
  //         this.isLoading = false;
  //       }
  //     );
  //   } else {
  //     this.authService.signUp(email, password).subscribe(repsData => {
  //       console.log(repsData);
  //       this.isLoading = false;
  //     }, errorMessage => {
  //       console.log(errorMessage);
  //       this.error = errorMessage;
  //       this.isLoading = false;
  //     }
  //     );
  //   }
  //   console.log(form.value);
  //   form.reset();
  // }

  // visto che subscribe si fa 2 volte sopra, riscriviamo sotto meglio il codice mettendo il subscribe in un observabile


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseDataModel>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }


    authObservable.subscribe(
      repsData => {
        console.log(repsData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
       // this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    )
    console.log(form.value);
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
  
// cette methode utilise la methode programatique en utilisant le factory et des Ref pour crer nos composant dans le code 
// et utiliser la balise ng-template ds le DOM pour afficher nos composants crée

  // private showErrorAlert(message: string) {
  //   const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear(); // efface tous les composants angulaire qui ont été montré sur cet endroit au paravant
  //   const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  //   //const componentRef  = new AlertComponent();
  // }

}
