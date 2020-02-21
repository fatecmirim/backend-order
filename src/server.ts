import App from "./app";
import CustomerDb  from "./models/customerDb";
import { ProductDb } from "./models/productDb";

new App().start().then(async () => {
 
    const CustomerModel = new CustomerDb({
      name: "rafael",
      password: "rasfaf",
      phone:"2222",
      email: "rjardem@hotmail.com"
    });
    CustomerModel.save().then(( ) => {
      console.log("foi");
    })
  const user = await CustomerDb.findOne({ where: {email: "rjardem@hotmail.com"} });
  const ProductModel = new ProductDb({
    name: "vassoura",
    price: 10.00,
    stock: 10
  });
  await ProductModel.save();

  
    
});
