import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Sender } from 'src/app/sender';

import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public senders!: Sender[];

  @Input() senderOutput = new EventEmitter<Sender>();

  sender!: Sender;

  messageStr: string = '';

  subjectStr: string = '';
  lastNameStr: string = '';
  firstNameStr: string = '';
  emailStr: string = '';
  passwordStr: string='';
  recipientEmailStr: string ='';

  contactForm: any;
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private formService: ServiceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSenders();
  }

  showInput: boolean = false;

  showHistory: boolean = false;

  showStatus: boolean = false;

  allowAccess: boolean = false;

  hideBlock: boolean =true;

  public revealInput() {
    this.showInput = !this.showInput;
  }
  /**
   *Reveal most rescent messages sent
   */
  revealHistory() {
    this.showHistory = !this.showHistory;
  }
  /** confirm if method is sent */
  public revealStatus() {
    this.showStatus = !this.showStatus;
  }
/**
 *Will reload the passage
 */
  public refreshPage() {
    window.location.reload();
  }
/**
 *Clears all fields after
 */
  public clearFields(): void {
    this.emailStr = '';
    this.firstNameStr = '';
    this.lastNameStr = '';
    this.subjectStr = '';
    this.messageStr = '';
    this.recipientEmailStr='';

  }

  /**
   *Sends message to db
   * @param msg string
   */
  public sendMsg(): void {
    let msg = {
      recipient: this.recipientEmailStr,
      email: this.emailStr,
      firstName: this.firstNameStr,
      lastName: this.lastNameStr,
      subject: this.subjectStr,
      message: this.messageStr,
      password: this.passwordStr,
    };

    this.formService.sendMessage(msg).subscribe(
      (response: string) => {
        console.log('this message was sent : ' + msg);

        this.revealStatus();

        //this.refreshPage();
      },

      (error: HttpErrorResponse) => {
        alert('Failed to send message. ' + error.message);
      }
    );
  }

  /**
   * Retrieve all senders from db.
   */
  public getSenders(): void {
    this.formService.getMessage().subscribe(
      (response: Sender[]) => {
        this.senders = response.reverse();
        console.log(this.senders);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
/**
 *Clears the login block from screen
 */
public clearLoginBlock(){

this.hideBlock = false;



}

public loginUser(): void{

  let credetials = {

    email: this.emailStr,
    password: this.passwordStr,

  };

  this.allowAccess=true;
  this.clearLoginBlock();

}

public logUserOut(): void{

  this.allowAccess=false;
  this.hideBlock=true;
  this.refreshPage();
  console.log("Access ==> "+this.allowAccess)

}

/**
 *Will remove sender from db
 * @param senderId number
 */
  public deleteSender(senderId: number) {
    this.formService.removeSender(senderId)
    .subscribe(
      (response: Sender) => {
        this.refreshPage();
          alert("Sender with id "+senderId+" was deleted!");

    },

    (error: HttpErrorResponse) => {
      alert('Failed to delete: ' + error.message);
    })
    }
}
