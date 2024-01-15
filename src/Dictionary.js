
class Dictionary {

    static FPSParams = {
        QR_CODE_URL: 'qr_code_url',
        PHONE_NUMBER: 'phone_number',
        BANK_ACCOUNT: 'bank_account',
        SHOWN_NAME: 'shown_name',
        ACTIVATED:'activated'
    };

    static FPSMapTitle = {
        eng:{
            qr_code_url: 'QR Code',
            phone_number: 'Phone Number',
            bank_account: 'Bank Account',
            shown_name: 'Shown Name',
            activated:"Activated"
        },
        chi:{
            qr_code_url: 'QR Code',
            phone_number: '電話',
            bank_account: '銀行號碼',
            shown_name: '顯示名稱',
            activated:"啟用"
        }
        
    };

    static PaymeParams = {
        PAYME_URL: 'payme_url',
        PHONE_NUMBER: 'phone_number',
        SHOWN_NAME: 'shown_name',
        ACTIVATED:'activated'
    };

    static PaymeMapTitleEng = {
        payme_url: 'PayMe Code',
        phone_number: 'Phone Number',
        shown_name: 'Shown Name',
        activated:'activated'
    };

    static Form = {
        field_type:{
            select:"select",
            text:"text",
            number:"number",
            file:"file",
            date:"date",
            boolean:"boolean",
            role:"role",
            product:"product",
            required:{
                REQUIRED:true,
                NOT_REQUIRED:false,
            },
            single:{
                SINGLE:true,
                MULTIPLE:false,
            }
        },
        text:{
            field_props:{
                paragraph:"paragraph",
                plain:"plain"
            },
            splitSymbol:{
                field:"field",
            }
        },
        displayText:{
            edit:{
                chi:"編輯",
                eng:"Edit"
            }
        }
    }
}

class FormParams {
    static Form = Dictionary.Form
}

export default Dictionary
export {FormParams}