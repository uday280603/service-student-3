import { Component, OnInit, ViewChild } from '@angular/core';
import { Istudent } from '../../model/Istudent';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../service/studentService.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

   isInEditMode: boolean = false;
  editObjToPatch !: Istudent;
  @ViewChild('studentForm') studentForm!: NgForm;

  constructor(
    private _studentService: StudentService,
    private _snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {

    this.getEditObj()
  }

  onAddStudent() {
    if (this.studentForm.valid) {
      let NEW_OBJ: Istudent = {
        ...this.studentForm.value,
        stdId: Date.now(),
      };
      this._studentService.createNewStudent(NEW_OBJ).subscribe({
        next: (data) => {
          this._snackBar.openSnackbar(data.msg);
          this.studentForm.reset();
          console.log(this.studentForm);
        },
        error: (err) => {
          this._snackBar.openSnackbar(err);
        },
      });
    }
  }

  getEditObj(){
    this._studentService.editObjObs.subscribe({
      next : data =>{
        this.editObjToPatch = data;
        this.studentForm.form.patchValue(data);
        this.isInEditMode = true;
      }
    })
  }

  onUpdate(){
    if(this.studentForm.valid){
      let UPDATED_OBJ : Istudent ={
         ...this.studentForm.value,
        stdId: this.editObjToPatch.stdId,

      }
      console.log(UPDATED_OBJ);
      
      this._studentService.onUpdate(UPDATED_OBJ)
      .subscribe({
        next : data =>{
          this._snackBar.openSnackbar(data.msg);
          this.isInEditMode = false;
          this.studentForm.reset()
        },
        error : err =>{
            this._snackBar.openSnackbar(err)
        }
      })
    }
  }


}
