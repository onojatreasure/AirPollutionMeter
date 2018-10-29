import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  meters: string[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public rest: RestProvider, public loadingCtrl: LoadingController) {

  }

  presentLoadingCustom() {
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class='custom-spinner-container'>
          <div class='custom-spinner-box'>LOADING...</div>
        </div>`,
      duration: 5000
    });

    console.log("in presetLoading");    
  
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();
  }


  ionViewDidLoad() {
    
    this.presentLoadingCustom();
    this.getMeters();
    
  }

 

  getMeters() {
    this.rest.getMeters()
       .subscribe(
         meters => this.meters = meters,
         error =>  this.errorMessage = <any>error);
  }
}