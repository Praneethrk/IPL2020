import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';
import { IplService } from '../ipl.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamDetails;
  teamStat;
  price;
  tableChart:GoogleChartInterface;
  columnChart:GoogleChartInterface;
  pieChart:GoogleChartInterface;
  constructor(private iplService: IplService) { }

  ngOnInit() {
    this.iplService.teamDetails().subscribe(res => {
      this.teamDetails = res["teams"];
      let data = [];
      data.push(["Label", "Team", "City", "Coach","Home"]);
      for (let t of this.teamDetails) {
        data.push([t["label"], t["team"], t["city"], t["coach"], t["home"]]);
      }
      this.showTableChart(data);
    })

    this.iplService.allTeamStat().subscribe(res => {
      this.teamStat = res["stat"];
      let data = [];
      data.push(["Team","Amount"]);
      for (let t of this.teamStat) {
        data.push([t["team"], t["amount"]]);
      }
      this.showColumnChart(data);
    })
  }
  showTableChart(data){
    this.tableChart ={
      chartType:"Table",
      dataTable:data,
      options:{allowHtml: true,
        width:500,
        height:700}
    }
  }
    showColumnChart(data){
      this.columnChart ={
        chartType:"ColumnChart",
        dataTable:data,
        options:{title: 'Teams',
        width:500,
        height:400}
      }
  }

  //On chart select
  onChartSelect(event:ChartSelectEvent){
    let team = event.selectedRowFormattedValues[0];
    this.iplService.priceStat(team).subscribe(res=>{
      let price = res["stat"];
      let data =[];
      data.push(["Role","Amount"]);
      for(let p of price){
        data.push([p["role"],p["amount"]]);
      }
      this.showPeiChart(data,team);
        
    })
    }

    showPeiChart(data,team){
      this.pieChart ={
        chartType:"PieChart",
        dataTable:data,
        options:{title: "Team : "+team,
        width:500,
        height:300}
      }
  }



  }
