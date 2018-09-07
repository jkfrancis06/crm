import { Component, OnInit } from '@angular/core';
import {RestApiRequestService} from '../../providers/rest/rest-api-request.service';
import {MzToastService} from 'ngx-materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Pie chart
  public pieChartLabels: string[] = ['Incidents résolus', 'Incidents non-résolus'];
  public pieChartData: number[] = [0, 0];
  public pieChartColor = [
    {backgroundColor: ['#008000', '#ff0000']},
  ];
  public pieChartType = 'pie';
  public last_issue: any;

  constructor(private restApiService: RestApiRequestService, private toastService: MzToastService) { }

  ngOnInit() {
    this.restApiService.loadDashboardData().subscribe(response => {

      // this.loader = false;
      if (response === 800) {

        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.pieChartData = [
          response.success_rate,
          response.failed_rate
        ];
        this.last_issue = response.last_issue;
      }

    });
  }


  chartHovered($event: Event) {

  }

  chartClicked($event: Event) {

  }
}
