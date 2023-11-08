var FormatConverterPhone = /** @class */ (function () {
    function FormatConverterPhone() {
    }
    FormatConverterPhone.prototype.parse = function (phone) {
        phone = phone + ' ';
        var formattedNumber = phone.replace(/\D/g, ''); // Удаляем все нецифровые символы из входной строки
        return formattedNumber;
    };
    return FormatConverterPhone;
}());
var phone = '+9 264 117 75';
var formatConverterPhone = new FormatConverterPhone().parse(phone);
console.log(formatConverterPhone);


var inputDataStudentFromEge = sh.getRange(sh.getLastRow(), 1, 1, sh.getLastColumn()).getValues()[0];
inputDataStudentFromEge[2] = '926411775'

//inputDataStudentFromEge[2] = formatConverterPhone.parse('+9 264 117 75') // ЗДЕСЬ НАДО РАСПАРСИТЬ НОМЕР
mainTaskEge(inputDataManagersFromEge, inputDataStudentFromEge, botTokenArtyom, 'Новая заявка(пробник)')
