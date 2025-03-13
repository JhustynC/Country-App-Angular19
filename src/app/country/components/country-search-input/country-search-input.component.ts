import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {
  inputValue = output<string>();
  placeholder = input<string>('Buscar');

  onSearch(value: string): void {
    this.inputValue.emit(value);
  }
}
