import App from "./app";
import CustomerDb  from "./models/customerDb";

new App().start().then(() => {
  const user = CustomerDb.findOne({ where: {email: "rjardem@hotmail.com"} });
  if(!user){
    const CustomerModel = new CustomerDb({
      name: "rafael",
      password: "rasfaf",
      phone:"2222",
      email: "rjardem@hotmail.com"
    });
    CustomerModel.save().then(( ) => {
      console.log("foi");
    })
  }
});
