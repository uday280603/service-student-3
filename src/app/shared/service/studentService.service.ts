import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Ires, Istudent } from '../model/Istudent';


@Injectable({
  providedIn: 'root',
})
export class StudentService {


  private editObjSub$ : Subject<Istudent> = new Subject<Istudent>();
  editObjObs : Observable<Istudent> = this.editObjSub$.asObservable()
  studentArr = [
    {
      stdId: 1,
      fname: 'Ronak',
      lname: 'Indrawar',
      email: 'ro@example.com',
      isActive: true,
    }
  ];
  constructor() {}

  fetchAllstd(): Observable<Istudent[]> {
    return of(this.studentArr);
  }

  createNewStudent(newObj : Istudent) : Observable<Ires<Istudent>>{
    this.studentArr.unshift(newObj);
    return of({
      msg : `The New Student with id ${newObj.stdId} is Added Successfully in School..!`,
      data : newObj
    })

  }

  emiteditObj(editObj  : Istudent){
    this.editObjSub$.next(editObj)
  }

  onUpdate(updatedObj : Istudent) : Observable<Ires<Istudent>>{
    let GETINDEX = this.studentArr.findIndex(s => s.stdId === updatedObj.stdId);
    this.studentArr[GETINDEX] = updatedObj;
    return of({
      msg : `Student with id ${updatedObj.stdId} is Updated Successfully..!`,
      data : updatedObj
    })
  }

  onRemove(removeId : number) : Observable<Ires<Istudent>>{
    let GETINDEX =  this.studentArr.findIndex(s => s.stdId === removeId);
    let arr  =this.studentArr.splice(GETINDEX,1);
    return of({
      msg : `Student with id ${removeId} is Removed Successfully..!`,
      data : arr[0]
    })
  }


}
