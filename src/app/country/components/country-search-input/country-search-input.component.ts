import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {
  router = inject(Router); //? Se usa para la navegacion (cambiar de ruta)
  activatedRoute = inject(ActivatedRoute);

  placeholder = input<string>('Buscar');
  inputValue = output<string>();
  initialValue = input<string>();

  //? Para cuando necesitamos la inicializacion de una señal, tenemos que usar el linkedSignal
  liveInputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  //* Funcion para cambiar un query param del URL
  //* Para poder compartir el link y que vean lo mismo que tu
  //? En pocas palabras tenemos que usar la navegacion ya que editar la ruta es "cambiar" de ruta
  changeQueryParam(value: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { query: value },
    });
  }
  /**
   * @description This function is used to change the query parameter in the URL.
   * @param {string} value - The value to be set in the query parameter.
   * @returns {void}
   */

  onSearch(value: string): void {
    this.inputValue.emit(value);
  }

  debounceEffect = effect((onCleanup) => {
    const liveValue = this.liveInputValue(); //? Esta linea sirve para saber cuando la signal cambio y dispara el effect

    const timeout = setTimeout(() => {
      this.changeQueryParam(liveValue);
      this.onSearch(liveValue);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
