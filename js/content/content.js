jQuery(document).ready(function ($) {
    var config = '';

    var sYB = 'www.youtube.com';
    var sGo = 'www.google.com';
    var sAc = 'accounts.google.com';
    var sLg = 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dvi%26next%3D%252F&amp%3Bhl=vi&amp%3Bpassive=false&amp%3Bservice=youtube&amp%3Builel=0&flowName=GlifWebSignIn&flowEntry=AddSession';
    var sUp = 'https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fwww.google.com%2F%3Fgws_rd%3Dssl&hl=vi&dsh=S-2130637172%3A1631538050370332&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp';
    var sTe = 5000;

    //Get Account
    chrome.storage.sync.get('config', function (result) {
        config = result.config;
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");
        console.log("          Get Account In chrome.storage.sync content      🏍");

        console.log("🏍   ConfigDefine:                                        🏍");
        console.log(config);
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");
        if (config.start == "yes") {

            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            var sDomain = location.hostname;
            var sAccount = random_item(config.account.split(/\r?\n/));

            //Chuyển hướng về trang Google nếu đang ở sai trang
            if (sDomain != sAc && sDomain != sGo) {
                showNotyDuration('Đang Chuyển hướng về trang chủ Google');
                setTimeout(() => {
                    window.location.href = 'https://' + sGo;
                }, sTe);
            }

            //Xử lý nếu đang ở trang chủ Google
            if (sDomain == sGo) {
                showNotyDuration('Đang Chuyển hướng trang đăng nhập', sTe);
                setTimeout(() => {
                    var btnLogin = $('body .gb_Se a.gb_3');
                    if (btnLogin?.length > 0) {
                        btnLogin[0].click();
                    } else {
                        window.location.href = sLg;
                    }
                }, sTe);
            }

            //Xử lý nếu đang ở trang đăng nhập
            if (sFlowEntry == "ServiceLogin" || sUrlFull.includes('identifier')) {
                console.log("Đang ở trang đăng nhập");
                console.log("********");
                showNotyDuration('Đang chuyển hướng trang Tạo Tài Khoản', sTe * 2);
                setTimeout(() => {
                    if ($('.daaWTb .VfPpkd-LgbsSe').length > 0) {
                        //click Tạo tài khoản
                        $('.daaWTb .VfPpkd-LgbsSe')[0].click();
                        setTimeout(() => {
                            if ($('.VfPpkd-xl07Ob-XxIAqe ul li').length > 0) {
                                //click cho bản thân tôi
                                $('.VfPpkd-xl07Ob-XxIAqe ul li')[0].click();
                            } else {
                                window.location.href = sUp;
                            }
                        }, sTe);
                    } else {
                        window.location.href = sUp;
                    }
                }, sTe);
            }

            //Xử lý nếu đang ở trang đăng ký
            if (sFlowEntry == "SignUp") {
                console.log("Đang ở trang Đăng Ký");
                console.log("********");

                if (sAccount != '') {
                    // if (sEmail != '' && sPassWord != '') {
                    //     flag = true;
                    //     chrome.storage.sync.get('config', function (result) {
                    //         var initConfig = result.config;

                    //         initConfig.data = [];
                    //         chrome.storage.sync.set({
                    //             config: initConfig
                    //         });
                    //     });
                    // }

                    var aAccount = sAccount.split('|');
                    var sEmail = $.trim(aAccount[0]);
                    var sPassWord = $.trim(aAccount[1]);
                    var sEmailRecovery = $.trim(aAccount[2]);
                    var sFirstName = random_item(dFirstName);
                    var sLastName = random_item(dLastName);

                    //Show gmail create
                    $('p.extension-show-comment').remove();
                    var sHtml = '<p class="extension-show-comment">' +
                        '- Email:               ' + '<span class="color-yellow">' + sEmail + '</span>' + '<br>' +
                        '- Mật Khẩu:            ' + '<span class="color-yellow">' + sPassWord + '</span>' + '<br>' +
                        '- Email Khôi Phục:     ' + '<span class="color-yellow">' + sEmailRecovery + '</span>' +
                        '</p>';
                    $(sHtml).appendTo('body');

                    setTimeout(() => {
                        setTimeout(() => {
                            //Nhap Last Name: Họ
                            $('form input[name=lastName]').bind('autotyped', function () {
                            }).autotype(sLastName, { delay: randomIntFromRange(80, 200) });

                            setTimeout(() => {
                                //Nhap First Name: Tên
                                $('form input[name=firstName]').bind('autotyped', function () {
                                }).autotype(sFirstName, { delay: randomIntFromRange(80, 200) });

                                setTimeout(() => {
                                    //Nhap User Name: Email
                                    $('form input[name=Username]').bind('autotyped', function () {
                                    }).autotype(sEmail, { delay: randomIntFromRange(80, 200) });

                                    setTimeout(() => {
                                        //Nhap Mật khẩu
                                        $('form input[name=Passwd]').bind('autotyped', function () {
                                        }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) });

                                        setTimeout(() => {
                                            //Nhap Lại Mật khẩu
                                            $('form input[name=ConfirmPasswd]').bind('autotyped', function () {
                                            }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) });

                                            //Checked xem mật khẩu
                                            setTimeout(() => {
                                                if ($('input.VfPpkd-muHVFf-bMcfAe')) {
                                                    $('input.VfPpkd-muHVFf-bMcfAe').prop('checked', true);
                                                }

                                                setTimeout(() => {
                                                    if ($('button.nCP5yc')) {
                                                        $('button.nCP5yc').click();

                                                        $('p.extension-show-comment').remove();
                                                        showNotyNormal("Đang lấy số điện thoại")
                                                    }

                                                    window.sNumCallPhone = 0;
                                                    window.sGetCodeSuccess = false;
                                                    window.sPhoneCanUse = false;
                                                    window.loadingGetPhone = false;
                                                    window.loadingGetCode = false;
                                                    setInterval(() => {
                                                        if (window.sPhoneCanUse == false) {
                                                            console.log("Call Ajax Get Phone");
                                                            console.log("******************");
                                                            $.ajax({
                                                                type: 'GET',
                                                                url: dUrlGetNumber,
                                                                success: function (data) {
                                                                    console.log("Get Phone Success");
                                                                    console.log("*******************");
                                                                    if (data.ResponseCode == 0 || data.Msg == "OK") {
                                                                        var sIdGeted = data.Result.Id;
                                                                        var sUrlGetCode = dUrlGetCode + sIdGeted;
                                                                        var sNumGeted = data.Result.Number;
                                                                        sNumGeted = "+84" + sNumGeted;
                                                                        showNotyNormal("Đang lấy số điện thoại")
                                                                        showNotyNormal("Lấy Số thành công: " + sNumGeted);
                                                                        setTimeout(() => {
                                                                            //Nhập số điện thoại
                                                                            if ($('#phoneNumberId')) {
                                                                                $('#phoneNumberId').val('');
                                                                                setTimeout(() => {
                                                                                    $('#phoneNumberId').bind('autotyped', function () {
                                                                                    }).autotype(sNumGeted, { delay: randomIntFromRange(80, 200) });

                                                                                    setTimeout(() => {
                                                                                        //Click tiep theo sau khi nhap so dien thoai
                                                                                        if ($('.dG5hZc .qhFLie button')) {
                                                                                            $('.dG5hZc .qhFLie button').click()

                                                                                            setTimeout(() => {
                                                                                                var currentUrl = window.location.href;
                                                                                                if (currentUrl.includes('webgradsidvphone')) {
                                                                                                    /**************************/
                                                                                                    //Tiep tuc lay PHONE_NUMBER
                                                                                                    /**************************/
                                                                                                } else {
                                                                                                    window.sPhoneCanUse = true;
                                                                                                    showNotyNormal("Vui lòng chờ lấy code");
                                                                                                    setInterval(() => {
                                                                                                        if (window.sGetCodeSuccess == false) {
                                                                                                            if (window.sNumCallPhone >= 5) {
                                                                                                                setTimeout(() => {
                                                                                                                    window.location.href = 'https://' + sGo;
                                                                                                                }, 1000 * 120);
                                                                                                            } else if (window.loadingGetCode == false) {
                                                                                                                window.loadingGetCode = true;
                                                                                                                window.sNumCallPhone = window.sNumCallPhone + 1;
                                                                                                                $.ajax({
                                                                                                                    type: 'GET',
                                                                                                                    url: sUrlGetCode,
                                                                                                                    success: function (data) {
                                                                                                                        window.sNumCallPhone = -100;
                                                                                                                        window.loadingGetCode = false;
                                                                                                                        console.log("Get Code Success");
                                                                                                                        console.log(data);
                                                                                                                        if (data.Result.Code) {
                                                                                                                            window.sGetCodeSuccess = true;
                                                                                                                        }
                                                                                                                        localStorage.setItem("GET_CODE_SUCCESS", JSON.stringify(data));
                                                                                                                        if (data.ResponseCode == 0 || data.ResponseCode == 0 || data.Msg == "OK" || data.Msg == "Đã nhận được code") {
                                                                                                                            var sCodeNum = data.Result.Code;
                                                                                                                            $('p.extension-show-comment').remove();
                                                                                                                            showNotyNormal("lấy CODE thành công: " + sCodeNum);
                                                                                                                            if (sCodeNum) {
                                                                                                                                $('input#code').bind('autotyped', function () {
                                                                                                                                }).autotype(sCodeNum, { delay: randomIntFromRange(80, 200) });

                                                                                                                                setTimeout(() => {
                                                                                                                                    $('p.extension-show-comment').remove();
                                                                                                                                    showNotyNormal("Chuyển đến trang thông tin chi tiết");
                                                                                                                                    if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ')) {
                                                                                                                                        $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ').click()

                                                                                                                                        setTimeout(() => {
                                                                                                                                            $('p.extension-show-comment').remove();
                                                                                                                                            showNotyNormal("Nhập các thông tin chi tiết");
                                                                                                                                            var sCurrentUrl = window.location.href;
                                                                                                                                            if (sCurrentUrl.includes('webpersonaldetails')) {
                                                                                                                                                //Xoa so dien thoai
                                                                                                                                                $('#phoneNumberId').val('');
                                                                                                                                                setTimeout(() => {
                                                                                                                                                    $('p.extension-show-comment').remove();
                                                                                                                                                    showNotyNormal("Nhập Email khôi phục");
                                                                                                                                                    //Nhap email khoi phuc
                                                                                                                                                    $('input[name=recoveryEmail]').bind('autotyped', function () {
                                                                                                                                                    }).autotype(sEmailRecovery, { delay: randomIntFromRange(80, 200) });

                                                                                                                                                    setTimeout(() => {
                                                                                                                                                        $('p.extension-show-comment').remove();
                                                                                                                                                        showNotyNormal("Nhập Ngày sinh");
                                                                                                                                                        //Nhap ngay sinh
                                                                                                                                                        $('input[name=day]').val("");
                                                                                                                                                        setTimeout(() => {
                                                                                                                                                            $('input[name=day]').bind('autotyped', function () {
                                                                                                                                                            }).autotype(random_item(dNumMonth), { delay: randomIntFromRange(80, 200) });

                                                                                                                                                            setTimeout(() => {
                                                                                                                                                                //Nhap thang sinh
                                                                                                                                                                $('p.extension-show-comment').remove();
                                                                                                                                                                showNotyNormal("Nhập Tháng sinh");
                                                                                                                                                                $('#month').val(randomIntFromRange(1, 12)).change();

                                                                                                                                                                setTimeout(() => {
                                                                                                                                                                    //Nhap nam sinh
                                                                                                                                                                    $('p.extension-show-comment').remove();
                                                                                                                                                                    showNotyNormal("Nhập Năm sinh");
                                                                                                                                                                    $('input[name=year]').val();
                                                                                                                                                                    setTimeout(() => {
                                                                                                                                                                        $('input[name=year]').val(randomIntFromRange(1988, 2002));

                                                                                                                                                                        setTimeout(() => {
                                                                                                                                                                            $('p.extension-show-comment').remove();
                                                                                                                                                                            showNotyNormal("Nhập Giới Tính");
                                                                                                                                                                            //Nhap gioi tinh
                                                                                                                                                                            $('#gender').val(randomIntFromRange(1, 2)).change();

                                                                                                                                                                            setTimeout(() => {
                                                                                                                                                                                $('p.extension-show-comment').remove();
                                                                                                                                                                                showNotyNormal("Chuyển đến điều khoản Google");
                                                                                                                                                                                //Click tiep theo => Chuyển đến điều khoản Google
                                                                                                                                                                                if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc')) {
                                                                                                                                                                                    $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc').click();
                                                                                                                                                                                    setTimeout(() => {
                                                                                                                                                                                        $('p.extension-show-comment').remove();
                                                                                                                                                                                        showNotyNormal("Đồng Ý Với Điều Khoản Google");
                                                                                                                                                                                        //Click dong y dieu khoan Google
                                                                                                                                                                                        if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc')) {
                                                                                                                                                                                            $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc').click();
                                                                                                                                                                                        }
                                                                                                                                                                                    }, 10000);
                                                                                                                                                                                }
                                                                                                                                                                            }, 10000);

                                                                                                                                                                        }, 5000);
                                                                                                                                                                    }, 5000);

                                                                                                                                                                }, 5000);

                                                                                                                                                            }, 5000);

                                                                                                                                                        }, 5000);

                                                                                                                                                    }, 12000);

                                                                                                                                                }, 5000);
                                                                                                                                            }
                                                                                                                                        }, sTe);
                                                                                                                                    }
                                                                                                                                }, 5000);
                                                                                                                            }
                                                                                                                        } else {
                                                                                                                            showNotyNormal("Lấy code Thất bại, chờ lấy lại. Thử lại lần: " + window.sNumCallPhone, "error");
                                                                                                                        }
                                                                                                                    },
                                                                                                                    error: function (xhr, status, error) {
                                                                                                                        window.loadingGetCode = false;
                                                                                                                        showNotyNormal("Lỗi lấy Code data từ API", "error");
                                                                                                                        setTimeout(() => {
                                                                                                                            window.location.href = 'https://' + sGo;
                                                                                                                        }, 1000 * 120);
                                                                                                                    }
                                                                                                                })
                                                                                                            }
                                                                                                        }
                                                                                                    }, 5000);
                                                                                                }
                                                                                            }, 5000);
                                                                                        }
                                                                                    }, sTe);
                                                                                }, 2000);
                                                                            }
                                                                        }, 3000);
                                                                    }
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    showNotyNormal("Lỗi lấy PHONE_NUMBER data từ API", "error");
                                                                    setTimeout(() => {
                                                                        window.location.href = 'https://' + sGo;
                                                                    }, 1000 * 120);
                                                                }
                                                            });
                                                        }
                                                    }, 20000);
                                                }, sTe);

                                            }, sTe);

                                        }, 7000)

                                    }, 13000)

                                }, 7000);

                            }, 7000);

                        }, 7000);

                    }, 7000);
                }
            }
        }
    });

    function showNotyDuration(content, duration = sTe) {
        $('p.extension-show-comment').remove();
        setInterval(() => {
            var sHtml = '<p class="extension-show-comment">' + content + ': ' + duration / 1000 + '</p>';
            $(sHtml).appendTo('body');
            duration = duration - 1000;
        }, 1000);
    }

    function showNotyNormal(content, type = "success") {
        $('p.extension-show-comment').remove();
        if (type == "success") {
            var sHtml = '<p class="extension-show-comment">' + content + '</p>';
        } else {
            var sHtml = '<p class="extension-show-comment error">' + content + '</p>';
        }
        $(sHtml).appendTo('body');
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
});
