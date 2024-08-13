const exp = require("express");
const app = exp();
const port = 3000;
var cors = require('cors');
var db = require('./dataabase');
app.use(cors());
app.use(exp.json());

app.get("/", (req, res)=>{
    res.json("{'message': 'API NodeJS Assignment '}");
});
// other  path
app.get('/du_an', function(req, res, next){
    let sql = `SELECT id, ten_du_an, ngay_start, tien, leader, thanh_vien 
    FROM du_an ORDER BY ngay_start desc`;
    db.query(sql, function (err, data) {
        if (err) res.json({'message': err});
        else res.json(data);
        });
});
app.get('/du_an/:id', function(req, res, next){
    let id = req.params.id;
    if (isNaN(id)==true) return res.json({'message': 'du an khong ton tai'});

    let sql = `SELECT id, ten_du_an, ngay_start, tien, leader, thanh_vien 
    FROM du_an WHERE  id=? ORDER BY  ngay_start desc`;
    db.query(sql, id, function(err, data){
        if (err) res.json({'message':err});
        else if (data.length==0)res.json({'message': 'du an khong co'})
        else res.json(data[0]);
    })
});
app.get ('/nhan_vien', function(req, res){
    let sql = `SELECT id, ho, ten, ngay_sinh, phai , khu_vuc FROM nhan_vien`;
    db.query(sql, function(err, data){
        if (err) res.json({'message': err});
        else res.json(data);
    });
});
app.get('/nhan_vien/:id', function (req, res, next){
    let id = req.params.id;
    if (isNaN(id)==true) return res.json({'message': 'nhan vien khong ton tai'});
    let sql = `SELECT id, ho, ten, ngay_sinh, phai, khu_vuc FROM nhan_vien WHERE id=?`;
    db.query(sql, id, function(err, data){
        if (err) res.json({'message': err});
        else if (data.length==0) res.json({'message': 'nhan vien khong co'});
        return res.json(data[0]);
    });
});
app.get('/task', function(req, res, next){
    let sql = `SELECT  id, ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority FROM task`;
    db.query(sql, function(err, data){
        if (err) res.json({'message': err});
        else res.json(data);
    });
});
app.get ('/task/:id', function(req, res){
    let id = req.params.id;
    if (isNaN(id)==true) return res.json({'message': 'task khong ton tai'});
    let sql = `SELECT  id, ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority 
    FROM task WHERE id=?`;
    db.query(sql, id, function(err, data){
        if (err) res.json({'message': err});
        else if (data.length==0) res.json({'message': 'task khong co'});
        else res.json(data[0]);
    })

})
//them-sua-xoa du-an
app.post('/du_an', function(req,res){
    let{ten_du_an, ngay_start, tien, leader, thanh_vien} = req.body;
    console.log(req.body, thanh_vien.join(','));
    let sql="INSERT INTO du_an SET ten_du_an=?, ngay_start=?, tien=?, leader=?, thanh_vien=?";
    db.query(sql, [ten_du_an, ngay_start, tien, leader, thanh_vien.join(',')], (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi chen du an: '+ err});
        else res.json({"thong bao":"Da chen xong du an"});
    });
});
app.put('/du_an/:id', function(req, res){
    let data = req.body;
    let id = req.params.id;
    let {ten_du_an, ngay_start, tien, leader, thanh_vien} = req.body;
    let sql='UPDATE du_an SET ten_du_an=?, ngay_start=?, tien=?, leader=?, thanh_vien=? WHERE id=?';
    db.query(sql, [ten_du_an, ngay_start, tien, leader, thanh_vien.join(','), id], (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi cap nhat du an: '+ err});
        else res.json({"thong bao":"Da cap nhat xong du an"});
    });
});
app.delete('/du_an/:id', function(req, res){
    let id = req.params.id;
    let sql='DELETE FROM du_an WHERE id=?';
    db.query(sql, id, (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi xoa du an: '+ err});
        else res.json({"thong bao":"Da xoa xong du an"});
    });
});
//them-sua-xoa nhan-vien
app.post('/nhan_vien', function(req, res){
    let {ho, ten, ngay_sinh, phai, khu_vuc}=req.body;
    let sql="INSERT INTO nhan_vien SET ho=?, ten=?, ngay_sinh=?, phai=?, khu_vuc=?";
    db.query(sql, [ho, ten, ngay_sinh, phai, khu_vuc], (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi them nhan vien: '+ err});
        else res.json({"thong bao":"Da them xong nhan vien"});
    });
});
app.put('/nhan_vien/:id', function(req, res){
    let data = req.body;
    let id = req.params.id;
    let {ho, ten, ngay_sinh, phai, khu_vuc} = req.body;
    let sql='UPDATE nhan_vien SET ho=?, ten=?, ngay_sinh=?, phai=?, khu_vuc=? WHERE id=?';
    db.query(sql, [ho, ten, ngay_sinh, phai, khu_vuc, id], (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi sua xong nhan vien: '+ err});
        else res.json({"thong bao":"Da sua xong nhan vien"});
    });
});
app.delete('/nhan_vien/:id', function(req, res){
    let id = req.params.id;
    let sql= 'DELETE FROM nhan_vien WHERE id=?';
    db.query(sql, id, (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi xoa xong nhan vien: '+ err});
        else res.json({"thong bao":"Da xoa xong nhan vien"});
    });
});
//them-sua-xoa task
app.post('/task', function(req,res){
    let {ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority} = req.body;
    let sql="INSERT INTO task SET ten_task=?, du_an_id=?, nhan_vien_id=?, mo_ta=?, status=?, priority=?";
    db.query(sql, [ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority], (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi them xong task: '+ err});
        else res.json({"thong bao":"Da them xong task"});
    });
});
app.put('/task/:id', function (req, res){
    let data= req.body;
    let id = req.params.id;
    let {ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority} =req.body;
    let sql='UPDATE task SET ten_task=?, du_an_id=?, nhan_vien_id=?, mo_ta=?, status=?, priority=? WHERE id=?';
    db.query(sql,[ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority, id], (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi cap nhat xong task: '+ err});
        else res.json({"thong bao":"Da cap nhat xong task"});
    });
});
app.delete('/task/:id', function(req, res){
    let id = req.params.id;
    let sql='DELETE FROM task WHERE id=?';
    db.query(sql, id, (err, d)=>{
        if (err) res.json({'thong bao': 'Loi khi xoa task: '+ err});
        else res.json({"thong bao":"Da xoa xong task"});
    })
})
//--------------//
app.listen(port, ()=>{
    console.log(`ung dung dang chay voi port ${port}`);
});