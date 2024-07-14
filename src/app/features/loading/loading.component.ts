import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../Services/Common/common.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent implements OnInit {
  loading$ = this.commonService.loading$;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }
}
