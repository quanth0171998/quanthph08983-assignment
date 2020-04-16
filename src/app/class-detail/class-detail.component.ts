import { Component, OnInit } from '@angular/core';
import { ClassService } from '../class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, merge } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  schooId = null;
  classId = null;
  classDetail = null;

  constructor(
    private classService: ClassService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClassById();
  }
  a = null;
  b = null;
  getClassById() {
    this.activatedRoute.paramMap.pipe(
      map(
        params => {
          this.a = params.get('idSchool');
          this.b = params.get('idClass');
        }
      ),
      switchMap(id => this.classService.getClassById(this.a, this.b))
    ).subscribe(data => this.classDetail = data);
  }
  removeClass(){
    if(confirm('Bạn có chắc chắn muốn xóa lớp')){
      this.classService.deleteClass(this.a, this.b).subscribe(data =>{
      this.router.navigateByUrl(`/home/class-list/${this.a}`);
    })
    }
  }
  openDialog(){
    const configDialog = new MatDialogConfig();
    configDialog.data = {
        message: 'Bạn có muốn xóa lớp này không?',
        idSchool: this.a,
        idClass: this.b,
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, configDialog);
  }

}
