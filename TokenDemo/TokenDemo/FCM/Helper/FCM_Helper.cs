using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TokenDemo.FCM.Helper
{
    public class FCM_Helper
    {
        public string NotificationTitle { get; set; }
        public string Message { get; set; }
        public string Topic { get; set; }
        public string FCMToken { get; set; }
        public byte ResponseType { get; set; }
        public long? DoubleGameID { get; set; }
        public string DisplayName { get; set; }
        public long? Cups { get; set; }
        public long? UserLevel { get; set; }
        public long? FCMTokenRegistrationDate { get; set; }
    }
}
