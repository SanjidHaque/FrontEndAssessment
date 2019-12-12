import {Component, Input, OnInit} from '@angular/core';
import {Root} from '../models/root.model';
import {AddNewChildDialogComponent} from '../../dialogs/add-new-child-dialog/add-new-child-dialog.component';
import {Child} from '../models/child.model';
import {MatDialog} from '@angular/material';
import {Parent} from '../models/parent.model';
import {GrandChild} from '../models/grand-child.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input('rootIndex') rootIndex: number;
  @Input('parentIndex') parentIndex: number;
  @Input('childIndex') childIndex: number;
  @Input('type') type: string;

  roots: Root[] = [];
  constructor(private dialog: MatDialog) { }


  ngOnInit() {
  }

  addNewRoot() {
    const dialogRef = this.dialog.open(AddNewChildDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            name: ''
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '') {

        const root = this.roots.find(x => x.Name === result);

        if (root !== undefined) {
          alert('Resource already exists!');
        }

        this.roots.push(new Root(Math.random(), result, []));
        console.log(this.roots);
      }

    });


  }

  addNewParent() {
    const dialogRef = this.dialog.open(AddNewChildDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            name: ''
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '') {
        this.roots[this.rootIndex]
          .Parents.push(new Parent(Math.random(), result, []));
      }

    });
  }

  addNewChild() {
    const dialogRef = this.dialog.open(AddNewChildDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            name: ''
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '') {
        this.roots[this.rootIndex]
          .Parents[this.parentIndex]
          .Children.push(new Child(Math.random(), result, []));
      }

    });
  }

  addNewGrandChild() {
    const dialogRef = this.dialog.open(AddNewChildDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            name: ''
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '') {
        this.roots[this.rootIndex]
          .Parents[this.parentIndex]
          .Children[this.childIndex]
          .GrandChildren.push(new GrandChild(Math.random(), result, []));
      }

    });
  }

  deleteRoot() {
    this.roots.splice(this.rootIndex, 1);
  }

  deleteParent() {
    this.roots[this.rootIndex]
      .Parents.splice(this.parentIndex, 1);
  }

  deleteChild() {
    this.roots[this.rootIndex]
      .Parents[this.parentIndex]
      .Children.splice(this.childIndex, 1);
  }
}