using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace TokenDemo.SMTP
{
    public static class SMTP_Protocol
    {
        #region [- Properties -]

        #region [- Mahdavi_Email -]
        public static string Mahdavi_Email
        {
            get
            {
                string email = "MehdiMahdavi73@gmail.com";
                return email;
            }
        }
        #endregion

        #region [- Mahdavi_Pass -]
        public static string Mahdavi_Pass
        {
            get
            {
                var pass = "M09190870450M";
                return pass;
            }
        }
        #endregion

        #region [- Mahdavi_EmailHead -]
        public static string Mahdavi_EmailHead
        {
            get
            {
                var head = "mahdavi | mahdavi";
                return head;
            }
        }
        #endregion

        #endregion

        #region [- Methods -]

        #region [- Get_SMTP_Protocol(...) -]
        private static SmtpClient Get_SMTP_Protocol(string address)
        {
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(address, Mahdavi_Pass)
            };

            return smtp;
        }
        #endregion

        #region [- SendEmail(...) -]
        public static void SendEmail(string requesterEmail, string subject, string body
          //  , AlternateView imgView
            , object attachments)
        {
            try
            {
                var mailAddress_From = new MailAddress(Mahdavi_Email, Mahdavi_EmailHead);
                var mailAddress_To = new MailAddress(requesterEmail);
                //---------------------------------------------------------------------------
                var message = new MailMessage(mailAddress_From, mailAddress_To)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,
                    BodyTransferEncoding = TransferEncoding.Base64
                };
                //---------------------------------------------------------------------------
                //imgView.TransferEncoding = TransferEncoding.Base64;
                //message.AlternateViews.Add(imgView);
                //---------------------------------------------------------------------------
                List<Attachment> list_Attachment = (List<Attachment>)attachments;
                if (list_Attachment.Count != 0)
                {
                    foreach (var item in list_Attachment)
                    {
                        message.Attachments.Add(item);
                    }
                }
                //---------------------------------------------------------------------------
                var client = Get_SMTP_Protocol(mailAddress_From.Address);

                client.SendCompleted += (s, e) =>
                {
                    client.Dispose();
                    message.Dispose();
                };

                client.SendAsync(message, null);

            }
            catch (Exception ex)
            {
                string msgError = ex.Message;
            }


        }
        #endregion

        #endregion

    }
}
