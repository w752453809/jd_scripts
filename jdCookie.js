/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
  'retina=1; webp=1; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1622722708845; mba_muid=1622722708844929391054; visitkey=70637761004325623; shshshfpa=710bfd90-4d71-673b-8cdb-8288445c3b00-1622722713; shshshfpb=mDRKzcXlgm09iJUK2FAnxmA%3D%3D; PPRD_P=UUID.1622722708844929391054; sc_width=375; 3AB9D23F7A4B3C9B=JENFERR3336BBSD6HW6MVJVOGTP3JCKZLOR2BCIZGUKD3HIPHU7GA24B42BUIIM2RGGQT746HCBPTBR3QH6AVKS7PU; TrackerID=Rw60b0tSJuRMGukqfEqRY-EUt3-W_lZlXAp8vQ61efxYrRFNq8Ea3T6tSFumyUGv2XdTl8yKkfOVtRJ_Ilkj42VKVJCb1RcSNCwgyRlUhPn0HYCT7Wnp5JGb4zve2UTDaI2qDzS2GYr09TCvV7rIHw; pt_key=AAJgvWWQADAXn6BYsHg-0nsI_e7Z4rtWROvnFEutX3WN2WVkhumDfsSqizCXBtnQLTTEIbxIUDg; pt_pin=jd_618b7c58d777d; pt_token=t1z8zjpg; pwdt_id=jd_618b7c58d777d; sfstoken=tk01ma2181bc7a8sMXgyeDNNZ3Z2aBYk5Q0csl5IOPnuBRNks06xjz1C7t8FnNKmpsX0YoXw0C4egPE+vGoI+ZENWnCn; cid=9; wxa_level=1; jxsid=16233256612335133616; __jdc=122270672; __jda=122270672.1622722708844929391054.1622722708.1623325661.1623325661.13; shshshfp=5c0e216745c2388c3a96c2bea291c851; shshshsID=b6b3bedda9c9cf539794bdbfc2a3b31a_2_1623325668769; wqmnx1=MDEyNjM5NHNtbS43MG8wO29fICliMU1HcjBlUzQxN2ZmQlZDVSg%3D; __jdb=122270672.4.1622722708844929391054|13.1623325661; mba_sid=16233256615257785544534142099.4; __wga=1623325669705.1623325661365.1623231101866.1622722736151.3.7; jxsid_s_t=1623325669763; jxsid_s_u=https%3A//home.m.jd.com/myJd/home.action',//账号一ck,例:pt_key=XXX;pt_pin=XXX;
  '',//账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) console.log(`\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`);
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
