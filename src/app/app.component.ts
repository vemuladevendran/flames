import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() { }


  
 
  async shareApp(): Promise<any> {
    await Share.share({
      title: 'Flames App',
      text: 'Have Fun',
      url: 'https://github.com/vemuladevendran',
      dialogTitle: 'Share with buddies',
    });
  }
}
