import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'country-country-page',
  imports: [UpperCasePipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  countryTag = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.countryTag.set(params.get('country-code') || '');
      console.log('Country Tag:', this.countryTag());
    });
  }
}
