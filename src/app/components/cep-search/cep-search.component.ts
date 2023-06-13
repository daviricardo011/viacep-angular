import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IAddress {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  erro: boolean;
}

@Component({
  selector: 'cep-search',
  templateUrl: './cep-search.component.html',
  styleUrls: ['./cep-search.component.scss'],
})
export class CepSearchComponent {
  title = 'viacep-angular';
  zipCode = '';
  publicPlace = '';
  addressNumber = '';
  complement = '';
  state = '';
  city = '';
  district = '';
  generalError = '';

  constructor(private http: HttpClient) {}

  onInputZipCode() {
    if (this.zipCode.length === 8) {
      this.http
        .get<IAddress>(`https://viacep.com.br/ws/${this.zipCode}/json/`)
        .subscribe(
          (res) => {
            if (res.erro) {
              return alert('Cep inválido');
            }
            this.state = res.uf || '';
            this.city = res.localidade || '';
            this.district = res.bairro || '';
            this.publicPlace = res.logradouro || '';
            this.complement = res.complemento || '';
          },
          (error) => {
            alert(error);
          }
        );
    }
  }
}