jQuery(document).ready(function ($) {
    var config = '';

    var sYB = 'www.youtube.com';
    var sGo = 'www.google.com';
    var sAc = 'accounts.google.com';
    var sCf = 'https://cafebiz.vn/';
    var sLg = 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26next%3D%252F&amp%3Bpassive=false&amp%3Bservice=youtube&amp%3Builel=0&flowName=GlifWebSignIn&flowEntry=AddSession';
    var sUp = 'https://accounts.google.com/signup/v2/webcreateaccount?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp';
    var sTe = randomIntFromRange(4000, 6000);
    var sTot = 0;
    window.sInEnterInforRegister = false;
    window.sInEnterPhone = false;
    window.sInEnterCode = false;
    window.sInEnterInfoDetail = false;
    window.sInAgree = false;

    //Get Account
    chrome.storage.sync.get('config', function (result) {
        config = result.config;
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");
        console.log("🏍ConfigDefine:                                            🏍");
        console.log(config);
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");

        if (config.start == "no") {
            showNotyTop("CHÚC MỪNG đã tạo xong danh sách gmail.")
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
                config.gmail_using = sAccount;
                chrome.storage.sync.set({
                    config: config
                });
            }

            //Chuyển hướng về trang Google nếu đang ở sai trang
            if (sDomain != sAc && sDomain != sGo) {
                showNotyBottom('Đang Chuyển hướng về trang Google');
                setTimeout(() => {
                    window.location.href = 'https://' + sGo;
                }, sTe * 10);
            }

            //Xử lý nếu đang ở trang chủ Google
            if (sDomain == sGo) {
                showNotyBottom('Đang Chuyển hướng trang Đăng ký');
                setTimeout(() => {
                    window.location.href = sUp;
                }, sTe * 5);

                //Reload trang nếu có lỗi
                reloadPage(sTe * 10);
            }

            /*********************/
            //Handle Error
            handleError();
            /*********************/

            //Xử lý nếu đang ở trang đăng nhập
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "ServiceLogin" || sUrlFull.includes('identifier')) {
                showNotyBottom('Chờ chuyển hướng trang Đăng ký');
                setTimeout(() => {
                    window.location.href = sUp;
                }, sTe * 3);

                //Reload trang nếu có lỗi
                reloadPage(sTe * 5);
            }

            //Xử lý nếu đang ở trang đăng ký
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "SignUp" || sUrlFull.includes('webcreateaccount')) {
                showNotyBottom('Chờ nhập thông tin đăng ký');
                if (sAccount) {
                    var aAccount = sAccount.split('|');
                    var sEmail = $.trim(aAccount[0]).replace('@gmail.com', '');
                    var sPassWord = $.trim(aAccount[1]);
                    var sEmailRecovery = $.trim(aAccount[2]);

                    var sFirstName = (config.data_name)[config.position].first_name;
                    var sLastName = (config.data_name)[config.position].last_name;

                    //Lưu tách biết email, pass, email_recovery vào storage
                    config.gmail_get_temp = sEmail;
                    config.pass_get_temp = sPassWord;
                    config.gmail_recovery_get_temp = sEmailRecovery;
                    chrome.storage.sync.set({
                        config: config
                    });

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
        showNotyBottom('Chờ nhập họ: ' + sFirstName);
        setTimeout(() => {
            //Nhap Họ
            $('form input[name=lastName]').bind('autotyped', function () {
            }).autotype(sFirstName, { delay: randomIntFromRange(80, 200) });

            showNotyBottom('Chờ nhập tên: ' + sLastName);
            setTimeout(() => {
                //Nhap Tên
                $('form input[name=firstName]').bind('autotyped', function () {
                }).autotype(sLastName, { delay: randomIntFromRange(80, 200) });

                showNotyBottom('Chờ nhập email: ' + sEmail);
                setTimeout(() => {
                    //Nhap User Name: Email
                    /*$('form input[name=Username]').bind('autotyped', function () {
                    }).autotype(sEmail, { delay: randomIntFromRange(80, 200) });*/
                    $('form input[name=Username]').val(sEmail);

                    showNotyBottom('Chờ nhập password: ' + sPassWord);
                    setTimeout(() => {
                        //Nhap Mật khẩu
                        /* $('form input[name=Passwd]').bind('autotyped', function () {
                        }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) }); */
                        $('form input[name=Passwd]').val(sPassWord);

                        showNotyBottom('Chờ nhập lại password: ' + sPassWord);
                        setTimeout(() => {
                            //Nhap Lại Mật khẩu
                            /* $('form input[name=ConfirmPasswd]').bind('autotyped', function () {
                            }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) }); */
                            $('form input[name=ConfirmPasswd]').val(sPassWord);

                            showNotyBottom('Chờ bật hiện thị mật khẩu');
                            setTimeout(() => {
                                //Checked xem mật khẩu
                                if ($('input.VfPpkd-muHVFf-bMcfAe')) {
                                    $('input.VfPpkd-muHVFf-bMcfAe').prop('checked', true);
                                }

                                showNotyBottom('Chờ chuyển trang NHẬP SỐ ĐIỆN THOẠI');
                                setTimeout(() => {
                                    if ($('button.nCP5yc')) {
                                        $('button.nCP5yc').click();

                                        setTimeout(() => {
                                            var currentUrl = window.location.href;
                                            if (!currentUrl.includes('webcreateaccount')) {
                                                /*********************/
                                                //Xử lý lấy số điện thoại
                                                getPhoneAPI(sEmailRecovery);
                                                /*********************/
                                            } else {
                                                showNotyTop("Đã có lỗi khi nhập thông tin đăng ký, đang chuyển trang", '', 'error');
                                                setTimeout(() => {
                                                    window.location.href = 'https://' + sGo;
                                                }, sTe + 1000);
                                            }
                                        }, sTe + 1000);
                                    }

                                }, sTe + 1000);

                            }, sTe + 2000);

                        }, sTe + 2000)

                    }, sTe + 2000)

                }, sTe + 2000);

            }, sTe + 2000);

        }, 10000);
    }

    //Xử lý get Phone
    function getPhoneAPI(sEmailRecovery) {
        showNotyBottom('Chờ lấy số từ API');
        window.sNumCallPhone = 0;
        window.sPhoneCanUse = false;
        window.enteringPhone = false;
        //Từ lần 2 trở đi
        var getPhoneInterval = setInterval(() => {
            handlePhone(sEmailRecovery, getPhoneInterval);
        }, 1000 * 35);

        //Chạy lần đầu tiền
        setTimeout(() => {
            handlePhone(sEmailRecovery, getPhoneInterval);
        }, sTe);

    }

    function handlePhone(sEmailRecovery, getPhoneInterval) {
        if (window.sNumCallPhone >= 15) {
            showNotyTop("Lỗi sai số quá nhiều. đang chuyển hướng về trang Google", '', 'error');
            setTimeout(() => {
                window.location.href = 'https://' + sGo;
            }, sTe);
        } else if (window.sPhoneCanUse == false && window.enteringPhone == false) {
            $.ajax({
                type: 'GET',
                url: dUrlGetNumber,
                success: function (data) {
                    console.log("Call api get phone success:");
                    console.log(data);
                    console.log("********************");
                    window.sNumCallPhone = window.sNumCallPhone + 1;
                    if (data.ResponseCode == 0 || data.Msg == "OK") {
                        window.enteringPhone = true;
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

                        //Kiểm tra số lấy được có nằm trong danh sách số die không
                        if (sPhoneDie.includes(sNumGeted.replace('+84', ''))) {
                            //Hủy đợi tin nhắn trên API
                            $.ajax({
                                type: 'GET',
                                url: dUrlCancelWaitMes + sIdGeted,
                                success: function (data) {
                                    console.log("Hủy đợi tin nhắn: SUCCESS");
                                    console.log('**************');
                                },
                                error: function (xhr, status, error) {
                                    console.log("Hủy đợi tin nhắn: ERROR");
                                    console.log('**************');
                                }
                            })

                            window.enteringPhone = false;
                            showNotyBottom('Số: ' + '<span class="color-yellow">' + sNumGeted + '</span>' + ' đã nằm trong danh sách die, Chờ lấy số khác.');
                            /**************************/
                            //Tiep tuc lay PHONE_NUMBER --- chạy SetInterval Phone ---
                            /**************************/
                        } else {
                            /*****************************/
                            //Xử lý nhập số điện thoại
                            enterPhone(getPhoneInterval, sNumGeted, sUrlGetCode, sEmailRecovery);
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

    //Xử lý nhập số điện thoại
    function enterPhone(getPhoneInterval, sNumGeted, sUrlGetCode, sEmailRecovery) {
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
        }, sTe);

        setTimeout(() => {
            //Nhập số điện thoại
            if ($('#phoneNumberId')) {
                $('#phoneNumberId').val('');
                showNotyBottom('Đang nhập số: ' + '<span class="color-yellow">' + sNumGeted + '<span>');
                setTimeout(() => {
                    /* $('#phoneNumberId').bind('autotyped', function () {
                    }).autotype(sNumGeted, { delay: randomIntFromRange(80, 200) }); */
                    $('#phoneNumberId').val(sNumGeted);

                    showNotyBottom('Chờ ấn Button tiếp theo');
                    setTimeout(() => {
                        //Click tiep theo sau khi nhap so dien thoai
                        if ($('.dG5hZc .qhFLie button')) {
                            $('.dG5hZc .qhFLie button').click()
                            $('p.extension-show-info').remove();

                            window.enteringPhone = false;
                            setTimeout(() => {
                                var currentUrl = window.location.href;
                                if (currentUrl.includes('webgradsidvphone')) {
                                    /**************************/
                                    //Tiep tuc lay PHONE_NUMBER --- chạy SetInterval Phone ---
                                    showNotyBottom("Số không hợp lệ, chờ lấy lại. Thử lại lần: " + window.sNumCallPhone, 'error');
                                    /**************************/
                                } else {
                                    /*********************/
                                    window.sPhoneCanUse = true;
                                    clearInterval(getPhoneInterval);
                                    //Get Code
                                    getCodeAPI(sUrlGetCode, sEmailRecovery);
                                    /*********************/
                                }
                            }, sTe);
                        }
                    }, sTe + 3000);
                }, 2000);
            }
        }, sTe + 2500);
    }

    //Xử lý Get Code
    function getCodeAPI(sUrlGetCode, sEmailRecovery) {
        window.sNumGetCode = 0;
        window.sGetCodeSuccess = false;
        window.sLoadingGetCode = false;
        showNotyBottom("Vui lòng chờ lấy code");
        var getCodeInterval = setInterval(() => {
            if (window.sGetCodeSuccess == false) {
                if (window.sNumGetCode >= 5) {
                    showNotyTop("Lấy code thất bại. đang chuyển hướng Google: ", '', 'error');
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, sTe);
                } else if (window.sLoadingGetCode == false) {
                    window.sLoadingGetCode = true;
                    window.sNumGetCode = window.sNumGetCode + 1;
                    $.ajax({
                        type: 'GET',
                        url: sUrlGetCode,
                        success: function (data) {
                            console.log("Call api get code success:");
                            console.log(data);
                            console.log("***************");
                            window.sLoadingGetCode = false;
                            if (data.Result.Code) {
                                clearInterval(getCodeInterval);
                                window.sNumGetCode = -100;
                                window.sGetCodeSuccess = true;
                            }
                            if (data.ResponseCode == 0 || data.Msg == "OK" || data.Msg == "Đã nhận được code") {
                                var sCodeNum = data.Result.Code;
                                showNotyBottom('Lấy code thành công, đang nhập code: ' + '<span class="color-yellow">' + sCodeNum + '</span>');
                                if (sCodeNum) {
                                    $('input#code').click();
                                    setTimeout(() => {
                                        /* $('input#code').bind('autotyped', function () {
                                        }).autotype(sCodeNum, { delay: randomIntFromRange(80, 200) }); */
                                        $('input#code').val(sCodeNum);
                                    }, 1000);

                                    setTimeout(() => {
                                        showNotyBottom("Chờ chuyển trang ĐIỀN THÊM THÔNG TIN");
                                        if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ')) {
                                            $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ').click()

                                            /*********************/
                                            //Trang chi tiết
                                            enterInfoDetails(sEmailRecovery);
                                            /*********************/
                                        }
                                    }, sTe + 2000);
                                }
                            } else {
                                showNotyBottom("Lấy code Thất bại, chờ lấy lại. Thử lại lần: " + window.sNumGetCode, "error");
                            }
                        },
                        error: function (xhr, status, error) {
                            window.sLoadingGetCode = false;
                            showNotyTop("Lỗi lấy CODE từ api, đang chuyển hướng trang Google", '', "error");
                            setTimeout(() => {
                                window.location.href = 'https://' + sGo;
                            }, 1000 * 120);
                            return false;
                        }
                    })
                }
            }
        }, sTe * 4);
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
                    /* $('input[name=recoveryEmail]').bind('autotyped', function () {
                    }).autotype(sEmailRecovery, { delay: randomIntFromRange(80, 200) }); */
                    $('input[name=recoveryEmail]').val(sEmailRecovery);

                    showNotyBottom('Nhập ngày sinh: ' + sDay);
                    setTimeout(() => {
                        //Nhap ngay sinh
                        $('input[name=day]').val("");
                        setTimeout(() => {
                            /* $('input[name=day]').bind('autotyped', function () {
                            }).autotype(sDay, { delay: randomIntFromRange(80, 200) }); */
                            $('input[name=day]').val(sDay);

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
                                            $('#gender').val(sMale).change();

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
                                            }, sTe * 2);

                                        }, sTe + 2000);

                                    }, sTe + 2000);

                                }, sTe + 2000);

                            }, sTe + 2000);

                        }, sTe + 2000);

                    }, sTe + 2000);

                }, sTe + 2000);
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

                config.gmail_get = config.gmail_get + config.gmail_get_temp + '@gmail.com' + '\n';
                config.pass_get = config.pass_get + config.pass_get_temp + '\n';
                config.gmail_recovery_get = config.gmail_recovery_get + config.gmail_recovery_get_temp + '\n';
                config.gmail_success = config.gmail_success + config.gmail_using + '\n';
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
        $('p.extension-show-comment').remove();
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
            $('p.extension-show-time').remove();
            time = time + 1;
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
            if (currentUrl.includes('unknownerror')) {
                showNotyNormal("Đang chuyển trang Google");
                setTimeout(() => {
                    window.location.href = 'https://' + sGo;
                }, 2000);
            }

            //Nếu ở 1 trang quá 15p thì chuyển về trang google 
            sTot = sTot + sTe * 2;
            console.log("TGCL:  ~ " + Math.round((1000 * 60 * 15 - sTot) / 1000) + ' Giây');
            console.log("**********");
            if (sTot > (1000 * 60 * 15)) {
                window.location.href = 'https://' + sGo;
            }
        }, sTe * 2);
    }
});
