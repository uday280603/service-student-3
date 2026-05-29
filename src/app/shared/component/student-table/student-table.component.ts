import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../model/Istudent';
import { StudentService } from '../../service/studentService.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

  
  getAllStudent !: Istudent[];

  constructor(private _studentService : StudentService , private _matDialog : MatDialog) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
      this._studentService.fetchAllstd().subscribe({
        next: data => {
          this.getAllStudent= data;
        }
      })
  }

  onEdit(editobj : Istudent){
    this._studentService.emiteditObj(editobj)

  }

  onRemove(removeId : number){
    let config = new MatDialogConfig();
    config.width = '400px';
    config.disableClose = true;
    config.data = `Are you sure to remove student with id ${removeId}..?`;
    let matRef = this._matDialog.open(GetConfirmComponent,config);
    matRef.afterClosed().subscribe(getConfirm =>{
      if(getConfirm=== true){
        this._studentService.onRemove(removeId);
      }
    })
  }

  trackByfun(index: number , item  : Istudent){
    return item.stdId;
  }

  

}
