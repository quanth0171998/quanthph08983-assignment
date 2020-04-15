import { Component, OnInit } from '@angular/core';
import { ClassService } from '../class.service';
import { Class } from '../class';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: Class[] = [];
  schoolId: any = null;
  roomId: any =null;

  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getListClassOfSchool(this.schoolId);
  }

  getListClassOfSchool(id){
    this.activatedRoute.paramMap.pipe(
      map(params => params.getAll('id')),
      switchMap(id => this.classService.getListClass(id))
    ).subscribe(data => this.classes = data);
  }

}
