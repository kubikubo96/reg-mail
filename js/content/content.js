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
        console.log("πππππππππππππππππππππππππππππππππ");
        console.log("πConfigDefine:                                            π");
        console.log(config);
        console.log("πππππππππππππππππππππππππππππππππ");

        if (config.start == "no") {
            showNotyTop("CHΓC Mα»ͺNG ΔΓ£ tαΊ‘o xong danh sΓ‘ch gmail.")
            return false;
        }

        if (config.account == '') {
            showNotyTop("Danh sΓ‘ch gmail cαΊ§n tαΊ‘o Δang rα»ng", '', "error");
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

            //Xα»­ lΓ½ set total vΓ  set email Δang sα»­ dα»₯ng
            if (config.total == 0) {
                config.total = sAccounts.length;
                config.gmail_using = sAccount;
                chrome.storage.sync.set({
                    config: config
                });
            }

            //Chuyα»n hΖ°α»ng vα» trang Google nαΊΏu Δang α» sai trang
            if (sDomain != sAc && sDomain != sGo) {
                showNotyBottom('Δang Chuyα»n hΖ°α»ng vα» trang Google');
                setTimeout(() => {
                    window.location.href = 'https://' + sGo;
                }, sTe * 10);
            }

            //Xα»­ lΓ½ nαΊΏu Δang α» trang chα»§ Google
            if (sDomain == sGo) {
                showNotyBottom('Δang Chuyα»n hΖ°α»ng trang ΔΔng kΓ½');
                setTimeout(() => {
                    window.location.href = sUp;
                }, sTe * 5);

                //Reload trang nαΊΏu cΓ³ lα»i
                reloadPage(sTe * 10);
            }

            /*********************/
            //Handle Error
            handleError();
            /*********************/

            //Xα»­ lΓ½ nαΊΏu Δang α» trang ΔΔng nhαΊ­p
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "ServiceLogin" || sUrlFull.includes('identifier')) {
                showNotyBottom('Chα» chuyα»n hΖ°α»ng trang ΔΔng kΓ½');
                setTimeout(() => {
                    window.location.href = sUp;
                }, sTe * 3);

                //Reload trang nαΊΏu cΓ³ lα»i
                reloadPage(sTe * 5);
            }

            //Xα»­ lΓ½ nαΊΏu Δang α» trang ΔΔng kΓ½
            var sUrlFull = window.location.href;
            var sFlowEntry = getUrlParameter('flowEntry', sUrlFull);
            if (sFlowEntry == "SignUp" || sUrlFull.includes('webcreateaccount')) {
                showNotyBottom('Chα» nhαΊ­p thΓ΄ng tin ΔΔng kΓ½');
                if (sAccount) {
                    var aAccount = sAccount.split('|');
                    var sEmail = $.trim(aAccount[0]).replace('@gmail.com', '');
                    var sPassWord = $.trim(aAccount[1]);
                    var sEmailRecovery = $.trim(aAccount[2]);

                    var sFirstName = (config.data_name)[config.position].first_name;
                    var sLastName = (config.data_name)[config.position].last_name;

                    //LΖ°u tΓ‘ch biαΊΏt email, pass, email_recovery vΓ o storage
                    config.gmail_get_temp = sEmail;
                    config.pass_get_temp = sPassWord;
                    config.gmail_recovery_get_temp = sEmailRecovery;
                    chrome.storage.sync.set({
                        config: config
                    });

                    //Show gmail create
                    var sHtml = '<p class="extension-show-comment">' +
                        '- Hα»:                  ' + '<span class="color-yellow">' + sFirstName + '</span>' + '<br>' +
                        '- TΓͺn:                 ' + '<span class="color-yellow">' + sLastName + '</span>' + '<br>' +
                        '- Email:               ' + '<span class="color-yellow">' + sEmail + '@gmail.com' + '</span>' + '<br>' +
                        '- MαΊ­t KhαΊ©u:            ' + '<span class="color-yellow">' + sPassWord + '</span>' + '<br>' +
                        '</p>';
                    showNotyTop('', sHtml);

                    /*********************/
                    //NhαΊ­p thΓ΄ng tin ΔΔng kΓ½ gmail
                    enterInfoRegister(sEmail, sPassWord, sEmailRecovery, sFirstName, sLastName)
                    /*********************/
                } else {
                    showNotyBottom('KhΓ΄ng lαΊ₯y ΔΖ°α»£c tΓ i khoαΊ£n gmail, Δang chuyα»n vα» trang chα»§ Google', 'error');
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, sTe * 2);
                }
            }
        }
    });

    //NhαΊ­p thΓ΄ng tin ΔΔng kΓ½ gmail
    function enterInfoRegister(sEmail, sPassWord, sEmailRecovery, sFirstName, sLastName) { //sFirstName: hα», sLastName: tΓͺn
        showNotyBottom('Chα» nhαΊ­p hα»: ' + sFirstName);
        setTimeout(() => {
            //Nhap Hα»
            $('form input[name=lastName]').bind('autotyped', function () {
            }).autotype(sFirstName, { delay: randomIntFromRange(80, 200) });

            showNotyBottom('Chα» nhαΊ­p tΓͺn: ' + sLastName);
            setTimeout(() => {
                //Nhap TΓͺn
                $('form input[name=firstName]').bind('autotyped', function () {
                }).autotype(sLastName, { delay: randomIntFromRange(80, 200) });

                showNotyBottom('Chα» nhαΊ­p email: ' + sEmail);
                setTimeout(() => {
                    //Nhap User Name: Email
                    /*$('form input[name=Username]').bind('autotyped', function () {
                    }).autotype(sEmail, { delay: randomIntFromRange(80, 200) });*/
                    $('form input[name=Username]').val(sEmail);

                    showNotyBottom('Chα» nhαΊ­p password: ' + sPassWord);
                    setTimeout(() => {
                        //Nhap MαΊ­t khαΊ©u
                        /* $('form input[name=Passwd]').bind('autotyped', function () {
                        }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) }); */
                        $('form input[name=Passwd]').val(sPassWord);

                        showNotyBottom('Chα» nhαΊ­p lαΊ‘i password: ' + sPassWord);
                        setTimeout(() => {
                            //Nhap LαΊ‘i MαΊ­t khαΊ©u
                            /* $('form input[name=ConfirmPasswd]').bind('autotyped', function () {
                            }).autotype(sPassWord, { delay: randomIntFromRange(80, 200) }); */
                            $('form input[name=ConfirmPasswd]').val(sPassWord);

                            showNotyBottom('Chα» bαΊ­t hiα»n thα» mαΊ­t khαΊ©u');
                            setTimeout(() => {
                                //Checked xem mαΊ­t khαΊ©u
                                if ($('input.VfPpkd-muHVFf-bMcfAe')) {
                                    $('input.VfPpkd-muHVFf-bMcfAe').prop('checked', true);
                                }

                                showNotyBottom('Chα» chuyα»n trang NHαΊ¬P Sα» ΔIα»N THOαΊ I');
                                setTimeout(() => {
                                    if ($('button.nCP5yc')) {
                                        $('button.nCP5yc').click();

                                        setTimeout(() => {
                                            var currentUrl = window.location.href;
                                            if (!currentUrl.includes('webcreateaccount')) {
                                                /*********************/
                                                //Xα»­ lΓ½ lαΊ₯y sα» Δiα»n thoαΊ‘i
                                                getPhoneAPI(sEmailRecovery);
                                                /*********************/
                                            } else {
                                                showNotyTop("ΔΓ£ cΓ³ lα»i khi nhαΊ­p thΓ΄ng tin ΔΔng kΓ½, Δang chuyα»n trang Google", '', 'error');
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

    //Xα»­ lΓ½ get Phone
    function getPhoneAPI(sEmailRecovery) {
        showNotyBottom('Chα» lαΊ₯y sα» tα»« API');
        window.sNumCallPhone = 0;
        window.sPhoneCanUse = false;
        window.enteringPhone = false;
        //Tα»« lαΊ§n 2 trα» Δi
        var getPhoneInterval = setInterval(() => {
            handlePhone(sEmailRecovery, getPhoneInterval);
        }, 1000 * 35);

        //ChαΊ‘y lαΊ§n ΔαΊ§u tiα»n
        setTimeout(() => {
            handlePhone(sEmailRecovery, getPhoneInterval);
        }, sTe);

    }

    function handlePhone(sEmailRecovery, getPhoneInterval) {
        if (window.sNumCallPhone >= 15) {
            showNotyTop("Lα»i sai sα» quΓ‘ nhiα»u. Δang chuyα»n hΖ°α»ng vα» trang Google", '', 'error');
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


                        //LΖ°u sα» ΔΓ£ lαΊ₯y vΓ²a danh sΓ‘ch die
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

                        //Kiα»m tra sα» lαΊ₯y ΔΖ°α»£c cΓ³ nαΊ±m trong danh sΓ‘ch sα» die khΓ΄ng
                        if (sPhoneDie.includes(sNumGeted.replace('+84', ''))) {
                            //Hα»§y Δα»£i tin nhαΊ―n trΓͺn API
                            $.ajax({
                                type: 'GET',
                                url: dUrlCancelWaitMes + sIdGeted,
                                success: function (data) {
                                    console.log("Hα»§y Δα»£i tin nhαΊ―n: SUCCESS");
                                    console.log('**************');
                                },
                                error: function (xhr, status, error) {
                                    console.log("Hα»§y Δα»£i tin nhαΊ―n: ERROR");
                                    console.log('**************');
                                }
                            })

                            window.enteringPhone = false;
                            showNotyBottom('Sα»: ' + '<span class="color-yellow">' + sNumGeted + '</span>' + ' ΔΓ£ nαΊ±m trong danh sΓ‘ch die, Chα» lαΊ₯y sα» khΓ‘c.');
                            /**************************/
                            //Tiep tuc lay PHONE_NUMBER --- chαΊ‘y SetInterval Phone ---
                            /**************************/
                        } else {
                            /*****************************/
                            //Xα»­ lΓ½ nhαΊ­p sα» Δiα»n thoαΊ‘i
                            enterPhone(getPhoneInterval, sNumGeted, sUrlGetCode, sEmailRecovery);
                            /*****************************/

                        }
                    }
                },
                error: function (xhr, status, error) {
                    showNotyTop("Lα»i lαΊ₯y sα» data tα»« API, Δang chuyα»n trang Google", '', 'error');
                    setTimeout(() => {
                        window.location.href = 'https://' + sGo;
                    }, 1000 * 120);
                    return false;
                }
            });
        }
    }

    //Xα»­ lΓ½ nhαΊ­p sα» Δiα»n thoαΊ‘i
    function enterPhone(getPhoneInterval, sNumGeted, sUrlGetCode, sEmailRecovery) {
        sNumGeted = "+84" + sNumGeted;
        showNotyBottom('LαΊ₯y ThΓ nh cΓ΄ng: ' + '<span class="color-yellow">' + sNumGeted + '<span>');
        //BαΊ₯m chα»n MΓ£ vΓΉng
        setTimeout(() => {
            if ($('.WEQkZc .VfPpkd-TkwUic')) {
                $('.WEQkZc .VfPpkd-TkwUic').click()
            }
        }, 1000 * 2);

        //Chα»n Viα»t Nam
        setTimeout(() => {
            if ($('li.VfPpkd-StrnGf-rymPhb-ibnC6b[data-value=vn]')) {
                $('li.VfPpkd-StrnGf-rymPhb-ibnC6b[data-value=vn]').click();
            }
        }, sTe);

        setTimeout(() => {
            //NhαΊ­p sα» Δiα»n thoαΊ‘i
            if ($('#phoneNumberId')) {
                $('#phoneNumberId').val('');
                showNotyBottom('Δang nhαΊ­p sα»: ' + '<span class="color-yellow">' + sNumGeted + '<span>');
                setTimeout(() => {
                    /* $('#phoneNumberId').bind('autotyped', function () {
                    }).autotype(sNumGeted, { delay: randomIntFromRange(80, 200) }); */
                    $('#phoneNumberId').val(sNumGeted);

                    showNotyBottom('Chα» αΊ₯n Button tiαΊΏp theo');
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
                                    //Tiep tuc lay PHONE_NUMBER --- chαΊ‘y SetInterval Phone ---
                                    showNotyBottom("Sα» khΓ΄ng hα»£p lα», chα» lαΊ₯y lαΊ‘i. Thα»­ lαΊ‘i lαΊ§n: " + window.sNumCallPhone, 'error');
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

    //Xα»­ lΓ½ Get Code
    function getCodeAPI(sUrlGetCode, sEmailRecovery) {
        window.sNumGetCode = 0;
        window.sGetCodeSuccess = false;
        window.sLoadingGetCode = false;
        showNotyBottom("Vui lΓ²ng chα» lαΊ₯y code");
        var getCodeInterval = setInterval(() => {
            if (window.sGetCodeSuccess == false) {
                if (window.sNumGetCode >= 5) {
                    showNotyTop("LαΊ₯y code thαΊ₯t bαΊ‘i. Δang chuyα»n hΖ°α»ng Google: ", '', 'error');
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
                            if (data.ResponseCode == 0 || data.Msg == "OK" || data.Msg == "ΔΓ£ nhαΊ­n ΔΖ°α»£c code") {
                                var sCodeNum = data.Result.Code;
                                showNotyBottom('LαΊ₯y code thΓ nh cΓ΄ng, Δang nhαΊ­p code: ' + '<span class="color-yellow">' + sCodeNum + '</span>');
                                if (sCodeNum) {
                                    $('input#code').click();
                                    setTimeout(() => {
                                        /* $('input#code').bind('autotyped', function () {
                                        }).autotype(sCodeNum, { delay: randomIntFromRange(80, 200) }); */
                                        $('input#code').val(sCodeNum);
                                    }, 1000);

                                    setTimeout(() => {
                                        showNotyBottom("Chα» chuyα»n trang ΔIα»N THΓM THΓNG TIN");
                                        if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ')) {
                                            $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ').click()

                                            /*********************/
                                            //Trang chi tiαΊΏt
                                            enterInfoDetails(sEmailRecovery);
                                            /*********************/
                                        }
                                    }, sTe + 2000);
                                }
                            } else {
                                showNotyBottom("LαΊ₯y code ThαΊ₯t bαΊ‘i, chα» lαΊ₯y lαΊ‘i. Thα»­ lαΊ‘i lαΊ§n: " + window.sNumGetCode, "error");
                            }
                        },
                        error: function (xhr, status, error) {
                            window.sLoadingGetCode = false;
                            showNotyTop("Lα»i lαΊ₯y CODE tα»« api, Δang chuyα»n hΖ°α»ng trang Google", '', "error");
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

    //Trang Δiα»n thΓ΄ng tin bα» sung
    function enterInfoDetails(sEmailRecovery) {
        setTimeout(() => {
            var sDay = random_item(dDay);
            var sMonth = randomIntFromRange(1, 12);
            var sYear = randomIntFromRange(1988, 2002);
            var sMale = randomIntFromRange(1, 2);
            var tMale = sMale == 1 ? "Nam" : "Nα»―";
            var sHtml = '<p class="extension-show-comment">' +
                '- Email KhΓ΄i phα»₯c:         ' + '<span class="color-yellow">' + sEmailRecovery + '</span>' + '<br>' +
                '- NgΓ y/ThΓ‘ng/NΔm Sinh:     ' + '<span class="color-yellow">' + sDay + '/' + sMonth + '/' + sYear + '</span>' + '<br>' +
                '- Giα»i tΓ­nh:               ' + '<span class="color-yellow">' + tMale + '</span>' + '<br>' +
                '</p>';
            showNotyTop('', sHtml);

            var sCurrentUrl = window.location.href;
            if (sCurrentUrl.includes('webpersonaldetails')) {
                //Xoa so dien thoai
                $('#phoneNumberId').val('');
                showNotyBottom('NhαΊ­p email khΓ΄i phα»₯c: ' + sEmailRecovery);
                setTimeout(() => {
                    //Nhap email khoi phuc
                    /* $('input[name=recoveryEmail]').bind('autotyped', function () {
                    }).autotype(sEmailRecovery, { delay: randomIntFromRange(80, 200) }); */
                    $('input[name=recoveryEmail]').val(sEmailRecovery);

                    showNotyBottom('NhαΊ­p ngΓ y sinh: ' + sDay);
                    setTimeout(() => {
                        //Nhap ngay sinh
                        $('input[name=day]').val("");
                        setTimeout(() => {
                            /* $('input[name=day]').bind('autotyped', function () {
                            }).autotype(sDay, { delay: randomIntFromRange(80, 200) }); */
                            $('input[name=day]').val(sDay);

                            showNotyBottom('NhαΊ­p thΓ‘ng sinh: ' + sMonth);
                            setTimeout(() => {
                                //Nhap thang sinh
                                $('#month').val(sMonth).change();

                                showNotyBottom('NhαΊ­p nΔm sinh: ' + sYear);
                                setTimeout(() => {
                                    //Nhap nam sinh
                                    $('input[name=year]').val();
                                    setTimeout(() => {
                                        $('input[name=year]').val(sYear).change();

                                        showNotyBottom('NhαΊ­p giα»i tΓ­nh: ' + tMale);
                                        setTimeout(() => {
                                            //Nhap gioi tinh
                                            $('#gender').val(sMale).change();

                                            showNotyBottom("Chuyα»n ΔαΊΏn Δiα»u khoαΊ£n Google");
                                            setTimeout(() => {
                                                //Click tiep theo => Chuyα»n ΔαΊΏn Δiα»u khoαΊ£n Google
                                                if ($('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc')) {
                                                    $('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc').click();

                                                    /*********************/
                                                    //Trang Δα»ng Γ½ Δiα»u khoαΊ£n google
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

    //Trang Δα»ng Γ½ Δiα»u khoαΊ£n google
    function googleTerms() {
        setTimeout(() => {
            showNotyBottom("Δα»ng Γ Vα»i Δiα»u KhoαΊ£n Google");

            setTimeout(() => {
                //Scroll Δα»c Δiα»u khoαΊ£n google
                scrollToBottom();
            }, 2000);

            //TΔng position khi tαΊ‘o gmail vα» trΓ­ hiα»n tαΊ‘i thΓ nh cΓ΄ng
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
        //Reload trang nαΊΏu cΓ³ lα»i
        setTimeout(() => {
            window.location.reload();
        }, time);
    }

    function handleError() {
        //Xα»­ lΓ½ chuyα»n vα» trang chα»§ Google nαΊΏu lα»i
        setInterval(() => {
            currentUrl = window.location.href;
            if (currentUrl.includes('unknownerror')) {
                showNotyNormal("Δang chuyα»n trang Google");
                setTimeout(() => {
                    window.location.href = 'https://' + sGo;
                }, 2000);
            }

            //NαΊΏu α» 1 trang quΓ‘ 15p thΓ¬ chuyα»n vα» trang google 
            sTot = sTot + sTe * 2;
            console.log("TGCL:  ~ " + Math.round((1000 * 60 * 15 - sTot) / 1000) + ' GiΓ’y');
            console.log("**********");
            if (sTot > (1000 * 60 * 15)) {
                window.location.href = 'https://' + sGo;
            }
        }, sTe * 2);
    }
});
