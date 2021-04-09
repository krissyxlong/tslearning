var Foler = function(name) {
    this.name = name;
    this.parent = null;
    this.files = [];
};
Foler.prototype.add = function(file) {
    this.files.push(file);
    file.parent = this;
};
Foler.prototype.scan = function() {
    console.log('---- 开始扫描文件夹：', this.name);
    for (var i = 0, file, files = this.files; file = files[i++];) {
        file.scan();
    }
};
Foler.prototype.remove = function() {
    if (!this.parent) {
        return;
    }
    for (var files = this.parent.files, l = files.length - 1; l >=0; l--) {
        var file = files[l];
        if (file === this) {
            files.splice(l, 1);
        }
    }
};

var File = function(name) {
    this.name = name;
    this.parent = null;
};
File.prototype.add = function() {
    throw new Error('文件下面不能添加文件');
};
File.prototype.scan = function() {
    console.log(this.name);
};
File.prototype.remove = function() {
    if (!this.parent) {
        return;
    }
    for (var files = this.parent.files, l = files.length - 1; l >=0; l--) {
        var file = files[l];
        if (file === this) {
            files.splice(l, 1);
        }
    }
};

// 创建文件
var folder1 = new Foler('文件夹1');
var folder2 = new Foler('文件夹2');
var folder3 = new Foler('文件夹3');

var file1 = new File('文件1');
var file2 = new File('文件2');
var file3 = new File('文件3');

folder1.add(file1);
folder2.add(file2);
folder3.add(file3);
folder3.add(folder1);
folder3.add(folder2);

document.getElementById('del').onclick = function() {
    folder1.remove();
}
document.getElementById('scan').onclick = function() {
    folder3.scan();
}