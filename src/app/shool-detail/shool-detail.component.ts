import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

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
    private activatedRoute: ActivatedRoute
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

}