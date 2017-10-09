const express = require('express');
const router = express.Router();
const pool = require('../util/db');

/**
 * 流量卡申请引导页渲染
 * @param req
 * @param res
 */
router.get('/',  (req, res, next) => {
    res.render('map');
});

router.get('/v1/map',(req,res,next) => {
    const result = {
        status: 200,
        message: "ok",
        data: []
    }
    let time = req.query.time;
    const selectSql = "select event, region, count(*) as num from zuma_stat.real_record WHERE dt = '2017-09-30' GROUP BY event, region";
    pool.query(selectSql,  (error, results, fields) => {
        if (error) {
            console.log("Database access error while retrieve operator!");
            retrieve_resp.status = false;
            retrieve_resp.message = "Internal Error!";
            res.send(retrieve_resp);
        } else {
            let total_save = [];
            let shijian = [];
            results.forEach(function(item,index) {
                const auto_save = {
                    data:[]
                };
                const itVal = {};
                itVal.name = item.region;
                itVal.value = item.num;
                if(shijian.indexOf(item.event) == -1){
                    shijian.push(item.event);
                    auto_save.name = item.event;
                    auto_save.data.push(itVal);
                    total_save.push(auto_save);
                    console.log(total_save);
                } else {
                    let valWz = shijian.indexOf(item.event);
                    total_save[valWz].data.push(itVal);
                }
            });
            result.data.push(total_save);
            res.send(result);
        }
    }); 
})

module.exports = router;
