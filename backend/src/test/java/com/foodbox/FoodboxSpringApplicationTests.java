package com.foodbox;

import static org.junit.Assert.assertEquals;

import java.util.Optional;
import java.util.Scanner;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import com.foodbox.model.Cart;
import com.foodbox.model.Customer;
import com.foodbox.model.Product;
import com.foodbox.model.Purchase;
import com.foodbox.repository.CartRepository;
import com.foodbox.repository.CustomerRepository;
import com.foodbox.repository.ProductRepository;
import com.foodbox.repository.PurchaseRepository;

@SpringBootTest
class FoodboxSpringApplicationTests {	
	
	
	@Autowired
	ApplicationContext context;
	
	@Test
		public String inputusername() {
			String username;
			Scanner in = new Scanner(System.in);
			System.out.println("Enter the username:");
			username=in.next();
			return username;
		}
		public String inputpassword() {
			String password;
			Scanner in = new Scanner(System.in);
			System.out.println("Enter the password:");
			password=in.next();
			return password;
		}
		@Test
		public void test1() {
			assertEquals("admin",inputusername());
			assertEquals("admin",inputpassword());
		}
		@Test
		void Addnewcart()
		{
			CartRepository repo = context.getBean(CartRepository.class);
			
			Cart cart = new Cart();
			cart.setId(2);
			cart.setPrice(150);
			cart.setQuantity(2);
			repo.save(cart);
		}
		
		@Test
		void readcart()
		{
			CartRepository repo = context.getBean(CartRepository.class);
			
			Optional<Cart> optionalcart = repo.findById((long) 2);
			if (optionalcart.isPresent()) {
				Cart cart = optionalcart.get();
				System.out.println(cart);
			}
		}
		@Test
		void deleteCart() {
			CartRepository repo = context.getBean(CartRepository.class);
			
			repo.deleteById((long) 2);
		}
		
		@Test
		void findById() {
			CartRepository repo = context.getBean(CartRepository.class);
			
			Optional<Cart> cart = repo.findById((long)1);
			System.out.println(cart);
		}
		@Test
		void updateCart() {
			CartRepository repo = context.getBean(CartRepository.class);
			
			Optional<Cart> optionalcart = repo.findById((long)1);
			Cart cart = null;
			if (optionalcart.isPresent()) {
				cart = optionalcart.get();
				System.out.println(cart);
			}
			if (cart != null) {
				cart.setQuantity(3);
				repo.save(cart);
			}
		}
		
		@Test
		void Addnewcustomer() {
		CustomerRepository repo = context.getBean(CustomerRepository.class);
		
		Customer customer = new Customer();
		customer.setEmail("hello@gmail.com");
		customer.setAddress("stno:2,city");
		customer.setContact("0123456789");
		customer.setName("heyhello");
		customer.setPassword("hey@123");
		repo.save(customer);
	}
		@Test
		void findByEmail()
		{
			CustomerRepository repo = context.getBean(CustomerRepository.class);
			Customer customer =repo.findByEmail("hello@gmail.com");
			if(customer.isPresent())
			{
				System.out.println(customer);
			}
		}
//		
//		@Test
//		void deleteCustomer() {
//			CustomerRepository repo = context.getBean(CustomerRepository.class);
//			
//			repo.deleteAll();
//		}
		
//		@Test
//		void updateCustomer() {
//			CustomerRepository repo = context.getBean(CustomerRepository.class);
//			
//			Customer customer = repo.findByEmail("hello@gmail.com");
//			if (customer.isPresent()) {
//				System.out.println(customer);
//				customer.setEmail("heyhello@gmail.com");
//				repo.save(customer);
//			}
//		}
//		@Test
//		void AddProduct()
//		{
//			ProductRepository repo = context.getBean(ProductRepository.class);
//			
//			Product product = new Product();
//			product.setId(154621);
//			product.setName("Paneer Manchurian");
//			product.setDesc("Crisp fried Paneer in a tangy and umami-rich manchurian sauce");
//			product.setCategory("Veg");
//			product.setActualPrice(220);
//			product.setDiscount(10);
//			product.setPrice(198);
//			product.setAvail("yes");
//			product.setImagepath("https://www.vegrecipesofindia.com/wp-content/uploads/2022/05/paneer-manchurian-1.jpg");
//			repo.save(product);
//		}
//		@Test
//		void readproduct()
//		{
//			ProductRepository repo = context.getBean(ProductRepository.class);
//			
//			Optional<Product> optionalproduct = repo.findById((long) 154620);
//			if (optionalproduct.isPresent()) {
//				Product product = optionalproduct.get();
//				System.out.println(product);
//			}
//		}
//		@Test
//		void deleteProduct() {
//			ProductRepository repo = context.getBean(ProductRepository.class);
//			
//			repo.deleteById((long) 154621);
//		}
//		@Test
//		void findProductById() {
//			ProductRepository repo = context.getBean(ProductRepository.class);
//			
//			Optional<Product> product = repo.findById((long)154620);
//			System.out.println(product);
//		}
//		@Test
//		void updateProduct() {
//			ProductRepository repo = context.getBean(ProductRepository.class);
//			
//			Optional<Product> optionalproduct = repo.findById((long)154620);
//			Product product = null;
//			if (optionalproduct.isPresent()) {
//				product = optionalproduct.get();
//				System.out.println(product);
//			}
//			if (product != null) {
//				product.setDiscount(0);
//				product.setPrice(220);
//				repo.save(product);
//			}
//		}
//		@Test
//		void AddPurchase()
//		{
//			PurchaseRepository repo = context.getBean(PurchaseRepository.class);
//			
//			Purchase purchase = new Purchase();
//			java.sql.Date date = new java.sql.Date(new java.util.Date().getTime());
//			purchase.setId(1234567890);
//			purchase.setTotalcost(400); //Kung Pao Tofu 180 and Paneer Manchurian 220
//			purchase.setDop(date);
//			purchase.setQuantity(2);
//			purchase.setProductname("Kung Pao Tofu and Paneer Manchurian");
//			purchase.setTransactionid("OFD12345");
//			repo.save(purchase);
//		}
		@Test
        void readpurchase()
        {
            PurchaseRepository repo = context.getBean(PurchaseRepository.class);
           
            Optional<Purchase> optionalpurchase = repo.findById((long) 1234567890);
            if (optionalpurchase.isPresent()) {
                Purchase purchase = optionalpurchase.get();
                System.out.println(purchase);
            }
        }
//        @Test
//        void deletePurchase() {
//            PurchaseRepository repo = context.getBean(PurchaseRepository.class);
//           
//            repo.deleteById((long) 1234567890);
//        }
//        @Test
//        void findPurchaseById() {
//            PurchaseRepository repo = context.getBean(PurchaseRepository.class);
//           
//            Optional<Purchase> purchase = repo.findById((long)1234567890);
//            System.out.println(purchase);
//        }
        @Test
        void updatePurchase() {
            PurchaseRepository repo = context.getBean(PurchaseRepository.class);
           
            Optional<Purchase> optionalpurchase = repo.findById((long)1234567890);
            Purchase purchase = null;
            if (optionalpurchase.isPresent()) {
                purchase = optionalpurchase.get();
                System.out.println(purchase);
            }
            if (purchase != null) {
                purchase.setQuantity(2);
                repo.save(purchase);
            }
        }
}


