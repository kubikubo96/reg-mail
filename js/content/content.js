jQuery(document).ready(function ($) {
    var config = '';

    var sYB = 'www.youtube.com';
    var sGo = 'www.google.com';
    var sAc = 'accounts.google.com';
    var sLg = 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26next%3D%252F&amp%3Bpassive=false&amp%3Bservice=youtube&amp%3Builel=0&flowName=GlifWebSignIn&flowEntry=AddSession';
    var sUp = 'https://accounts.google.com/signup/v2/webcreateaccount?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp';
    var sTe = randomIntFromRange(4000, 6000);
    var sTot = 0;

    //Get Account
    chrome.storage.sync.get('config', function (result) {
        config = result.config;
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");
        console.log("🏍ConfigDefine:                                            🏍");
        console.log(config);
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");

        if (config.start == "no") {
            showNotyTop("CHÚC MỪNG đã tạo xong danh sách gmail.")


            //Lưu Phone die về máy
            var elmDownPhoneDie = document.createElement('a');
            var saveData = JSON.stringify(config.phone_die);
            elmDownPhoneDie.href = "data:application/octet-stream," + encodeURIComponent(saveData);
            elmDownPhoneDie.download = 'LIST_PHONE_DIE.txt';
            elmDownPhoneDie.click();
            elmDownPhoneDie.remove();

            if (config.position >= config.total) {
                //Lưu Email Success về máy
                var elmDownEmailSuccess = document.createElement('a');
                var saveData = JSON.stringify(config.account);
                elmDownEmailSuccess.href = "data:application/octet-stream," + encodeURIComponent(saveData);
                elmDownEmailSuccess.download = 'LIST_EMAIL_SUCCESS.txt';
                elmDownEmailSuccess.click();
                elmDownEmailSuccess.remove();
            } else {

            }

            return false;
        }

        if (config.account == '') {
            showNotyTop("Danh sách gmail cần tạo đang rỗng", '', "error");
            return false;
        }

        if (config.start == "yes") {
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            var sDomain = location.hostname;
            var sAccounts = config.account.split(/\r?\n/);
            var sAccount = '';
            sAccount = sAccounts[config.position];
            window.sAccount = sAccount;
            console.log(sAccount);
            console.log("***************");

            //Xử lý set total và set email đang sử dụng
            if (config.total == 0) {
                config.total = sAccounts.length;
                config.email_using = sAccount;
                chrome.storage.sync.set({
                    config: config
                });
            }

            //Chuyển hướng về trang Google nếu đang ở sai trang
            if (sDomain != sAc && sDomain != sGo) {
                showNotyBottom('Đang Chuyển hướng về trang Google');
                setTimeout(() => {
                    window.location.href = 'https://' + sGo;
                }, sTe);
            }

            //Xử lý nếu đang ở trang chủ Google
            if (sDomain == sGo) {
                showNotyBottom('Đang Chuyển hướng trang Đăng ký');
                setTimeout(() => {
                    window.location.href = sUp;
                }, sTe * 2);

                //Reload trang nếu có lỗi
                reloadPage(sTe * 4);
            }

            /*********************/
            //Handle Error
            handleError();
            /*********************/

            //Xử lý nếu đang ở trang đăng nhập
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "ServiceLogin" || sUrlFull.includes('identifier')) {
                showNotyBottom('Đang chuyển hướng trang Đăng ký');
                setTimeout(() => {
                    window.location.href = sUp;
                }, sTe);

                //Reload trang nếu có lỗi
                reloadPage(sTe * 4);
            }

            //Xử lý nếu đang ở trang đăng ký
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "SignUp" || sUrlFull.includes('webcreateaccount')) {
                showNotyBottom('Nhập thông tin đăng ký');
                if (sAccount) {
                    var aAccount = sAccount.split('|');
                    var sEmail = $.trim(aAccount[0]).replace('@gmail.com', '');
                    var sPassWord = $.trim(aAccount[1]);
                    var sEmailRecovery = $.trim(aAccount[2]);
                    var sFirstName = (config.data_name)[config.position].first_name;
                    var sLastName = (config.data_name)[config.position].last_name;

                    //Show gmail create
                    var sHtml = '<p class="extension-show-comment">' +
                        '- Họ:                  ' + '<span class="color-yellow">' + sFirstName + '</span>' + '<br>' +
                        '- Tên:                 ' + '<span class="color-yellow">' + sLastName + '</span>' + '<br>' +
                        '- Email:               ' + '<span class="color-yellow">' + sEmail + '@gmail.com' + '</span>' + '<br>' +
                        '- Mật Khẩu:            ' + '<span class="color-yellow">' + sPassWord + '</span>' + '<br>' +
                        '</p>';
                    showNotyTop('', sHtml);

                    /*********************/
                    //Nhập thông tin đăng ký gmail
                    enterInfoRegister(sEmail, sPassWord, sEmailRecovery, sFirstName, sLastName)
                    /*********************/
                } else {
                    showNotyBottom('Không lấy được tài khoản gmail, đang chuyển về trang chủ Google', 'error');
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, sTe * 2);
                }
            }
        }
    });

    //Nhập thông tin đăng ký gmail
    function enterInfoRegister(sEmail, sPassWord, sEmailRecovery, sFirstName, sLastName) { //sFirstName: họ, sLastName: tên
        showNotyBottom('Nhập họ: ' + sFirstName);
        setTimeout(() => {
            //Nhap Họ
            $('form input[name=lastName]').bind('autotyped', function () {
            }).autotype(sFirstName, { delay: randomIntFromRange(80, 200) });

            showNotyBottom('Nhập tên: ' + sLastName);
            setTimeout(() => {
                //Nhap Tên
                $('form input[name=firstName]').bind('autotyped', function () {
                }).autotype(sLastName, { delay: randomIntFromRange(80, 200) });

                showNotyBottom('Nhập email: ' + sEmail);
                setTimeout(() => {
                    //Nhap User Name: Email
                    $('form input[name=Username]').bind('autotyped', function () {
                    }).autotype(sEmail, { delay: randomIntFromRange(80, 200) });

                    showNotyBottom('Nhập password: ' + sPassWord);
                    setTimeout(() => {
                        //Nhap Mật khẩu
                        $('form input[name=Passwd]').bind('autotyped', function () {
                        }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) });

                        showNotyBottom('Nhập lại password: ' + sPassWord);
                        setTimeout(() => {
                            //Nhap Lại Mật khẩu
                            $('form input[name=ConfirmPasswd]').bind('autotyped', function () {
                            }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) });

                            showNotyBottom('Bật hiện thị mật khẩu');
                            setTimeout(() => {
                                //Checked xem mật khẩu
                                if ($('input.VfPpkd-muHVFf-bMcfAe')) {
                                    $('input.VfPpkd-muHVFf-bMcfAe').prop('checked', true);
                                }

                                showNotyBottom('Đang chuyển trang nhập số điện thoại');
                                setTimeout(() => {
                                    if ($('button.nCP5yc')) {
                                        $('button.nCP5yc').click();
                                    }

                                    /*********************/
                                    //Xử lý lấy số điện thoại
                                    getPhoneAPI(sEmailRecovery);
                                    /*********************/

                                }, 10000);

                            }, 7000);

                        }, 10000)

                    }, 15000)

                }, 10000);

            }, 10000);

        }, 10000);
    }

    //Xử lý get Phone
    function getPhoneAPI(sEmailRecovery) {
        window.sNumCallPhone = 0;
        window.sPhoneCanUse = false;
        window.loadingGetPhone = false;
        showNotyBottom('Đang lấy số');
        setInterval(() => {
            if (window.sPhoneCanUse == false) {
                if (window.sNumCallPhone >= 20) {
                    $('p.extension-show-comment').remove();
                    showNotyTop("Lỗi sai số quá nhiều. đang chuyển hướng về trang Google", '', 'error');
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, sTe);
                } else {
                    $.ajax({
                        type: 'GET',
                        url: dUrlGetNumber,
                        success: function (data) {
                            window.sNumCallPhone = window.sNumCallPhone + 1;
                            if (data.ResponseCode == 0 || data.Msg == "OK") {
                                var sIdGeted = data.Result.Id;
                                var sUrlGetCode = dUrlGetCode + sIdGeted;
                                var sNumGeted = data.Result.Number;
                                var sPhoneDie = dPhoneDieOrigin.concat(config.phone_die);

                                //Lưu số đã lấy vòa danh sách die
                                chrome.storage.sync.get('config', function (result) {
                                    config = result.config;
                                    var phone_die = config.phone_die;
                                    phone_die.push(sNumGeted.replace('+84', ''));
                                    config.phone_die = phone_die;
                                    chrome.storage.sync.set({
                                        config: config
                                    });
                                })
                                console.log('Phone die:');
                                console.log(config.phone_die);
                                console.log('**************');

                                if (sPhoneDie.includes(sNumGeted)) {
                                    /**************************/
                                    //Tiep tuc lay PHONE_NUMBER --- chạy SetInterval Phone ---
                                    /**************************/
                                } else {
                                    /*****************************/
                                    //Xử lý nhập số điện thoại
                                    enterPhone(sNumGeted, sUrlGetCode, sEmailRecovery);
                                    /*****************************/

                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            showNotyTop("Lỗi lấy số data từ API, đang chuyển trang Google", '', 'error');
                            setTimeout(() => {
                                window.location.href = 'https://' + sGo;
                            }, 1000 * 120);
                            return false;
                        }
                    });
                }
            }
        }, 1000 * 20);
    }

    //Xử lý nhập số điện thoại
    function enterPhone(sNumGeted, sUrlGetCode, sEmailRecovery) {
        sNumGeted = "+84" + sNumGeted;
        showNotyBottom('Lấy Thành công: ' + '<span class="color-yellow">' + sNumGeted + '<span>');
        //Bấm chọn Mã vùng
        setTimeout(() => {
            if ($('.WEQkZc .VfPpkd-TkwUic')) {
                $('.WEQkZc .VfPpkd-TkwUic').click()
            }
        }, 1000 * 2);

        //Chọn Việt Nam
        setTimeout(() => {
            if ($('li.VfPpkd-StrnGf-rymPhb-ibnC6b[data-value=vn]')) {
                $('li.VfPpkd-StrnGf-rymPhb-ibnC6b[data-value=vn]').click();
            }
        }, 1000 * 4);

        setTimeout(() => {
            //Nhập số điện thoại
            if ($('#phoneNumberId')) {
                $('#phoneNumberId').val('');
                showNotyBottom('Đang nhập số: ' + '<span class="color-yellow">' + sNumGeted + '<span>');
                setTimeout(() => {
                    $('#phoneNumberId').bind('autotyped', function () {
                    }).autotype(sNumGeted, { delay: randomIntFromRange(80, 200) });

                    showNotyBottom('Ấn Button tiếp theo');
                    setTimeout(() => {
                        //Click tiep theo sau khi nhap so dien thoai
                        $('p.extension-show-info').remove();
                        if ($('.dG5hZc .qhFLie button')) {
                            $('.dG5hZc .qhFLie button').click()

                            setTimeout(() => {
                                var currentUrl = window.location.href;
                                if (currentUrl.includes('webgradsidvphone')) {
                                    /**************************/
                                    //Tiep tuc lay PHONE_NUMBER --- chạy SetInterval Phone ---
                                    showNotyBottom("Số không hợp lệ, chờ lấy lại. Thử lại lần: " + window.sNumCallPhone, 'error');
                                    /**************************/
                                } else {
                                    /*********************/
                                    //Get Code
                                    getCodeAPI(sUrlGetCode, sEmailRecovery);
                                    /*********************/
                                }
                            }, 5000);
                        }
                    }, sTe);
                }, 2000);
            }
        }, 1000 * 6);
    }

    //Xử lý Get Code
    function getCodeAPI(sUrlGetCode, sEmailRecovery) {
        window.sNumGetCode = 0;
        window.sGetCodeSuccess = false;
        window.loadingGetCode = false;
        window.sPhoneCanUse = true;
        showNotyBottom("Vui lòng chờ lấy code");
        setInterval(() => {
            if (window.sGetCodeSuccess == false) {
                if (window.sNumGetCode >= 10) {
                    showNotyTop("Lấy code thất bại. đang chuyển hướng Google: ", '', 'error');
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, sTe);
                } else if (window.loadingGetCode == false) {
                    window.loadingGetCode = true;
                    window.sNumGetCode = window.sNumGetCode + 1;
                    $.ajax({
                        type: 'GET',
                        url: sUrlGetCode,
                        success: function (data) {
                            window.loadingGetCode = false;
                            if (data.Result.Code) {
                                window.sNumGetCode = -100;
                                window.sGetCodeSuccess = true;
                            }
                            if (data.ResponseCode == 0 || data.Msg == "OK" || data.Msg == "Đã nhận được code") {
                                var sCodeNum = data.Result.Code;
                                showNotyBottom('Lấy code thành công, đang nhập code: ' + '<span class="color-yellow">' + sCodeNum + '</span>');
                                if (sCodeNum) {
                                    $('input#code').click();
                                    setTimeout(() => {
                                        $('input#code').bind('autotyped', function () {
                                        }).autotype(sCodeNum, { delay: randomIntFromRange(80, 200) });
                                    }, 1000);

                                    setTimeout(() => {
                                        $('p.extension-show-comment').remove();
                                        showNotyBottom("Chuyển đến trang thông tin chi tiết");
                                        if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ')) {
                                            $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ').click()

                                            /*********************/
                                            //Trang chi tiết
                                            enterInfoDetails(sEmailRecovery);
                                            /*********************/
                                        }
                                    }, 7000);
                                }
                            } else {
                                showNotyBottom("Lấy code Thất bại, chờ lấy lại. Thử lại lần: " + window.sNumGetCode, "error");
                            }
                        },
                        error: function (xhr, status, error) {
                            window.loadingGetCode = false;
                            showNotyTop("Lỗi lấy Code data từ API, đang chuyển hướng trang Google", '', "error");
                            setTimeout(() => {
                                window.location.href = 'https://' + sGo;
                            }, 1000 * 120);
                            return false;
                        }
                    })
                }
            }
        }, sTe * 2);
    }

    //Trang điền thông tin bổ sung
    function enterInfoDetails(sEmailRecovery) {
        setTimeout(() => {
            var sDay = random_item(dDay);
            var sMonth = randomIntFromRange(1, 12);
            var sYear = randomIntFromRange(1988, 2002);
            var sMale = randomIntFromRange(1, 2);
            var tMale = sMale == 1 ? "Nam" : "Nữ";
            var sHtml = '<p class="extension-show-comment">' +
                '- Email Khôi phục:         ' + '<span class="color-yellow">' + sEmailRecovery + '</span>' + '<br>' +
                '- Ngày/Tháng/Năm Sinh:     ' + '<span class="color-yellow">' + sDay + '/' + sMonth + '/' + sYear + '</span>' + '<br>' +
                '- Giới tính:               ' + '<span class="color-yellow">' + tMale + '</span>' + '<br>' +
                '</p>';
            showNotyTop('', sHtml);

            var sCurrentUrl = window.location.href;
            if (sCurrentUrl.includes('webpersonaldetails')) {
                //Xoa so dien thoai
                $('#phoneNumberId').val('');
                showNotyBottom('Nhập email khôi phục: ' + sEmailRecovery);
                setTimeout(() => {
                    //Nhap email khoi phuc
                    $('input[name=recoveryEmail]').bind('autotyped', function () {
                    }).autotype(sEmailRecovery, { delay: randomIntFromRange(80, 200) });

                    showNotyBottom('Nhập ngày sinh: ' + sDay);
                    setTimeout(() => {
                        //Nhap ngay sinh
                        $('input[name=day]').val("");
                        setTimeout(() => {
                            $('input[name=day]').bind('autotyped', function () {
                            }).autotype(sDay, { delay: randomIntFromRange(80, 200) });

                            showNotyBottom('Nhập tháng sinh: ' + sMonth);
                            setTimeout(() => {
                                //Nhap thang sinh
                                $('#month').val(sMonth).change();

                                showNotyBottom('Nhập năm sinh: ' + sYear);
                                setTimeout(() => {
                                    //Nhap nam sinh
                                    $('input[name=year]').val();
                                    setTimeout(() => {
                                        $('input[name=year]').val(sYear).change();

                                        showNotyBottom('Nhập giới tính: ' + tMale);
                                        setTimeout(() => {
                                            //Nhap gioi tinh
                                            $('#gender').val(tMale).change();

                                            showNotyBottom("Chuyển đến điều khoản Google");
                                            setTimeout(() => {
                                                //Click tiep theo => Chuyển đến điều khoản Google
                                                if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc')) {
                                                    $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc').click();

                                                    /*********************/
                                                    //Trang đồng ý điều khoản google
                                                    googleTerms();
                                                    /*********************/
                                                }
                                            }, 10000);

                                        }, sTe);

                                    }, sTe);

                                }, sTe);

                            }, sTe);

                        }, sTe);

                    }, 12000);

                }, sTe);
            }
        }, sTe);
    }

    //Trang đồng ý điều khoản google
    function googleTerms() {
        setTimeout(() => {
            showNotyBottom("Đồng Ý Với Điều Khoản Google");

            setTimeout(() => {
                //Scroll đọc điều khoản google
                scrollToBottom();
            }, 2000);

            //Tăng position khi tạo gmail vị trí hiện tại thành công
            chrome.storage.sync.get('config', function (result) {
                config = result.config;
                config.email_success = config.email_success + ' *** ' + config.email_using;
                config.position = config.position + 1;
                if (config.position >= config.total) {
                    config.start = 'no';
                }
                chrome.storage.sync.set({
                    config: config
                });
            })

            setTimeout(() => {
                //Click dong y dieu khoan Google
                if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc')) {
                    $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc').click();
                }
            }, sTe * 3);

        }, sTe);
    }

    function scrollToBottom() {
        $('html, body').animate({ scrollTop: randomIntFromRange(1000, 2000) }, randomIntFromRange(6000, 9000));
    }

    function showNotyTop(content, sHtml = '', type = "success") {
        $('p.extension-show-comment').remove();
        if (type == "success")
            sHtml = sHtml ? sHtml : '<p class="extension-show-comment">' + content + ' : ' + '</p>';
        else
            sHtml = sHtml ? sHtml : '<p class="extension-show-comment error">' + content + '</p>';

        $(sHtml).appendTo('body');

    }

    function showNotyBottom(content, type = "success") {
        $('p.extension-show-info').remove();
        if (window.inTime)
            clearInterval(window.inTime);
        if (type == "success")
            var sHtml = '<p class="extension-show-info">' + content + '</p>';
        else
            var sHtml = '<p class="extension-show-info error">' + content + '</p>';

        var time = 0;
        window.inTime = setInterval(() => {
            time = time + 1;
            $('p.extension-show-time').remove();
            var sTimeHtml = '<p class="extension-show-time">' + time + '</p>'
            $(sTimeHtml).appendTo('body ');
        }, 1000);

        $(sHtml).appendTo('body ');
    }

    //Get Param url
    function getUrlParameter(sParam, sUrl = '') {
        if (sUrl != '') {
            var sPageURL = sUrl;
        } else {
            var sPageURL = window.location.search.substring(1);
        }
        var sURLVariables = sPageURL.split('&');
        var sParameterName;
        var i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    }

    //Get ID Video from url
    function youtube_parser(url) {
        if (url != '' && url != undefined) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            if (match != undefined) {
                return (match && match[7].length == 11) ? match[7] : false;
            }
        }

        return false;
    }

    //Random Array
    function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    //Random range Minmax
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Random Yes = 3, No = 7
    function random_yes_no(yes = 3, no = 7) {
        arrYesNO = [];
        for (let i = 0; i < yes; i++) {
            arrYesNO.push('yes');
        }
        for (let j = 0; j < no; j++) {
            arrYesNO.push('no');
        }
        return random_item(arrYesNO);
    }

    //Reload page
    function reloadPage(time) {
        time = randomIntFromRange(time, time + 3000);
        //Reload trang nếu có lỗi
        setTimeout(() => {
            window.location.reload();
        }, time);
    }

    function handleError() {
        //Xử lý chuyển về trang chủ Google nếu lỗi
        setInterval(() => {
            currentUrl = window.location.href;
            console.log("CHECKING ERROR");
            console.log("**********");
            if (currentUrl.includes('unknownerror')) {
                showNotyNormal("Đang chuyển trang Google");
                setTimeout(() => {
                    window.location.href = 'https://' + sGo;
                }, 2000);
            }

            //Nếu ở 1 trang quá 10p thì chuyển về trang google 
            sTot = sTot + sTe * 2;
            if (sTot > (1000 * 60 * 10)) {
                window.location.href = 'https://' + sGo;
            }
        }, sTe * 2);
    }
});
