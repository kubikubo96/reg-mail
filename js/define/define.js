var apiKey = "72c1e93b";
var netWork = "Vina,ITelecom"; //Viettel,Mobi,Vina,VNMB,ITelecom

var dUrlGetNumber = "https://chothuesimcode.com/api?act=number&apik=" + apiKey + "&appId=1005&carrier=" + netWork;
var dUrlGetCode = "https://chothuesimcode.com/api?act=code&apik=" + apiKey + "&id=";

var dFirstName = [
    "Linh",
    "Mai",
    "Lê",
    "Táo",
    "Na"
];

var dLastName = [
    "Nguyễn thị",
    "Bùi thị",
    "Phạm thị",
    "Trần thị",
    "Phan thị"
];

var dNumMonth = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
]

var initConfigDefine = {
    'start': 'yes',
    'data': [],
    'account': window.dfAccounts,
    'email_created': []
};