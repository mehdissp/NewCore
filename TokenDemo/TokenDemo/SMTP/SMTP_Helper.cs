using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace TokenDemo.SMTP
{
    public static class SMTP_Helper
    {

        #region [- Methods -]

        #region [- Get_Name(...) -]
        public static string Get_Name(string fullName)
        {
            string name = "";
            if (fullName != "")
            {
                name = fullName;
            }
            else
            {
                name = "دوست";
            }
            return fullName;
        }
        #endregion
        //ss
        //============================

        #region [- Manage_Subject(...) -]
        public static string Manage_Subject(string situation, string fullName)
        {
            string subject = string.Empty;

            switch (situation)
            {
                case "Congratulation":
                    {
                        subject = string.Format("{0}عزيز، عضويت شما رو تبريک ميگيم", fullName);
                        break;
                    }
                //----------------------------------------
                case "News":
                    {
                        subject = string.Format("{0}عزيز، خبر جديد رو از دست نده ", fullName);
                        break;
                    }
                //----------------------------------------
                case "Article":
                    {
                        subject = string.Format("{0}عزيز، مقاله جديد رو از دست نده ", fullName);
                        break;
                    }
                //----------------------------------------
                case "Learning":
                    {
                        subject = string.Format("{0}عزيز، آموزش جديد رو از دست نده ", fullName);
                        break;
                    }
                //----------------------------------------
                default:
                    break;
            }

            return subject;
        }
        #endregion

        #region [- Manage_Body(...) -]
        public static Dictionary<string, object> Manage_Body(string situation)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            switch (situation)
            {
                case "Congratulation":
                    {
                        dic = Get_Congratulation_Body();
                        break;
                    }
                //----------------------------------------
                case "News":
                    {
                        dic = Get_News_Body();
                        break;
                    }
                //----------------------------------------
                case "Article":
                    {
                        dic = Get_Article_Body();
                        break;
                    }
                //----------------------------------------
                case "Learning":
                    {
                        dic = Get_Learning_Body();
                        break;
                    }
                //----------------------------------------
                default:
                    break;
            }

            return dic;
        }
        #endregion

        //============================

        #region [- Prepare_Send_Email(...) -]
        public static void Prepare_Send_Email(string fullName, string email, string situation)
        {
            string subject = Manage_Subject(situation, Get_Name(fullName));
            var bodyData = Manage_Body(situation);
            //-------------------------------------------------------
            SMTP_Protocol.SendEmail(email, subject, (string)bodyData["Body"]
           //     , (AlternateView)bodyData["AlternateView"]
                , bodyData["Attachments"]);
        }
        #endregion

        //============================

        #region [- Get_Congratulation_Body(...) -]
        public static Dictionary<string, object> Get_Congratulation_Body()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            string body = string.Empty;

            //======================================================

            #region [- Html Body -]

            body = @"<html>

<head>
    <title>mahdavi | mahdavi</title>

</head>

<body style='padding-left:200px;padding-right:200px;padding-bottom:35px;padding-top:35px;'>
   

    <div style='background-color:#e3eaea;width:100%;height:100%'>


        <div style='background-color:#1e727d;width:100%;border-top-left-radius: 10px;border-top-right-radius: 10px;'>


            <table style='width:100%; margin-left:5px;margin-right:20px'>

                <tr>
                    <th style='width:25%;'>


                        <a href='#' style='text-decoration:none;'>

                        <div style='display:inline-block;'> <img  style='width:33px;height:33px;vertical-align: middle;margin-bottom: 5.5px;'  src=cid:0 /></div>
                         <div style='display:inline-block;color:#bfc1c1;'> <h4> GooglePlay</h4></div>

                        </a>

                    </th>

                    <th style='width:25%;'>

                       
                         <a href='#' style='text-decoration:none;'>

                        <div style='display:inline-block;'> <img  style='width: 38px;height: 38px;vertical-align: middle;margin-bottom: 10px;'  src=cid:1 /></div>
                         <div style='display:inline-block;color:#bfc1c1;'> <h4> CafeBazaar</h4></div>

                        </a>

                    </th>

                    <th style='width:25%;'>

                    </th>

                    <th style='width:25%;'>

                        
                         <a href='#' style='text-decoration:none;'>

                        <div style='display:inline-block;'> <img  style='width:33px;height:33px;vertical-align: middle;margin-bottom: 5.5px;'  src=cid:2  /></div>
                         <div style='display:inline-block;color:#bfc1c1;'> <h4> mehdi</h4></div>

                        </a>

                    </th>
                </tr>

            </table>



        </div>

        <div >
            <div>
            <center>
            <img style='width:130px;height:120px;margin-bottom:10px;margin-top:30px'  src=cid:3  />
              </center>
             <hr style='margin-bottom:10px;border-color: #a6a7a91f;margin-right: 35px;margin-left: 35px;'/>
            </div>
        </div>
        <div style='text-align:right;padding-right:30px;color:#424344eb;margin-bottom:40px;margin-top:25px'>
            <h2 style='margin-bottom:10px'> دوست عزیز</h2>
           
            <p style='font-size:17px;font-weight:bold'>از اينکه به جمع ما اضافه شدي خوشحال شديم<br><br></p>

        
        </div>
        <div style='padding-bottom:35px'>
            <center>

                <a href='#' style='text-decoration:none;border-radius:5px;font-weight:bold;font-size:18px;color:#378690;background-color:#0d3a461a;width:200px;padding-top:10px;padding-bottom:10px;padding-left:25px;padding-right:25px;border:none'>مشاهده سايت</a>
            </center>
        </div>

  <div style='background-color:#206d77;width:100%;height:50px;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;'>

         <table style='width:100%; margin-left:20px;margin-right:20px'>

                <tr>
                    <th style='width:30%;'>


                          
                       
           

                    </th>

                 

                    <th style='width:40%;'>

                     <div>
                         <div style='display:inline-block;'><a href='#' style='text-decoration:none;margin-right:6px'> <img src=cid:7 /></a></div>
                         <div style='display:inline-block;'><a href='#' style='text-decoration:none;margin-right:6px'> <img  src=cid:6 /></a></div>
                         <div style='display:inline-block;'><a href='#' style='text-decoration:none;margin-right:6px'> <img  src=cid:5 /></a></div>
                         <div style='display:inline-block;'><a href='#' style='text-decoration:none;margin-right:9px'> <img   src=cid:4 /></a></div>
                         
                        </div>

                    </th>

                    <th style='width:30%;'>

                      
                        

                    </th>
                </tr>

            </table>


</div>

    </div>

</body>
</html>

                     ";


            #endregion

            #region [- Handle Image -]


            //AlternateView htmlView = AlternateView.CreateAlternateViewFromString(body, null, MediaTypeNames.Text.Html);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img0 = new LinkedResource(@"c:\\Users\mahdavi\Desktop\New folder (2)\New folder\TokenDemo\TokenDemo\SMTP\Image\0.png", "image/png");
            //img0.ContentId = "0";
            //htmlView.LinkedResources.Add(img0);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img1 = new LinkedResource(@"E:\\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\1.png", "image/png");
            //img1.ContentId = "1";
            //htmlView.LinkedResources.Add(img1);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img2 = new LinkedResource(@"E:\\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\0.png", "image/png");
            //img2.ContentId = "2";
            //htmlView.LinkedResources.Add(img2);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img3 = new LinkedResource(@"E:\\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\letter.png", "image/png");
            //img3.ContentId = "3";
            //htmlView.LinkedResources.Add(img3);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img4 = new LinkedResource(@"E:\\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\twitterw.png", "image/png");
            //img4.ContentId = "4";
            //htmlView.LinkedResources.Add(img4);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img5 = new LinkedResource(@"E:\\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\linkedinw.png", "image/png");
            //img5.ContentId = "5";
            //htmlView.LinkedResources.Add(img5);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img6 = new LinkedResource(@"E:\\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\telegram-logow.png", "image/png");
            //img6.ContentId = "6";
            //htmlView.LinkedResources.Add(img6);
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //LinkedResource img7 = new LinkedResource(@"E:\\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\instagram-logow.png", "image/png");
            //img7.ContentId = "7";
            //htmlView.LinkedResources.Add(img7);





            //////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img0 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\0.png");
            //img0.ContentId = "0";
            //img0.ContentDisposition.Inline = true;
            //img0.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img1 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\1.png");
            //img1.ContentId = "1";
            //img1.ContentDisposition.Inline = true;
            //img1.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img2 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\0.png");
            //img2.ContentId = "2";
            //img2.ContentDisposition.Inline = true;
            //img2.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img3 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\5.jpg");
            //img3.ContentId = "3";
            //img3.ContentDisposition.Inline = true;
            //img3.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img4 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\twitterw.png");
            //img4.ContentId = "4";
            //img4.ContentDisposition.Inline = true;
            //img4.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img5 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\linkedinw.png");
            //img5.ContentId = "5";
            //img5.ContentDisposition.Inline = true;
            //img5.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img6 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\telegram-logow.png");
            //img6.ContentId = "6";
            //img6.ContentDisposition.Inline = true;
            //img6.ContentDisposition.DispositionType = DispositionTypeNames.Inline;
            ////-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //var img7 = new Attachment(@"E:\\TopS\Project\980902\F_T\0_Latest_Source\HHRN_TopS_01_Panel\HHRN_Server\Substructions\SMTP\Images\instagram-logow.png");
            //img7.ContentId = "7";
            //img7.ContentDisposition.Inline = true;
            //img7.ContentDisposition.DispositionType = DispositionTypeNames.Inline;


            List<Attachment> list_Attachment = new List<Attachment>();
            //list_Attachment.Add(img0);
            //list_Attachment.Add(img1);
            //list_Attachment.Add(img2);
            //list_Attachment.Add(img3);
            //list_Attachment.Add(img4);
            //list_Attachment.Add(img5);
            //list_Attachment.Add(img6);
            //list_Attachment.Add(img7);


            #endregion

            //=======================================================

            dic.Add("Body", body);
           // dic.Add("AlternateView", htmlView);
            dic.Add("Attachments", list_Attachment);

            return dic;
        }
        #endregion

        #region [- Get_News_Body(...) -]
        public static Dictionary<string, object> Get_News_Body()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            return dic;
        }
        #endregion

        #region [- Get_Article_Body(...) -]
        public static Dictionary<string, object> Get_Article_Body()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            return dic;
        }
        #endregion

        #region [- Get_Learning_Body(...) -]
        public static Dictionary<string, object> Get_Learning_Body()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            return dic;
        }
        #endregion

        #endregion



    }

}
