import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() { }

 
  async shareNews(): Promise<any> {
    const shareData = {
      title: 'Flames App',
      text: 'Have Fun',
      url: '',
    };

    try {
      await navigator.share(shareData);
      console.log('App shared successfully');
    } catch (error) {
      console.error('Share failed:', error.message);
    }
  }
}
