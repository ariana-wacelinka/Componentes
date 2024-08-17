import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  successMessage: boolean = false;
  errorMessage: boolean = false;
  credenciales: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerCredenciales();
  }

  async obtenerCredenciales() {
    try {
      const data = await firstValueFrom(this.http.get('assets/credenciales.txt', { responseType: 'text' }));
      
      this.credenciales = JSON.parse(data);
      console.log('Credenciales obtenidas:', this.credenciales);
    } catch (error) {
      console.error('Error al obtener credenciales:', error);
    }
  }

  async sendLogIn() {
    console.log('Email ingresado:', this.email);
    console.log('Password ingresada:', this.password);

    const usuarioValido = this.credenciales.find(credencial => {
        console.log('Comparando con:', credencial.email, credencial.password);
        return credencial.email === this.email && credencial.password === this.password;
    });

    if (usuarioValido) {
        console.log('Credenciales válidas');
        this.successMessage = true;
        this.errorMessage = false;
    } else {
        console.log('Credenciales inválidas');
        this.successMessage = false;
        this.errorMessage = true;
    }
  }
}
