const usernameReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

function formDate() {
    var time = new Date()
    let y = (time.getFullYear() + '').padStart(2, '0'),
        m = (time.getMonth() + 1 + '').padStart(2, '0'),
        d = (time.getDate() + '').padStart(2, '0')
    return `${y}-${m}-${d}`
}
export {usernameReg, formDate}