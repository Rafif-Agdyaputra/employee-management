import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import {FormatCurrencyPipe} from "./shared/pipes/format-currency.pipe";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    HttpClientModule,
    FormatCurrencyPipe
  ]
})
  .catch(err => console.error(err));
