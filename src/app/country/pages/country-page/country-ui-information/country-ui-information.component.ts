import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'country-ui-information',
  imports: [DecimalPipe],
  templateUrl: './country-ui-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryUiInformationComponent {
  country = input.required<Country>();
  private sanitizer = inject(DomSanitizer);
  mapUrl: SafeResourceUrl = '';

  private mapBaseUrl =
    'https://visitedplaces.com/embed/?map=world&projection=geoMercator&position=1.8_-87.5_4.9_69.6_0&theme=dark-green&water=1&graticule=1&names=1&duration=0&placeduration=0&slider=0&autoplay=0&autozoom=all&autostep=0&home=-&places=~';

  ngOnInit() {
    this.updateMapUrl();
  }

  updateMapUrl() {
    const url = `${this.mapBaseUrl}${this.country().cca2}`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
