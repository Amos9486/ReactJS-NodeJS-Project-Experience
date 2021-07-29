//test
class Order {
  constructor(uAcco, subtotal, cNum, oAddress, oName, oPhone, oMail, iId,oQty,oListprice,oListName) {
    this.uAcco = 0;
    data.order.oPrice = oPrice;
    data.order.oAddress = oAddress;
    data.order.oName = oName;
    data.order.oPhone = oPhone;
    data.order.oMail = oMail;
    data.order.cNum = cNum;
    data.orderList.iId = iId;
    data.orderList.oListName = oListName;
    data.orderList.oListprice = oListprice;
    data.orderList.oQty = oQty;

    // step1.iId = iId
    // step1.name = name
    // step1.category = category
    // step1.iPrice = iPrice
    // step1.iCount=iCount

    // this.login = 0
  }

  //尚未取得會員id
  addOrderSQL() {
    let sql = `INSERT INTO orders( uAcco, oPrice, cNum, oAddress,  oName, oPhone, oMail, oDate) \
                   VALUES('${this.uAcco}', '${ data.order.oPrice}',${data.order.cNum}', '${oAddress}','${data.order.oName}','${ data.order.oPhone}','${data.order.oMail}',  NOW())`;

    let sql2 = `INSERT INTO orders_list(oListId, oId, oListName, oListPrice, oQty)\
                   VALUES('${ data.orderList.iId}', '${data.orderList.oListName}', '${ data.orderList.oListprice}','${data.orderList.oQty}'`;

    return sql, sql2;
  }
}

//export default Order
module.exports = Order;
