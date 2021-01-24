import { Observable, Subscription } from 'rxjs';
import { TalentRollDialogComponent } from './talent-roll-dialog/talent-roll-dialog.component';
import { Component, Input, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Talent } from './model/talent';
import { TalentService } from './service/talent.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface DiceRollDialogData {
    talent: Talent;
}

@Component({
    selector: 'app-talents',
    templateUrl: './talents.component.html',
    styleUrls: ['./talents.component.scss'],
})
export class TalentsComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    editMode: boolean;
    @Input()
    save: Observable<void>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    dataSource: MatTableDataSource<Talent>;
    columnsToDisplay = ['name', 'checkSum', 'value', 'action'];

    private subscriptions: Subscription[] = [];

    constructor(private talentService: TalentService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.talentService.getTalents());
        this.subscriptions.push(
            this.save.subscribe(() => {
                this.talentService.saveTalentValues(this.dataSource.data);
            })
        );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    onClickRollDice(talent: Talent): void {
        const dialogRef = this.dialog.open<TalentRollDialogComponent, DiceRollDialogData>(TalentRollDialogComponent, {
            data: {
                talent,
            },
            width: '38rem',
        });
        this.subscriptions.push(dialogRef.afterClosed().subscribe());
    }

    onInputFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
