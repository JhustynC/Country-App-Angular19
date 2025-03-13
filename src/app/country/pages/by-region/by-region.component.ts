import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'country-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage { }
