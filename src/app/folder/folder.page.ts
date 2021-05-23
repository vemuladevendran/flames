import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  flamesForm: FormGroup;
  flames = '';
  showLoader = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.flamesForm = this.fb.group({
      nameOne: ['', [Validators.required]],
      nameTwo: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }

  private getChars(name: string): string[] {
    return name.toLowerCase().replace(/ /gi, '').split('')
  }

  private calculateFlames = (nameOne, nameTwo) => {
    const firstName = this.getChars(nameOne);
    const secondName = this.getChars(nameTwo);
    const charMap: any = {};
    [...firstName, ...secondName].forEach((k) => {
      charMap[k] = (charMap[k] || 0) + 1;
    });

    Object.entries(charMap).forEach(([k, v]: [string, number]) => {
      if ((v > 2) && (v % 2 !== 0)) {
        charMap[k] = 1;
      }
    });


    const remaining = Object.keys(charMap).filter(k => charMap[k] === 1).length;
    this.findFlames(remaining);
  }

  private findFlames(remaining) {
    let string = 'flames';
    let number = remaining;
    let process = new Array();

    while (string.length >= 2) {
      var j = 0;
      process = [];
      let position = number % string.length;
      let i = 0

      if (position != 0) {
        for (i = position + 1; i <= string.length; i++) {
          process[j] = string.charAt(i - 1);
          j++;
        }

        for (i = 0; i <= position - 2; i++) {
          process[j] = string.charAt(i);
          j++;
        }
        string = process.toString().replace(/,/gi, "");
      } else {
        string = string.slice(0, -1);
      }
      this.displayFlames(string);
    }

  }

  private displayFlames(string) {
    const required = {
      f: 'FRIENDS',
      l: 'LOVER',
      a: 'AFFECTION',
      m: 'MARRIAGE',
      e: 'ENEMY',
      s: 'SISTER'
    }
    this.flames = required[string];
  }


  openSnackBar() {
    this.snackBar.open(this.flames, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  async handleFlames(): Promise<any> {
    try {
      const nameOne = this.flamesForm.get('nameOne').value;
      const nameTwo = this.flamesForm.get('nameTwo').value;
      if (nameOne != nameTwo) {
        this.calculateFlames(nameOne, nameTwo);
        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
          this.openSnackBar();
        }, 2500);
      }

      else{
        this.flames = 'Both Names Are Same'
        this.openSnackBar();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

