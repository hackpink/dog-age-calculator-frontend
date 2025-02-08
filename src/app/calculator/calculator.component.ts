import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ApiService} from '../services/api/api.service';

@Component({
  selector: 'app-calculator',
  imports: [
    FormsModule // FormsModule hozzáadása az imports tömbhöz
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

  // Protected, mert így biztosítjuk, hogy csak a komponens használhassa a változó értét
  // és kívülről ne legyen elérhető
  protected dogAge: number = 0;
  protected humanAge:number = 0;
  constructor(private apiService: ApiService) {
  }

  buttonClick() {
    this.apiService.dogAgeToHumanAge(this.dogAge).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log("Sikeres kérés:", response);
          this.humanAge = response.body.humanAge;
        } else {
          console.log('Unexpected status code:', response.status);
        }
      },
      error: (error) => {
        if (error.status === 400) {
          console.log('Hibás kérés: Ellenőrizd a beírt adatokat.', error);
        } else if (error.status === 404) {
          console.log('A keresett erőforrás nem található.', error);
        } else if (error.status === 500) {
          console.log('Szerverhiba történt, próbáld meg később.', error);
        } else {
          console.log('Ismeretlen hiba történt.', error);
        }
      }
    });
  }


}
