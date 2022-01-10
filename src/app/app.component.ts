import { Component, OnInit } from '@angular/core';
import { MicrosoftUpdateService } from './services/microsoft-update.service';
import { MicrosoftUpdate } from './models/microsoft-update';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'microsoft-updates-angular';

  // Primefaces load
  loading: boolean = true;

  microsoftUpdate = {} as MicrosoftUpdate;
  microsoftUpdates: MicrosoftUpdate[] = [];

  constructor (
    private microsoftUpdateService: MicrosoftUpdateService,
    private messageService: MessageService,
    public primengConfig: PrimeNGConfig,
    public translateService: TranslateService
  ) {
    /*// Traduzindo compenentes PrimeNG
    this.primengConfig.setTranslation({
      startsWith: 'Começa com'
    });*/
    translateService.setDefaultLang('pt');
    translateService.use('pt');
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }
  
  ngOnInit() {
    this.getMicrosoftUpdates();
    this.loading = false;
  }

  // Chama o serviço para obter todos os Microsoft Updates
  getMicrosoftUpdates() {
    this.microsoftUpdateService.getMicrosoftUpdates().subscribe({
      next: (microsoftUpdate: MicrosoftUpdate[]) => this.microsoftUpdates = microsoftUpdate,
      error: (error) => this.showHttpClientError(error),
      complete: () => this.showHttpClientGetSucess(this.microsoftUpdates.length)
    });
  }

  // Chama o serviço para excluir um Microsoft Update
  deleteMicrosoftUpdate(microsoftUpdate: MicrosoftUpdate) {
    this.microsoftUpdateService.deleteMicrosoftUpdate(microsoftUpdate).subscribe({
      error: (error) => this.showHttpClientError(error),
      complete: () => {this.showHttpClientDeleteSucess(); this.getMicrosoftUpdates();}
    });
  }

  showHttpClientError(error : Error) {
    this.messageService.add({
        severity: 'error',
        summary: 'Falha na comunicação com a API',
        detail: error.message,
    });
  }

  showHttpClientDeleteSucess() {
    this.messageService.add({
        severity: 'success',
        summary: 'Operação realizada com sucesso',
        detail: ('Registro excluído'),
    });
  }

  showHttpClientGetSucess(recordsQuantity : number) {
    this.messageService.add({
        severity: 'success',
        summary: 'Operação realizada com sucesso',
        detail: ('Quantidade de registros encontrados: ' + recordsQuantity),
    });
  }
}