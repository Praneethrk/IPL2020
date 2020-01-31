import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IplService {

  baseUrl = "https://ipl-2020.herokuapp.com/ipl/";
  // baseUrl ="http://192.168.10.140:5000/ipl/";
  constructor(private http:HttpClient) { }
  
  teamLabels():Observable<any>{
    let url = `${this.baseUrl}labels`;
    return this.http.get(url);

  }

  getPlayersByTeamName(teamName):Observable<any>{
    let url = `${this.baseUrl}team/${teamName}`;
    return this.http.get(url);
  }

  getTeamRoleStat(teamname):Observable<any>{
    let url =`${this.baseUrl}team/rolestat/${teamname}`;
    return this.http.get<any>(url)
  }

  getPlayerByTeamAndRole(teamname,role):Observable<any>{
    let url = `${this.baseUrl}team/${role}/${teamname}`;
    return this.http.get<any>(url);
  }

  teamDetails():Observable<any>{
    let url = `${this.baseUrl}teams`;
    return this.http.get(url);
  }
  allTeamStat():Observable<any>{
    let url = `${this.baseUrl}allteamstat`;
    return this.http.get(url);
  }

  priceStat(teamname):Observable<any>{
    let url = `${this.baseUrl}rolestat/${teamname}`;
    return this.http.get(url);
  }
}