using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
 using Newtonsoft.Json;
using TokenDemo.FCM.Helper;

namespace TokenDemo.FCM
{
    public class FCMPushNotification
    {
        #region [- ctor -]
        public FCMPushNotification(FCMResult ref_FCMResult)
        {
            Ref_FCMResult = ref_FCMResult;
        }
        #endregion

        #region [- Properties -]
        public FCMResult Ref_FCMResult { get; set; }
        #endregion

        #region [- Methods -]

        #region [- SendNotification() -]
        public async Task<FCMResult> SendNotification(FCM_Helper ref_FCM_Helper)
        {
            try
            {
                await Task.Run(() =>
                {
                    Ref_FCMResult.Successful = true;
                    Ref_FCMResult.Error = null;
                    // var value = message;
                    var requestUri = "https://fcm.googleapis.com/fcm/send";

                    var payload = new
                    {
                        data = new
                        {
                            responseType = ref_FCM_Helper.ResponseType,
                            cups = ref_FCM_Helper.Cups,
                            displayName = ref_FCM_Helper.DisplayName,
                            doubleGameID = ref_FCM_Helper.DoubleGameID,
                            userLevel = ref_FCM_Helper.UserLevel,
                            fCMTokenRegistrationDate = ref_FCM_Helper.FCMTokenRegistrationDate
                        },
                        priority = "high",
                        content_available = true,
                        to = ref_FCM_Helper.FCMToken, // Uncoment this if you want to test for single device
                                                      //to = "/topics/" + ref_FCM_Helper.Topic, // this is for topic 
                        notification = new
                        {
                            title = ref_FCM_Helper.NotificationTitle,
                            body = ref_FCM_Helper.Message,
                            badge = 1,
                            click_action = "FCM_PLUGIN_ACTIVITY"
                            //icon="myicon"
                        }
                    };
                    var json = JsonConvert.SerializeObject(payload);
                    var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
                    //var serializer = new JavaScriptSerializer();
                    //var jsonBody = serializer.Serialize(payload);

                    byte[] byteArray = Encoding.UTF8.GetBytes(json);

                    var TopS_SERVER_KEY = "AAAAmsabp9w:APA91bFkXt_iFHLHDmV6Icjey67mqCjSoElG3FS02f7Q5E_Q0lNXZEXfQWnLXSFT55dzNHru_txCJO8-kGDZy_QAN3l3UF9U9F-jGgYlMefmPYWPhZC9S_V3wQUoSSuYBgHrlXZDCzAy";
                    var senderId = "664757053404";
                    WebRequest webRequest = WebRequest.Create(requestUri);
                    webRequest.Method = "POST";
                    webRequest.Headers.Add(string.Format("Authorization: key={0}", TopS_SERVER_KEY));
                    webRequest.Headers.Add(string.Format("Sender: id={0}", senderId));
                    webRequest.ContentType = "application/json";
                    webRequest.ContentLength = byteArray.Length;


                    //using (var httpRequest = new HttpRequestMessage(HttpMethod.Post, requestUri))
                    //{
                    //    httpRequest.Headers.TryAddWithoutValidation("Authorization", ConfigurationManager.AppSettings["FCM_SERVER_API_KEY"]);
                    //    httpRequest.Headers.TryAddWithoutValidation("Sender", ConfigurationManager.AppSettings["FCM_SENDER_ID"]);
                    //    httpRequest.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    //    using (var httpClient = new HttpClient())
                    //    {
                    //        var result = await httpClient.SendAsync(httpRequest);

                    //        if (result.IsSuccessStatusCode)
                    //        {
                    //            return Ref_FCMResult;
                    //        }

                    //    }
                    //}

                    using (Stream dataStream = webRequest.GetRequestStream())
                    {
                        dataStream.Write(byteArray, 0, byteArray.Length);

                        using (WebResponse webResponse = webRequest.GetResponse())
                        {
                            using (Stream dataStreamResponse = webResponse.GetResponseStream())
                            {
                                using (StreamReader tReader = new StreamReader(dataStreamResponse))
                                {
                                    string sResponseFromServer = tReader.ReadToEnd();
                                    Ref_FCMResult.Response = sResponseFromServer;
                                }
                            }
                        }
                    }
                });

            }
            catch (Exception ex)
            {
                Ref_FCMResult.Successful = false;
                Ref_FCMResult.Response = null;
                Ref_FCMResult.Error = ex;
            }
            return Ref_FCMResult;
        }

        #endregion

        #endregion
    }
}
