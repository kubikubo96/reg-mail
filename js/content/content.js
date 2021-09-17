jQuery(document).ready(function ($) {
    var config = '';

    var sYB = 'www.youtube.com';
    var sGo = 'www.google.com';
    var sAc = 'accounts.google.com';
    var sLg = 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dvi%26next%3D%252F&amp%3Bhl=vi&amp%3Bpassive=false&amp%3Bservice=youtube&amp%3Builel=0&flowName=GlifWebSignIn&flowEntry=AddSession';
    var sUp = 'https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fwww.google.com%2F%3Fgws_rd%3Dssl&hl=en&dsh=S-2130637172%3A1631538050370332&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp';
    var sTe = 5000;
    var sTot = 0;

    //Get Account
    chrome.storage.sync.get('config', function (result) {
        config = result.config;
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");
        console.log("🏍ConfigDefine:                                            🏍");
        console.log(config);
        console.log("🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍🏍");

        if (config.start == "no") {
            showNotyNormal("CHÚC MỪNG đã tạo xong danh sách gmail.")
            var newConfig = config;
            newConfig.case_stack = 1;
            newConfig.position = 0;
            newConfig.total = 0;
            chrome.storage.sync.set({
                config: newConfig
            })
        }

        if (config.account == '') {
            showNotyNormal("Danh sách gmail cần tạo đang rỗng", "error");
            return false;
        }

        if (config.start == "yes") {
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            var sDomain = location.hostname;
            var sAccounts = config.account.split(/\r?\n/);
            var sAccount = '';
            //Set tổng số gmail cần tạo
            if (config.total == 0) {
                config.total = sAccounts.length;
                chrome.storage.sync.set({
                    config: config
                });
            }
            sAccount = sAccounts[config.position];
            console.log(sAccount);
            console.log("***************");

            //Chuyển hướng về trang Google nếu đang ở sai trang
            if (sDomain != sAc && sDomain != sGo) {
                showNotyDuration('Đang Chuyển hướng về trang đăng ký', sTe);
                setTimeout(() => {
                    window.location.href = sUp;
                }, sTe);
            }

            //Xử lý nếu đang ở trang chủ Google
            if (sDomain == sGo) {
                showNotyDuration('Đang Chuyển hướng trang đăng ký', sTe * 2);
                setTimeout(() => {
                    // var btnLogin = $('body .gb_Se a.gb_3');
                    // if (btnLogin?.length > 0) {
                    //     btnLogin[0].click();
                    // } else {
                    //     window.location.href = sUp;
                    // }
                    window.location.href = sUp;
                }, sTe * 2);

                //Reload trang nếu có lỗi
                reloadPage(sTe * 4);
            }

            //Handle Error
            handleError();

            //Xử lý nếu đang ở trang đăng nhập
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "ServiceLogin" || sUrlFull.includes('identifier')) {
                console.log("Đang ở trang đăng nhập");
                showNotyDuration('Đang chuyển hướng trang Tạo Tài Khoản', sTe * 2);
                setTimeout(() => {
                    if ($('.daaWTb .VfPpkd-LgbsSe').length > 0) {
                        //click Tạo tài khoản
                        // $('.daaWTb .VfPpkd-LgbsSe')[0].click();
                        // setTimeout(() => {
                        //     if ($('.VfPpkd-xl07Ob-XxIAqe ul li').length > 0) {
                        //         //click cho bản thân tôi
                        //         $('.VfPpkd-xl07Ob-XxIAqe ul li')[0].click();
                        //     } else {
                        //         window.location.href = sUp;
                        //     }
                        // }, sTe);
                        window.location.href = sUp;
                    } else {
                        window.location.href = sUp;
                    }
                }, sTe);

                //Reload trang nếu có lỗi
                reloadPage(sTe * 4);
            }

            //Xử lý nếu đang ở trang đăng ký
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "SignUp" || sUrlFull.includes('webcreateaccount')) {
                console.log("Đang ở trang đăng ký");
                showNotyNormal('Nhập thông tin đăng ký');
                if (sAccount) {
                    var aAccount = sAccount.split('|');
                    var sEmail = $.trim(aAccount[0]).replace('@gmail.com', '');
                    var sPassWord = $.trim(aAccount[1]);
                    var sEmailRecovery = $.trim(aAccount[2]);
                    var sFirstName = random_item(dFirstName);
                    var sLastName = random_item(dLastName);

                    //Show gmail create
                    $('p.extension-show-comment').remove();
                    var sHtml = '<p class="extension-show-comment">' +
                        '- Họ:                  ' + '<span class="color-yellow">' + sLastName + '</span>' + '<br>' +
                        '- Tên:                 ' + '<span class="color-yellow">' + sFirstName + '</span>' + '<br>' +
                        '- Email:               ' + '<span class="color-yellow">' + sEmail + '@gmail.com' + '</span>' + '<br>' +
                        '- Mật Khẩu:            ' + '<span class="color-yellow">' + sPassWord + '</span>' + '<br>' +
                        '</p>';
                    $(sHtml).appendTo('body');

                    setTimeout(() => {
                        //Nhap Last Name: Họ
                        $('p.extension-show-info').remove();
                        var sHtml = '<p class="extension-show-info">Nhập họ</p>';
                        $(sHtml).appendTo('body');
                        $('form input[name=lastName]').bind('autotyped', function () {
                        }).autotype(sLastName, { delay: randomIntFromRange(80, 200) });

                        setTimeout(() => {
                            //Nhap First Name: Tên
                            $('p.extension-show-info').remove();
                            var sHtml = '<p class="extension-show-info">Nhập tên</p>';
                            $(sHtml).appendTo('body');
                            $('form input[name=firstName]').bind('autotyped', function () {
                            }).autotype(sFirstName, { delay: randomIntFromRange(80, 200) });

                            setTimeout(() => {
                                //Nhap User Name: Email
                                $('p.extension-show-info').remove();
                                var sHtml = '<p class="extension-show-info">Nhập Email</p>';
                                $(sHtml).appendTo('body');
                                $('form input[name=Username]').bind('autotyped', function () {
                                }).autotype(sEmail, { delay: randomIntFromRange(80, 200) });

                                setTimeout(() => {
                                    //Nhap Mật khẩu
                                    $('p.extension-show-info').remove();
                                    var sHtml = '<p class="extension-show-info">Nhập mật khẩu</p>';
                                    $(sHtml).appendTo('body');
                                    $('form input[name=Passwd]').bind('autotyped', function () {
                                    }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) });

                                    setTimeout(() => {
                                        //Nhap Lại Mật khẩu
                                        $('p.extension-show-info').remove();
                                        var sHtml = '<p class="extension-show-info">Nhập lại mật khẩu</p>';
                                        $(sHtml).appendTo('body');
                                        $('form input[name=ConfirmPasswd]').bind('autotyped', function () {
                                        }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) });

                                        setTimeout(() => {
                                            //Checked xem mật khẩu
                                            $('p.extension-show-info').remove();
                                            var sHtml = '<p class="extension-show-info">Bật hiển thị mật khẩu</p>';
                                            $(sHtml).appendTo('body');
                                            if ($('input.VfPpkd-muHVFf-bMcfAe')) {
                                                $('input.VfPpkd-muHVFf-bMcfAe').prop('checked', true);
                                            }

                                            setTimeout(() => {
                                                if ($('button.nCP5yc')) {
                                                    $('button.nCP5yc').click();

                                                    $('p.extension-show-info').remove();
                                                    var sHtml = '<p class="extension-show-info">Đang chuyển trang nhập số điện thoại</p>';
                                                    $(sHtml).appendTo('body');
                                                }
                                                //Xử lý lấy số điện thoại
                                                getPhoneAPI(sEmailRecovery);
                                            }, sTe);

                                        }, sTe);

                                    }, 7000)

                                }, 13000)

                            }, 7000);

                        }, 7000);

                    }, 7000);
                } else {
                    showNotyNormal('Không lấy được tài khoản google, đang chuyển về trang chủ Google', 'error');
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, sTe * 2);
                }
            }
        }
    });


    //Xử lý get Phone
    function getPhoneAPI(sEmailRecovery) {
        $('p.extension-show-info').remove();
        showNotyNormal('Chờ lấy số:');
        window.sNumCallPhone = 0;
        window.sGetCodeSuccess = false;
        window.sPhoneCanUse = false;
        window.loadingGetPhone = false;
        window.loadingGetCode = false;
        setInterval(() => {
            if (window.sPhoneCanUse == false) {
                $.ajax({
                    type: 'GET',
                    url: dUrlGetNumber,
                    success: function (data) {
                        if (data.ResponseCode == 0 || data.Msg == "OK") {
                            var sIdGeted = data.Result.Id;
                            var sUrlGetCode = dUrlGetCode + sIdGeted;
                            var sNumGeted = data.Result.Number;
                            var sPhoneDie = dPhoneDieOrigin.concat(config.phone_die);
                            console.log('Phone die:');
                            console.log(sPhoneDie);
                            console.log('**************');

                            //Lưu số đã lấy vòa danh sách die
                            chrome.storage.sync.get('config', function (result) {
                                config = result.config;
                                var phone_die = config.phone_die;
                                phone_die.push(sNumGeted.replace('+84', ''));
                                config.phone_die = phone_die;
                                chrome.storage.sync.set({
                                    config: config
                                });

                                //Lưu Phone die về máy
                                var elmDownPhoneDie = document.createElement('a');
                                var fileName = 'list_phone_die.txt';
                                var saveData = JSON.stringify(sPhoneDie);
                                elmDownPhoneDie.href = "data:application/octet-stream," + encodeURIComponent(saveData);
                                elmDownPhoneDie.download = fileName;
                                elmDownPhoneDie.click();
                                elmDownPhoneDie.remove();
                            })

                            if (sPhoneDie.includes(sNumGeted)) {
                                /**************************/
                                //Tiep tuc lay PHONE_NUMBER --- chạy SetInterval Phone ---
                                /**************************/
                            } else {
                                sNumGeted = "+84" + sNumGeted;
                                $('p.extension-show-info').remove();
                                var sHtml = '<p class="extension-show-info">Lấy Thành công: ' + '<span class="color-yellow">' + sNumGeted + '<span>' + '</p>';
                                $(sHtml).appendTo('body');

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
                                        setTimeout(() => {
                                            $('#phoneNumberId').bind('autotyped', function () {
                                            }).autotype(sNumGeted, { delay: randomIntFromRange(80, 200) });

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
                                                            /**************************/
                                                        } else {
                                                            //Get Code
                                                            getCodeAPI(sUrlGetCode, sEmailRecovery);
                                                        }
                                                    }, 5000);
                                                }
                                            }, sTe);
                                        }, 2000);
                                    }
                                }, 1000 * 6);
                            }
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
    }

    //Xử lý Get Code
    function getCodeAPI(sUrlGetCode, sEmailRecovery) {
        window.sPhoneCanUse = true;
        $('p.extension-show-info').remove();
        showNotyNormal("Vui lòng chờ lấy code");
        setInterval(() => {
            if (window.sGetCodeSuccess == false) {
                if (window.sNumCallPhone >= 10) {
                    showNotyDuration("Lấy code thất bại. đang chuyển hướng Google: ", sTe);
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, sTe);
                } else if (window.loadingGetCode == false) {
                    window.loadingGetCode = true;
                    window.sNumCallPhone = window.sNumCallPhone + 1;
                    $.ajax({
                        type: 'GET',
                        url: sUrlGetCode,
                        success: function (data) {
                            window.loadingGetCode = false;
                            if (data.Result.Code) {
                                window.sNumCallPhone = -100;
                                window.sGetCodeSuccess = true;
                            }
                            if (data.ResponseCode == 0 || data.Msg == "OK" || data.Msg == "Đã nhận được code") {
                                var sCodeNum = data.Result.Code;
                                $('p.extension-show-comment').remove();
                                var sHtml = '<p class="extension-show-comment">' +
                                    '- Lấy CODE thành công: ' + '<span class="color-yellow">' + sCodeNum + '</span>' + '<br>';
                                $(sHtml).appendTo('body');
                                if (sCodeNum) {
                                    $('input#code').click();
                                    setTimeout(() => {
                                        $('input#code').bind('autotyped', function () {
                                        }).autotype(sCodeNum, { delay: randomIntFromRange(80, 200) });
                                    }, 1000);

                                    setTimeout(() => {
                                        $('p.extension-show-comment').remove();
                                        showNotyNormal("Chuyển đến trang thông tin chi tiết");
                                        if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ')) {
                                            $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ').click()

                                            //Trang chi tiết
                                            personalDetails(sEmailRecovery);
                                        }
                                    }, 7000);
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
        }, sTe * 2);
    }

    //Trang điền thông tin bổ sung
    function personalDetails(sEmailRecovery) {
        setTimeout(() => {
            var sDay = random_item(dDay);
            var sMonth = randomIntFromRange(1, 12);
            var sYear = randomIntFromRange(1988, 2002);
            var sMale = randomIntFromRange(1, 2);
            var tMale = sMale == 1 ? "Nam" : "Nữ";
            $('p.extension-show-comment').remove();
            var sHtml = '<p class="extension-show-comment">' +
                '- Email Khôi phục:         ' + '<span class="color-yellow">' + sEmailRecovery + '</span>' + '<br>' +
                '- Ngày/Tháng/Năm Sinh:     ' + '<span class="color-yellow">' + sDay + '/' + sMonth + '/' + sYear + '</span>' + '<br>' +
                '- Giới tính:               ' + '<span class="color-yellow">' + tMale + '</span>' + '<br>' +
                '</p>';
            $(sHtml).appendTo('body');

            var sCurrentUrl = window.location.href;
            if (sCurrentUrl.includes('webpersonaldetails')) {
                //Xoa so dien thoai
                $('#phoneNumberId').val('');
                setTimeout(() => {
                    //Nhap email khoi phuc
                    $('p.extension-show-info').remove();
                    var sHtml = '<p class="extension-show-info">Nhập Email khôi phục</p>';
                    $(sHtml).appendTo('body');
                    $('input[name=recoveryEmail]').bind('autotyped', function () {
                    }).autotype(sEmailRecovery, { delay: randomIntFromRange(80, 200) });

                    setTimeout(() => {
                        //Nhap ngay sinh
                        $('p.extension-show-info').remove();
                        var sHtml = '<p class="extension-show-info">Nhập ngày sinh</p>';
                        $(sHtml).appendTo('body');
                        $('input[name=day]').val("");
                        setTimeout(() => {
                            $('input[name=day]').bind('autotyped', function () {
                            }).autotype(sDay, { delay: randomIntFromRange(80, 200) });

                            setTimeout(() => {
                                //Nhap thang sinh
                                $('p.extension-show-info').remove();
                                var sHtml = '<p class="extension-show-info">Nhập tháng sinh</p>';
                                $(sHtml).appendTo('body');
                                $('#month').val(sMonth).change();

                                setTimeout(() => {
                                    //Nhap nam sinh
                                    $('p.extension-show-info').remove();
                                    var sHtml = '<p class="extension-show-info">Nhập năm sinh</p>';
                                    $(sHtml).appendTo('body');
                                    $('input[name=year]').val();
                                    setTimeout(() => {
                                        $('input[name=year]').val(sYear).change();

                                        setTimeout(() => {
                                            //Nhap gioi tinh
                                            $('p.extension-show-info').remove();
                                            var sHtml = '<p class="extension-show-info">Nhập giới tính</p>';
                                            $(sHtml).appendTo('body');
                                            $('#gender').val(randomIntFromRange(1, 2)).change();

                                            setTimeout(() => {
                                                $('p.extension-show-info').remove();
                                                $('p.extension-show-comment').remove();
                                                showNotyNormal("Chuyển đến điều khoản Google");
                                                //Click tiep theo => Chuyển đến điều khoản Google
                                                if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc')) {
                                                    $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc').click();
                                                    //Trang đồng ý điều khoản google
                                                    googleTerms();
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
            $('p.extension-show-comment').remove();
            showNotyNormal("Đồng Ý Với Điều Khoản Google");

            setTimeout(() => {
                //Scroll đọc điều khoản google
                scrollToBottom();
            }, 4000);
            //Tăng position khi tạo gmail vị trí hiện tại thành công
            chrome.storage.sync.get('config', function (result) {
                config = result.config;
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

    function showNotyDuration(content, duration = sTe) {
        var time = 1000;
        setInterval(() => {
            $('p.extension-show-comment').remove();
            var sHtml = '<p class="extension-show-comment">' + content + ' sau ' + (duration / 1000) + 's : ' + time / 1000 + 's' + '</p>';
            $(sHtml).appendTo('body');
            time = time + 1000;
        }, time);

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
