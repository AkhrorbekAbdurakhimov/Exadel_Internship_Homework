import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.scss']
})

export class VerifyModalComponent implements OnInit {

  @Input() verifyModalStatus: boolean = false

  @Output() deleteAccount: EventEmitter<any> = new EventEmitter();
  @Output() closeVerifyModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
