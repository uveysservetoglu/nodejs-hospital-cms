const mongose =require("mongoose");

module.exports = () => {
    mongose.connect("mongodb://root:hospital123@ds129051.mlab.com:29051/hospital");
    mongose.connection.on('open', ()=>{
        console.log("Veri Tabanı Bağlantısı Başarılı");
    });
    mongose.connection.on('error', (err)=>{
        console.log("Veri Tabanı Bağlantı Hatas: ", err);
    });
};