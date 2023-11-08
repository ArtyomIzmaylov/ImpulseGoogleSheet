
class FormatConverterPhone {
    parse(phone) : string{
        phone = phone + ' '
        var formattedNumber = phone.replace(/\D/g, ''); // Удаляем все нецифровые символы из входной строки
        return formattedNumber;
    }
}

let phone = '+9 264 117 75'

var formatConverterPhone = new FormatConverterPhone().parse(phone)

console.log(formatConverterPhone)
