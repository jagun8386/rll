import { LogService } from './../../service/log.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
  totalCost:any;
  cust_email:string;
  transId:string;
  buyProdMap={email:'',transactionId:''};
  message: string;
  constructor(private logService:LogService,
              private router:Router,
              private purchaseService:PurchaseService,
              private builder : FormBuilder) { }

  ngOnInit(): void {
    this.logService.loggeduserId$.subscribe(
      (id)=>{
        if(id==''){
            this.router.navigate(['']);
        }});
    this.totalCost=60+Number(sessionStorage.getItem('grandTotal'));

    this.cust_email=sessionStorage.getItem('cust_email');
    this.generateTransId();
    this.buyProdMap.email=this.cust_email;
    this.buyProdMap.transactionId=this.transId
  }

  gateWayForm  = this.builder.group({

    

    name : this.builder.control('', Validators.required),
     exp : this.builder.control('', Validators.required),
    cvv : this.builder.control('', Validators.required),
    "card-num" : this.builder.control('', Validators.required),


  })

  buyProducts(){
    debugger
if(this.gateWayForm.valid){
  
    this.purchaseService.buyProducts(this.buyProdMap).subscribe(data=>{
      console.log('products added to Purchase');
    })
    this.router.navigate(['/orderSummary']);
  } else {
    this.message="Fields must not be empty";
  }
}

  generateTransId(){
    var num1 = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    var num2 = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.transId='TFIB'+(num1.toString())+(num2.toString());
    sessionStorage.setItem('transId',this.transId);
  }
}
