import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassService } from '../class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  message: string = "Are you sure?";
  confirmButtonText = "Yes";
  cancelButtonText ="Cancel";
  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private classService: ClassService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private schoolService: SchoolService
  ) {
    if(data){
      this.message = data.message || this.message;
    }
    if(data.buttonText){
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
   }

  ngOnInit(): void {

  }




  removeClass(){
      this.classService.deleteClass(this.data.idSchool, this.data.idClass).subscribe(data =>{
      this.router.navigateByUrl(`/home/class-list/${this.data.idSchool}`);
    })
  }
  removeSchool(){
      this.schoolService.deleteSchool(this.data.schoolId).subscribe(data =>{
      this.router.navigateByUrl('/home');
    })
  }

  delete(data): void{
    data = this.data.message;
    // console.log(data);
    if(data == "Bạn có muốn xóa lớp này không?"){
      console.log("y");
      this.removeClass();
    }
    else if(data=="Bạn có muốn xóa trường này không?"){
      console.log("t");
      this.removeSchool();
    }
    this.cancel();
  }
  cancel(){
    this.dialogRef.close();
  }

}