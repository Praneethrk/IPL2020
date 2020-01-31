import { Component, OnInit } from '@angular/core';
import { IplService } from '../ipl.service';
// import { Ng2GoogleChartComponent } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teamNames;
  teamName;
  players;
  pieChart:GoogleChartInterface;
  tableChart:GoogleChartInterface;
  constructor(private iplService:IplService) { }

  ngOnInit() {
    this.iplService.teamLabels().subscribe(res=>{
      this.teamNames=res["labels"];
    })
  }


  getPlayers(event){
    this.teamName = event.target.value;
    if(this.teamName && this.teamName.length > 0){
      this.iplService.getPlayersByTeamName(this.teamName).subscribe(res=>{
        this.players = res["players"];
      })

      this.iplService.getTeamRoleStat(this.teamName).subscribe(res=>{
        let stat = res["stat"];
        let data = [];
        data.push(["Role","Count"]);
        for(let s of stat){
          data.push([s["role"],s["count"]]);
        }
        this.showRoleStatChart(data);
      }
        )
    }
  }

showRoleStatChart(data){
  this.pieChart ={
    chartType:"PieChart",
    dataTable:data,
    options:{'Role':'Count',
    width:500,
    height:400}
  }
}

//On chart Select
onChartSelect(event:ChartSelectEvent){
let role = event.selectedRowFormattedValues[0];
this.iplService.getPlayerByTeamAndRole(this.teamName,role).subscribe(res=>{
  let players = res["players"];
  let data =[];
  data.push(["Players","Team","Role","Price"]);
  for(let p of players){
    data.push([p["player"],p["label"],p["role"],p["price"]]);
  }
  this.showTableChart(data);
    
})
}
showTableChart(data){
  this.tableChart ={
    chartType:"Table",
    dataTable:data,
    options:{allowHtml: true}
  }
}

}
