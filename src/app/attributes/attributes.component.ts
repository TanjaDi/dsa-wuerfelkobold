import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Attribute } from './model/attribute';
import { AttributeService } from './service/attribute.service';

@Component({
    selector: 'app-attributes',
    templateUrl: './attributes.component.html',
    styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit, OnDestroy {
    @Input()
    editMode: boolean;

    @Input()
    save: Observable<void>;

    attributes: Attribute[];

    private subscriptions: Subscription[] = [];

    constructor(private attributeService: AttributeService) {
        this.editMode = false;
    }

    ngOnInit(): void {
        this.attributes = this.attributeService.getAttributes();
        this.subscriptions.push(
            this.save.subscribe(() => {
                this.attributeService.saveAttributes(this.attributes);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
