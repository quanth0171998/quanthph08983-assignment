import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shool-detail',
  templateUrl: './shool-detail.component.html',
  styleUrls: ['./shool-detail.component.css']
})
export class ShoolDetailComponent implements OnInit {

  schoolId:any = null;
  schoolDetail = null;
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSchoolById();
  }
  getSchoolById(){
    this.schoolId = this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      switchMap(id => this.schoolService.getSchoolsById(id))
    ).subscribe(data => this.schoolDetail = data);
  }
  removeSchool(){
    if(confirm('Bạn có chắc chắn muốn xóa trường')){
      this.schoolService.deleteSchool(this.schoolDetail.id).subscribe(data =>{
      this.router.navigateByUrl('/home');
    })
    }
  }

  openDialog(){
    const configDialog = new MatDialogConfig();
    configDialog.data = {
        message: 'Bạn có muốn xóa trường này không?',
        schoolId : this.schoolDetail.id,
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, configDialog);
  }

}