import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MicrosoftUpdate } from '../models/microsoft-update';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftUpdateService {

  url = 'http://localhost:8080/microsoftUpdatesApi/update';

  // Injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtém todos os updates
  getMicrosoftUpdates(): Observable<MicrosoftUpdate[]> {
    return this.httpClient.get<MicrosoftUpdate[]>(this.url)
      .pipe(
        retry(1),
        catchError(this.handleError))
  }

  // Obtém um update pelo id
  getMicrosoftUpdateById(id: number): Observable<MicrosoftUpdate> {
    return this.httpClient.get<MicrosoftUpdate>(this.url + '/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Exclui um update
  deleteMicrosoftUpdate(microsoftUpdate: MicrosoftUpdate) {
    return this.httpClient.delete<MicrosoftUpdate>(this.url + '/' + microsoftUpdate.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Tratamento de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}