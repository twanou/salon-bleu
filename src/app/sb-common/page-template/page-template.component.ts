import { Component, Input, OnInit } from '@angular/core';
import { TemplateService } from '../service/template-service.service';
import { Subject, takeUntil } from 'rxjs';
import { TemplateConfig } from '../service/template-config.interface';

@Component({
  selector: 'sb-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
})
export class PageTemplateComponent implements OnInit {
  @Input()
  public sidenav: boolean = true;

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateService.setConfig({ sidenavActive: this.sidenav });
  }
}
