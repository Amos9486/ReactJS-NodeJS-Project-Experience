//sql語法有錯
const express = require("express");
const db = require(__dirname + "/../modules/mysql2-connect");
const router = express.Router();
// const upload = require(__dirname + "/../modules/upload-img");

router.post("/add", async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)

  //從request json 資料建立新的物件
  let output = {
    sucess: false,
    error: "",
    insertId: 0,
  };
  for (let item of req.body.orderList) {
    const sql = "INSERT INTO orders_list(iId, oListName oListPrice, oQty) SET ? ";
    const [result] = await db.query(sql, [item]);
    console.log("r",req.body);

}

    const sql1 = "INSERT INTO orders( uAcco, oPrice, cNum, oAddress,  oName, oPhone, oMail, oDate) SET? ";
    const [results1] = await db.query(sql1, [
      {
        oPrice: req.body.order.oPrice||100,
        cNum: req.body.order.cNum||983728974981,
        oAddress: req.body.order.oAddress||2,
        oName: req.body.order.oName||asd,
        oPhone: req.body.order.oPhone||1234,
        oMail: req.body.order.oMail||'asdsf',
      },
      console.log("r",req.body)
    ]);
    output = { ...output, body: req.body.order };
    res.json(output);
});
module.exports = router;
