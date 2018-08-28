import { Component, OnInit } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ngx-materialize';


@Component({
  selector: 'app-loader-modal',
  templateUrl: './loader-modal.component.html',
  styleUrls: ['./loader-modal.component.css']
})
export class LoaderModalComponent extends MzBaseModal {


  // Initialize modal

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
    },
    complete: () => {  } // Callback for Modal close
  };

  constructor() { }



}
