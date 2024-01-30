import { LogService } from './../../service/log.service';
import { Cart } from './../../model/cart';
import { CustomerService } from './../../service/customer.service';
import { CartService } from './../../service/cart.service';
import { Customer } from './../../model/customer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
// import { CustomerService } from './../../service/customer.service';


import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader:number=0;
  message:string='';
  formValue !: FormGroup;
  customer:Customer = new Customer();
  auth:any;
  loginData={
    email:'',
    password:''};
  login:number=0;
  productList:any;
  public cart:Cart=new Cart();
  public products:Cart[];
  public activeOrders:Purchase[]=[];
  public totalItem:number=0;
  setAutoHide: any;
  autoHide: number;
  userDetails : any= [];
  userValues: any;
  // toastr: any;
  constructor(private cartService:CartService, 
    private productService:ProductService,
    private customerService:CustomerService,
    private logService:LogService,
    private purchaseService:PurchaseService,
    private formbuilder:FormBuilder,
    private router:Router,
    public snackBar:MatSnackBar,
     private Toastr : ToastrService   ) { }

  ngOnInit(): void {
    this.logService.headerId$.subscribe((id)=>{
      this.showHeader=id;
    })
    sessionStorage.setItem('cust_email',null);
    this.cartService.deleteAllCart().subscribe(res=>{
      console.log('deletedAllCart')
    })
    this.cartService.getProduct().subscribe(res=>{
      this.products=res;
      this.totalItem=this.products.length;
    });
    this.productService.getProductList().subscribe(res=>{
      this.productList=res;
    })

    function mobileNumberValidator(control) {
      const mobileNumberRegex = /^[0-9]{10}$/; // Assuming a 10-digit mobile number
    
      return mobileNumberRegex.test(control.value) ? null : { invalidMobileNumber: true };
    }
    function validateName(control) {
      const nameRegex = /^[a-zA-Z]+$/;
      const valid = nameRegex.test(control.value);
  
      return valid ? null : { invalidName: true };
    }
    this.formValue=this.formbuilder.group({
      email   :   this.formbuilder.control('',Validators.compose([Validators.required,Validators.email])),
      password:   this.formbuilder.control('',Validators.required),
      name    :   this.formbuilder.control('', Validators.compose([Validators.required,validateName])),
      contact :   this.formbuilder.control('',Validators.compose([Validators.required,mobileNumberValidator])),
      address :   this.formbuilder.control('',Validators.required)
    })
  }


  // registerForm = this.formbuilder.group({

  //   name : this.formbuilder.control('', Validators.required),

  //   password : this.formbuilder.control('',Validators.required),
  //   contact : this.formbuilder.control('',Validators.required),

  //   address : this.formbuilder.control('',Validators.required),


  //   email : this.formbuilder.control('',Validators.compose([Validators.required,Validators.email])),

    
  // })

  addCustomer(){
    this.customer.email=this.formValue.value.email;
    this.customer.password=this.formValue.value.password;
    this.customer.name=this.formValue.value.name;
    this.customer.contact=this.formValue.value.contact;
    this.customer.address=this.formValue.value.address;

    if(this.formValue.valid){

    this.customerService.addCustomer(this.customer).subscribe(data=>{
      this.login=1;
      this.productService.login.next(1);
      sessionStorage.setItem('cust_email',this.customer.email);
      sessionStorage.setItem('cust_name',this.customer.name);
      this.logService.sendId(this.customer.email);
      let ref = document.getElementById('Rcancel')
      ref?.click();
      this.formValue.reset();
      this.goToProducts();
      this.Toastr.success('User Created Successfully');   
     },
    error=> this.message='User already exist, Please Login' )
  }else{
this.message="fill all the details" ;


  }
  }

  goToProducts(){
    this.router.navigate(['/products']);
  }

  loginSubmit(){
    if(this.loginData.email.trim()==''|| this.loginData.email==null)
    {
      this.message="Enter Username"
      return;
    }
    if(this.loginData.password.trim()==''|| this.loginData.password==null)
    {
      this.message="Enter password"
      return;
    }
    this.customerService.customerLogin(this.loginData).subscribe(data =>{
      this.auth=data;
      if(this.auth==true){
        this.login=1;
        this.productService.login.next(1);
        sessionStorage.setItem('cust_email',this.loginData.email);
        this.logService.sendId('cust_email');
        let ref = document.getElementById('Lcancel')
      ref?.click();
      this.formValue.reset();
      this.goToProducts();
      this.getCustomerDetails();
      this.Toastr.success('Login Successfull!');
      }else{
        this.message='Username or password incorrect'
      }
    })
  }

  CustomerLogout(){
    this.login=0;
    this.cartService.deleteAllCart().subscribe(data=>{
      console.log('cart empty')
    });
    sessionStorage.setItem('cust_email',null);
    this.logService.sendId('');
  }

  getActiveOrders(){
    var email:string;
    email=sessionStorage.getItem("cust_email");
    this.purchaseService.getCustomerOrders(email).subscribe(data=>{
      this.activeOrders=data;
    })
  }

  getCustomerDetails(){
    debugger
    var email:string;
    email=sessionStorage.getItem("cust_email");

    this.customerService.getCustomer(email).subscribe(data=>{
      this.userDetails.push(data);
      // this.userDetails= [];
      // this.userDetails.splice(1, this.userDetails.length-1);
      console.log(this.userDetails,"uservalues")

    })

  }


}
