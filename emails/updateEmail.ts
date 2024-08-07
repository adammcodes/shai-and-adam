interface WeddingInvite {
  id: string;
  name: string;
  groupNumber: number;
}

export default function updateEmail({ id, name, groupNumber }: WeddingInvite): string {
  const rsvpURL = `https://shaileenandadam.rsvp/guest/${id}?group=${groupNumber}`;

  return `
  <!doctype html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
<title>
An important update to our events
</title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">

#outlook a { padding:0; }
body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
p { display:block;margin:13px 0; }
</style>
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">

.mj-outlook-group-fix { width:100% !important; }
</style>
<![endif]-->
<style type="text/css">

@media only screen and (min-width:630px) {
.mj-column-per-100 { width:100% !important; max-width: 100%; }
}
</style>
<style type="text/css">

@media only screen and (max-width:630px) {
table.mj-full-width-mobile { width: 100% !important; }
td.mj-full-width-mobile { width: auto !important; }
}
</style>
<style type="text/css">
sup, sub {
font-size: 52% !important;
line-height: 100% !important;
}
a[href^=tel] {
color: inherit !important;
text-decoration: none !important;
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
}
a {
color: inherit;
text-decoration: underline;
}
.no-underline {
text-decoration: none !important;
}
.mobileLineBreak {
display: none;
}
.font-white a {
color: #FFFFFF;
}
.font-black a {
color: #000000;
}
.font-main a {
color: #4FB2D1;
}
.font-blue-100 a {
color: #FFF;
}
.font-blue-200 a {
color: #418BCA;
}
.font-blue-300 a {
color: #4FB2D1;
}
.font-yellow-100 a {
color: #E6D31E;
}@media (min-width: 631px) {
.hidden-on-desktop {
display: none !important;
max-height: 0px;
font-size: 0;
line-height: 0;
overflow: hidden;
mso-hide: all;
}
}@media (max-width: 631px) {
.hidden-on-mobile {
display: none !important;
max-height: 0px;
font-size: 0;
line-height: 0;
overflow: hidden;
mso-hide: all;
}
.mobileLineBreak {
display: inline !important;
}
.wrapper-gutter > tbody > tr > td > div > table > tbody > tr > td {
padding-left: 2.3809523809523836% !important;
padding-right: 2.3809523809523836% !important;
}
.mobile-col {
width: 100px !important;
}
}</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style data-emotion-global="" type="text/css">
@media (max-width:520px){.eb-1i9x0hp{padding:20px 0px 20px !important;}
}
body[data-outlook-cycle] .eb-1i9x0hp{padding:20px 0px 20px !important;}
@media (max-width:520px){.eb-1fi9xc2 > div{font-size:10px !important;line-height:12px !important;}
}
body[data-outlook-cycle] .eb-1fi9xc2 > div{font-size:10px !important;line-height:12px !important;}
</style>
</head>
<body style="background-color:#4FB2D1;">
<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
Hi ${name}, please see new information inside.
͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌ ͏‌
</div>
<div class="bg-main" style="background-color:#4FB2D1;">
<!--[if gte mso 9]>
<style>sup, sub {
font-size: 94% !important;
}
.mso-footer-symbol {
font-size: 14px !important;
}
</style>
<![endif]-->
<table align="center" class="wrapper-gutter" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#4FB2D1;background-color:#4FB2D1;width:100%;">
<tbody>
<tr>
<td>
<!--[if mso | IE]>
<table
align="center" border="0" cellpadding="0" cellspacing="0" class="wrapper-gutter-outlook" style="width:630px;" width="630"
>
<tr>
<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]-->
<div style="margin:0px auto;max-width:630px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
<tbody>
<tr>
<td style="direction:ltr;font-size:0px;padding:0px;padding-left:15px;padding-right:15px;text-align:center;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0">
<tr>
<td
class="" width="630px"
>
<table
align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
>
<tr>
<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]-->
<div style="margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
<tbody>
<tr>
<td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:20px;text-align:center;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0">
<tr>
<td
class="" style="vertical-align:top;width:600px;"
>
<![endif]-->
<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody>
<tr>
<td style="vertical-align:top;padding:0px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody><tr>
<td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
<tbody>
<tr>
<td style="width:600px;">
<a href="https://shaileenandadam.rsvp/mehndi" target="_blank">
<img alt="Visit our website for new info for the mehndi &#x26; wedding Shaileen Wallani &#x26; Adam Marsala" height="auto" src="https://email-builder-c70fb.appspot.com.storage.googleapis.com/orgs/adam/projects/website-update-xi9w_379r/images/websiteUpdate-af1d2g-.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600">
</a>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody>
</table>
</div>
<!--[if mso | IE]>
</td>
</tr>
</table>
<![endif]-->
</td>
</tr>
</tbody>
</table>
</div>
<!--[if mso | IE]>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td
class="bg-main-outlook" width="630px"
>
<table
align="center" border="0" cellpadding="0" cellspacing="0" class="bg-main-outlook" style="width:600px;" width="600"
>
<tr>
<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]-->
<div class="bg-main" style="background:#4FB2D1;background-color:#4FB2D1;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#4FB2D1;background-color:#4FB2D1;width:100%;">
<tbody>
<tr>
<td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:20px;padding-top:50px;text-align:center;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0">
<tr>
<td
class="" style="vertical-align:top;width:600px;"
>
<![endif]-->
<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody>
<tr>
<td style="vertical-align:top;padding:0px 20px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody><tr>
<td align="center" width="600" style="width:600px; vertical-align:top; padding: 20px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="60%">
<tbody>
<tr>
<td width="600" align="center" style="width:600px; font-size:0px; padding: 15px; background-color: #418BCA; border-radius: 30px; word-break:break-word;">
<div width="600" style="width: 100%; font-weight: bold; cursor: pointer; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 24px; text-align: center; color: #FFFFFF;">
<a href="https://shaileenandadam.rsvp/mehndi" target="_blank" style="color:#fff;text-decoration:none;font-family: Helvetica, sans-serif;">Mehndi</a>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" style="font-size:0px;padding:10px 0px;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
<tbody>
<tr>
<td style="width:25px;">
<img alt="Canada" height="auto" src="https://email-builder-c70fb.appspot.com.storage.googleapis.com/orgs/adam/projects/wedding-invite-daxos4f41/images/can-EcxetA-.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="25">
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" class="font-20" style="font-size:0px;padding:0px 10px;word-break:break-word;">
<div style="font-family:Arial;font-size:20px;line-height:24px;text-align:center;color:#FFFFFF;"><strong><a href="https://calendar.app.google/pdYjuSp3heN6j5YM9" target="_blank" style="color:#fff;text-decoration:none;">Saturday May<span> </span>4th,<span> </span>2024<br> 6:30<span> </span>PM</a></strong><br>
<span>@</span><br>
<a href="https://dumpukht.com/" target="_blank" style="color:#fff;text-decoration:none;font-weight:bold;">Dum Pukht</a></div>
</td>
</tr>
<tr>
<td align="center" class="font-16" style="font-size:0px;padding:20px 10px 50px;word-break:break-word;">
<div style="font-family:Georgia, Helvetica, Arial, sans-serif;font-size:16px;line-height:20px;text-align:center;color:#FFFFFF;"><a href="https://maps.app.goo.gl/bkuQLwFXmVVzWt3i6" target="_blank" style="color:#fff;text-decoration:underline;">
323<span> </span>Denison St<br>
Markham, ON L3R<span> </span>1B7</a></div>
</td>
</tr>
<tr>
<td style="font-size:0px;padding:0px 50px;word-break:break-word;">
<p style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:100%;">
</p>
<!--[if mso | IE]>
<table
align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:460px;" role="presentation" width="460px"
>
<tr>
<td style="height:0;line-height:0;">
&nbsp;
</td>
</tr>
</table>
<![endif]-->
</td>
</tr>
<tr>
<td align="center" width="600" style="width:600px; vertical-align:top; padding: 50px 20px 10px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="60%">
<tbody>
<tr>
<td width="600" align="center" style="width:600px; font-size:0px; padding: 15px; background-color: #418BCA; border-radius: 30px; word-break:break-word;">
<div width="600" style="width: 100%; font-weight: bold; cursor: pointer; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 24px; text-align: center; color: #FFFFFF;">
<a href="https://shaileenandadam.rsvp/grenada" target="_blank" style="color:#fff;text-decoration:none;font-family: Helvetica, sans-serif;">Wedding</a>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" style="font-size:0px;padding:10px 0px;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
<tbody>
<tr>
<td style="width:25px;">
<img alt="Grenada" height="auto" src="https://email-builder-c70fb.appspot.com.storage.googleapis.com/orgs/adam/projects/wedding-invite-daxos4f41/images/grenada-j79Epw-.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="25">
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" class="font-20" style="font-size:0px;padding:0px 10px;word-break:break-word;">
<div style="font-family:Arial;font-size:20px;line-height:24px;text-align:center;color:#FFFFFF;"><strong><a href="" style="color:#fff;text-decoration:none;">Thursday May<span> </span>9th,<span> </span>2024</a></strong><br>
<span>@</span><br>
<a href="https://www.truebluebay.com" target="_blank" style="color:#fff;text-decoration:none;font-weight:bold;">True Blue Bay Resort</a><br></div>
</td>
</tr>
<tr>
<td align="center" class="font-16" style="font-size:0px;padding:20px 10px 50px;word-break:break-word;">
<div style="font-family:Georgia, Helvetica, Arial, sans-serif;font-size:16px;line-height:20px;text-align:center;color:#FFFFFF;"><a href="https://maps.app.goo.gl/NKYNnu423SPJdNET7" target="_blank" style="color:#fff;text-decoration:underline;">
True Blue, St George's, Grenada</a></div>
</td>
</tr>
<tr>
<td style="font-size:0px;padding:0px 50px;word-break:break-word;">
<p style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:100%;">
</p>
<!--[if mso | IE]>
<table
align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:460px;" role="presentation" width="460px"
>
<tr>
<td style="height:0;line-height:0;">
&nbsp;
</td>
</tr>
</table>
<![endif]-->
</td>
</tr>
<tr>
<td align="center" class="eb-1i9x0hp" style="font-size:0px;padding:50px 30px 20px;word-break:break-word;">
<div style="font-family:Georgia, Helvetica, Arial, sans-serif;font-size:16px;line-height:20px;text-align:center;color:#FFFFFF;">We have provided some more information on what to expect from the Mehndi and the wedding in Grenada.<br>
<br>
More information on each event can be found at our website at <a target="_blank" href="https://shaileenandadam.rsvp" style="color:#FFF;">shaileenandadam.rsvp</a><br>
<br>
If you haven't done so already, please submit an RSVP for each person in your group.<br></div>
</td>
</tr>
<tr>
<td align="center" width="600" style="width:600px; vertical-align:top; padding: 20px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="60%">
<tbody>
<tr>
<td width="600" align="center" style="width:600px; font-size:0px; padding: 15px; background-color: #418BCA; border-radius: 30px; word-break:break-word;">
<div width="600" style="width: 100%; font-weight: bold; cursor: pointer; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 24px; text-align: center; color: #FFFFFF;">
<a href="${rsvpURL}" target="_blank" style="color:#fff;text-decoration:none;font-family: Helvetica, sans-serif;">RSVP</a>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" class="font-16" style="font-size:0px;padding:20px 0px 0px;word-break:break-word;">
<div style="font-family:Georgia, Helvetica, Arial, sans-serif;font-size:16px;line-height:20px;text-align:center;color:#FFFFFF;">We look forward to sharing these unforgettable moments with you!<br></div>
</td>
</tr>
<tr>
<td align="center" class="eb-1fi9xc2" style="font-size:0px;padding:50px 10px 10px;word-break:break-word;">
<div style="font-family:Georgia, Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;text-align:center;color:#FFFFFF;">Credits:<br>
Designed by Jackie Fong<span class="hidden-on-mobile"><span> </span>|<span> </span></span><br class="mobileLineBreak">Developed by Adam Marsala<span class="hidden-on-mobile"><span> </span>|<span> </span></span><br class="mobileLineBreak">Directed by Shaileen Wallani</div>
</td>
</tr>
<tr>
<td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
<tbody>
<tr>
<td style="width:25px;">
<img alt="" height="auto" src="https://email-builder-c70fb.appspot.com.storage.googleapis.com/orgs/adam/projects/save-the-date-image-ys7zemptr/images/mango-Wl43Jw-.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="25">
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" class="eb-1fi9xc2" style="font-size:0px;padding:10px;word-break:break-word;">
<div style="font-family:Georgia, Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;text-align:center;color:#FFFFFF;">If these emails are bothering you, just <a target="_blank" href="mailto:adam@shaileenandadam.rsvp?subject=Unsubscribe%20me&#x26;body=Kindly%2C%20bugger%20off.%0AThanks!" style="color:#fff;">unsubscribe</a>.
<br><br>
&copy; Pineapple Shirt Studios<br>
5<span> </span>Dykstra Lane<br>
Bowmanville, ON, Canada<br>
L1C<span> </span>0K7</div>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody>
</table>
</div>
<!--[if mso | IE]>
</td>
</tr>
</table>
<![endif]-->
</td>
</tr>
</tbody>
</table>
</div>
<!--[if mso | IE]>
</td>
</tr>
</table>
</td>
</tr>
</table>
<![endif]-->
</td>
</tr>
</tbody>
</table>
</div>
<!--[if mso | IE]>
</td>
</tr>
</table>
<![endif]-->
</td>
</tr>
</tbody>
</table>
</div>
</body></html>`;
}
