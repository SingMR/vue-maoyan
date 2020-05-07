import $ from 'jquery'
import { eq } from 'semver'
function shop_subway() {
    $(function() {
        $('#shop').on('click', '.item', function() {    
            // 排它思想
            $('.shop .item').css({'color': ''})
            $('.shop .el-icon-check').css({'display': 'none'})
            $(this).css({'color': '#f03d37'})
            $(this).children('.el-icon-check').css({'display': 'inline-block'})                 
        })  
    })
}
function getPinPai() {
    $(function() {
        $('.tab-content').on('click', '.tab-list', function() {
            $('.tab-content .el-icon-check').css({'display': 'none'})
            $('.tab-list').css({'color': ''})
            $(this).css({'color': '#dd403b  '})
            $(this).children('.el-icon-check').css({'display': 'inline-block'})
        })
    })
}
$(function() {
    
})







export {
    shop_subway,getPinPai,getIcon
}