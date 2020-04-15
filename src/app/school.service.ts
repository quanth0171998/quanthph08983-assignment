import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { School } from './school';


const  url = 'https://5e85ff7344467600161c6c13.mockapi.io/schools';

@Injectable({
  providedIn: 'root'
})

export class SchoolService {

  constructor(private http: HttpClient) { }

  getListSchools(): Observable<School[]>{
    return this.http.get<School[]>(url);
  }
  getSchoolsById(id): Observable<School>{
    return this.http.get<School>(`${url}/${id}`);
  }

  addSchool(school): Observable<School>{
    return this.http.post<School>(url, school);
  }
  editSchool(school): Observable<School>{
    return this.http.put<School>(`${url}/${school.id}`, school);
  }
  deleteSchool(id): Observable<School>{
    return this.http.delete<School>(`${url}/${id}`);
  }
}
