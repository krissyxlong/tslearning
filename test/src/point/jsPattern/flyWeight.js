
/* 给 50 套男装和 50 套女装分别拍广告照片 */
var Model = function (sex, underwear) {
  this.sex = sex;
  this.underwear = underwear;
}
Model.prototype.takePhoto = function () {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
};
for (var i = 1; i <= 50; i++) {
  var maleModel = new Model('male', 'underwear' + i);
  maleModel.takePhoto();
};
for (var j = 1; j <= 50; j++) {
  var femaleModel = new Model('female', 'underwear' + j);
  femaleModel.takePhoto();
};


/* 优化版本 */
var Model = function (sex) {
  this.sex = sex;
};
Model.prototype.takePhoto = function () {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
};
// 分别创建一个男模特对象和一个女模特对象:
var maleModel = new Model('male');
var femaleModel = new Model('female');
// 给男模特依次穿上所有的男装，并进行拍照:
for (var i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i;
  maleModel.takePhoto();
};
// 同样，给女模特依次穿上所有的女装，并进行拍照:
for (var j = 1; j <= 50; j++) {
  femaleModel.underwear = 'underwear' + j;
  femaleModel.takePhoto();
};