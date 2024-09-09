using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Data.Entities
{
    public class OperationResult
    {
        public string Message { get; set; }
        public bool Success { get; set; }

        public string? Result { get; set; }

        public OperationResult(string message)
        {
            Message = message;
        }

        public OperationResult(string message, bool success)
        {
            Message = message;
            Success = success;
        }

        public OperationResult (string message, bool success, string result)
        {
            Message = message;
            Success = success;
            Result = result;
        }
    }
}
