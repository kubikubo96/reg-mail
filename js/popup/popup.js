jQuery(document).ready(function ($) {
    var $btnRandom = $('button[name="btn-random"]');
    var $btnSave = $('button[name="btn-save"]');
    var $btnRetore = $('button[name="btn-restore-default"]');
    var $inputExtensionAccount = $('.extension_account');

    chrome.storage.sync.get('config', function (result) {
        var config = result.config;
        var dataNames = [];

        //Xư lý ramdom gmail
        $btnRandom.click(() => {
            chrome.storage.sync.set({
                config: initConfigDefine
            }, function () {
                //...
            });

            var emails = '';
            for (let i = 0; i < 10; i++) {
                var firstName = random_item(dFirstName);
                var lastName = random_item(dLastName);
                var email = removeViTones(firstName).toLowerCase().replaceAll(' ', '') + removeViTones(lastName).toLowerCase().replaceAll(' ', '') + randomChars(3).toLowerCase() + randomIntFromRange(111111, 99999) + '@gmail.com';
                var pass = randomChars();
                var emailRcovery = random_item(dEmailRecovery);
                var group_mail = email + '|' + pass + '|' + emailRcovery;
                emails = emails + group_mail + '\n';
                var name = { 'first_name': firstName, 'last_name': lastName };
                dataNames.push(name);
            }
            $inputExtensionAccount.val(emails.trim());

        });

        $inputExtensionAccount.val(config.account);
        $btnSave.click(() => {
            config.account = $inputExtensionAccount.val();
            config.data_name = dataNames;

            chrome.storage.sync.set({
                config: config
            }, function () {
                close();
            });
        });

        $btnRetore.click(() => {
            chrome.storage.sync.set({
                config: initConfigDefine
            }, function () {
                //...
            });

            $inputExtensionAccount.val('');
        });
    });


    //Random Array
    function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    //lấy 1 mảng con n phần tử random từ mảng lớn
    function random_arr(arr, n) {
        var newArr = [];
        var i = 0;
        if (n > arr.length) n = arr.length;
        while (i < n) {
            let item = arr[Math.floor(Math.random() * arr.length)];
            if (!newArr.includes(item)) {
                newArr.push(item);
                i++;
            }
        }
        return newArr;
    }

    //Random range Minmax
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randomChars(length = 10) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    function removeViTones(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }
});
