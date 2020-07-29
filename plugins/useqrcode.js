/**
 * Created by Administrator on 2019/5/16.
 */
import QRCode from 'qrcode'
//动态生成二维码
export function useqrcode(chatId){
  console.log(chatId,'js')
  //生成的二维码内容，可以添加变量
  chatId='http://tapps.jiangjuncj.com/discuss.html'+"?chatId="+chatId;
  var canvas = document.getElementById('canvas')
  console.log(canvas)
  QRCode.toCanvas(canvas, chatId, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
}
