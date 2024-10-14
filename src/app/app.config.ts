import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsUpDown, 
  CircleCheckBig, 
  Columns3, 
  Construction, 
  CreditCard,
  EllipsisVertical,
  Globe, 
  Info, 
  ListFilter, 
  LogOut, 
  LucideAngularModule, 
  MessageSquareText, 
  Search, 
  ShieldCheck, 
  UserRound,
  WalletCards,
  Webhook
} from 'lucide-angular';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      MonacoEditorModule.forRoot(),
      LucideAngularModule.pick({ 
      ChevronsUpDown, 
      Info,
      CircleCheckBig,
      ChevronDown,
      Globe,
      UserRound,
      WalletCards,
      ShieldCheck,
      CreditCard,
      MessageSquareText,
      Webhook,
      Construction,
      LogOut,
      EllipsisVertical,
      ChevronLeft,
      ChevronRight,
      Search,
      ListFilter,
      Columns3
    }))
  ]
};
