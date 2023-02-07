import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
  selector: 'charts-component',
  templateUrl: './ngx-chart-component.html',
  styleUrls: ['./ngx-chart-component.css']
})
export class ChartsComponent {
  single: any[];
  view: any = [700, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition = LegendPosition.Right;

  colorScheme = {
    name: 'chart-color',
    domain: ['#bca0dc', '#7c5295', '#663a82', '#52307c'],
    selectable: true,
    group: ScaleType.Time
  };

  constructor() {
    Object.assign(this, { single });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}