jQuery(document).ready(function ($) {
    var $btnRandom = $('button[name="btn-random"]');
    var $btnSave = $('button[name="btn-save"]');
    var $btnRetore = $('button[name="btn-restore-default"]');
    var $btnGetGmailGroup = $('button[name="btn-get-gmail-group"]');
    var $btnGetGmail = $('button[name="btn-get-gmail"]');
    var $btnGetPass = $('button[name="btn-get-pass"]');
    var $btnGetGmailRecovery = $('button[name="btn-get-gmail-recovery"]');
    var $btnGetPhoneDie = $('button[name="btn-get-phone-die"]');
    var $inputExtensionAccount = $('.extension_account');
    var $inputAnotherInfo = $('.another_info');

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

            var gmails = '';
            for (let i = 0; i < 10; i++) {
                var firstName = random_item(dFirstName);
                var lastName = random_item(dLastName);
                var gmail = removeViTones(firstName).toLowerCase().replaceAll(' ', '').replaceAll('ð', '') + removeViTones(lastName).toLowerCase().replaceAll(' ', '').replaceAll('ð', '') + randomChars(3).toLowerCase() + randomIntFromRange(11111111, 99999999) + '@gmail.com';
                var pass = randomChars();
                var gmailRcovery = random_item(dEmailRecovery);
                var group_gmail = gmail + '|' + pass + '|' + gmailRcovery;
                gmails = gmails + group_gmail + '\n';
                var name = { 'first_name': firstName, 'last_name': lastName };
                dataNames.push(name);
            }
            $inputExtensionAccount.val(gmails.trim());
        });

        $btnGetGmailGroup.click(() => {
            openInfo();
            $inputAnotherInfo.val(config.gmail_success);
        });

        $btnGetGmail.click(() => {
            openInfo();
            $inputAnotherInfo.val(config.gmail_get);
        });

        $btnGetPass.click(() => {
            openInfo();
            $inputAnotherInfo.val(config.pass_get);
        })

        $btnGetGmailRecovery.click(() => {
            openInfo();
            $inputAnotherInfo.val(config.gmail_recovery_get);
        })

        $btnGetPhoneDie.click(() => {
            openInfo();
            $inputAnotherInfo.val(JSON.stringify(config.phone_die));
        });

        $inputExtensionAccount.val(config.account);
        $btnSave.click(() => {
            config.account = $inputExtensionAccount.val();
            config.data_name = dataNames.length > 0 ? dataNames : config.data_name;

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

        function openInfo() {
            if ($inputAnotherInfo.css('display') == 'none')
                $inputAnotherInfo.css('display', 'block');
        }
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
