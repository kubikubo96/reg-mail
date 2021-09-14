jQuery(document).ready(function($){
    var $btnSave                        = $('button[name="btn-save"]');
    var $btnRetore                      = $('button[name="btn-restore-default"]');
    var $inputExtensionAccount          = $('.extension_account');

    chrome.storage.sync.get('config', function(result) {
        var config = result.config;
        $inputExtensionAccount.val(config.account);

        $btnSave.click(() => {
            config.account = $inputExtensionAccount.val();

            chrome.storage.sync.set({
                config: config
            }, function() {
                close();
            });
        });

        $btnRetore.click(() => {
            chrome.storage.sync.set({
                config: initConfigDefine
            }, function() {
                //...
            });

            $inputExtensionAccount.val('');
        });
    });
});
