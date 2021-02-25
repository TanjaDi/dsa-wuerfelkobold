import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppComponent } from './app.component';
import { AttributesComponent } from './attributes/attributes.component';
import { CombatAttackDialogComponent } from './fighting/combat-attack-dialog/combat-attack-dialog.component';
import { CombatComponent } from './fighting/combat.component';
import { SettingsComponent } from './settings/settings.component';
import { TalentRollDialogComponent } from './talents/talent-roll-dialog/talent-roll-dialog.component';
import { TalentsComponent } from './talents/talents.component';

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
        MatSnackBarModule,
        MatToolbarModule,
        NgxDropzoneModule,
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
