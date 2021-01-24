import { CombatAttackDialogComponent } from './fighting/combat-attack-dialog/combat-attack-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { CombatComponent } from './fighting/combat.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AttributesComponent } from './attributes/attributes.component';
import { TalentsComponent } from './talents/talents.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TalentRollDialogComponent } from './talents/talent-roll-dialog/talent-roll-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AttributesComponent,
        TalentsComponent,
        TalentRollDialogComponent,
        CombatComponent,
        CombatAttackDialogComponent,
        SettingsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            defaultLanguage: 'en',
        }),
    ],
    providers: [],
    entryComponents: [TalentRollDialogComponent, CombatAttackDialogComponent],
    bootstrap: [AppComponent],
    exports: [TranslateModule],
})
export class AppModule {}
