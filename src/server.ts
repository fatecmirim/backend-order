import App from "./app";

new App().start().then( async (c) => {
  
});
  
  
  //   const CustomerModel = new CustomerDb({
  //     name: "rafael",
  //     password: "rasfaf",
  //     phone:"2222",
  //     email: "rjardem@hotmail.com"
  //   });
  //   const user = await CustomerModel.save();
  //   let ProductModel = new ProductDb({
  //   name: "massa pastel",
  //   price: 10,
  //   kg: 0.5,
  //   stock: 56
  // });
  
  // const product1 = await ProductModel.save();

  //  ProductModel = new ProductDb({
  //   name: "massa pizza",
  //   price: 3,
  //   kg: 1.3,
  //   stock: 56
  // });
  // const product2 = await ProductModel.save();
  // let customer_id = user.id;
  // console.log("customer iddddddddd", customer_id);
  
  // const orderDb = new OrderDb({
  //   customer_id
  // });
  // console.log("orderDb", orderDb);
  
  // await orderDb.save();
  // let quantity = 10;
  // let sub_total = quantity * product1.price;

  // let Item = new ItemDb(
  //   {
  //     order_id: orderDb.id,
  //     product_id: product1.id,
  //     quantity: 10,
  //     sub_total
  //   }
  // )
  // await Item.save();

  //  quantity = 5;
  //   sub_total = quantity * product2.price;
  //  Item = new ItemDb(
  //   {
  //     order_id: orderDb.id,
  //     product_id: product2.id,
  //     quantity: 3,
  //     sub_total
  //   }
  // )
  // await Item.save();
// });
