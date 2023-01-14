module.exports = ({
  sts_castOn,
  sts_bwLegs,
  sts_armholes,
  sts_back,
  total_legLength,
  r_scale,
  rows_toLegs,
}) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Fblack-cat-peeking-over-table-908714708-2000.jpg"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               Date: ${`${today.getDate()}/${
                                 today.getMonth() + 1
                               }/${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Random header text</td>
                   <td>Value</td>
                </tr>
                <tr class="item">
                <td>Number of setup rows: </td>
                <td>4</td>
             </tr>
                <tr class="item">
                   <td>Stitches to cast on initially:</td>
                   <td></td>
                </tr>
                <tr class="item">
                   <td>Rate of stitches increase over chest area:</td>
                   <td></td>
                </tr>
                </br>
                </table>
                <h5>Step One: </h5>
                <p>Cast on ${sts_castOn} stitches using the Long-tail cast-on Method.</p>
                </br>
                <h5>Step Twos: </h5>
                <p>Work ${
                  sts_bwLegs / 2
                } stitches in broken rib, ${sts_armholes} stitches in stockinette, ${sts_back} stitches in broken rib (BACK), ${sts_armholes} stitches stockinette, ${
    sts_bwLegs / 2
  } stitches broken rib. Knit 1 row.</p>
                </br>
                <h5>Step Three: </h5>
                <p>Increase XX stitches every XXXX row(s).</p>
                </br>
                <h5>Step four: </h5>
                <p>Once you reach ${
                  total_legLength + 4 / r_scale
                }cm from beginning, bind off armholes(approx. ${Math.round(
    rows_toLegs
  )} rows)</p>
          </div>
       </body>
    </html>
    `;
};
