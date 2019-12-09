using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TokenDemo.FCM.Helper
{
    public class FCMResult
    {
        public bool Successful { get; set; }
        public string Response { get; set; }
        public Exception Error { get; set; }

    }
}
